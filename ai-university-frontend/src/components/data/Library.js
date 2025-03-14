import React from "react";
import Resource from "./Resource";

const Library = () => {
  const resources = [
    { title: "Introduction to AI", mediaLink: "https://www.example.com/ai.pdf" },
    { title: "Neural Networks Explained", mediaLink: "https://www.youtube.com/embed/aircAruvnKk" },
    { title: "Blockchain Fundamentals", mediaLink: "https://www.example.com/blockchain.pdf" },
    { title: "Machine Learning Basics", mediaLink: "https://www.youtube.com/embed/Gv9_4yMHFhI" },
  ];

  return (
    <div className="library">
      <h2>Library Resources</h2>
      {resources.map((res, index) => (
        <Resource key={index} title={res.title} mediaLink={res.mediaLink} />
      ))}
    </div>
  );
};

export default Library;
