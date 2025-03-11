import React, { createContext, useReducer } from "react";
import { ProfessorService } from "./ProfessorService"; // ✅ Import ProfessorService

const ProfessorContext = createContext();

const initialState = {
  lessonMetadata: null,
  topics: [],
  activeTopicIndex: 0
};

const professorReducer = (state, action) => {
  switch (action.type) {
    case "SET_LESSON_PLAN":
      return {
        ...state,
        lessonMetadata: action.payload.lessonMetadata,
        topics: action.payload.topics.map(topic => ({
          ...topic,
          conversation: topic.conversation || [] // ✅ Ensure conversation array exists
        })),
        activeTopicIndex: 0
      };

    case "SET_ACTIVE_TOPIC":
      return {
        ...state,
        activeTopicIndex: action.payload
      };

    case "ADD_MESSAGE":
      const { topicId, message, dispatch } = action.payload; // ✅ Extract dispatch

      // ✅ Add the message to the correct topic's conversation
      const updatedTopics = state.topics.map(topic =>
        topic.id === topicId
          ? { ...topic, conversation: [...topic.conversation, message] }
          : topic
      );

      // ✅ Trigger professor response if the message is from the student
      if (message.sender === "student") {
        const activeTopic = updatedTopics.find(topic => topic.id === topicId);
        if (activeTopic) {
          ProfessorService.processStudentMessage(topicId, activeTopic.title, message.text, dispatch);
        }
      }

      return {
        ...state,
        topics: updatedTopics
      };

    default:
      return state;
  }
};

export const ProfessorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(professorReducer, initialState);

  return (
    <ProfessorContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfessorContext.Provider>
  );
};

export { ProfessorContext };
