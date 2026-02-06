'use client'

/**
 * JWT Structure Diagram - ByteByteGo Style
 * Visualizing Header, Payload, and Signature
 */

export default function JwtStructureDiagram() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 1000 400" className="w-full h-auto">
        <defs>
          <linearGradient id="headerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="payloadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="signatureGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Title */}
        <text x="500" y="40" textAnchor="middle" fill="#e2e8f0" style={{ fontSize: '24px', fontWeight: 700 }}>
          JWT Token Structure
        </text>
        <text x="500" y="65" textAnchor="middle" fill="#94a3b8" style={{ fontSize: '14px' }}>
          Header . Payload . Signature
        </text>

        {/* Token Parts */}
        {/* Header */}
        <g className="hover-scale">
          <rect x="50" y="120" width="280" height="220" rx="12" fill="url(#headerGrad)" stroke="#60a5fa" strokeWidth="2" />
          <text x="190" y="160" textAnchor="middle" fill="white" style={{ fontSize: '20px', fontWeight: 700 }}>
            📋 Header
          </text>
          <line x1="70" y1="175" x2="310" y2="175" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          
          <text x="80" y="210" fill="rgba(255,255,255,0.9)" style={{ fontSize: '13px', fontFamily: 'monospace' }}>
            {`{`}
          </text>
          <text x="100" y="235" fill="#93c5fd" style={{ fontSize: '13px', fontFamily: 'monospace' }}>
            "alg": "HS256"
          </text>
          <text x="100" y="260" fill="#93c5fd" style={{ fontSize: '13px', fontFamily: 'monospace' }}>
            "typ": "JWT"
          </text>
          <text x="80" y="285" fill="rgba(255,255,255,0.9)" style={{ fontSize: '13px', fontFamily: 'monospace' }}>
            {`}`}
          </text>
          
          <text x="190" y="315" textAnchor="middle" fill="rgba(255,255,255,0.7)" style={{ fontSize: '11px' }}>
            Algorithm & Token Type
          </text>
        </g>

        {/* Payload */}
        <g className="hover-scale">
          <rect x="360" y="120" width="280" height="220" rx="12" fill="url(#payloadGrad)" stroke="#4ade80" strokeWidth="2" />
          <text x="500" y="160" textAnchor="middle" fill="white" style={{ fontSize: '20px', fontWeight: 700 }}>
            📦 Payload
          </text>
          <line x1="380" y1="175" x2="620" y2="175" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          
          <text x="390" y="210" fill="rgba(255,255,255,0.9)" style={{ fontSize: '13px', fontFamily: 'monospace' }}>
            {`{`}
          </text>
          <text x="410" y="235" fill="#86efac" style={{ fontSize: '13px', fontFamily: 'monospace' }}>
            "sub": "user123"
          </text>
          <text x="410" y="260" fill="#86efac" style={{ fontSize: '13px', fontFamily: 'monospace' }}>
            "name": "John Doe"
          </text>
          <text x="410" y="285" fill="#86efac" style={{ fontSize: '13px', fontFamily: 'monospace' }}>
            "exp": 1735689600
          </text>
          <text x="390" y="310" fill="rgba(255,255,255,0.9)" style={{ fontSize: '13px', fontFamily: 'monospace' }}>
            {`}`}
          </text>
          
          <text x="500" y="332" textAnchor="middle" fill="rgba(255,255,255,0.7)" style={{ fontSize: '11px' }}>
            Claims & User Data
          </text>
        </g>

        {/* Signature */}
        <g className="hover-scale">
          <rect x="670" y="120" width="280" height="220" rx="12" fill="url(#signatureGrad)" stroke="#fb923c" strokeWidth="2" />
          <text x="810" y="160" textAnchor="middle" fill="white" style={{ fontSize: '20px', fontWeight: 700 }}>
            🔐 Signature
          </text>
          <line x1="690" y1="175" x2="930" y2="175" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          
          <text x="810" y="215" textAnchor="middle" fill="#fdba74" style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 600 }}>
            HMACSHA256(
          </text>
          <text x="810" y="240" textAnchor="middle" fill="rgba(255,255,255,0.9)" style={{ fontSize: '11px', fontFamily: 'monospace' }}>
            base64UrlEncode(header)
          </text>
          <text x="810" y="260" textAnchor="middle" fill="rgba(255,255,255,0.9)" style={{ fontSize: '11px', fontFamily: 'monospace' }}>
            + "." +
          </text>
          <text x="810" y="280" textAnchor="middle" fill="rgba(255,255,255,0.9)" style={{ fontSize: '11px', fontFamily: 'monospace' }}>
            base64UrlEncode(payload),
          </text>
          <text x="810" y="305" textAnchor="middle" fill="#fdba74" style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 600 }}>
            secret
          </text>
          <text x="810" y="325" textAnchor="middle" fill="#fdba74" style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 600 }}>
            )
          </text>
        </g>

        {/* Connecting dots */}
        <circle cx="330" cy="230" r="4" fill="#94a3b8" />
        <circle cx="360" cy="230" r="4" fill="#94a3b8" />
        <circle cx="640" cy="230" r="4" fill="#94a3b8" />
        <circle cx="670" cy="230" r="4" fill="#94a3b8" />

        {/* Bottom explanation */}
        <rect x="200" y="365" width="600" height="1" fill="#475569" />
        <text x="500" y="390" textAnchor="middle" fill="#64748b" style={{ fontSize: '12px' }}>
          Base64URL Encoded • Separated by dots (.) • Signature prevents tampering
        </text>
      </svg>
    </div>
  )
}
