# FE Guide: Build AI Chatbot for **Chapter 06 - JWT Authentication Flow**

> Mục tiêu: thêm một chatbot AI vào web FE hiện tại để giải đáp toàn bộ nội dung bài học về **JWT Authentication Flow**, không cần backend, có lưu lịch sử cục bộ trên trình duyệt, và có sẵn “skill” để AI trả lời đúng trọng tâm.

---

## 1) Kết luận nhanh trước khi build

Với yêu cầu **chỉ FE, không BE**, có 2 hướng:

### Hướng A — Khuyến nghị nhất: **Firebase AI Logic + Gemini Developer API**
Phù hợp nhất cho web FE vì:
- gọi model **trực tiếp từ web app**;
- Firebase AI Logic có **proxy service**, giúp **Gemini API key không nằm trong codebase client**;
- Google khuyến nghị bật **Firebase App Check** để giảm abuse;
- nếu dùng Gemini Developer API thì có thể bắt đầu bằng **free tier**.

### Hướng B — Nhanh nhất để demo: **Direct Gemini API key trên FE**
Phù hợp nếu:
- bạn cần làm thật nhanh;
- chấp nhận rủi ro key có thể bị lộ trong client bundle / network request;
- chỉ dùng cho demo, bài tập, prototype.

**Khuyến nghị thực tế cho bài của bạn:**
- Nếu cần an toàn hơn mà vẫn không có BE: dùng **Hướng A**.
- Nếu cần lên tính năng rất nhanh trong vài giờ: build **Hướng B** trước, sau đó nâng cấp sang **Hướng A**.

---

## 2) Chatbot này nên làm gì?

Chatbot không nên là “AI trả lời chung chung”. Nó nên là **JWT Tutor Bot** với scope rõ ràng:

### Nhiệm vụ chính
- Giải thích toàn bộ nội dung chapter 06 về JWT Authentication Flow.
- Trả lời theo hướng **dễ học**, **đúng trọng tâm**, **có ví dụ**.
- Ưu tiên ngữ cảnh của bài bạn đang trình bày:
  - JWT flow: login → validate → issue token → access protected API
  - JWT structure: header / payload / signature
  - access token vs refresh token
  - authentication vs authorization
  - best practices và vulnerabilities
  - ví dụ ASP.NET Core Web API

### Hành vi mong muốn
- Trả lời ngắn gọn nếu câu hỏi đơn giản.
- Trả lời từng bước nếu người học hỏi “flow”, “how”, “why”.
- Nếu người dùng hỏi code, ưu tiên ví dụ **ASP.NET Core Web API**, vì chapter của bạn đang đi theo ngữ cảnh này.
- Nếu câu hỏi nằm ngoài bài học, bot nên nói rõ đâu là kiến thức chapter, đâu là kiến thức mở rộng.

---

## 3) Scope kiến thức bot sẽ bám theo

Bạn đang có 2 nguồn ngữ cảnh rất tốt:

1. **Web hiện tại** về JWT Authentication Flow
2. **PDF Chapter 06 - Implement security in RESTful WebService**

Từ chapter và web hiện tại, chatbot nên bám các ý sau:

### JWT core concepts
- JWT là bearer token được ký số để client gửi kèm mỗi request tới protected resources.
- JWT thường dùng trong REST API / Web API.
- JWT có 3 phần: **Header**, **Payload**, **Signature**.
- Signature giúp kiểm tra token có bị tamper hay không.

### JWT authentication flow
- User gửi username/password.
- Server xác thực thông tin đăng nhập.
- Server tạo JWT và trả về cho client.
- Client lưu token.
- Với các request tiếp theo, client gửi token trong `Authorization: Bearer <token>`.
- Middleware xác thực token, dựng `ClaimsPrincipal`, rồi authorization quyết định có cho truy cập hay không.

### Token strategy
- Access token: sống ngắn, dùng để gọi protected API.
- Refresh token: sống dài hơn, dùng để xin access token mới.
- Trong app thật, refresh token nên đi qua **httpOnly cookie**. Nhưng vì bài của bạn chỉ FE, không có server, nên **không làm được httpOnly cookie thật** từ frontend.

### Best practices
- Luôn dùng HTTPS.
- Không để dữ liệu nhạy cảm trong URL.
- Không nhét password / credit card vào JWT payload.
- Access token nên ngắn hạn.
- Kiểm tra signature và expiration ở mọi request protected.
- Dùng strong secret / proper key management ở backend thật.

