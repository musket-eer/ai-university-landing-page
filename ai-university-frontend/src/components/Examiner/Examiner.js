import React, { useState, useEffect, useRef } from "react";
import { useClassroom } from "../data/ClassroomContext";
import Exam from "../data/Exam";

const Examiner = () => {
  const { activeActivity, addMessage } = useClassroom();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const prevMessageCount = useRef(activeActivity?.messages?.length || 0);

  if (!activeActivity || activeActivity.leader !== "Examiner") {
    return null;
  }

  const questions = activeActivity.questions || [];

  // ✅ Mock responses from Examiner
  const responses = [
    "Your answer has been received.",
    "Make sure to justify your response.",
    "Think critically about the question before answering.",
    "Your response will be reviewed shortly.",
    "Please check the exam instructions carefully."
  ];

  // ✅ Handle message from student
  const sendResponse = () => {
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const examinerMessage = {
      sender: "Examiner",
      text: randomResponse,
      timestamp: new Date().toLocaleTimeString(),
    };
    addMessage(examinerMessage);
  };

  // ✅ Listen for new student messages and respond
  useEffect(() => {
    const currentMessageCount = activeActivity?.messages?.length || 0;

    if (currentMessageCount > prevMessageCount.current) {
      const lastMessage = activeActivity?.messages?.[currentMessageCount - 1];

      if (lastMessage && lastMessage.sender !== "Examiner") {
        setTimeout(() => {
          sendResponse();
        }, 1000);
      }
    }

    prevMessageCount.current = currentMessageCount;
  }, [activeActivity?.messages]);

  return (
    <div className="examiner">
      <h2>{activeActivity.title || "Exam Session"}</h2>

      <Exam
        examTitle={activeActivity.content}
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        onQuestionChange={setCurrentQuestionIndex}
      />
    </div>
  );
};

export default Examiner;
