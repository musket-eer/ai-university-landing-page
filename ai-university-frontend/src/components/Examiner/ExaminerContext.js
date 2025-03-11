import React, { createContext, useReducer } from 'react';

// ✅ Initial State
const initialState = {
  message: 'Examiner is ready to conduct the exam!',
  questions: [
    { question_id: 1, question_text: 'What is 2 + 2?' },
    { question_id: 2, question_text: 'Who discovered gravity?' },
    { question_id: 3, question_text: 'What is the capital of France?' },
    { question_id: 4, question_text: 'Explain Newton’s First Law of Motion.' },
    { question_id: 5, question_text: 'What is the square root of 64?' }
  ],
  currentQuestionIndex: 0, // ✅ Track the active question
  studentAnswers: {}, // ✅ Store student responses per question
  isExamSubmitted: false, // ✅ Track exam submission status
  viewResponsesMode: false // ✅ Toggle between questions & dialogue view
};

// ✅ Reducer Function
const examinerReducer = (state, action) => {
  switch (action.type) {
    case 'SUBMIT_ANSWER': {
      if (state.isExamSubmitted) return state; // ✅ Prevent edits after submission

      const { answer } = action.payload;
      const question_id = state.questions[state.currentQuestionIndex].question_id;

      return {
        ...state,
        studentAnswers: {
          ...state.studentAnswers,
          [question_id]: answer // ✅ Assign the answer to the correct question
        }
      };
    }

    case 'SUBMIT_EXAM': {
      return {
        ...state,
        isExamSubmitted: true // ✅ Lock exam and prevent further edits
      };
    }

    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1)
      };

    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
      };

    case 'TOGGLE_VIEW_RESPONSES':
      return {
        ...state,
        viewResponsesMode: !state.viewResponsesMode // ✅ Toggle between views
      };

    default:
      return state;
  }
};

// ✅ Create Context
export const ExaminerContext = createContext();

// ✅ Provider Component
export const ExaminerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(examinerReducer, initialState);

  return (
    <ExaminerContext.Provider value={{ state, dispatch }}>
      {children}
    </ExaminerContext.Provider>
  );
};