### Vulnerabilities cần bot giải thích tốt
- `alg: none` attack
- weak secret key
- token không có expiration
- nhầm tưởng Base64 = encryption
- để lộ token trong localStorage ở app production

### ASP.NET Core angle
- `AddAuthentication().AddJwtBearer(...)`
- `UseAuthentication()` và `UseAuthorization()`
- `[Authorize]` và `[Authorize(Roles = "Admin")]`
- sự khác nhau giữa authentication và authorization

---

## 4) Kiến trúc khuyến nghị cho FE chatbot

```text
User UI
  -> Chat component
  -> Local knowledge retrieval (từ chapter đã tóm tắt)
  -> Prompt builder / skill
  -> AI provider
      -> A. Firebase AI Logic (khuyến nghị)
      -> B. Direct Gemini SDK (nhanh nhất)
  -> localStorage / sessionStorage
```

### Mục tiêu của kiến trúc này
- Không cần backend.
- Không cần database.
- Vẫn có “grounding nhẹ” bằng **local knowledge base**.
- Vẫn lưu được lịch sử chat qua localStorage.
- Dễ nhúng vào web đang deploy trên Vercel.

---

## 5) Tổ chức thư mục đề xuất

```bash
src/
  components/
    JwtTutorChatbot.tsx
  data/
    jwtKnowledge.ts
  lib/
    ai/
      provider.types.ts
      systemPrompt.ts
      retrieval.ts
      geminiDirect.ts
      firebaseAiLogic.ts
    storage/
      chatStorage.ts
  types/
    chat.ts
  styles/
    chatbot.css
```

Nếu project của bạn không dùng React/TypeScript, bạn vẫn có thể giữ nguyên logic ở:
- `jwtKnowledge`
- `systemPrompt`
- `retrieval`
- `chatStorage`
- provider AI

rồi port UI sang JS thuần.

---

## 6) Chọn nơi lưu dữ liệu như thế nào?

### Nên lưu ở `localStorage` khi
- muốn giữ lịch sử chat sau khi reload trang;
- muốn lưu mode của bot, model name, starter prompts đã dùng;
- muốn giữ user preferences.

### Nên lưu ở `sessionStorage` khi
- chỉ muốn giữ tạm trong 1 tab/session;
- lưu draft message đang gõ.

### Không nên lưu trong storage
- API key thật của production
- refresh token thật của hệ thống auth production
- secret / private signing key

### Gợi ý thực tế cho bài của bạn
- **Lịch sử chat**: `localStorage`
- **Draft input hiện tại**: `sessionStorage`
- **API key**:
  - nếu dùng Firebase AI Logic: không cần nhét key vào FE codebase
  - nếu dùng direct Gemini: chỉ dùng `VITE_GEMINI_API_KEY` cho demo, chấp nhận rủi ro

---

## 7) Kiểu dữ liệu cơ bản

### `src/types/chat.ts`
```ts
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
```

---

## 8) Local knowledge base cho chapter JWT

Ý tưởng: không để AI trả lời hoàn toàn “trôi nổi”. Ta đưa vào một **bộ tri thức cục bộ** từ chapter để bot bám bài.

