import React, { createContext, useContext, useReducer } from "react";

// ✅ Initial State
const initialState = {
  resources: [], // AI-generated learning materials
  loading: false,
};

// ✅ Reducer Function
const librarianReducer = (state, action) => {
  switch (action.type) {
    case "SET_RESOURCES":
      return { ...state, resources: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// ✅ Create Context
const LibrarianContext = createContext();

// ✅ Provider Component
export const LibrarianProvider = ({ children }) => {
  const [state, dispatch] = useReducer(librarianReducer, initialState);

  return (
    <LibrarianContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LibrarianContext.Provider>
  );
};

// ✅ Custom Hook to Access Context
export const useLibrarian = () => {
  return useContext(LibrarianContext);
};
