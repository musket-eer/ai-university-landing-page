import React from "react";
import { useNavigate } from "react-router-dom";
import { useClassroom } from "../data/ClassroomContext";
import Professor from "../Professor/Professor";
import Examiner from "../Examiner/Examiner";
import Librarian from "../Librarian/Librarian";
import ChatPad from "./ChatPad";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import "./Classroom.css";

const Classroom = () => {
  const { activeActivity, nextActivity, prevActivity, activities, activeActivityIndex } = useClassroom();
  const navigate = useNavigate();

  // ✅ Handle missing or undefined activity
  if (!activeActivity) {
    return (
      <Container className="classroom">
        <h2 className="classroom-title">Classroom Session</h2>
        <p>Loading Lesson Materials. Please wait.</p>
        <Button onClick={() => navigate("/dashboard")} className="end-session-button">
          Go to Dashboard
        </Button>
      </Container>
    );
  }

  // ✅ Determine if the current activity is the last one
  const isLastActivity = activeActivityIndex === activities.length - 1;

  // ✅ Render the appropriate component for the activity type
  const renderResponsibleComponents = () => {
    switch (activities[activeActivityIndex].leader) {
      case "Professor":
        return <Professor />;
      case "Examiner":
        return <Examiner />;
      case "Librarian":
        return <Librarian />;
      default:
        return <p>No responsible component found.</p>;
    }
  };

  return (
    <Container className="classroom">
      <h2 className="classroom-title">Classroom Session</h2>

      <Row>
        {/* Active Activity Card */}
        <Col md={6}>
          <Card className="active-component-card">
            <Card.Body>
              <h3 className="component-title">{activeActivity.title || "Untitled Activity"}</h3>
              <p className="component-content">{activeActivity.content || "No content available."}</p>
              <div className="component-content">{renderResponsibleComponents()}</div>
            </Card.Body>
          </Card>
        </Col>

        {/* ChatPad Card */}
        <Col md={6}>
          <Card className="chat-card">
            <Card.Body>
              <ChatPad participant={activeActivity.type} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Navigation Controls */}
      <Row className="navigation-controls">
        <Col>
          <Button onClick={prevActivity} disabled={activeActivityIndex === 0} className="nav-button">
            Previous
          </Button>
          {!isLastActivity ? (
            <Button onClick={nextActivity} className="nav-button">
              Next
            </Button>
          ) : (
            <Button onClick={() => navigate("/dashboard")} className="end-session-button">
              End Classroom Session
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Classroom;
