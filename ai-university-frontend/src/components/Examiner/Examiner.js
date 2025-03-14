import React, { useState, useEffect } from "react";
import { useClassroom } from "../data/ClassroomContext";
import Exam from "../data/Exam";

const Examiner = () => {
  const { activeActivity } = useClassroom();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // ✅ Ensure component only renders when `activeActivity.leader === "Examiner"`
  if (!activeActivity || activeActivity.leader !== "Examiner") {
    return null;
  }

  const questions = activeActivity.questions || [];

  // ✅ Update the current question index and notify TA
  const handleQuestionChange = (newIndex) => {
    setCurrentQuestionIndex(newIndex);
  };

  return (
    <div className="examiner">
      <h2>{activeActivity.title || "Exam Session"}</h2>
      
      {/* ✅ The Exam component is fully inside Examiner */}
      <Exam
        examTitle={activeActivity.content}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        onQuestionChange={handleQuestionChange} // ✅ Notify Examiner when question changes
      />
    </div>
  );
};

export default Examiner;
