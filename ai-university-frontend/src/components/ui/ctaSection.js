import React from 'react';
import './ctaSection.css';

const CTASection = ({ title, description, buttonText, buttonLink }) => {
  const handleButtonClick = () => {
    // Redirect to the provided buttonLink
    window.location.href = buttonLink;
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f9f9f9' }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <button
        onClick={handleButtonClick}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default CTASection;