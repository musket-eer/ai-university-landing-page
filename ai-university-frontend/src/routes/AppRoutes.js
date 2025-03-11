import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ClassroomPage from '../pages/ClassroomPage';
import AIUniversityLanding from '../pages/landingPage';  // Import Landing Page

function AppRoutes() {
  return (
    <Router> {/* Ensure Router wraps everything */}
      <Routes>
        {/* Redirect "/" to "/index" */}
        <Route path="/" element={<Navigate to="/index" replace />} />

        {/* Homepage Route */}
        <Route path="/index" element={<AIUniversityLanding />} />

        {/* Classroom Page Route */}
        <Route path="/classroom" element={<ClassroomPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
