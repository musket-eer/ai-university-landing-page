import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Classroom App</h1>
      <Link to="/classroom">
        <button>Go to Classroom</button> {/* Button to navigate to the ClassroomPage */}
      </Link>
    </div>
  );
};

export default HomePage;
