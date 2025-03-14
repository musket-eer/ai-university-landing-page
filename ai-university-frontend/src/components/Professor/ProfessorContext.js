import React, { createContext, useReducer, useContext } from "react";
import { ProfessorService } from "./ProfessorService"; // ✅ Import ProfessorService
import { ClassroomContext } from "../data/ClassroomContext"; // ✅ Access active activity from ClassroomContext

const ProfessorContext = createContext();

const initialState = {
  chatHistory: [] // ✅ Store only the chat history (not lesson plan)
};

const professorReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      const { message, dispatch, activeActivity } = action.payload;

      // ✅ Update chat history
      const updatedChatHistory = [...state.chatHistory, message];

      // ✅ Only process student messages if activeActivity is available
      if (message.sender === "student" && activeActivity) {
        console.log("📩 Processing student message for:", activeActivity.title);

        ProfessorService.processStudentMessage(
          activeActivity.id,  // ✅ Active topic ID
          activeActivity.title,  // ✅ Active topic title
          message.text,  // ✅ Student's message text
          dispatch
        );
      } else if (message.sender === "student") {
        console.warn("⚠️ Skipping AI response: Active activity is not ready yet.");
      }

      return {
        ...state,
        chatHistory: updatedChatHistory
      };

    case "CLEAR_CHAT_HISTORY":
      return {
        ...state,
        chatHistory: []
      };

    default:
      return state;
  }
};

// ✅ Professor Context Provider
export const ProfessorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(professorReducer, initialState);
  const { activeActivity } = useContext(ClassroomContext); // ✅ Get active activity from ClassroomContext

  return (
    <ProfessorContext.Provider value={{ state, dispatch, activeActivity }}>
      {children}
    </ProfessorContext.Provider>
  );
};

// ✅ Export ProfessorContext and Custom Hook
export { ProfessorContext };

// ✅ Custom Hook to Use ProfessorContext
export const useProfessor = () => useContext(ProfessorContext);