### `src/data/jwtKnowledge.ts`
```ts
export interface KnowledgeChunk {
  id: string;
  title: string;
  keywords: string[];
  content: string;
}

export const JWT_KNOWLEDGE_CHUNKS: KnowledgeChunk[] = [
  {
    id: "jwt-overview",
    title: "JWT overview",
    keywords: ["jwt", "overview", "rest api", "web api", "bearer token"],
    content:
      "JWT authentication issues a digitally signed bearer token to authenticated clients. The client must send the token on every request to protected resources. JWT is commonly used in REST APIs and ASP.NET Core Web APIs.",
  },
  {
    id: "jwt-structure",
    title: "JWT structure",
    keywords: ["header", "payload", "signature", "claims", "alg", "exp"],
    content:
      "A JWT has 3 parts: header, payload, and signature. The header describes token type and signing algorithm. The payload contains claims such as sub, exp, iat, role, permissions. The signature is used to verify integrity and prevent tampering.",
  },
  {
    id: "jwt-flow",
    title: "JWT authentication flow",
    keywords: ["flow", "login", "validate", "token", "authorization header"],
    content:
      "Typical flow: user sends username and password, server validates credentials, server generates JWT, client stores the token, client sends Authorization: Bearer <token> on later requests, middleware validates token, authorization decides access.",
  },
  {
    id: "auth-vs-authz",
    title: "Authentication vs Authorization",
    keywords: ["authentication", "authorization", "difference", "authn", "authz"],
    content:
      "Authentication answers who the user is. Authorization answers what the user is allowed to do. Authentication usually happens first; authorization depends on the authenticated identity and claims/roles/policies.",
  },
  {
    id: "access-vs-refresh",
    title: "Access token vs Refresh token",
    keywords: ["access token", "refresh token", "expiration", "rotation"],
    content:
      "Access token should be short-lived and used for protected API access. Refresh token should live longer and be used to obtain a new access token. In production, refresh tokens are better stored in secure httpOnly cookies, but this requires a backend.",
  },
  {
    id: "storage-strategy",
    title: "Client-side storage strategy",
    keywords: ["localstorage", "sessionstorage", "cookie", "memory", "storage"],
    content:
      "For this FE-only learning project, chat history can be stored in localStorage. For real authentication systems, storing auth tokens in localStorage increases XSS risk. Memory storage is safer for short-lived access tokens. httpOnly cookies need server support and cannot be created securely by frontend-only code.",
  },
  {
    id: "best-practices",
    title: "JWT security best practices",
    keywords: ["https", "best practice", "security", "signature", "secret", "exp"],
    content:
      "Use HTTPS, set short token expiration, validate signature and expiration, never place sensitive data in JWT payload or URL, use strong secrets/keys, restrict dangerous methods, return generic error messages, and design refresh token rotation if you have backend support.",
  },
  {
    id: "common-vulnerabilities",
    title: "Common JWT vulnerabilities",
    keywords: ["none algorithm", "weak secret", "expiration", "base64", "tampering"],
    content:
      "Common mistakes: accepting alg=none, using weak secret keys, omitting exp, storing confidential data in payload, and thinking Base64 means encryption. JWT payload is encoded, not encrypted.",
  },
  {
    id: "aspnetcore-jwt",
    title: "ASP.NET Core JWT setup",
    keywords: ["asp.net core", "addjwtbearer", "authorize", "roles", "program.cs"],
    content:
      "In ASP.NET Core Web API, JWT is typically configured with AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(...). Protected endpoints use [Authorize], and role-protected endpoints can use [Authorize(Roles = \"Admin\")]. UseAuthentication should run before UseAuthorization.",
  },
  {
    id: "testing-jwt",
    title: "Testing JWT",
    keywords: ["postman", "401", "private api", "login endpoint", "refresh endpoint"],
    content:
      "A common test flow is: call login endpoint, receive access token and refresh token, call private endpoint with Bearer token, then intentionally modify token to see 401 Unauthorized, and finally test refresh token endpoint.",
  },
];
```

---

## 9) Retrieval nhẹ trên FE để bot bám đúng bài

Không cần vector DB. Với scope chapter nhỏ, keyword scoring là đủ dùng.

### `src/lib/ai/retrieval.ts`
```ts
import { JWT_KNOWLEDGE_CHUNKS } from "../../data/jwtKnowledge";

function normalize(text: string) {
  return text.toLowerCase().trim();
}

export function getRelevantKnowledge(query: string, topK = 4) {
  const q = normalize(query);

  const scored = JWT_KNOWLEDGE_CHUNKS.map((chunk) => {
    const keywordHits = chunk.keywords.reduce((score, keyword) => {
      return q.includes(normalize(keyword)) ? score + 2 : score;
    }, 0);

    const contentHits = normalize(chunk.content)
      .split(/\W+/)
      .filter((token) => token && q.includes(token)).length;

    return {
      ...chunk,
      score: keywordHits + contentHits,
    };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  if (scored.length === 0) {
    return JWT_KNOWLEDGE_CHUNKS.slice(0, 3);
  }

  return scored;
}
```

---

## 10) System Prompt / Skill cốt lõi

### `src/lib/ai/systemPrompt.ts`
```ts
export const JWT_TUTOR_SYSTEM_PROMPT = `
You are JWT Tutor, an AI teaching assistant embedded in a frontend learning website.

Primary mission:
- Help learners understand Chapter 06: JWT Authentication Flow.
- Prioritize JWT, REST API security, authentication vs authorization, access token, refresh token, middleware flow, ASP.NET Core Web API examples, best practices, and common vulnerabilities.

