const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", methods: ["POST"] }));

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY || "sk-e7aaaad4533949f8bf020a4ddb35bc31",
});

// ✅ 1. Generate Lesson Plan with Metadata & Ordered Topics
app.post("/generate-lesson", async (req, res) => {
  console.log(req.body.messages);
  try {
    // const { topic, duration } = req.body;
    const duration = "40";
    const topic = "NewTons Law";
    
    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ error: "Topic is required" });
    }

    // Request AI to generate structured lesson plan
    const messages = [
      {
        role: "system",
        content: "You are a professor. Create a structured lesson with metadata and 10 ordered topics."
      },
      {
        role: "user",
        content: `Create a structured ${duration}-minute lesson on "${topic}". 
        - Provide **lessonMetadata** (title, objectives, duration).
        - List **10 main ideas** as topics, arranged from basic to advanced.
        - Each topic should have a short **explanation**.
        - Ensure that topics flow logically from simple to complex.`,
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages,
    });

    const lessonText = completion.choices[0]?.message?.content || "No lesson generated.";
    const structuredLesson = parseLessonText(lessonText);
    console.log(structuredLesson);

    
    res.json({ lessonPlan: structuredLesson });
  } catch (error) {
    console.error("❌ Error generating lesson:", error.response?.data || error.message);
    res.status(500).json({ error: "An error occurred while generating the lesson." });
  }
});

// ✅ 2. Interactive Q&A (Student asks about the active topic)
app.post("/ask-professor", async (req, res) => {
  try {
    // const { activeTopic, studentQuestion } = req.body;
    const activeTopic = req.body.activeTopic;
    const studentQuestion = req.body.studentMessage;
    console.log(studentQuestion);

    if (!activeTopic || !studentQuestion) {
      return res.status(400).json({ error: "Active topic and student question are required." });
    }

    // Request AI to provide deeper explanations about the active topic
    const messages = [
      { role: "system", content: "You are a professor answering student questions." },
      { role: "user", content: `The student is currently learning about: "${activeTopic}".\n\nStudent Question: ${studentQuestion}` }
    ];

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages,
    });

    const professorResponse = completion.choices[0]?.message?.content || "I don't know the answer.";

    res.json({ response: professorResponse });
  } catch (error) {
    console.error("❌ Error in Q&A:", error.response?.data || error.message);
    res.status(500).json({ error: "An error occurred during the Q&A session." });
  }
});

// ✅ Function to parse AI response into structured lesson format
function parseLessonText(text) {
  const sections = text.split("\n\n");
  return {
    lessonMetadata: {
      title: sections[0] || "Untitled Lesson",
      objectives: sections[1] || "No objectives provided.",
      duration: "40 minutes"
    },
    topics: sections.slice(2).map((section, index) => ({
      id: index,
      title: section.split(":")[0]?.trim() || "Untitled Topic",
      content: section.split(":")[1]?.trim() || "No content available.",
      messages: []
    }))
  };
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
