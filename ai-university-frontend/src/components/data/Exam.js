import React, { useState } from "react";
import Question from "./Question"; // ✅ Import Question component

const Exam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // ✅ Mocked Questions List. // ##TODO - This will be fetched from an LLM dynamically. 
  const questions = [
    { id: 1, text: "What is AI?", type: "text" },
    { id: 2, text: "What is 5 + 3?", type: "number" },
    { id: 3, text: "Which of the following is a programming language?", type: "radio", options: ["Python", "HTML", "CSS", "Linux"] },
    { id: 4, text: "Explain the concept of Machine Learning.", type: "textarea" }
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setReviewMode(true); // ✅ Enter review mode after the last question
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      alert("Exam submitted! Moving to the next lesson...");
    }, 2000);
  };

  return (
    <div className="exam">
      <h2>Exam</h2>

      {!isSubmitted ? (
        <>
          {!reviewMode ? (
            <>
              <h3>Answer the following question:</h3>
              <Question
                key={questions[currentIndex].id}
                question={questions[currentIndex].text}
                questionId={questions[currentIndex].id}
                fieldType={questions[currentIndex].type}
                options={questions[currentIndex].options || []} // ✅ Pass multiple-choice options if available
                studentAnswer={answers[questions[currentIndex].id] || ""}
                onAnswerChange={handleAnswerChange}
              />

              <div className="exam-navigation">
                <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
                <button onClick={handleNext}>
                  {currentIndex === questions.length - 1 ? "Review Answers" : "Next"}
                </button>
              </div>
            </>
          ) : (
            <>
              <h3>Review Your Answers</h3>
              {questions.map((q) => (
                <div key={q.id} className="review-item">
                  <p><strong>Q:</strong> {q.text}</p>
                  <p><strong>A:</strong> {answers[q.id] || "No answer provided."}</p>
                </div>
              ))}
              <button onClick={handleSubmit}>Submit Exam</button>
            </>
          )}
        </>
      ) : (
        <p>Exam submitted! Moving to the next lesson...</p>
      )}
    </div>
  );
};

export default Exam;
