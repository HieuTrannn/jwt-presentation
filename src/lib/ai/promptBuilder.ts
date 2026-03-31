import type { ChatMessage } from "../../types/chat";
import { getRelevantKnowledge } from "./retrieval";

export function buildJwtTutorPrompt(userInput: string, history: ChatMessage[]) {
  const relevant = getRelevantKnowledge(userInput, 4);

  const knowledgeText = relevant
    .map((item, index) => `(${index + 1}) ${item.title}: ${item.content}`)
    .join("\n\n");

  const trimmedHistory = history.slice(-6);
  const historyText = trimmedHistory
    .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
    .join("\n");

  return `
Use the local course knowledge below as the first source of truth.
If the user's question goes slightly beyond it, you may explain with standard JWT best practice, but say that it is an extension beyond the chapter.

LOCAL COURSE KNOWLEDGE:
${knowledgeText}

RECENT CONVERSATION:
${historyText || "(empty)"}

USER QUESTION:
${userInput}
`;
}

