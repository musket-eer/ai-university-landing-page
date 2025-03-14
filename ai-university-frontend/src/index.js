import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Import Routes
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ExaminerProvider } from './components/Examiner/ExaminerContext';
import { StudentContextProvider } from './components/Student/StudentContext';
import { ProfessorProvider } from './components/Professor/ProfessorContext';
import { ActiveModeProvider } from './contexts/ActiveModeContext';
import { ClassroomProvider } from './components/data/ClassroomContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Sample lesson topics for LLM
const llmText = `
Introduction to AI
History of AI
Machine Learning Basics
Neural Networks
Deep Learning
Natural Language Processing
Computer Vision
Ethics in AI
Future of AI
AI in Business
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClassroomProvider llmText={llmText}>
    <StudentContextProvider>
    <ProfessorProvider>
          <ExaminerProvider>
                  <AppRoutes />
          </ExaminerProvider>
        </ProfessorProvider>
      </StudentContextProvider>
      </ClassroomProvider>
  </React.StrictMode>
);

reportWebVitals();

