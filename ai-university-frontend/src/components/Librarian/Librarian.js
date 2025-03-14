import React from "react";
import { useClassroom } from "../data/ClassroomContext";
import ChatPad from "../data/ChatPad";

const Librarian = () => {
  const { activeActivity } = useClassroom();

  // ✅ Ensure component only renders when leader is "Librarian"
  if (!activeActivity || activeActivity.leader !== "Librarian") {
    return null;
  }

  return (
    <div className="librarian">
      <h3>Librarian Assistance</h3>

      {/* ✅ Display reading material if available */}
      {activeActivity.content ? (
        <>
          <p><strong>Reading Material:</strong></p>
          <p>{activeActivity.content}</p>
          <button onClick={() => alert("Opening reading material...")}>Open Material</button>
        </>
      ) : (
        <p>No reading material available.</p>
      )}
    </div>
  );
};

export default Librarian;
