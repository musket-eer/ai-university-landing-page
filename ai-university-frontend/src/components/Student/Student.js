import React, { useState, useEffect, useRef } from 'react';
import { useClassroom } from '../data/ClassroomContext';
import { ProfessorService } from '../Professor/ProfessorService';
import Input from '../ui/Input';
import './Student.css';

const Student = () => {
  const { activeActivity, addMessage } = useClassroom(); // ✅ Get activeActivity and addMessage
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null); // ✅ Ref for auto-scrolling

  // ✅ Automatically scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeActivity?.messages]);

  const sendMessage = async () => {
    if (!message.trim() || !activeActivity) return;

    const messageData = {
      sender: "Student",
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    addMessage(messageData); // ✅ Store student message

    setMessage(''); // ✅ Clear input after sending

    // ✅ Handle leader response
    switch (activeActivity.leader) {
      case 'Professor':
        await ProfessorService.processStudentMessage(activeActivity.id, activeActivity.title, message, addMessage);
        break;
      case 'Examiner':
        addMessage({ sender: "Examiner", text: "Your answer has been received.", timestamp: new Date().toLocaleTimeString() });
        break;
      case 'TA':
        addMessage({ sender: "TA", text: "Here’s a hint: Think about previous lessons!", timestamp: new Date().toLocaleTimeString() });
        break;
      case 'Librarian':
        addMessage({ sender: "Librarian", text: "Let me find the best research materials for you.", timestamp: new Date().toLocaleTimeString() });
        break;
      default:
        console.warn("⚠️ No active leader to respond.");
    }
  };

  return (
    <div className="student-container">
      {/* <h2>Talking to {activeActivity?.leader || "AI"}</h2> */}

      {/* ✅ Display Message History */}
      <div className="chat-messages">
        {activeActivity?.messages?.map((msg, index) => (
          <p key={index} className={msg.sender === "Student" ? "student-msg" : "participant-msg"}>
            <strong>{msg.sender} ({msg.timestamp}):</strong> {msg.text}
          </p>
        ))}
        <div ref={messagesEndRef} /> {/* ✅ Auto-scroll to latest message */}
      </div>

      <Input onSendMessage={sendMessage} />
    </div>
  );
};

export default Student;
