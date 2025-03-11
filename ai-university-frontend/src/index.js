import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Import Routes
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ExaminerProvider } from './components/Examiner/ExaminerContext';
import { StudentContextProvider } from './components/Student/StudentContext';
import { ProfessorProvider } from './components/Professor/ProfessorContext';
import { TAProvider } from './components/TA/TAContext';
import { ActiveModeProvider } from './contexts/ActiveModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ActiveModeProvider> 
    <React.StrictMode>
      <StudentContextProvider>
        <ProfessorProvider>
          <ExaminerProvider>
            <TAProvider>
              <AppRoutes />
            </TAProvider>
          </ExaminerProvider>
        </ProfessorProvider>
      </StudentContextProvider>
    </React.StrictMode>
    </ActiveModeProvider> 

);

reportWebVitals();
