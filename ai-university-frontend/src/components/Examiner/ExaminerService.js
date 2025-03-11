import { DEEPSEEK_API_URL, DEFAULT_HEADERS } from "./apiConfig";

export const ExaminerService = {
  async gradeExam(studentAnswers) {
    const basePrompt = `You are an AI examiner. Grade the student's answers based on correctness and provide feedback. Return a structured JSON with question_id, score (0-100), and feedback.`;

    const payload = {
      model: "deepseek-chat", 
      messages: [
        { role: "system", content: basePrompt },
        { role: "user", content: JSON.stringify(studentAnswers) }
      ],
      temperature: 0.7
    };

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(payload)
    });

    return response.json();
  },

  async generateExam(topic) {
    const basePrompt = `You are an AI examiner. Generate a set of 5 exam questions on ${topic}. Return JSON format with question_id and question_text.`;

    const payload = {
      model: "deepseek-chat", 
      messages: [{ role: "system", content: basePrompt }],
      temperature: 0.7
    };

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(payload)
    });

    return response.json();
  }
};
