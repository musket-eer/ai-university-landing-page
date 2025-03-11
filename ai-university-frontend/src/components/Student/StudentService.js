import { DEEPSEEK_API_URL, DEFAULT_HEADERS } from "../../apiConfig";

export const StudentService = {
  async askQuestion(question) {
    const basePrompt = `You are an AI tutor. Answer student questions clearly and concisely. Provide a structured JSON with a direct answer.`;

    const payload = {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: basePrompt },
        { role: "user", content: question }
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

  async getStudyTips(topic) {
    const basePrompt = `You are an AI study coach. Provide study tips for mastering ${topic}. Return structured JSON with key study strategies.`;

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
