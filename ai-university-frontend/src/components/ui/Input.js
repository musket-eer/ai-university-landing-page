import React, { useState } from "react";
import "./Input.css";

const Input = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message); // Calls the event handler passed as a prop
      setMessage(""); // Clear the textarea after sending
    }
  };

  return (
    <div className="input-container">
      <textarea
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="send-button" onClick={handleSend}>
        Send Message
      </button>
    </div>
  );
};

export default Input;
