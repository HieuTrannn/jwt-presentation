"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import type { ChatMessage, ChatSettings } from "../types/chat";
import { chatStorage } from "../lib/storage/chatStorage";
import { GeminiDirectProvider } from "../lib/ai/geminiDirect";
import MarkdownRenderer from "./MarkdownRenderer";

const starterQuestions = [
  "JWT là gì và hoạt động như thế nào?",
  "Phân biệt authentication và authorization.",
  "Header, Payload, Signature khác nhau ra sao?",
  "Tại sao access token và refresh token phải tách nhau?",
  "Giải thích JWT flow trong ASP.NET Core.",
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

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [settings] = useState<ChatSettings>(defaultSettings);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedMessages = chatStorage.loadMessages();
    const savedDraft = chatStorage.loadDraft();
    if (savedMessages.length) setMessages(savedMessages);
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const provider = useMemo(() => new GeminiDirectProvider(), []);

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

      if (!isOpen) setUnread((u) => u + 1);
    } catch (err: any) {
      setError(err?.message || "Không thể kết nối API ở thời điểm này.");
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setMessages([]);
    chatStorage.clearMessages();
    chatStorage.clearDraft();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function toggleOpen() {
    if (isOpen) {
      setIsOpen(false);
      setIsExpanded(false);
    } else {
      setIsOpen(true);
      setUnread(0);
      setTimeout(() => textareaRef.current?.focus(), 200);
    }
  }

  function toggleExpand() {
    setIsExpanded(!isExpanded);
    setTimeout(() => textareaRef.current?.focus(), 200);
  }

  // Panel class logic
  const panelClasses = [
    "floating-chat__panel",
    isOpen ? "open" : "",
    isExpanded ? "expanded" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Expanded overlay backdrop */}
      {isOpen && isExpanded && (
        <div
          className="floating-chat__overlay"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Floating trigger button — "Ask AI" */}
      <button
        onClick={toggleOpen}
        className="floating-chat__trigger"
        aria-label="Ask AI about JWT"
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="flex-shrink-0"
            >
              <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
              <line x1="9" y1="21" x2="15" y2="21" />
              <line x1="10" y1="24" x2="14" y2="24" />
            </svg>
            <span className="floating-chat__label">Ask AI</span>
          </>
        )}
        {unread > 0 && !isOpen && (
          <span className="floating-chat__badge">{unread}</span>
        )}
      </button>

      {/* Chat panel */}
      <div className={panelClasses}>
        {/* Header */}
        <div className="floating-chat__header">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-sm">
              🤖
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">JWT Tutor Bot</h3>
              <p className="text-xs text-slate-400">Hỏi mọi thứ về JWT</p>
            </div>
          </div>
          <div className="flex gap-1">
            {/* Expand / Collapse */}
            <button
              onClick={toggleExpand}
              className="floating-chat__header-btn"
              title={isExpanded ? "Thu nhỏ" : "Mở rộng"}
            >
              {isExpanded ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                  <line x1="14" y1="10" x2="21" y2="3" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              )}
            </button>
            <button onClick={handleClear} className="floating-chat__header-btn" title="Xoá lịch sử">
              🗑️
            </button>
            <button onClick={toggleOpen} className="floating-chat__header-btn" title="Đóng">
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="floating-chat__messages">
          {messages.length === 0 && (
            <div className="floating-chat__welcome">
              <div className="text-3xl mb-2">👋</div>
              <p className="text-sm text-slate-400 mb-3">
                Xin chào! Tôi là JWT Tutor Bot. Hỏi tôi bất kỳ điều gì về JWT Authentication!
              </p>
              <div className="floating-chat__starters">
                {starterQuestions.map((q) => (
                  <button key={q} onClick={() => handleSend(q)} className="floating-chat__starter">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`floating-chat__bubble floating-chat__bubble--${msg.role}`}>
              <div className="floating-chat__bubble-role">
                {msg.role === "user" ? "Bạn" : "🤖 JWT Tutor"}
              </div>
              <div className="floating-chat__bubble-content">
                {msg.role === "assistant" ? (
                  <MarkdownRenderer content={msg.content} />
                ) : (
                  msg.content
                )}
              </div>
              <div className="floating-chat__bubble-time">
                {new Date(msg.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          ))}

          {loading && (
            <div className="floating-chat__bubble floating-chat__bubble--assistant">
              <div className="floating-chat__bubble-role">🤖 JWT Tutor</div>
              <div className="floating-chat__typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {error && (
            <div className="floating-chat__error">{error}</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="floating-chat__input">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Nhập câu hỏi về JWT..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="floating-chat__textarea"
          />
          <button
            disabled={loading || !input.trim()}
            onClick={() => handleSend()}
            className="floating-chat__send"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
