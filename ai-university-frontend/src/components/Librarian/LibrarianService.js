import { API_BASE_URL, DEFAULT_HEADERS } from "../../apiConfig";

// ✅ Utility function to load the Librarian's prompt from a file
const loadPrompt = async (fileName) => {
  try {
    const response = await fetch(`/prompts/${fileName}`);
    return await response.text();
  } catch (error) {
    console.error("❌ Error loading prompt file:", error);
    return null;
  }
};

export const LibrarianService = {
  // ✅ Generate learning materials based on the topic & student preferences
  async generateLearningResources(topic, studentProfile, dispatch) {
    const prompt = await loadPrompt("librarianResourcesPrompt.txt");
    if (!prompt) {
      console.error("⚠️ Missing or failed to load librarian prompt.");
      return null;
    }

    const payload = {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: JSON.stringify({ topic, studentProfile }) },
      ],
      temperature: 0.7,
    };

    try {
      const response = await fetch(`${API_BASE_URL}generate-resources`, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📚 Learning Resources From Librarian:", data);

      const parsedResources = parseResourceData(data.resources);
      dispatch({ type: "SET_LEARNING_RESOURCES", payload: parsedResources });

      return parsedResources;
    } catch (error) {
      console.error("❌ Error fetching learning resources:", error);
      return null;
    }
  },

  // ✅ Answer a student's research-related question
  async processStudentMessage(activeTopicId, studentMessage, dispatch) {
    const prompt = await loadPrompt("librarianAnswersPrompt.txt"); // ✅ Use prompt for responses
    if (!prompt) {
      console.error("⚠️ Missing or failed to load librarian response prompt.");
      return "I’m sorry, I couldn’t process your request.";
    }

    console.log("📖 Raw Student Inquiry:", studentMessage);

    if (!studentMessage.trim()) {
      console.error("⚠️ Empty student message.");
      return;
    }

    const cleanedStudentMessage = studentMessage.trim();

    const payload = {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: JSON.stringify({ question: cleanedStudentMessage }) }
      ],
      temperature: 0.7,
    };

    console.log("📤 Sending Librarian request to API:", payload);

    try {
      const response = await fetch(`${API_BASE_URL}ask-librarian`, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }

      const data = await response.json();
      const librarianResponse = data.response;

      console.log("📚 Librarian responds:", librarianResponse);

      // ✅ Store conversation history
      dispatch({
        type: "ADD_MESSAGE",
        payload: { topicId: activeTopicId, message: { sender: "student", text: cleanedStudentMessage } }
      });

      dispatch({
        type: "ADD_MESSAGE",
        payload: { topicId: activeTopicId, message: { sender: "librarian", text: librarianResponse } }
      });

      return librarianResponse;
    } catch (error) {
      console.error("❌ Error in librarian response:", error);
      return "I’m sorry, I couldn’t process your request.";
    }
  }
};

// ✅ Function to clean and structure learning resource data
function parseResourceData(resources) {
  if (!Array.isArray(resources) || resources.length === 0) {
    console.error("⚠️ Invalid resource structure:", resources);
    return [];
  }

  return resources.map((res, index) => ({
    id: `resource-${index + 1}`,
    title: cleanMarkdown(res.title),
    url: res.url,
    type: res.type, // "video", "pdf", "link"
  }));
}

// ✅ Function to clean Markdown (`###`, `**`, etc.)
function cleanMarkdown(text) {
  return text ? text.replace(/###/g, "").replace(/\*\*/g, "").trim() : "";
}
