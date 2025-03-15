import React, { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { useClassroom } from "../data/ClassroomContext";
import Resource from "../data/Resource"; // ✅ Import the Resource component

const Librarian = () => {
  const { activeActivity, addMessage } = useClassroom();
  const prevMessageCount = useRef(activeActivity?.messages?.length || 0);
  const [resources, setResources] = useState([]); // ✅ Store learning resources
  const [loading, setLoading] = useState(false); // ✅ Loading state for fetching

  // ✅ Mock AI-generated resources
  const mockResources = useMemo(() => [
    { title: "Intro to AI", mediaLink: "https://www.youtube.com/embed/aircAruvnKk" },
    { title: "Machine Learning Guide", mediaLink: "https://example.com/ml-guide.pdf" },
    { title: "Deep Learning Article", mediaLink: "https://example.com/deep-learning" }
  ], []);

  // ✅ Simulate AI Response with Mock Resources
  const generateMockResources = useCallback(() => {
    console.log("🔄 Generating mock resources..."); // Debugging
    setLoading(true);
    setTimeout(() => {
      console.log("✅ Mock resources set:", mockResources); // Debugging
 
      setResources(mockResources); // ✅ Use the mock data
      setLoading(false);
    }, 1000);
  }, [mockResources]);

  // ✅ Automatically trigger resource loading on mount
  useEffect(() => {
    generateMockResources();
  }, [generateMockResources]);

  // ✅ AI-like auto-response (mocked)
  const sendResponse = useCallback(() => {
    const randomResponse = "Here are some useful resources for you!";
    const librarianMessage = {
      sender: "Librarian",
      text: randomResponse,
      timestamp: new Date().toLocaleTimeString(),
    };
    addMessage(librarianMessage);
  }, [addMessage]);

  // ✅ Listen for new student messages and respond
  useEffect(() => {
    if (!activeActivity || activeActivity.leader !== "Librarian") return;

    console.log("Active Activity:", activeActivity); // ✅ Debugging

    const currentMessageCount = activeActivity?.messages?.length || 0;

    if (currentMessageCount > prevMessageCount.current) {
      const lastMessage = activeActivity?.messages?.[currentMessageCount - 1];

      if (lastMessage && lastMessage.sender !== "Librarian") {
        setTimeout(() => {
          sendResponse();
          generateMockResources();
        }, 1000);
      }
    }

    prevMessageCount.current = currentMessageCount;
  }, [activeActivity, sendResponse, generateMockResources]);

  // ✅ Ensure hooks are always called before returning
  if (!activeActivity || activeActivity.leader !== "Librarian") {
    return null;
  }

  return (
    <div className="librarian">
      <h3>Librarian Assistance</h3>
  
      {/* ✅ AI-generated Learning Materials */}
      <div className="learning-resources">
        <h4>Recommended Learning Resources</h4>
  
        {loading ? (
          <p>Loading materials...</p>
        ) : resources.length > 0 ? (
          <ul>
            {resources.map((res, index) => {
              console.log("🔍 Rendering Resource:", res); // Debugging output
              
              // Ensure `res` has expected properties
              if (!res.title || !res.mediaLink) {
                console.error("❌ Invalid Resource Object:", res);
                return null; // Skip invalid resources
              }
  
              return (
                <li key={index}>
                  <Resource title={res.title} mediaLink={res.mediaLink} />
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No resources available yet.</p>
        )}
      </div>
    </div>
  );
}  

export default Librarian;
