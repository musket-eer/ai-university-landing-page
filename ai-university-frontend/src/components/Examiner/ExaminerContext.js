import React, { createContext, useReducer } from 'react';

// ✅ Initial State
const initialState = {
  message: 'Examiner is ready to conduct the exam!',
  exam: {
    examId: 'EXAM_AI_101',
    title: 'Artificial Intelligence Basics',
    duration: 30 * 60, // 30 minutes in seconds
    isExamActive: false, // ✅ Exam starts only when activated
    isExamSubmitted: false, // ✅ Lock exam after submission
  },
  questions: [
    { question_id: 1, question_text: 'What is 2 + 2?', field_type: 'text' },
    { question_id: 2, question_text: 'Who discovered gravity?', field_type: 'text' },
    { question_id: 3, question_text: 'What is the capital of France?', field_type: 'text' },
    { question_id: 4, question_text: 'Explain Newton’s First Law of Motion.', field_type: 'text' },
    { question_id: 5, question_text: 'What is the square root of 64?', field_type: 'text' }
  ],
  currentQuestionIndex: 0, // ✅ Track the active question
  studentAnswers: {}, // ✅ Store student responses per question
  viewResponsesMode: false // ✅ Toggle between questions & dialogue view
};

// ✅ Reducer Function
const examinerReducer = (state, action) => {
  switch (action.type) {
    case 'START_EXAM':
      return {
        ...state,
        exam: { ...state.exam, isExamActive: true } // ✅ Start the exam
      };

    case 'SUBMIT_ANSWER': {
      if (state.exam.isExamSubmitted) return state; // ✅ Prevent edits after submission

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
        exam: { ...state.exam, isExamActive: false, isExamSubmitted: true } // ✅ Lock exam after submission
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
