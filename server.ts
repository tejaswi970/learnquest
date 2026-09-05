import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI client safely
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  const hasAiKey = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
  res.json({
    status: "ok",
    app: "LearnQuest AI",
    aiEnabled: hasAiKey,
    timestamp: new Date().toISOString()
  });
});

// AI Question & Challenge Generator
app.post("/api/generate-ai-challenge", async (req: Request, res: Response) => {
  try {
    const { grade, subject, topic, difficulty = "Intermediate", count = 4, activityType = "quiz" } = req.body;

    const ai = getAiClient();
    if (!ai) {
      return res.json({
        success: false,
        fallback: true,
        reason: "no_api_key",
        message: "No Gemini API key provided. Using built-in rule-based learning bank."
      });
    }

    const prompt = `You are an expert curriculum developer and pedagogical educator for Indian school education (CBSE, ICSE, and State Boards like AP & Telangana) for ${grade} students in subject "${subject}".
Generate an engaging, age-appropriate educational challenge for the syllabus topic "${topic}" at "${difficulty}" difficulty level.
Activity type requested: "${activityType}".
Keep questions aligned with Indian curriculum standards (e.g. Rupee currency symbols, SI metric units, Indian context and standard pedagogical terminology).
Generate exactly ${Math.min(Number(count) || 4, 8)} questions or interactive items.

Return ONLY a valid JSON object matching this schema without markdown fences:
{
  "topic": "${topic}",
  "subject": "${subject}",
  "grade": "${grade}",
  "difficulty": "${difficulty}",
  "activityType": "${activityType}",
  "learningSummary": "A friendly 1-2 sentence overview of what the student will practice",
  "questions": [
    {
      "id": "q1",
      "question": "The question text or challenge prompt",
      "type": "mcq", // or "true_false", "matching"
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "The exact matching correct option text",
      "explanation": "Clear, encouraging child-friendly explanation for why this is correct",
      "hint": "Gentle guiding hint without giving away the full answer",
      "xpReward": 25
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedData = JSON.parse(cleanedText);

    return res.json({
      success: true,
      fallback: false,
      data: parsedData
    });
  } catch (error: any) {
    console.warn("AI generation failed, returning fallback flag:", error?.message || error);
    return res.json({
      success: false,
      fallback: true,
      reason: "error",
      message: "AI service temporarily unavailable. Seamlessly activating built-in verified questions."
    });
  }
});

// AI Learning Recommendations
app.post("/api/ai-recommendations", async (req: Request, res: Response) => {
  try {
    const { grade, weakTopics, strongTopics, averageScore } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.json({
        success: false,
        fallback: true,
        reason: "no_api_key"
      });
    }

    const prompt = `For a ${grade} student with average quiz score ${averageScore}%,
Strong areas: ${(strongTopics || []).join(", ") || "General knowledge"},
Needs review in: ${(weakTopics || []).join(", ") || "None yet identified"}.
Provide 3 concise, highly encouraging, action-oriented gamified quest recommendations.
Return ONLY a valid JSON array of objects:
[
  {
    "title": "Quest name",
    "topic": "Topic name",
    "reason": "Why this quest will help",
    "recommendedDifficulty": "Explorer" | "Challenger" | "Master",
    "xpBonus": 50
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.6,
      }
    });

    const parsed = JSON.parse(response.text?.replace(/```json/g, "").replace(/```/g, "").trim() || "[]");
    return res.json({ success: true, recommendations: parsed });
  } catch (err: any) {
    return res.json({ success: false, fallback: true });
  }
});

// Setup Vite development middleware or static production serving
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LearnQuest AI server running on http://0.0.0.0:${PORT}`);
  });
}

start();
