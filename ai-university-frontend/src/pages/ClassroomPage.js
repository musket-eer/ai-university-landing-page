import React from 'react';
import { ActiveModeProvider } from '../contexts/ActiveModeContext';
import Student from '../components/Student/Student';
import Professor from '../components/Professor/Professor';
import TA from '../components/TA/TA';
import Examiner from '../components/Examiner/Examiner';
import NavBar from '../components/ui/NavBar';
import './ClassroomPage.css';

const ClassroomPage = () => {
    console.log(Examiner); // ✅ Should log a function, not undefined!

  return (
    <ActiveModeProvider>
      <div className="classroom-container">
        {/* Navbar for selecting communication target */}
        <NavBar />

        <div className="classroom-main">
          <div className="professor-container">
            <Professor />
          </div>

          <div className="ta-container">
            <TA />
          </div>

          <div className="examiner-container">
            <Examiner />
          </div>

          <div className="student-container">
            <Student />
          </div>
        </div>
      </div>
    </ActiveModeProvider>
  );
};

export default ClassroomPage;
