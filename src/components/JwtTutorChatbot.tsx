"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChatMessage, ChatSettings } from "../types/chat";
import { chatStorage } from "../lib/storage/chatStorage";
import { GeminiDirectProvider } from "../lib/ai/geminiDirect";

const starterQuestions = [
  "JWT là gì và hoạt động như thế nào?",
  "Phân biệt authentication và authorization.",
  "Header, Payload, Signature khác nhau ra sao?",
  "Tại sao access token và refresh token phải tách nhau?",
  "Vì sao localStorage có rủi ro khi lưu JWT?",
  "Giải thích JWT flow trong ASP.NET Core Web API.",
];

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const defaultSettings: ChatSettings = {
  provider: "gemini-direct",
  model: "gemini-2.5-flash-lite",
  persistHistory: true,
  maxContextMessages: 8,
};

export default function JwtTutorChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [settings, setSettings] = useState<ChatSettings>(defaultSettings);

  useEffect(() => {
    const savedMessages = chatStorage.loadMessages();
    const savedSettings = chatStorage.loadSettings();
    const savedDraft = chatStorage.loadDraft();

    if (savedMessages.length) setMessages(savedMessages);
    if (savedSettings) setSettings(savedSettings);
    if (savedDraft) setInput(savedDraft);
  }, []);

  useEffect(() => {
    chatStorage.saveDraft(input);
  }, [input]);

  useEffect(() => {
    if (settings.persistHistory) {
      chatStorage.saveMessages(messages);
    }
  }, [messages, settings.persistHistory]);

  useEffect(() => {
    chatStorage.saveSettings(settings);
  }, [settings]);

  const provider = useMemo(() => {
    return new GeminiDirectProvider();
  }, []);

  async function handleSend(customText?: string) {
    const text = (customText ?? input).trim();
    if (!text || loading) return;

    setError("");

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const answer = await provider.ask(
        text,
        nextMessages.slice(-settings.maxContextMessages)
      );

      const assistantMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: answer,
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      chatStorage.clearDraft();
    } catch (err: any) {
      setError(err?.message || "Không thể gọi Gemini API ở thời điểm này.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setMessages([]);
    chatStorage.clearMessages();
    chatStorage.clearDraft();
  }

  function exportChat() {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jwt-tutor-chat-history.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="jwt-chatbot mt-16">
      <div className="jwt-chatbot__header">
        <div>
          <h2 className="jwt-chatbot__title">JWT Tutor Bot</h2>
          <p className="jwt-chatbot__subtitle">
            Hỏi mọi thứ về Chapter 06 - JWT Authentication Flow
          </p>
        </div>

        <div className="jwt-chatbot__actions">
          <button onClick={exportChat} className="jwt-chatbot__button">
            Export
          </button>
          <button onClick={handleClear} className="jwt-chatbot__button">
            Clear
          </button>
        </div>
      </div>

      {messages.length === 0 && (
        <div className="jwt-chatbot__starters">
          {starterQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="jwt-chatbot__starter"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="jwt-chatbot__messages">
        {messages.map((msg) => (
          <article
            key={msg.id}
            className={`jwt-bubble jwt-bubble--${msg.role}`}
          >
            <div className="jwt-bubble__role">
              {msg.role === "user" ? "Bạn" : "JWT Tutor"}
            </div>
            <div className="jwt-bubble__content">{msg.content}</div>
          </article>
        ))}

        {loading && (
          <article className="jwt-bubble jwt-bubble--assistant">
            <div className="jwt-bubble__role">JWT Tutor</div>
            <div className="jwt-bubble__content">Đang suy nghĩ...</div>
          </article>
        )}
      </div>

      {error && <p className="jwt-chatbot__error">{error}</p>}

      <div className="jwt-chatbot__composer">
        <textarea
          rows={3}
          placeholder="Ví dụ: Giải thích JWT Authentication Flow theo từng bước."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          disabled={loading || !input.trim()}
          onClick={() => handleSend()}
          className="jwt-chatbot__send"
        >
          Gửi
        </button>
      </div>
    </section>
  );
}

