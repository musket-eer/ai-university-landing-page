import React, { useState, useEffect, useRef } from 'react';
import { useClassroom } from '../data/ClassroomContext';
import { ProfessorService } from '../Professor/ProfessorService';
import Input from '../ui/Input';
import './Student.css';

const Student = () => {
  const { activeActivity, addMessage } = useClassroom();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log("🔍 Updated Messages in Student:", activeActivity?.messages);
  }, [activeActivity?.messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeActivity?.messages?.length]);

  const sendMessage = async () => {
    if (!message.trim() || !activeActivity) return;

    const studentMessage = {
      sender: "Student",
      text: message, // ✅ Ensure correct key is used
      timestamp: new Date().toLocaleTimeString(),
    };
    addMessage(studentMessage);
    setMessage('');

    switch (activeActivity.leader) {
      case 'Professor':
        setTimeout(async () => {
          const professorResponse = {
            sender: "Professor",
            text: "Great question! Let's break this down.", // ✅ Ensure text exists
            timestamp: new Date().toLocaleTimeString(),
          };
          addMessage(professorResponse);
        }, 1000);
        break;
      case 'Examiner':
        addMessage({
          sender: "Examiner",
          text: "Your answer has been received.",
          timestamp: new Date().toLocaleTimeString(),
        });
        break;
      case 'TA':
        addMessage({
          sender: "TA",
          text: "Here’s a hint: Think about previous lessons!",
          timestamp: new Date().toLocaleTimeString(),
        });
        break;
      case 'Librarian':
        addMessage({
          sender: "Librarian",
          text: "Let me find the best research materials for you.",
          timestamp: new Date().toLocaleTimeString(),
        });
        break;
      default:
        console.warn("⚠️ No active leader to respond.");
    }
  };

  return (
    <div className="student-container">
      <h3>Chat with {activeActivity?.leader || "AI"}</h3>

      <div className="chat-messages">
        {activeActivity?.messages?.length > 0 ? (
          <ul>
            {activeActivity.messages.map((msg, index) => (
              <li key={index} className={msg.sender === "Student" ? "student-msg" : "participant-msg"}>
                <strong>{msg.sender} ({msg.timestamp}):</strong> {msg.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No messages yet.</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <Input
        onSendMessage={sendMessage}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
  );
};

export default Student;