Behavior rules:
1. Answer in the same language as the user. If the user writes Vietnamese, answer in Vietnamese. Keep technical terms in English when useful.
2. Stay focused on JWT Authentication Flow and closely related REST/Web API security topics.
3. For simple questions, answer directly.
4. For conceptual questions, explain step by step.
5. For comparison questions, use clear side-by-side differences.
6. For code requests, prefer ASP.NET Core Web API examples unless the user asks for another stack.
7. If the answer mixes chapter content and real-world best practice, label that distinction clearly.
8. Never invent endpoints, claims, config values, or security guarantees.
9. If the app is frontend-only and has no backend, explicitly say what cannot be implemented securely without a backend (for example secure httpOnly refresh token flows).
10. Do not give vague textbook answers. Be concrete, structured, and instructional.

Teaching style:
- Start with a direct answer.
- Then explain why.
- Then give a short example if it helps.
- Use bullet points sparingly and only when they improve clarity.

Safety and accuracy:
- Never say JWT payload is encrypted by default.
- Never recommend storing highly sensitive secrets in frontend code.
- Warn about XSS risk when discussing localStorage for auth tokens.
- Encourage HTTPS and token validation.

If the question is outside JWT or this course topic:
- Briefly answer if it is still related to web security.
- Otherwise say it is outside the scope of this chapter and redirect back to JWT Authentication Flow.
`;
```

---

## 11) Prompt builder: ghép history + knowledge + question

### `src/lib/ai/promptBuilder.ts`
```ts
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
```

---

## 12) Provider interface

### `src/lib/ai/provider.types.ts`
```ts
import type { ChatMessage } from "../../types/chat";

export interface AiChatProvider {
  ask(userInput: string, history: ChatMessage[]): Promise<string>;
}
```

---

## 13) Hướng A — Provider bằng Firebase AI Logic (khuyến nghị)

## 13.1 Cài package
```bash
npm install firebase
```

## 13.2 Tạo Firebase project
- Tạo project trong Firebase console.
- Vào **Firebase AI Logic**.
- Chọn **Gemini Developer API**.
- Register web app.
- Lấy `firebaseConfig`.
- Bật **App Check** nếu chuẩn bị public demo.

## 13.3 Tạo file provider

### `src/lib/ai/firebaseAiLogic.ts`
```ts
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import type { AiChatProvider } from "./provider.types";
import type { ChatMessage } from "../../types/chat";
import { JWT_TUTOR_SYSTEM_PROMPT } from "./systemPrompt";
import { buildJwtTutorPrompt } from "./promptBuilder";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function getFirebaseApp(): FirebaseApp {
  return getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
}

export class FirebaseAiLogicProvider implements AiChatProvider {
  async ask(userInput: string, history: ChatMessage[]): Promise<string> {
    const app = getFirebaseApp();
    const ai = getAI(app, { backend: new GoogleAIBackend() });

    const model = getGenerativeModel(ai, {
      model: import.meta.env.VITE_GEMINI_MODEL || "gemini-3-flash-preview",
      systemInstruction: JWT_TUTOR_SYSTEM_PROMPT,
    } as any);

    const prompt = buildJwtTutorPrompt(userInput, history);
    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text?.trim() || "Xin lỗi, mình chưa tạo được câu trả lời phù hợp.";
  }
}
```

> Lưu ý: phần type của `systemInstruction` có thể khác nhẹ tùy version SDK. Nếu IDE báo type mismatch, có thể bỏ `systemInstruction` khỏi `getGenerativeModel(...)` rồi đưa nó vào prompt text như ở `buildJwtTutorPrompt`.

## 13.4 Ưu / nhược
### Ưu
- Không phải nhét Gemini API key thẳng vào client codebase.
- Phù hợp web/mobile hơn.
- Dễ nâng cấp App Check.

### Nhược
- Setup Firebase dài hơn direct SDK một chút.
- Với bài tập cá nhân, bạn có thể thấy direct SDK nhanh hơn lúc đầu.

---

## 14) Hướng B — Provider bằng direct Gemini SDK (nhanh nhất để demo)

## 14.1 Cài package
```bash
npm install @google/genai
```

## 14.2 Tạo `.env`
```bash
VITE_GEMINI_API_KEY=your_demo_key_here
VITE_GEMINI_MODEL=gemini-3-flash-preview
```

> Với FE-only demo, model free tier thường nên ưu tiên các model Flash / Flash-Lite hiện đang free. Trước khi deploy, kiểm tra lại model ID đang còn hoạt động trong docs pricing/models của Gemini.

## 14.3 Tạo provider

