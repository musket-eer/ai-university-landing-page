import { API_BASE_URL, DEFAULT_HEADERS } from "../../apiConfig";

// ✅ Load prompt file utility
const loadPrompt = async (fileName) => {
  try {
    const response = await fetch(`/prompts/${fileName}`);
    return await response.text();
  } catch (error) {
    console.error("❌ Error loading prompt file:", error);
    return null;
  }
};

export const ExaminerService = {
  /**
   * ✅ Generates an exam based on lesson details & student profile.
   */
  async generateExam(lessonMetadata, studentProfile) {
    const prompt = await loadPrompt("examGenerationPrompt.txt");
    if (!prompt) {
      console.error("⚠️ Missing or failed to load exam generation prompt.");
      return null;
    }

    const payload = {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: prompt },
        { 
          role: "user", 
          content: JSON.stringify({ lessonMetadata, studentProfile }) 
        }
      ],
      temperature: 0.7
    };

    try {
      const response = await fetch(`${API_BASE_URL}generate-exam`, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("📜 Generated Exam:", data);
      return parseExamData(data.questions);
    } catch (error) {
      console.error("❌ Error generating exam:", error);
      return null;
    }
  },

  /**
   * ✅ Grades student exam responses based on correctness.
   */
  async gradeExam(studentAnswers, examQuestions) {
    const prompt = await loadPrompt("examGradingPrompt.txt");
    if (!prompt) {
      console.error("⚠️ Missing or failed to load grading prompt.");
      return null;
    }

    const payload = {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: prompt },
        { 
          role: "user", 
          content: JSON.stringify({ studentAnswers, examQuestions }) 
        }
      ],
      temperature: 0.7
    };

    try {
      const response = await fetch(`${API_BASE_URL}grade-exam`, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("📊 Exam Grading Result:", data);
      return data;
    } catch (error) {
      console.error("❌ Error grading exam:", error);
      return null;
    }
  },

  /**
   * ✅ Provides hints or rephrases a question for a student.
   */
  async assistStudent(studentQuery, currentQuestion) {
    const prompt = await loadPrompt("examHintPrompt.txt");
    if (!prompt) {
      console.error("⚠️ Missing or failed to load hint prompt.");
      return "I'm not sure how to assist right now.";
    }

    const payload = {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: prompt },
        { 
          role: "user", 
          content: JSON.stringify({ studentQuery, currentQuestion }) 
        }
      ],
      temperature: 0.7
    };

    try {
      const response = await fetch(`${API_BASE_URL}exam-hint`, {
        method: "POST",
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("💡 Student Assistance:", data.hint);
      return data.hint;
    } catch (error) {
      console.error("❌ Error fetching exam assistance:", error);
      return "I'm unable to assist at the moment.";
    }
  }
};

/**
 * ✅ Parses raw exam data from LLM to structured format.
 */
function parseExamData(questions) {
  if (!questions || !Array.isArray(questions)) {
    console.error("⚠️ Invalid exam data:", questions);
    return [];
  }

  return questions.map((q, index) => ({
    id: `q-${index + 1}`,
    type: q.type || "mcq",
    question: q.question_text,
    options: q.options || [],
    answer: q.answer || ""
  }));
}
