'use client'

/**
 * JWT vs Session - Fixed flow: Client ↔ Server
 * Step 3 & 4 arrows connect to Server box, not Verify/Lookup
 */

export default function JwtVsSessionDiagram() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 1400 720" className="w-full h-auto">
        <defs>
          <linearGradient id="jwtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="sessionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
          </linearGradient>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#94a3b8" />
          </marker>
        </defs>

        <text x="700" y="38" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: '28px', fontWeight: 700 }}>JWT vs Session Authentication</text>
        <text x="700" y="68" textAnchor="middle" fill="#94a3b8" style={{ fontSize: '14px' }}>Understanding the key differences</text>

        {/* ===== LEFT: JWT ===== */}
        <g>
          <rect x="40" y="95" width="640" height="600" rx="14" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="360" y="140" textAnchor="middle" fill="#3b82f6" style={{ fontSize: '22px', fontWeight: 700 }}>🔵 JWT (Stateless)</text>

          {/* Client & Server - same row */}
          <rect x="100" y="180" width="140" height="75" rx="8" fill="url(#jwtGrad)" stroke="#60a5fa" strokeWidth="2.5" />
          <text x="170" y="222" textAnchor="middle" fill="white" style={{ fontSize: '16px', fontWeight: 700 }}>Client</text>

          <rect x="460" y="180" width="140" height="75" rx="8" fill="url(#jwtGrad)" stroke="#60a5fa" strokeWidth="2.5" />
          <text x="530" y="222" textAnchor="middle" fill="white" style={{ fontSize: '16px', fontWeight: 700 }}>Server</text>

          {/* ① Login: Client right(240) → Server left(460) */}
          <line x1="240" y1="208" x2="450" y2="208" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="345" y="196" textAnchor="middle" fill="#22c55e" style={{ fontSize: '12px', fontWeight: 700 }}>① Login</text>

          {/* ② JWT: Server left(460) → Client right(240) */}
          <line x1="460" y1="238" x2="241" y2="238" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="350" y="258" textAnchor="middle" fill="#3b82f6" style={{ fontSize: '12px', fontWeight: 700 }}>② JWT Token</text>

          {/* JWT Storage - below Client, connected conceptually */}
          <rect x="80" y="320" width="180" height="60" rx="8" fill="#1e40af" stroke="#60a5fa" strokeWidth="2" />
          <text x="170" y="348" textAnchor="middle" fill="#93c5fd" style={{ fontSize: '13px', fontWeight: 700 }}>JWT in Storage</text>
          <text x="170" y="368" textAnchor="middle" fill="rgba(255,255,255,0.85)" style={{ fontSize: '10px', fontFamily: 'monospace' }}>eyJhbGc...xyz</text>

          {/* ③ Request: Client → Server (connects to Server box!) */}
          <line x1="240" y1="395" x2="450" y2="395" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="345" y="383" textAnchor="middle" fill="#f97316" style={{ fontSize: '12px', fontWeight: 700 }}>③ Request + JWT</text>

          {/* Verify box - BELOW Server, with connector */}
          <line x1="530" y1="255" x2="530" y2="355" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4,4" />
          <rect x="430" y="360" width="200" height="75" rx="8" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" />
          <text x="530" y="393" textAnchor="middle" fill="#93c5fd" style={{ fontSize: '13px', fontWeight: 700 }}>Verify Signature</text>
          <text x="530" y="412" textAnchor="middle" fill="rgba(255,255,255,0.7)" style={{ fontSize: '10px' }}>No DB lookup • Token has all data</text>

          {/* ④ Response: Server → Client */}
          <line x1="460" y1="470" x2="241" y2="470" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="350" y="490" textAnchor="middle" fill="#22c55e" style={{ fontSize: '12px', fontWeight: 700 }}>④ Response</text>

          <text x="360" y="540" textAnchor="middle" fill="#94a3b8" style={{ fontSize: '13px', fontWeight: 700 }}>✓ No server storage • ✓ Scalable</text>
          <text x="360" y="565" textAnchor="middle" fill="#64748b" style={{ fontSize: '12px' }}>✗ Cannot revoke • ✗ Larger payload</text>
        </g>

        {/* ===== RIGHT: Session ===== */}
        <g>
          <rect x="720" y="95" width="640" height="600" rx="14" fill="#1e293b" stroke="#f97316" strokeWidth="2.5" />
          <text x="1040" y="140" textAnchor="middle" fill="#f97316" style={{ fontSize: '22px', fontWeight: 700 }}>🟠 Session (Stateful)</text>

          <rect x="780" y="180" width="140" height="75" rx="8" fill="url(#sessionGrad)" stroke="#fb923c" strokeWidth="2.5" />
          <text x="850" y="222" textAnchor="middle" fill="white" style={{ fontSize: '16px', fontWeight: 700 }}>Client</text>

          <rect x="1140" y="180" width="140" height="75" rx="8" fill="url(#sessionGrad)" stroke="#fb923c" strokeWidth="2.5" />
          <text x="1210" y="222" textAnchor="middle" fill="white" style={{ fontSize: '16px', fontWeight: 700 }}>Server</text>

          {/* ① Login */}
          <line x1="920" y1="208" x2="1130" y2="208" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="1025" y="196" textAnchor="middle" fill="#22c55e" style={{ fontSize: '12px', fontWeight: 700 }}>① Login</text>

          {/* ② Session Cookie */}
          <line x1="1140" y1="238" x2="921" y2="238" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="1030" y="258" textAnchor="middle" fill="#f97316" style={{ fontSize: '12px', fontWeight: 700 }}>② Session ID Cookie</text>

          {/* Cookie - below Client */}
          <rect x="760" y="320" width="180" height="60" rx="8" fill="#7c2d12" stroke="#fb923c" strokeWidth="2" />
          <text x="850" y="348" textAnchor="middle" fill="#fdba74" style={{ fontSize: '13px', fontWeight: 700 }}>Cookie</text>
          <text x="850" y="368" textAnchor="middle" fill="rgba(255,255,255,0.85)" style={{ fontSize: '10px', fontFamily: 'monospace' }}>session_id=abc123</text>

          {/* Session Store - next to Server */}
          <rect x="1120" y="300" width="180" height="85" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
          <text x="1210" y="328" textAnchor="middle" fill="#c4b5fd" style={{ fontSize: '13px', fontWeight: 700 }}>Session Store</text>
          <text x="1210" y="350" textAnchor="middle" fill="rgba(255,255,255,0.75)" style={{ fontSize: '10px', fontFamily: 'monospace' }}>{`{`}</text>
          <text x="1210" y="368" textAnchor="middle" fill="rgba(255,255,255,0.75)" style={{ fontSize: '10px', fontFamily: 'monospace' }}>abc123: user_data</text>
          <text x="1210" y="382" textAnchor="middle" fill="rgba(255,255,255,0.75)" style={{ fontSize: '10px', fontFamily: 'monospace' }}>{`}`}</text>

          {/* ③ Request: Client → Server */}
          <line x1="920" y1="395" x2="1130" y2="395" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="1025" y="383" textAnchor="middle" fill="#f97316" style={{ fontSize: '12px', fontWeight: 700 }}>③ Request + Cookie</text>

          {/* Lookup - below Server */}
          <line x1="1210" y1="255" x2="1210" y2="405" stroke="#fb923c" strokeWidth="1.5" strokeDasharray="4,4" />
          <rect x="1110" y="410" width="200" height="75" rx="8" fill="#1e293b" stroke="#fb923c" strokeWidth="2" />
          <text x="1210" y="443" textAnchor="middle" fill="#fdba74" style={{ fontSize: '13px', fontWeight: 700 }}>Lookup Session</text>
          <text x="1210" y="462" textAnchor="middle" fill="rgba(255,255,255,0.7)" style={{ fontSize: '10px' }}>Query DB/Redis • Get user data</text>

          {/* ④ Response */}
          <line x1="1140" y1="520" x2="921" y2="520" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="1030" y="540" textAnchor="middle" fill="#22c55e" style={{ fontSize: '12px', fontWeight: 700 }}>④ Response</text>

          <text x="1040" y="585" textAnchor="middle" fill="#94a3b8" style={{ fontSize: '13px', fontWeight: 700 }}>✓ Can revoke • ✓ Small cookie</text>
          <text x="1040" y="610" textAnchor="middle" fill="#64748b" style={{ fontSize: '12px' }}>✗ Server storage • ✗ Scaling complexity</text>
        </g>

        <line x1="700" y1="115" x2="700" y2="695" stroke="#475569" strokeWidth="2" strokeDasharray="8,8" />
      </svg>
    </div>
  )
}
