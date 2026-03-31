"use client";

import { useState, useEffect, useCallback } from "react";

interface FlowStep {
  id: number;
  label: string;
  description: string;
  from: string;
  to: string;
  httpExample: string;
  color: string;
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 1,
    label: "Login Request",
    description: "Client gửi username và password đến Auth Server thông qua POST request đến endpoint /api/login.",
    from: "Client",
    to: "Auth Server",
    httpExample: `POST /api/login HTTP/1.1
Content-Type: application/json

{
  "username": "john_doe",
  "password": "s3cur3P@ss!"
}`,
    color: "#22c55e",
  },
  {
    id: 2,
    label: "Validate Credentials",
    description: "Auth Server truy vấn Database để kiểm tra username có tồn tại không và password có khớp không (so sánh hash).",
    from: "Auth Server",
    to: "Database",
    httpExample: `-- SQL Query (simplified)
SELECT id, username, password_hash, role
FROM users
WHERE username = 'john_doe';

-- Verify: bcrypt.compare(password, password_hash)
-- Result: ✅ Match!`,
    color: "#a855f7",
  },
  {
    id: 3,
    label: "Return User Data",
    description: "Database trả về thông tin user (ID, role, permissions). Auth Server nhận để chuẩn bị tạo JWT token.",
    from: "Database",
    to: "Auth Server",
    httpExample: `-- Database Response
{
  "id": 42,
  "username": "john_doe",
  "role": "Admin",
  "email": "john@example.com"
}`,
    color: "#a855f7",
  },
  {
    id: 4,
    label: "Generate & Return JWT",
    description: "Auth Server tạo JWT token chứa user claims (sub, role, exp), ký bằng secret key, và trả về cho Client.",
    from: "Auth Server",
    to: "Client",
    httpExample: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "dGhpcyBpcyBhIHJlZnJ...",
  "expiresIn": 1800
}`,
    color: "#3b82f6",
  },
  {
    id: 5,
    label: "API Request + Bearer Token",
    description: "Client lưu token và gửi kèm trong Authorization header khi gọi protected API endpoint.",
    from: "Client",
    to: "API Server",
    httpExample: `GET /api/products HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json`,
    color: "#f97316",
  },
  {
    id: 6,
    label: "Verify JWT Signature",
    description: "API Server nhận request, extract token từ Authorization header, verify signature và kiểm tra expiration.",
    from: "API Server",
    to: "API Server",
    httpExample: `// Server-side verification
1. Extract token from "Bearer <token>"
2. Decode header → check algorithm (HS256)
3. Verify signature using secret key
4. Check exp claim → not expired? ✅
5. Extract claims → userId: 42, role: Admin`,
    color: "#f97316",
  },
  {
    id: 7,
    label: "Return Protected Resource",
    description: "Token hợp lệ → API Server xử lý request và trả về dữ liệu. Token không hợp lệ → trả 401 Unauthorized.",
    from: "API Server",
    to: "Client",
    httpExample: `HTTP/1.1 200 OK
Content-Type: application/json

