import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
  activeComponent: 'professor', // Determines which component the student interacts with
  messages: [], // History of student messages
  mode: 'classroom', // Can be 'classroom' or 'exam'
};

// Reducer function to handle state updates
const studentReducer = (state, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    
    case 'SET_ACTIVE_MODE':
      return { ...state, mode: action.payload };

    case 'SET_ACTIVE_COMPONENT':
      return { ...state, activeComponent: action.payload };

    default:
      return state;
  }
};

// Create context
export const StudentContext = createContext();

// Context provider component
export const StudentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);

  return (
    <StudentContext.Provider value={{ state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
};
