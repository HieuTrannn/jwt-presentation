"use client";

import { useState, useEffect } from "react";

interface LifecycleStage {
  id: string;
  label: string;
  icon: string;
  time: string;
  description: string;
  color: string;
  details: string[];
}

const STAGES: LifecycleStage[] = [
  {
    id: "create",
    label: "Token Created",
    icon: "🔨",
    time: "T = 0",
    description: "Auth Server tạo JWT sau khi user đăng nhập thành công.",
    color: "#22c55e",
    details: [
      "Claims được gán (sub, role, iss, aud)",
      "exp được set: T + 30 phút (access) hoặc T + 7 ngày (refresh)",
      "iat = thời điểm hiện tại",
      "Token được ký bằng secret/private key",
    ],
  },
  {
    id: "store",
    label: "Token Stored",
    icon: "💾",
    time: "T + 0s",
    description: "Client nhận và lưu trữ token an toàn.",
    color: "#3b82f6",
    details: [
      "Access Token → Memory hoặc sessionStorage",
      "Refresh Token → httpOnly cookie (best practice)",
      "KHÔNG nên lưu vào localStorage (XSS risk)",
    ],
  },
  {
    id: "use",
    label: "Token In Use",
    icon: "🔄",
    time: "T + 0 → T + 30min",
    description: "Client gửi token theo mỗi API request. Server verify mỗi lần.",
    color: "#f97316",
    details: [
      "Gửi trong header: Authorization: Bearer <token>",
      "Server verify signature + kiểm tra exp",
      "Đọc claims để quyết định authorization",
      "KHÔNG cần query database mỗi request",
    ],
  },
  {
    id: "expire",
    label: "Token Expired",
    icon: "⏰",
    time: "T + 30min",
    description: "Access token hết hạn. Server trả 401 Unauthorized.",
    color: "#ef4444",
    details: [
      "Server kiểm tra exp < current time → reject",
      "Client nhận HTTP 401 Unauthorized",
      "Token cũ không còn giá trị",
      "Cần refresh hoặc đăng nhập lại",
    ],
  },
  {
    id: "refresh",
    label: "Token Refreshed",
    icon: "♻️",
    time: "T + 30min + 1s",
    description: "Client dùng refresh token để lấy access token mới.",
    color: "#a855f7",
    details: [
      "POST /api/refresh với refresh token",
      "Server validate refresh token",
      "Cấp access token MỚI + refresh token MỚI (rotation)",
      "Refresh token cũ bị revoke (one-time use)",
    ],
  },
  {
    id: "revoke",
    label: "Token Revoked",
    icon: "🚫",
    time: "Bất kỳ lúc nào",
    description: "Token bị vô hiệu hóa trước khi hết hạn (logout, security breach).",
    color: "#64748b",
    details: [
      "User click logout → revoke refresh token",
      "Thêm token vào blacklist (Redis/DB)",
      "Access token vẫn valid cho đến khi hết hạn (tradeoff)",
      "Short-lived access token giảm thiểu rủi ro",
    ],
  },
];

export default function TokenLifecycleTimeline() {
  const [activeStage, setActiveStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => {
        if (prev >= STAGES.length - 1) {
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  const stage = STAGES[activeStage];

  return (
    <div className="lifecycle">
      {/* Controls */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          onClick={() => { setActiveStage(0); setIsAnimating(true); }}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          ▶ Play Animation
        </button>
        <button
          onClick={() => setIsAnimating(false)}
          className="px-4 py-2 rounded-lg bg-slate-700 text-slate-300 text-sm hover:bg-slate-600 transition-colors"
        >
          ⏸ Pause
        </button>
      </div>

      {/* Timeline */}
      <div className="lifecycle__timeline">
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setActiveStage(i); setIsAnimating(false); }}
            className={`lifecycle__node ${i <= activeStage ? "active" : ""} ${i === activeStage ? "current" : ""}`}
          >
            <div
              className="lifecycle__node-circle"
              style={i <= activeStage ? { background: s.color, borderColor: s.color } : {}}
            >
              {i < activeStage ? "✓" : s.icon}
            </div>
            <span className="lifecycle__node-label">{s.label}</span>
            <span className="lifecycle__node-time">{s.time}</span>
            {i < STAGES.length - 1 && (
              <div className={`lifecycle__connector ${i < activeStage ? "filled" : ""}`} />
            )}
          </button>
        ))}
      </div>

      {/* Stage detail */}
      <div className="lifecycle__detail" style={{ borderColor: stage.color }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{stage.icon}</span>
          <div>
            <h4 className="text-xl font-bold text-white">{stage.label}</h4>
            <span className="text-sm font-mono" style={{ color: stage.color }}>{stage.time}</span>
          </div>
        </div>
        <p className="text-slate-300 mb-4">{stage.description}</p>
        <ul className="space-y-2">
          {stage.details.map((d, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-400">
              <span style={{ color: stage.color }}>▸</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
