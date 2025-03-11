import { API_BASE_URL, DEFAULT_HEADERS } from "../../apiConfig";

export const ProfessorService = {
  async generateLessonPlan(topic, duration, studentProfile, topicInfo, dispatch) {
    const payload = {
      model: "deepseek-chat",
      messages: [
        { role: "user", content: JSON.stringify({ topic, duration, studentProfile, topicInfo }) },
      ],
      temperature: 0.7,
    };

    console.log("📤 Sending request to API:", payload);

    try {
      const response = await fetch(`${API_BASE_URL}generate-lesson`, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Received lesson data:", data);

      const lessonPlan = parseLessonData(data.lessonPlan);
      dispatch({ type: "SET_LESSON_PLAN", payload: lessonPlan });

      return lessonPlan;
    } catch (error) {
      console.error("❌ Error fetching lesson plan:", error);
      return null;
    }
  },

  async processStudentMessage(activeTopicId, activeTopicTitle, studentMessage, dispatch) {
    console.log("🗣️ Raw Student Question:", studentMessage);
    console.log("📌 Raw Active Topic:", activeTopicTitle);

    if (!activeTopicId || !activeTopicTitle || !studentMessage.trim()) {
      console.error("⚠️ Missing required parameters:", {
        activeTopicId,
        activeTopicTitle,
        studentMessage
      });
      return;
    }

    // ✅ Clean and sanitize the topic title
    const cleanedTopicTitle = activeTopicTitle.replace(/\n/g, " ").replace(/\s+/g, " ").trim();

    // ✅ Ensure student message is clean
    const cleanedStudentMessage = studentMessage.trim();

    const payload = {
      activeTopic: cleanedTopicTitle,
      studentMessage: cleanedStudentMessage
    };

    console.log("📤 Sending cleaned request to API:", payload);

    try {
      const response = await fetch(`${API_BASE_URL}ask-professor`, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }

      const data = await response.json();
      const professorResponse = data.response;

      console.log("🎓 Professor responds:", professorResponse);

      // ✅ Store messages inside the active topic’s conversation array
      dispatch({
        type: "ADD_MESSAGE",
        payload: { topicId: activeTopicId, message: { sender: "student", text: cleanedStudentMessage } }
      });

      dispatch({
        type: "ADD_MESSAGE",
        payload: { topicId: activeTopicId, message: { sender: "professor", text: professorResponse } }
      });

      return professorResponse;
    } catch (error) {
      console.error("❌ Error in professor response:", error);
      return "I’m sorry, I couldn’t process your question.";
    }
  }
};
// ✅ Function to clean and structure lesson data
function parseLessonData(lessonPlan) {
  if (!lessonPlan || !lessonPlan.lessonMetadata || !lessonPlan.topics) {
    console.error("⚠️ Invalid lesson structure:", lessonPlan);
    return null;
  }

  return {
    lessonMetadata: {
      title: cleanMarkdown(lessonPlan.lessonMetadata.title),
      objectives: cleanMarkdown(lessonPlan.lessonMetadata.objectives),
      duration: lessonPlan.lessonMetadata.duration || "Unknown duration",
    },
    topics: lessonPlan.topics.map(topic => ({
      id: topic.id,
      title: cleanMarkdown(topic.title),
      content: cleanMarkdown(topic.content),
      conversation: [] // ✅ Initialize an empty conversation array
    })),
  };
}

// ✅ Function to clean Markdown (`###`, `**`, etc.)
function cleanMarkdown(text) {
  return text ? text.replace(/###/g, "").replace(/\*\*/g, "").trim() : "";
}
