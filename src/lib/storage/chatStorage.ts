import type { ChatMessage, ChatSettings } from "../../types/chat";

const CHAT_KEY = "jwt-tutor-chat:v1";
const SETTINGS_KEY = "jwt-tutor-settings:v1";
const DRAFT_KEY = "jwt-tutor-draft:v1";

export const chatStorage = {
  loadMessages(): ChatMessage[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(CHAT_KEY);
      return raw ? (JSON.parse(raw) as ChatMessage[]) : [];
    } catch {
      return [];
    }
  },

  saveMessages(messages: ChatMessage[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  },

  clearMessages() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CHAT_KEY);
  },

  loadSettings(): ChatSettings | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      return raw ? (JSON.parse(raw) as ChatSettings) : null;
    } catch {
      return null;
    }
  },

  saveSettings(settings: ChatSettings) {
    if (typeof window === "undefined") return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  loadDraft(): string {
    if (typeof window === "undefined") return "";
    return sessionStorage.getItem(DRAFT_KEY) || "";
  },

  saveDraft(value: string) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(DRAFT_KEY, value);
  },

  clearDraft() {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(DRAFT_KEY);
  },
};

