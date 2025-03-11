import React, { useContext } from 'react';
import { ActiveModeContext } from '../../contexts/ActiveModeContext';
import './NavBar.css';

const Navbar = () => {
  const { state, dispatch } = useContext(ActiveModeContext);

  return (
    <div className="navbar">
      <p><strong>Talking to:</strong> {state.activeMode.toUpperCase()}</p>
      
      <button onClick={() => dispatch({ type: 'SET_ACTIVE_MODE', payload: 'professor' })}>
        Talk to Professor
      </button>
      
      <button onClick={() => dispatch({ type: 'SET_ACTIVE_MODE', payload: 'ta' })}>
        Talk to TA
      </button>
      
      <button onClick={() => dispatch({ type: 'SET_ACTIVE_MODE', payload: 'examiner' })}>
        Talk to Examiner
      </button>
    </div>
  );
};

export default Navbar;

