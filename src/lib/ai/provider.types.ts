import type { ChatMessage } from "../../types/chat";

export interface AiChatProvider {
  ask(userInput: string, history: ChatMessage[]): Promise<string>;
}

