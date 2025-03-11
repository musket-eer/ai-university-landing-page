import { DEEPSEEK_API_URL, DEFAULT_HEADERS } from "./apiConfig";

export const TAService = {
  async provideHint(question) {
    const basePrompt = `You are an AI teaching assistant. Provide a hint for this question, without giving away the full answer. Return structured JSON with hint_text.`;

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

  async simplifyConcept(concept) {
    const basePrompt = `You are an AI tutor. Explain ${concept} in simple terms for a beginner student. Return structured JSON with explanation.`;

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
