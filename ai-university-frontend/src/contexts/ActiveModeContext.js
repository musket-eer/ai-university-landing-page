import React, { createContext, useReducer } from 'react';

// Initial state (default mode is 'professor')
const initialState = {
  activeMode: 'ta', // Tracks current mode (professor, exam, etc.)
};

// Reducer function
const activeModeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_MODE':
      return { ...state, activeMode: action.payload };
    default:
      return state;
  }
};

// Create context
export const ActiveModeContext = createContext();

// Context provider component
export const ActiveModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(activeModeReducer, initialState);

  return (
    <ActiveModeContext.Provider value={{ state, dispatch }}>
      {children}
    </ActiveModeContext.Provider>
  );
};