### `src/lib/ai/geminiDirect.ts`
```ts
import { GoogleGenAI } from "@google/genai";
import type { AiChatProvider } from "./provider.types";
import type { ChatMessage } from "../../types/chat";
import { JWT_TUTOR_SYSTEM_PROMPT } from "./systemPrompt";
import { buildJwtTutorPrompt } from "./promptBuilder";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export class GeminiDirectProvider implements AiChatProvider {
  async ask(userInput: string, history: ChatMessage[]): Promise<string> {
    const prompt = buildJwtTutorPrompt(userInput, history);

    const response = await ai.models.generateContent({
      model: import.meta.env.VITE_GEMINI_MODEL || "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: JWT_TUTOR_SYSTEM_PROMPT,
        temperature: 0.2,
        maxOutputTokens: 1200,
      },
    });

    return response.text?.trim() || "Xin lỗi, mình chưa tạo được câu trả lời phù hợp.";
  }
}
```

## 14.4 Optional: Streaming response

### `src/lib/ai/geminiDirectStream.ts`
```ts
import { GoogleGenAI } from "@google/genai";
import { JWT_TUTOR_SYSTEM_PROMPT } from "./systemPrompt";
import { buildJwtTutorPrompt } from "./promptBuilder";
import type { ChatMessage } from "../../types/chat";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function streamJwtAnswer(
  userInput: string,
  history: ChatMessage[],
  onChunk: (text: string) => void
) {
  const prompt = buildJwtTutorPrompt(userInput, history);

  const stream = await ai.models.generateContentStream({
    model: import.meta.env.VITE_GEMINI_MODEL || "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: JWT_TUTOR_SYSTEM_PROMPT,
      temperature: 0.2,
      maxOutputTokens: 1200,
    },
  });

  let fullText = "";

  for await (const chunk of stream) {
    const text = chunk.text || "";
    fullText += text;
    onChunk(fullText);
  }

  return fullText;
}
```

## 14.5 Nhược điểm cực quan trọng
- API key sẽ lộ ở mức nào đó nếu client gọi trực tiếp.
- Đây **không phải** cách tốt cho production public app.
- Chỉ phù hợp demo / assignment / prototype nội bộ.

---

## 15) Chat storage bằng localStorage + sessionStorage

### `src/lib/storage/chatStorage.ts`
```ts
import type { ChatMessage, ChatSettings } from "../../types/chat";

const CHAT_KEY = "jwt-tutor-chat:v1";
const SETTINGS_KEY = "jwt-tutor-settings:v1";
const DRAFT_KEY = "jwt-tutor-draft:v1";

export const chatStorage = {
  loadMessages(): ChatMessage[] {
    try {
      const raw = localStorage.getItem(CHAT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveMessages(messages: ChatMessage[]) {
    localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
  },

  clearMessages() {
    localStorage.removeItem(CHAT_KEY);
  },

  loadSettings(): ChatSettings | null {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  saveSettings(settings: ChatSettings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  loadDraft(): string {
    return sessionStorage.getItem(DRAFT_KEY) || "";
  },

  saveDraft(value: string) {
    sessionStorage.setItem(DRAFT_KEY, value);
  },

  clearDraft() {
    sessionStorage.removeItem(DRAFT_KEY);
  },
};
```

---

## 16) Component chatbot hoàn chỉnh

### `src/components/JwtTutorChatbot.tsx`
```tsx
import { useEffect, useMemo, useState } from "react";
import type { ChatMessage, ChatSettings } from "../types/chat";
import { chatStorage } from "../lib/storage/chatStorage";
import { FirebaseAiLogicProvider } from "../lib/ai/firebaseAiLogic";
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
  provider: "firebase-ai-logic",
  model: "gemini-3-flash-preview",
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
    if (settings.provider === "gemini-direct") {
      return new GeminiDirectProvider();
    }
    return new FirebaseAiLogicProvider();
  }, [settings.provider]);

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
      setError(err?.message || "Không thể gọi AI ở thời điểm này.");
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
    <section className="jwt-chatbot">
      <div className="jwt-chatbot__header">
        <div>
          <h2>JWT Tutor Bot</h2>
          <p>Hỏi mọi thứ về JWT Authentication Flow</p>
        </div>

        <div className="jwt-chatbot__actions">
          <select
            value={settings.provider}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                provider: e.target.value as ChatSettings["provider"],
              }))
            }
          >
            <option value="firebase-ai-logic">Firebase AI Logic</option>
            <option value="gemini-direct">Gemini Direct</option>
          </select>

          <button onClick={exportChat}>Export</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>

      {messages.length === 0 && (
        <div className="jwt-chatbot__starters">
          {starterQuestions.map((q) => (
            <button key={q} onClick={() => handleSend(q)}>
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="jwt-chatbot__messages">
        {messages.map((msg) => (
          <article key={msg.id} className={`bubble bubble--${msg.role}`}>
            <div className="bubble__role">
              {msg.role === "user" ? "Bạn" : "JWT Tutor"}
            </div>
            <div className="bubble__content">{msg.content}</div>
          </article>
        ))}

        {loading && (
          <article className="bubble bubble--assistant">
            <div className="bubble__role">JWT Tutor</div>
            <div className="bubble__content">Đang suy nghĩ...</div>
          </article>
        )}
      </div>

      {error && <p className="jwt-chatbot__error">{error}</p>}

      <div className="jwt-chatbot__composer">
        <textarea
          rows={4}
          placeholder="Ví dụ: Giải thích sự khác nhau giữa access token và refresh token"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button disabled={loading || !input.trim()} onClick={() => handleSend()}>
          Gửi
        </button>
      </div>
    </section>
  );
}
```

