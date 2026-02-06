'use client'

/**
 * Refresh Token Flow - Fixed alignment
 * All arrows connect precisely, same y-levels for paired flows
 */

export default function RefreshTokenFlowDiagram() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 1280 780" className="w-full h-auto">
        <defs>
          <linearGradient id="clientGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="authGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="apiGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="dbGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8" />
          </linearGradient>
          <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#94a3b8" />
          </marker>
        </defs>

        <text x="640" y="38" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: '28px', fontWeight: 700 }}>Refresh Token Strategy</text>
        <text x="640" y="68" textAnchor="middle" fill="#94a3b8" style={{ fontSize: '14px' }}>Secure session management with short-lived access tokens</text>

        {/* PHASE 1 */}
        <rect x="30" y="95" width="1220" height="185" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="2" opacity="0.5" />
        <text x="50" y="130" fill="#94a3b8" style={{ fontSize: '15px', fontWeight: 700 }}>Phase 1: Initial Login</text>

        {/* Phase 1 Boxes - aligned horizontally */}
        <rect x="80" y="155" width="130" height="75" rx="8" fill="url(#clientGrad2)" stroke="#60a5fa" strokeWidth="2.5" />
        <text x="145" y="197" textAnchor="middle" fill="white" style={{ fontSize: '17px', fontWeight: 700 }}>Client</text>

        <rect x="330" y="155" width="130" height="75" rx="8" fill="url(#authGrad2)" stroke="#4ade80" strokeWidth="2.5" />
        <text x="395" y="190" textAnchor="middle" fill="white" style={{ fontSize: '17px', fontWeight: 700 }}>Auth Server</text>

        <rect x="580" y="155" width="130" height="75" rx="8" fill="url(#apiGrad2)" stroke="#fb923c" strokeWidth="2.5" />
        <text x="645" y="197" textAnchor="middle" fill="white" style={{ fontSize: '17px', fontWeight: 700 }}>API Server</text>

        <rect x="830" y="155" width="140" height="75" rx="8" fill="url(#dbGrad2)" stroke="#a78bfa" strokeWidth="2.5" />
        <text x="900" y="197" textAnchor="middle" fill="white" style={{ fontSize: '17px', fontWeight: 700 }}>Token Database</text>

        {/* Phase 1 Arrows - precise connections */}
        <line x1="210" y1="185" x2="320" y2="185" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="265" y="173" textAnchor="middle" fill="#22c55e" style={{ fontSize: '12px', fontWeight: 700 }}>① Login</text>

        <line x1="330" y1="205" x2="221" y2="205" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="275" y="225" textAnchor="middle" fill="#3b82f6" style={{ fontSize: '12px', fontWeight: 700 }}>② Tokens</text>

        <line x1="460" y1="192" x2="571" y2="192" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="515" y="182" textAnchor="middle" fill="#8b5cf6" style={{ fontSize: '11px' }}>Store Refresh Token</text>

        <line x1="710" y1="192" x2="821" y2="192" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="765" y="182" textAnchor="middle" fill="#8b5cf6" style={{ fontSize: '11px' }}>Save to DB</text>

        {/* Tokens Received - right side */}
        <rect x="1010" y="145" width="220" height="100" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
        <text x="1120" y="172" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: '14px', fontWeight: 700 }}>Tokens Received</text>
        <rect x="1025" y="185" width="190" height="26" rx="4" fill="#1e40af" stroke="#60a5fa" strokeWidth="1.5" />
        <text x="1120" y="203" textAnchor="middle" fill="#93c5fd" style={{ fontSize: '11px', fontWeight: 600 }}>Access Token (15 min)</text>
        <rect x="1025" y="216" width="190" height="26" rx="4" fill="#166534" stroke="#4ade80" strokeWidth="1.5" />
        <text x="1120" y="234" textAnchor="middle" fill="#86efac" style={{ fontSize: '11px', fontWeight: 600 }}>Refresh Token (7 days)</text>

        {/* PHASE 2 */}
        <rect x="30" y="305" width="1220" height="155" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="2" opacity="0.5" />
        <text x="50" y="340" fill="#94a3b8" style={{ fontSize: '15px', fontWeight: 700 }}>Phase 2: Using Access Token</text>

        <line x1="210" y1="385" x2="571" y2="385" stroke="#f97316" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="390" y="373" textAnchor="middle" fill="#f97316" style={{ fontSize: '12px', fontWeight: 700 }}>③ API Request + Access Token</text>

        <line x1="580" y1="415" x2="221" y2="415" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="400" y="438" textAnchor="middle" fill="#22c55e" style={{ fontSize: '12px', fontWeight: 700 }}>④ Response (Success)</text>

        <rect x="830" y="355" width="400" height="90" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
        <text x="1030" y="382" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: '14px', fontWeight: 700 }}>Token Lifetimes</text>
        <text x="850" y="410" fill="#93c5fd" style={{ fontSize: '12px' }}>• Access Token: 15-60 min</text>
        <text x="850" y="432" fill="#86efac" style={{ fontSize: '12px' }}>• Refresh Token: 7-30 days • Can be revoked</text>

        {/* PHASE 3 - Aligned y-levels */}
        <rect x="30" y="485" width="1220" height="265" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="2" opacity="0.5" />
        <text x="50" y="520" fill="#94a3b8" style={{ fontSize: '15px', fontWeight: 700 }}>Phase 3: Access Token Expired → Refresh</text>

        {/* Row 1: ⑤ & ⑥ - SAME start/end x */}
        <line x1="210" y1="555" x2="571" y2="555" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead2)" strokeDasharray="6,6" />
        <text x="390" y="543" textAnchor="middle" fill="#ef4444" style={{ fontSize: '12px', fontWeight: 700 }}>⑤ API Request (Token Expired)</text>

        <line x1="580" y1="585" x2="221" y2="585" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="400" y="608" textAnchor="middle" fill="#ef4444" style={{ fontSize: '12px', fontWeight: 700 }}>⑥ 401 Unauthorized</text>

        {/* Row 2: ⑦ & Verify - aligned */}
        <line x1="210" y1="640" x2="320" y2="640" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="265" y="628" textAnchor="middle" fill="#22c55e" style={{ fontSize: '12px', fontWeight: 700 }}>⑦ Send Refresh Token</text>

        <line x1="460" y1="640" x2="821" y2="640" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="640" y="628" textAnchor="middle" fill="#8b5cf6" style={{ fontSize: '11px' }}>Verify in DB</text>

        {/* Row 3: Valid & ⑧ - aligned */}
        <line x1="830" y1="675" x2="461" y2="675" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="645" y="663" textAnchor="middle" fill="#8b5cf6" style={{ fontSize: '11px' }}>Valid</text>

        <line x1="330" y1="710" x2="221" y2="710" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowhead2)" />
        <text x="275" y="698" textAnchor="middle" fill="#3b82f6" style={{ fontSize: '12px', fontWeight: 700 }}>⑧ New Access Token</text>
      </svg>
    </div>
  )
}
