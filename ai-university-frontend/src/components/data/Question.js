import React from "react";

const Question = ({ question, questionId, fieldType, studentAnswer, onAnswerChange }) => {
  return (
    <div className="question">
      <h3>{question}</h3>
      {fieldType === "text" ? (
        <textarea
          value={studentAnswer}
          onChange={(e) => onAnswerChange(questionId, e.target.value)}
        />
      ) : (
        <input
          type={fieldType}
          value={studentAnswer}
          onChange={(e) => onAnswerChange(questionId, e.target.value)}
        />
      )}
    </div>
  );
};

export default Question;

