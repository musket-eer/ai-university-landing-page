import React, { useContext, useState } from 'react';
import { ActiveModeContext } from '../../contexts/ActiveModeContext';
import { ExaminerContext } from '../Examiner/ExaminerContext';
import { ProfessorContext } from '../Professor/ProfessorContext';
import { TAContext } from '../TA/TAContext';
import { StudentContext } from './StudentContext'; // Track global messages
import { ProfessorService } from '../Professor/ProfessorService'; // ✅ Import ProfessorService
import './Student.css';

const Student = () => {
  const { state: activeMode } = useContext(ActiveModeContext);
  const { dispatch: examinerDispatch } = useContext(ExaminerContext);
  const { dispatch: professorDispatch, state: professorState } = useContext(ProfessorContext);
  const { dispatch: taDispatch } = useContext(TAContext);
  const { dispatch: studentDispatch } = useContext(StudentContext); // Track all messages
  const [message, setMessage] = useState('');

  

  const sendMessage = async () => {
    
    if (!message.trim()) return;

    const messageData = {
      sender: "student",
      text: message
    };

    // ✅ Store the message in global student context (for tracking)
    studentDispatch({ type: 'LOG_MESSAGE', payload: messageData });

    switch (activeMode.activeMode) {
      case 'examiner':
        examinerDispatch({ type: 'SUBMIT_ANSWER', payload: { answer: message } });
        break;
      
      case 'professor':
        // ✅ Get the active topic from ProfessorContext
        const activeTopic = professorState.topics[professorState.activeTopicIndex];

        if (activeTopic) {
          // ✅ Dispatch student message to store it in conversation
          professorDispatch({
            type: "ADD_MESSAGE",
            payload: {
              topicId: activeTopic.id,
              message: messageData,
              dispatch: professorDispatch // ✅ Pass dispatch to trigger professor response
            }
          });

          // ✅ Trigger professor's response
          await ProfessorService.processStudentMessage(activeTopic.id, activeTopic.title, message, professorDispatch);
        }
        break;
      
      case 'ta':
        taDispatch({ type: 'RECEIVE_STUDENT_MESSAGE', payload: messageData });
        break;
      
      default:
        console.warn("⚠️ No active mode selected");
        break;
    }

    setMessage(''); // ✅ Clear input after sending
  };

  return (
    <div className="student-container">
      <h2>Talking to {activeMode.activeMode.toUpperCase()}</h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`Message ${activeMode.activeMode}...`}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Student;
