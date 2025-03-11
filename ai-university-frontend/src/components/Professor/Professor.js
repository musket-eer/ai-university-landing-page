import React, { useContext, useEffect, useState } from "react";
import { ProfessorContext } from "./ProfessorContext";
import { ProfessorService } from "./ProfessorService";

const Professor = ({ studentMessage, isProfessorMode }) => {
  const { state, dispatch } = useContext(ProfessorContext);
  const [isLoading, setIsLoading] = useState(true); // ✅ Track loading state

  useEffect(() => {
    async function fetchLessonPlan() {
      if (!state.lessonMetadata || state.topics.length === 0) {
        setIsLoading(true);
        try {
          await ProfessorService.generateLessonPlan("Newton's Laws", 40, {}, {}, dispatch);
        } catch (error) {
          console.error("❌ Error fetching lesson plan:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false); // ✅ If data exists, stop loading
      }
    }

    fetchLessonPlan();
  }, [dispatch, state.lessonMetadata, state.topics]);

  // ✅ Automatically respond when student sends a message in Professor Mode
  useEffect(() => {
    if (isProfessorMode && studentMessage) {
      const activeTopic = state.topics[state.activeTopicIndex];
      if (activeTopic) {
        ProfessorService.processStudentMessage(activeTopic.id, activeTopic.title, studentMessage, dispatch);
      }
    }
  }, [studentMessage, isProfessorMode, state.activeTopicIndex, dispatch]);

  // ✅ Show loading message while API is still fetching
  if (isLoading) {
    return <p>⏳ Creating lesson contents... Please wait.</p>;
  }

  // ✅ Show error only if data fails to load
  if (!state.lessonMetadata || state.topics.length === 0) {
    return <p>⚠️ Failed to generate lesson. Please try again.</p>;
  }

  const activeTopic = state.topics[state.activeTopicIndex];

  return (
    <div className="professor-container">
      <h2>Professor's Interactive Lecture</h2>
      <h3>{activeTopic?.title || "Untitled Topic"}</h3>
      <p>{activeTopic?.content || "No content available for this topic."}</p>

      {/* ✅ Display chat history for the active topic */}
      <div className="chat-history">
        <h4>Discussion on {activeTopic?.title}</h4>
        {activeTopic.conversation.length === 0 ? (
          <p>No questions asked yet on this topic.</p>
        ) : (
          activeTopic.conversation.map((msg, index) => (
            <p key={index} className={msg.sender === "professor" ? "professor-message" : "student-message"}>
              <strong>{msg.sender === "professor" ? "Professor" : "Student"}:</strong> {msg.text}
            </p>
          ))
        )}
      </div>

      <button 
        onClick={() => dispatch({ type: "SET_ACTIVE_TOPIC", payload: state.activeTopicIndex - 1 })}
        disabled={state.activeTopicIndex === 0}
      >
        Previous
      </button>

      <button 
        onClick={() => dispatch({ type: "SET_ACTIVE_TOPIC", payload: state.activeTopicIndex + 1 })}
        disabled={state.activeTopicIndex === state.topics.length - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Professor;