---

## 17) CSS tối thiểu

### `src/styles/chatbot.css`
```css
.jwt-chatbot {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #ffffff;
  padding: 16px;
  max-width: 960px;
  margin: 24px auto;
}

.jwt-chatbot__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.jwt-chatbot__actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.jwt-chatbot__messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 240px;
  max-height: 560px;
  overflow: auto;
  padding: 8px 0;
}

.jwt-chatbot__composer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.jwt-chatbot__composer textarea {
  width: 100%;
  resize: vertical;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  padding: 12px;
}

.jwt-chatbot__starters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.jwt-chatbot__starters button,
.jwt-chatbot button,
.jwt-chatbot select {
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 10px;
  padding: 8px 12px;
}

.bubble {
  max-width: 80%;
  padding: 12px 14px;
  border-radius: 16px;
  line-height: 1.55;
}

.bubble--user {
  align-self: flex-end;
  background: #eff6ff;
}

.bubble--assistant {
  align-self: flex-start;
  background: #f9fafb;
}

.bubble__role {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
  opacity: 0.7;
}

.jwt-chatbot__error {
  color: #b91c1c;
  margin-top: 8px;
}
```

---

## 18) Cách nhúng chatbot vào trang hiện có

Ví dụ ở page chính của phần JWT:

```tsx
import JwtTutorChatbot from "./components/JwtTutorChatbot";
import "./styles/chatbot.css";

export default function JwtPage() {
  return (
    <main>
      {/* content JWT hiện tại */}
      <JwtTutorChatbot />
    </main>
  );
}
```

### Vị trí nên đặt trên UI
- Ngay dưới phần **JWT Authentication Flow**
- Hoặc floating chat button ở góc phải dưới
- Hoặc tab mới: **Ask JWT Tutor**

Khuyến nghị cho bài thuyết trình: đặt **ngay dưới slide content / diagram**, vì người chấm nhìn sẽ hiểu chatbot đang bám đúng bài học.

---

## 19) Logic trả lời nên “chỉnh chu” ra sao?

Bot nên follow format ngầm như sau:

### Với câu hỏi định nghĩa
**Trả lời mẫu:**
1. Định nghĩa ngắn
2. Ý nghĩa trong JWT flow
3. Ví dụ nhỏ

### Với câu hỏi so sánh
**Trả lời mẫu:**
1. Nêu khác nhau cốt lõi
2. Bảng hoặc bullet ngắn
3. Khi nào dùng cái nào

### Với câu hỏi flow / quy trình
**Trả lời mẫu:**
1. Tóm tắt flow 1 câu
2. Đi theo từng bước 1 → 2 → 3 → 4
3. Chỉ ra chỗ middleware / token validation / authorization

### Với câu hỏi code
**Trả lời mẫu:**
1. Mô tả mục tiêu đoạn code
2. Đưa code
3. Giải thích từng phần quan trọng
4. Nêu common mistakes

---

## 20) Feature nên có để chatbot “ra sản phẩm” hơn

### Bắt buộc
- gửi / nhận tin nhắn
- loading state
- lưu lịch sử chat
- clear chat
- starter questions
- chọn provider

### Nên có
- export lịch sử chat JSON
- auto-scroll xuống cuối
- enter để gửi, shift+enter xuống dòng
- copy câu trả lời
- markdown rendering cho code block
- hiển thị lỗi quota / network rõ ràng

### Có thể thêm sau
- streaming
- dark mode
- quiz mode
- flashcard mode
- “Explain simpler” / “Give example” quick actions

---

## 21) Quick actions rất hợp cho bài học

