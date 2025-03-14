import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useClassroom } from "../data/ClassroomContext";

const Librarian = () => {
  const { activeActivity, addMessage } = useClassroom();
  const prevMessageCount = useRef(activeActivity?.messages?.length || 0);

  // ✅ Memoize responses so they don't cause re-renders
  const responses = useMemo(() => [
    "Let me find the best research materials for you.",
    "I recommend checking our latest journal articles.",
    "This book might help with your topic.",
    "You can find more resources in the digital library.",
    "Would you like references for this subject?"
  ], []);

  // ✅ Use useCallback to prevent unnecessary re-renders
  const sendResponse = useCallback(() => {
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const librarianMessage = {
      sender: "Librarian",
      text: randomResponse,
      timestamp: new Date().toLocaleTimeString(),
    };
    addMessage(librarianMessage);
  }, [addMessage, responses]); // ✅ Now includes `responses`

  // ✅ Listen for new student messages and respond
  useEffect(() => {
    if (!activeActivity || activeActivity.leader !== "Librarian") return;

    const currentMessageCount = activeActivity?.messages?.length || 0;

    if (currentMessageCount > prevMessageCount.current) {
      const lastMessage = activeActivity?.messages?.[currentMessageCount - 1];

      if (lastMessage && lastMessage.sender !== "Librarian") {
        setTimeout(() => {
          sendResponse();
        }, 1000);
      }
    }

    prevMessageCount.current = currentMessageCount;
  }, [activeActivity, sendResponse]); // ✅ Now completely correct!

  // ✅ Ensure hooks are always called before returning
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
