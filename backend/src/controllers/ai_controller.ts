import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

class AiController {
  async generatePostCaption(req: Request, res: Response) {
    try {
      const { content } = req.body;

      if (!content) {
        return res.status(400).json({ message: "Content is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ message: "Gemini API key is missing" });
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        You are helping users write short, engaging captions for a social app called StoryBox.
        Create one short caption based on this post content:
        "${content}"

        Rules:
        - Return only the caption
        - Keep it under 25 words
        - Make it friendly and natural
      `;

      const result = await model.generateContent(prompt);
      const caption = result.response.text();

      res.status(200).json({ caption });
    } catch (err) {
  console.log("Gemini error:", err);

  const { content } = req.body;

  const fallbackCaption = `Sharing a new StoryBox moment: ${content}`;

  res.status(200).json({
    caption: fallbackCaption,
    source: "fallback",
  });
}
  }
}

export default new AiController();