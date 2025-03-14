import { API_BASE_URL, DEFAULT_HEADERS } from "../../apiConfig";

// ✅ Utility function to load the prompt from a file
const loadPrompt = async (fileName) => {
  try {
    const response = await fetch(`/prompts/${fileName}`);
    return await response.text();
  } catch (error) {
    console.error("❌ Error loading prompt file:", error);
    return null;
  }
};

export const ProfessorService = {
  async generateLessonPlan(topic, duration, studentProfile, topicInfo, dispatch) {
    const prompt = await loadPrompt("lessonSequencePrompt.txt");
    if (!prompt) {
      console.error("⚠️ Missing or failed to load professor prompt.");
      return null;
    }

    const payload = {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: prompt }, // ✅ Include the loaded prompt
        { role: "user", content: JSON.stringify({ topic, duration, studentProfile, topicInfo }) },
      ],
      temperature: 0.7,
    };

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
      console.log("Lesson Data From Prof:", data)
      const lessonPlan = parseLessonData(data.lessonPlan);
      dispatch({ type: "SET_LESSON_PLAN", payload: lessonPlan });

      return data;
    } catch (error) {
      console.error("❌ Error fetching lesson plan:", error);
      return null;
    }
  },

  async processStudentMessage(activeTopicId, activeTopicTitle, studentMessage, dispatch) {
    const prompt = await loadPrompt("professorAnswersPrompt.txt"); // ✅ Use prompt for responses
    if (!prompt) {
      console.error("⚠️ Missing or failed to load professor response prompt.");
      return "I’m sorry, I couldn’t process your question.";
    }

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

    const cleanedTopicTitle = activeTopicTitle.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    const cleanedStudentMessage = studentMessage.trim();

    const payload = {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: prompt }, // ✅ Include the response prompt
        { role: "user", content: JSON.stringify({ activeTopic: cleanedTopicTitle, studentMessage: cleanedStudentMessage }) }
      ],
      temperature: 0.7,
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

      // ✅ Store messages in conversation history
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

  // Define a cycle of leaders to assign roles dynamically
  const leaders = ["Professor", "TA", "Examiner", "Librarian"];
  
  return {
    lessonMetadata: {
      title: cleanMarkdown(lessonPlan.lessonMetadata.title),
      objectives: cleanMarkdown(lessonPlan.lessonMetadata.objectives),
      duration: lessonPlan.lessonMetadata.duration || "Unknown duration",
    },
    activities: lessonPlan.topics.map((topic, index) => ({
      id: `activity-${index + 1}`,
      leader: leaders[index % leaders.length], // Cycle through leaders
      title: cleanMarkdown(topic.title),
      content: cleanMarkdown(topic.content),
      messages: [], // ✅ Initialize an empty conversation array
    })),
  };
}

// ✅ Function to clean Markdown (`###`, `**`, etc.)
function cleanMarkdown(text) {
  return text ? text.replace(/###/g, "").replace(/\*\*/g, "").trim() : "";
}
