export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
}

export interface ChatSettings {
  provider: "gemini-direct";
  model: string;
  persistHistory: boolean;
  maxContextMessages: number;
}

