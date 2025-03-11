import React, { useContext } from 'react';
import { TAContext } from './TAContext';

const TA = () => {
  const { state } = useContext(TAContext);

  return (
    <div className="ta-container">
      <h2>TA</h2>
      
      {/* ✅ Display Student Messages */}
      <div className="message-log">
        <h3>Messages from Student</h3>
        {state.studentMessages.length > 0 ? (
          state.studentMessages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      {/* ✅ Display Professor Messages */}
      <div className="message-log">
        <h3>Messages from Professor</h3>
        {state.professorMessages.length > 0 ? (
          state.professorMessages.map((msg, index) => (
            <div key={index} className="message">
              <strong>Professor:</strong> {msg}
            </div>
          ))
        ) : (
          <p>No messages from professor.</p>
        )}
      </div>
    </div>
  );
};

export default TA;
