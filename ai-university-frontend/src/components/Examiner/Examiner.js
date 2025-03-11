import React, { useContext } from 'react';
import { ExaminerContext } from './ExaminerContext';
import './Examiner.css';

const Examiner = () => {
  const { state, dispatch } = useContext(ExaminerContext);
  const currentQuestion = state.questions[state.currentQuestionIndex];

  return (
    <div className="examiner-container">
      <h2>Examiner</h2>

      {/* ✅ Toggle View: Questions vs. Responses */}
      {!state.viewResponsesMode ? (
        <>
          {/* Display Current Question */}
          <div className="exam-question">
            <h3>Current Question</h3>
            {currentQuestion ? (
              <p>{currentQuestion.question_text}</p>
            ) : (
              <p>Exam is complete!</p>
            )}
          </div>

          {/* Show Student's Answer (Updated Immediately) */}
          <div className="exam-answer">
            <h3>Student's Answer</h3>
            <p>{state.studentAnswers[currentQuestion?.question_id] || "No answer yet."}</p>
          </div>

          {/* Navigation & Submission Buttons */}
          <div className="exam-navigation">
            <button
              onClick={() => dispatch({ type: 'PREVIOUS_QUESTION' })}
              disabled={state.currentQuestionIndex === 0}
            >
              Previous
            </button>

            <button
              onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
              disabled={state.currentQuestionIndex >= state.questions.length - 1}
            >
              Next
            </button>

            {!state.isExamSubmitted && (
              <button onClick={() => dispatch({ type: 'SUBMIT_EXAM' })}>
                Submit Exam
              </button>
            )}

            <button onClick={() => dispatch({ type: 'TOGGLE_VIEW_RESPONSES' })}>
              View Responses
            </button>
          </div>
        </>
      ) : (
        <>
          {/* ✅ View All Responses as a Dialogue */}
          <h3>Examiner-Student Dialogue</h3>
          <div className="conversation-log">
            {state.questions.map((question) => (
              <div key={question.question_id} className="conversation-entry">
                <p><strong>Examiner:</strong> {question.question_text}</p>
                <p><strong>Student:</strong> {state.studentAnswers[question.question_id] || "No answer provided."}</p>
              </div>
            ))}
          </div>

          {/* Exit View Mode */}
          <button onClick={() => dispatch({ type: 'TOGGLE_VIEW_RESPONSES' })}>
            Back to Exam Mode
          </button>
        </>
      )}
    </div>
  );
};

export default Examiner;
