export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

export interface ChatSettings {
  provider: "firebase-ai-logic" | "gemini-direct";
  model: string;
  persistHistory: boolean;
  maxContextMessages: number;
}

