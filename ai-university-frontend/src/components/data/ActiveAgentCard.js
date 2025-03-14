import React from "react";
import Professor from "../Professor/Professor";
import Exam from "./Exam";
import Library from "./Library";

const ActiveAgentCard = ({ componentType, props }) => {
  const renderComponent = () => {
    switch (componentType) {
      case "Professor":
        return <Professor {...props} />;
      case "Quiz":
        return <Exam {...props} />;
      case "Library":
        return <Library {...props} />;
      default:
        return <p>Unknown Component</p>;
    }
  };

  return <div className="active-component-card">{renderComponent()}</div>;
};

export default ActiveAgentCard;
