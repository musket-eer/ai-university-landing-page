import React from "react";
import { useClassroom } from "../data/ClassroomContext";

const Professor = () => {
  const { activeActivity } = useClassroom();
  console.log(activeActivity)
  const isActive = activeActivity.type === "Professor";

  return (
    <div className={`professor ${isActive ? "active" : "inactive"}`}>
      <h3>Professor</h3>
      {isActive ? <p>Teaching: {activeActivity.content}</p> : <p>Waiting for turn...</p>}
    </div>
  );
};

export default Professor;