Bạn có thể thêm nút nhỏ dưới mỗi câu trả lời của bot:
- **Giải thích dễ hơn**
- **Cho ví dụ thực tế**
- **So sánh với session auth**
- **Cho code ASP.NET Core**
- **Tóm tắt trong 3 ý**

Khi click thì chỉ cần gửi prompt mới, ví dụ:
```ts
handleSend(`Giải thích dễ hơn câu trả lời trước, dùng ví dụ gần gũi hơn.`)
```

---

## 22) Những gì frontend-only làm được và không làm được

## Làm được
- Gọi AI API từ FE
- Lưu lịch sử chat ở browser
- Tạo knowledge base cục bộ
- Làm chatbot dạy JWT rất tốt
- Demo access token / refresh token ở mức mô phỏng học tập

## Không làm được an toàn nếu không có backend
- refresh token flow chuẩn bằng **httpOnly cookie thật**
- bảo vệ tuyệt đối API key khỏi người dùng
- revoke token chuẩn ở server/database
- secure session management kiểu production

### Kết luận phần này
Web FE-only của bạn **rất phù hợp** để làm **JWT learning assistant**, nhưng **không phù hợp** để triển khai auth production-grade thật sự.

---

## 23) Checklist bảo mật cho bài này

### Nếu dùng Firebase AI Logic
- [ ] Đã tạo Firebase project
- [ ] Đã connect web app
- [ ] Đã dùng `firebase/ai`
- [ ] Đã cân nhắc bật App Check
- [ ] Đã không hard-code secret backend

### Nếu dùng Gemini direct
- [ ] Key chỉ dùng cho demo
- [ ] Đã hiểu key có thể bị lộ
- [ ] Không public repo chứa key thật
- [ ] Không gọi model quá rộng ngoài scope cần thiết

### Với chatbot nói về JWT
- [ ] Bot không nói sai rằng JWT payload là encrypted by default
- [ ] Bot cảnh báo localStorage có XSS risk khi nói về auth token
- [ ] Bot phân biệt rõ access token và refresh token
- [ ] Bot giải thích rõ authn vs authz

---

## 24) Test cases bạn nên chạy

### Functional
1. Gửi câu hỏi: “JWT là gì?”
2. Gửi câu hỏi: “Phân biệt authentication và authorization”
3. Gửi câu hỏi: “Giải thích JWT flow theo từng bước”
4. Gửi câu hỏi: “Cho ví dụ ASP.NET Core dùng [Authorize]”
5. Reload trang → lịch sử còn không?
6. Clear chat → lịch sử có mất không?

### Quality
1. Bot có bám đúng chapter không?
2. Bot có nói lan man sang chủ đề khác không?
3. Bot có trả lời quá chung chung không?
4. Bot có nhấn mạnh security best practice không?

### Error handling
1. Mất mạng
2. Sai key
3. Hết quota free
4. Model name sai / deprecated

---

## 25) Prompt gợi ý để demo trên lớp / khi nộp bài

- JWT là gì và tại sao phù hợp với REST API?
- Hãy giải thích JWT Authentication Flow theo từng bước.
- Header, Payload, Signature khác nhau như thế nào?
- Tại sao JWT được gọi là stateless authentication?
- Access token và refresh token khác nhau ở điểm nào?
- Authentication khác authorization thế nào?
- Vì sao không nên lưu dữ liệu nhạy cảm trong JWT payload?
- Vì sao localStorage có rủi ro nếu dùng để lưu access token?
- Cho ví dụ ASP.NET Core cấu hình `AddJwtBearer`.
- `UseAuthentication()` và `UseAuthorization()` khác nhau ra sao?
- `[Authorize]` và `[Authorize(Roles = "Admin")]` khác nhau thế nào?
- `alg: none` attack là gì?
- Tại sao JWT cần `exp`?
- Trong project FE-only này, phần nào là mô phỏng học tập và phần nào chưa phải production?

---

## 26) Nếu muốn chatbot “xịn” hơn nữa

### Option 1: Quiz mode
Cho bot sinh câu hỏi trắc nghiệm về JWT.

Ví dụ nút:
```ts
handleSend("Hãy tạo cho tôi 5 câu quiz về JWT Authentication Flow, có đáp án ở cuối.");
```

### Option 2: Flashcard mode
```ts
handleSend("Tạo flashcards ngắn về JWT, access token, refresh token, authentication và authorization.");
```

### Option 3: Explain by diagram
Bot giải thích theo đúng flow đang có trên website của bạn:
- login request
- validation
- generate JWT
- API access

