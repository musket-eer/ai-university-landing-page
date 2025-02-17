import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AIUniversityLanding from '../pages/landingPage';

function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/index" replace />} />
        <Route path="/index" element={<AIUniversityLanding />} />
      </Routes>
  );
}

export default AppRoutes;