{
  "products": [
    { "id": 1, "name": "Laptop", "price": 999 },
    { "id": 2, "name": "Phone", "price": 699 }
  ],
  "total": 2
}`,
    color: "#22c55e",
  },
];

const ACTORS = [
  { id: "Client", icon: "🖥️", label: "Client", subtitle: "Browser / App", color: "#3b82f6" },
  { id: "Auth Server", icon: "🔐", label: "Auth Server", subtitle: "/api/token", color: "#22c55e" },
  { id: "API Server", icon: "⚙️", label: "API Server", subtitle: "Protected APIs", color: "#f97316" },
  { id: "Database", icon: "🗄️", label: "Database", subtitle: "Users", color: "#a855f7" },
];

export default function InteractiveFlowAnimation() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= FLOW_STEPS.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, []);

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(-1, prev - 1));
  };

  const reset = () => {
    setCurrentStep(-1);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentStep >= FLOW_STEPS.length - 1) {
      setCurrentStep(-1);
    }
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= FLOW_STEPS.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const step = currentStep >= 0 ? FLOW_STEPS[currentStep] : null;

  function isActorActive(actorId: string) {
    if (!step) return false;
    return step.from === actorId || step.to === actorId;
  }

  return (
    <div className="flow-anim">
      {/* Controls */}
      <div className="flow-anim__controls">
        <button onClick={reset} className="flow-anim__btn" title="Reset">
          ⏮ Reset
        </button>
        <button onClick={prevStep} className="flow-anim__btn" disabled={currentStep <= -1}>
          ◀ Prev
        </button>
        <button onClick={togglePlay} className="flow-anim__btn flow-anim__btn--play">
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button onClick={nextStep} className="flow-anim__btn" disabled={currentStep >= FLOW_STEPS.length - 1}>
          Next ▶
        </button>
        <span className="text-sm text-slate-400 ml-2">
          Step {currentStep + 1 > 0 ? currentStep + 1 : "–"} / {FLOW_STEPS.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flow-anim__progress">
        {FLOW_STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setCurrentStep(i); setIsPlaying(false); }}
            className={`flow-anim__progress-dot ${i <= currentStep ? "active" : ""} ${i === currentStep ? "current" : ""}`}
            style={{ "--dot-color": s.color } as React.CSSProperties}
            title={`Step ${s.id}: ${s.label}`}
          >
            {s.id}
          </button>
        ))}
      </div>

      {/* Actors row */}
      <div className="flow-anim__actors">
        {ACTORS.map((actor) => (
          <div
            key={actor.id}
            className={`flow-anim__actor ${isActorActive(actor.id) ? "active" : ""}`}
            style={{ "--actor-color": actor.color, borderColor: isActorActive(actor.id) ? actor.color : "rgba(51,65,85,0.5)" } as React.CSSProperties}
          >
            <span className="text-2xl">{actor.icon}</span>
            <span className="font-semibold text-sm" style={{ color: isActorActive(actor.id) ? actor.color : "#94a3b8" }}>
              {actor.label}
            </span>
            <span className="text-xs text-slate-500">{actor.subtitle}</span>
          </div>
        ))}
      </div>

      {/* Arrow animation between actors */}
      {step && (
        <div className="flow-anim__arrow-container">
          <div className="flow-anim__arrow-line" style={{ "--arrow-color": step.color } as React.CSSProperties}>
            <span className="flow-anim__arrow-label" style={{ color: step.color }}>
              ⓘ Step {step.id}: {step.label}
            </span>
            <div className="flow-anim__arrow-dot" style={{ background: step.color }} />
          </div>
        </div>
      )}

      {/* Step detail */}
      {step ? (
        <div className="flow-anim__detail" style={{ borderColor: step.color }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-bold" style={{ color: step.color }}>
              {step.id}
            </span>
            <div>
              <h4 className="font-bold text-white text-lg">{step.label}</h4>
              <p className="text-sm text-slate-400">
                {step.from} → {step.to}
              </p>
            </div>
          </div>
          <p className="text-slate-300 mb-4">{step.description}</p>
          <div className="flow-anim__http">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">
                {step.id <= 1 ? "Request" : step.id <= 3 ? "Database" : step.id === 4 ? "Response" : step.id === 5 ? "Request" : step.id === 6 ? "Verification" : "Response"}
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(step.httpExample)}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                📋 Copy
              </button>
            </div>
            <pre className="text-sm"><code>{step.httpExample}</code></pre>
          </div>
        </div>
      ) : (
        <div className="flow-anim__detail flow-anim__detail--empty">
          <div className="text-center py-8">
            <span className="text-4xl mb-3 block">▶️</span>
            <p className="text-slate-400">Nhấn <strong>Play</strong> hoặc <strong>Next</strong> để bắt đầu xem JWT Authentication Flow từng bước.</p>
          </div>
        </div>
      )}

      {/* Step timeline */}
      <div className="flow-anim__timeline">
        {FLOW_STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`flow-anim__timeline-item ${i <= currentStep ? "completed" : ""} ${i === currentStep ? "active" : ""}`}
            onClick={() => { setCurrentStep(i); setIsPlaying(false); }}
          >
            <div className="flow-anim__timeline-number" style={i <= currentStep ? { background: s.color } : {}}>
              {i < currentStep ? "✓" : s.id}
            </div>
            <span className="flow-anim__timeline-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
