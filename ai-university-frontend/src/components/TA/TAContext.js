import React, { createContext, useReducer } from 'react';

// ✅ Initial State
const initialState = {
  message: "TA is ready to assist!",
  studentMessages: [],
  professorMessages: []
};

// ✅ Reducer Function
const taReducer = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_STUDENT_MESSAGE':
      return {
        ...state,
        studentMessages: [...state.studentMessages, action.payload]
      };

    case 'RECEIVE_PROFESSOR_MESSAGE':
      return {
        ...state,
        professorMessages: [...state.professorMessages, action.payload]
      };

    default:
      return state;
  }
};

// ✅ Create Context
export const TAContext = createContext();

// ✅ Provider Component
export const TAProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taReducer, initialState);

  return (
    <TAContext.Provider value={{ state, dispatch }}>
      {children}
    </TAContext.Provider>
  );
};
