import { getGenerativeModel } from "firebase/ai";
import type { AiChatProvider } from "./provider.types";
import type { ChatMessage } from "../../types/chat";
import { firebaseAI } from "../firebase/client";
import { JWT_TUTOR_SYSTEM_PROMPT } from "./systemPrompt";
import { buildJwtTutorPrompt } from "./promptBuilder";

export class FirebaseAiLogicProvider implements AiChatProvider {
  async ask(userInput: string, history: ChatMessage[]): Promise<string> {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY) {
      return "Bạn chưa cấu hình đầy đủ Firebase/App Check. Cần NEXT_PUBLIC_FIREBASE_* và NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY trong .env.local.";
    }

    const model = getGenerativeModel(firebaseAI, {
      model: process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.5-flash-lite",
    });

    const prompt = `
${JWT_TUTOR_SYSTEM_PROMPT}

${buildJwtTutorPrompt(userInput, history)}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text?.trim() || "Xin lỗi, mình chưa tạo được câu trả lời phù hợp.";
  }
}