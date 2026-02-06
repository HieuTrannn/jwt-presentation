"use client";

/**
 * JWT Authentication Flow - Fixed alignment
 * Arrows route AROUND boxes, never overlap
 */

export default function JwtFlowDiagram() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <svg viewBox="0 0 1100 650" className="w-full h-auto">
        <defs>
          <linearGradient id="clientGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="authGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="apiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="dbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.7" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#94a3b8" />
          </marker>
        </defs>

        <text x="550" y="35" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: "26px", fontWeight: 700 }}>
          JWT Authentication Flow
        </text>
        <text x="550" y="60" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "13px" }}>
          Complete request-response cycle with JWT tokens
        </text>

        {/* BOXES - Define positions clearly */}
        {/* Client: x=80-220, y=100-180 */}
        <rect
          x="80"
          y="100"
          width="140"
          height="80"
          rx="10"
          fill="url(#clientGrad)"
          stroke="#60a5fa"
          strokeWidth="2.5"
        />
        <text x="150" y="138" textAnchor="middle" fill="white" style={{ fontSize: "17px", fontWeight: 700 }}>
          Client
        </text>
        <text x="150" y="162" textAnchor="middle" fill="rgba(255,255,255,0.9)" style={{ fontSize: "12px" }}>
          Browser / App
        </text>

        {/* Auth Server: x=320-480, y=100-180 */}
        <rect
          x="320"
          y="100"
          width="160"
          height="80"
          rx="10"
          fill="url(#authGrad)"
          stroke="#4ade80"
          strokeWidth="2.5"
        />
        <text x="400" y="138" textAnchor="middle" fill="white" style={{ fontSize: "17px", fontWeight: 700 }}>
          Auth Server
        </text>
        <text x="400" y="162" textAnchor="middle" fill="rgba(255,255,255,0.9)" style={{ fontSize: "12px" }}>
          /api/token
        </text>

        {/* API Server: x=640-800, y=100-180 */}
        <rect x="640" y="100" width="160" height="80" rx="10" fill="url(#apiGrad)" stroke="#fb923c" strokeWidth="2.5" />
        <text x="720" y="138" textAnchor="middle" fill="white" style={{ fontSize: "17px", fontWeight: 700 }}>
          API Server
        </text>
        <text x="720" y="162" textAnchor="middle" fill="rgba(255,255,255,0.9)" style={{ fontSize: "12px" }}>
          Protected APIs
        </text>

        {/* Database: x=320-480, y=350-430 */}
        <rect x="320" y="350" width="160" height="80" rx="10" fill="url(#dbGrad)" stroke="#a78bfa" strokeWidth="2.5" />
        <text x="400" y="388" textAnchor="middle" fill="white" style={{ fontSize: "17px", fontWeight: 700 }}>
          Database
        </text>
        <text x="400" y="412" textAnchor="middle" fill="rgba(255,255,255,0.9)" style={{ fontSize: "12px" }}>
          Users
        </text>

        {/* Step 1: Client(220) → Auth(320) - Login */}
        <line x1="220" y1="135" x2="310" y2="135" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="265" y="123" textAnchor="middle" fill="#22c55e" style={{ fontSize: "13px", fontWeight: 700 }}>
          ① Login
        </text>
        <text x="265" y="152" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "10px" }}>
          username/password
        </text>

        {/* Step 2: Auth(400) → Database(400) - Validate */}
        <line x1="400" y1="180" x2="400" y2="340" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="425" y="265" fill="#22c55e" style={{ fontSize: "13px", fontWeight: 700 }}>
          ② Validate
        </text>

        {/* Step 3: Database(400) → Auth(400) - User data */}
        <line x1="400" y1="350" x2="400" y2="190" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="355" y="268" fill="#8b5cf6" style={{ fontSize: "12px", fontWeight: 700 }}>
          ③ User data
        </text>

        {/* Step 4: Auth(320) → Client(220) - JWT Token */}
        <line x1="320" y1="165" x2="221" y2="165" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="270" y="155" textAnchor="middle" fill="#3b82f6" style={{ fontSize: "13px", fontWeight: 700 }}>
          ④ JWT Token
        </text>

        {/* Step 5: Client → API - Route BELOW Auth Server (y=250) to avoid overlap */}
        <path
          d="M 220 200 L 220 250 L 630 250 L 630 200"
          fill="none"
          stroke="#f97316"
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
        <text x="425" y="238" textAnchor="middle" fill="#f97316" style={{ fontSize: "13px", fontWeight: 700 }}>
          ⑤ API Request
        </text>
        <text x="425" y="265" textAnchor="middle" fill="#94a3b8" style={{ fontSize: "10px" }}>
          Bearer {`<token>`}
        </text>

        {/* Step 6: API Server - Verify JWT (internal, shown as box below API) */}
        <rect x="680" y="230" width="140" height="55" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
        <text x="750" y="255" textAnchor="middle" fill="#22c55e" style={{ fontSize: "13px", fontWeight: 700 }}>
          ⑥ Verify JWT
        </text>
        <text x="750" y="273" textAnchor="middle" fill="rgba(255,255,255,0.7)" style={{ fontSize: "10px" }}>
          Check signature
        </text>
        <line x1="720" y1="180" x2="720" y2="228" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Step 7: API → Client - Route BELOW boxes (y=300) */}
        <path
          d="M 640 260 L 640 305 L 221 305 L 221 200"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
        <text x="430" y="318" textAnchor="middle" fill="#22c55e" style={{ fontSize: "13px", fontWeight: 700 }}>
          ⑦ Resource
        </text>

        {/* JWT Structure */}
        <rect x="80" y="460" width="240" height="150" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
        <text x="200" y="492" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: "15px", fontWeight: 700 }}>
          JWT Structure
        </text>
        <line x1="100" y1="505" x2="300" y2="505" stroke="#475569" strokeWidth="1.5" />
        <text x="100" y="530" fill="#94a3b8" style={{ fontSize: "12px", fontFamily: "monospace" }}>
          Header . Payload . Signature
        </text>
        <text x="100" y="555" fill="#64748b" style={{ fontSize: "11px" }}>
          • Header: alg (HS256), typ (JWT)
        </text>
        <text x="100" y="578" fill="#64748b" style={{ fontSize: "11px" }}>
          • Payload: sub, exp, iat, claims
        </text>
        <text x="100" y="598" fill="#64748b" style={{ fontSize: "11px" }}>
          • Signature: HMAC-SHA256
        </text>

        {/* Steps Summary */}
        <rect x="360" y="460" width="720" height="150" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
        <text x="720" y="492" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: "15px", fontWeight: 700 }}>
          Authentication Steps
        </text>
        <text x="400" y="530" fill="#94a3b8" style={{ fontSize: "12px" }}>
          ① Login → ② Validate → ③ User Data → ④ JWT Token
        </text>
        <text x="400" y="558" fill="#94a3b8" style={{ fontSize: "12px" }}>
          ⑤ API Request with Bearer Token
        </text>
        <text x="400" y="586" fill="#94a3b8" style={{ fontSize: "12px" }}>
          ⑥ Verify Signature → ⑦ Return Protected Resource
        </text>
      </svg>
    </div>
  );
}
