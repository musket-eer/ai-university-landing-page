import React from "react";

const BlueBook = ({ questions, studentAnswers, isVisible }) => {
  if (!isVisible) return null; // Hide if not active

  return (
    <div className="bluebook">
      <h3>BlueBook - Student Answers</h3>
      {questions.map((q) => (
        <div key={q.question_id} className="bluebook-entry">
          <p><strong>Q:</strong> {q.question_text}</p>
          <p><strong>A:</strong> {studentAnswers[q.question_id] || "No answer yet."}</p>
        </div>
      ))}
    </div>
  );
};

export default BlueBook;
