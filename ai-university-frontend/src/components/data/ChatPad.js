import React, { useState } from "react";
import { useClassroom } from "../data/ClassroomContext";

const ChatPad = () => {
  const { activeActivity, addMessage } = useClassroom(); // ✅ Get `addMessage`
  const [input, setInput] = useState("");

  if (!activeActivity) return <p>Loading chat...</p>;

  const handleSend = () => {
    if (!input.trim()) return;

    const message = {
      sender: "Student",
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    addMessage(message); // ✅ Ensure this function is available
    setInput(""); // ✅ Clear input after sending
  };

  return (
    <div className="chatpad">
      <h4>Chat with {activeActivity.leader}</h4>
      <div className="chat-messages">
        {activeActivity.messages.map((msg, index) => (
          <p key={index} className={msg.sender === "Student" ? "student-msg" : "participant-msg"}>
            <strong>{msg.sender} ({msg.timestamp}):</strong> {msg.text}
          </p>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatPad;
