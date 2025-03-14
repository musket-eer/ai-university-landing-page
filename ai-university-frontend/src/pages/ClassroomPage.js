import React from "react";
import { ClassroomProvider } from "../components/data/ClassroomContext";
import Classroom from "../components/data/Classroom"; // Only renders Classroom
import NavBar from "../components/ui/NavBar";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ClassroomPage.css";

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

const ClassroomPage = () => {
  return (
    <ClassroomProvider llmText={llmText}>
      <Container fluid className="classroom-container">
        <NavBar />
        <Classroom />
      </Container>
    </ClassroomProvider>
  );
};

export default ClassroomPage;