### Option 4: “Strict chapter mode”
Bot chỉ trả lời trong phạm vi chapter, không mở rộng ra ngoài.

Bạn có thể thêm setting:
```ts
strictChapterMode: true
```

rồi thêm rule vào prompt:
```txt
Only answer using the local chapter knowledge unless the user explicitly asks for an extended real-world explanation.
```

---

## 27) Troubleshooting thường gặp

### Lỗi: model không chạy
- model ID đã đổi / deprecated
- hết free quota
- region/account issue
- SDK version quá cũ

### Lỗi: response quá lan man
- giảm `temperature`
- tăng độ chặt của system prompt
- giảm history window
- tăng quality của local knowledge

### Lỗi: bot không bám chapter
- retrieval chưa chọn đúng chunk
- prompt builder chưa inject knowledge rõ ràng
- prompt chưa nói “local course knowledge is first source of truth”

### Lỗi: sau reload mất chat
- quên `chatStorage.saveMessages(messages)`
- parse JSON lỗi
- browser storage bị chặn

---

## 28) Khuyến nghị triển khai thật cho bài của bạn

### Bản mình khuyên bạn làm ngay
1. Dùng **Firebase AI Logic** nếu còn thời gian setup.
2. Nếu cần cực nhanh: dùng **Gemini direct** trước.
3. Dùng **local knowledge base** như file `jwtKnowledge.ts`.
4. Dùng **localStorage** để lưu lịch sử chat.
5. Đặt chatbot ngay dưới phần JWT content hiện tại trên website.
6. Dùng tên bot là **JWT Tutor Bot** hoặc **JWT Learning Assistant**.

### Vì sao đây là cấu hình hợp lý nhất?
- đúng yêu cầu **FE-only**;
- không cần backend;
- có thể demo rõ ràng là chatbot bám bài học JWT;
- đủ “hoàn chỉnh” để người dùng thật sự đọc, hỏi, và học;
- dễ giải thích trong báo cáo / demo vì kiến trúc rất rõ.

---

## 29) Mẫu mô tả ngắn để đưa vào báo cáo / README

```md
JWT Tutor Bot is an AI-powered frontend learning assistant integrated into the JWT Authentication Flow website. It helps users understand JWT concepts, authentication vs authorization, token structure, refresh-token strategy, ASP.NET Core JWT setup, and common security vulnerabilities. The chatbot is built entirely on the frontend, uses local knowledge grounding based on the course chapter, and persists chat history in browser storage without requiring a backend server.
```

---

## 30) Phần quan trọng nhất: nên chọn hướng nào?

### Nếu bạn hỏi mình chốt 1 phương án
**Chốt:**
- **Production-minded FE-only:** Firebase AI Logic
- **Nhanh để nộp / demo:** Gemini direct + localStorage + local chapter grounding

Đối với bài hiện tại của bạn, nếu mục tiêu là **làm nhanh nhưng nhìn vẫn rất ra sản phẩm**, mình sẽ đi theo thứ tự này:

1. Build chatbot bằng **Gemini direct** trước để chạy được ngay.
2. Gắn **system prompt + local knowledge** để bot bám bài.
3. Lưu lịch sử chat bằng `localStorage`.
4. Nếu còn thời gian, chuyển provider sang **Firebase AI Logic**.

---

## 31) Tài nguyên tham khảo chính thức nên giữ lại

- Google AI for Developers — Gemini API docs
- Gemini API quickstart
- Gemini API pricing
- Gemini API generateContent / streamGenerateContent / systemInstruction docs
- Firebase AI Logic for Web
- Firebase App Check

---

## 32) Gợi ý tên file và commit message

### Tên file
- `jwt-chatbot-fe-guide.md`
- `jwt-chatbot-skill-prompt.md`

### Commit message
```bash
git commit -m "feat: add JWT Tutor Bot frontend architecture and AI prompt design"
```

---

## 33) Kết luận cuối

Bạn **hoàn toàn làm được chatbot AI chỉ bằng FE** cho web JWT hiện tại.

Giải pháp tối ưu nhất cho bài này là:
- dùng một provider AI free-tier;
- thêm **skill prompt** để bot trả lời đúng vai trò “JWT Tutor”;
- thêm **local chapter knowledge** để câu trả lời không bị chung chung;
- lưu lịch sử bằng **localStorage**;
- chấp nhận rằng các phần auth production-grade như refresh token httpOnly cookie thật sự vẫn cần backend.

Nếu mục tiêu là **đẹp, gọn, hợp logic, dễ demo**, đây là cấu trúc phù hợp nhất cho project của bạn.
