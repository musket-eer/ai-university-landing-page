import React, { useEffect, useRef } from "react";
import { useClassroom } from "../data/ClassroomContext";

const Professor = () => {
  const { activeActivity, addMessage } = useClassroom();
  const isActive = activeActivity?.leader === "Professor";
  const prevMessageCount = useRef(activeActivity?.messages?.length || 0);

  const responses = [
    "That's a great point!",
    "Interesting perspective. Let's explore this further.",
    "I see where you're going with that.",
    "Can you elaborate on that idea?",
    "Good question! Let's break it down.",
    "I like how you're thinking critically about this.",
    "That's a key takeaway from today's lesson!"
  ];

  const sendResponse = () => {
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const professorMessage = {
      sender: "Professor",
      text: randomResponse,
      timestamp: new Date().toLocaleTimeString(),
    };

    addMessage(professorMessage);
  };

  useEffect(() => {
    const currentMessageCount = activeActivity?.messages?.length || 0;

    if (currentMessageCount > prevMessageCount.current) {
      const lastMessage = activeActivity?.messages?.[currentMessageCount - 1];

      if (lastMessage && lastMessage.sender !== "Professor") {
        setTimeout(() => {
          sendResponse();
        }, 1000);
      }
    }

    prevMessageCount.current = currentMessageCount;
  }, [activeActivity?.messages]);

  return (
    <div className={`professor ${isActive ? "active" : "inactive"}`}>
      <h3>Professor</h3>
      <p>Teaching: {activeActivity.content}</p>
    </div>
  );
};

export default Professor;
