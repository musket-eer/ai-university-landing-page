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
  try {
    const duration = "40";
    const topic = "Newton's Law";
    const messages = req.body.messages || [];

    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ error: "Topic is required." });
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required and cannot be empty." });
    }

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages,
    });

    if (!completion || !completion.choices || completion.choices.length === 0) {
      console.error("❌ DeepSeek API returned an invalid response:", completion);
      return res.status(500).json({ error: "Invalid response from DeepSeek API." });
    }

    const lessonText = completion.choices[0]?.message?.content;
    if (!lessonText) {
      return res.status(500).json({ error: "DeepSeek API returned an empty response." });
    }

    let structuredLesson;
    try {
      structuredLesson = parseLessonText(lessonText);
      console.log(structuredLesson);
    } catch (parseError) {
      console.error("❌ Error parsing lesson text:", parseError);
      return res.status(500).json({ error: "Failed to parse lesson structure." });
    }
    res.json({ lessonPlan: structuredLesson });

  } catch (error) {
    console.error("❌ Error generating lesson:", error.response?.data || error.message);
    res.status(500).json({ error: "An error occurred while generating the lesson." });
  }
});


// ✅ Function to parse AI response into structured lesson format
function parseLessonText(text) {
  const sections = text.split("\n");

  console.log("Sections: ", sections)
  return {
    lessonMetadata: {
      title: sections[0] || "Untitled Lesson",
      objective_1: sections[1] || "No objectives provided.",
      objective_2: sections[2] || "No objectives provided.",
      objective_3: sections[3] || "No objectives provided.",
      objective_4: sections[4] || "No objectives provided.",
      duration: sections[5] || "Beginner",
      difficulty: sections[6] || "40 minutes"
    },
    activities: sections.slice(8).map((section, index) => {
      const parts = section.split("|").map(part => part.trim()); // ✅ Split & Trim

      return {
        id: parts[0] || `activity-${index}`, // ✅ Extract ID or use fallback
        leader: parts[1] || "Unknown Leader", // ✅ Extract Leader
        title: parts[2] || "Untitled Topic", // ✅ Extract Title
        messages: [] // ✅ Initialize an empty conversation array
      };
    })
  };
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
