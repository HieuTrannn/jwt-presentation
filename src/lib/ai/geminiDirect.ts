import { GoogleGenAI } from "@google/genai";
import type { AiChatProvider } from "./provider.types";
import type { ChatMessage } from "../../types/chat";
import { JWT_TUTOR_SYSTEM_PROMPT } from "./systemPrompt";
import { buildJwtTutorPrompt } from "./promptBuilder";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

export class GeminiDirectProvider implements AiChatProvider {
  async ask(userInput: string, history: ChatMessage[]): Promise<string> {
    if (!apiKey) {
      return "Bạn chưa cấu hình NEXT_PUBLIC_GEMINI_API_KEY. Hãy thêm key demo vào file .env.local (chỉ dùng cho mục đích học tập).";
    }

    const prompt = buildJwtTutorPrompt(userInput, history);

    const response = await ai.models.generateContent({
      model: process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${JWT_TUTOR_SYSTEM_PROMPT}\n\n${prompt}`,
            },
          ],
        },
      ],
    });

    const text = response.text;
    return text?.trim() || "Xin lỗi, mình chưa tạo được câu trả lời phù hợp.";
  }
}

