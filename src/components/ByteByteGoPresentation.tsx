"use client";

/**
 * JWT Authentication Flow - ByteByteGo Style Presentation
 * Single Page Scrolling Design
 * Chapter 06 - Implement Security in RESTful Web Service
 */

import { useEffect, useState } from "react";
import JwtFlowDiagram from "./JwtFlowDiagram";
import JwtStructureDiagram from "./JwtStructureDiagram";
import JwtVsSessionDiagram from "./JwtVsSessionDiagram";
import RefreshTokenFlowDiagram from "./RefreshTokenFlowDiagram";

export default function ByteByteGoPresentation() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-green-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-block px-4 py-2 mb-6 rounded-full bg-blue-500/20 border border-blue-500/30">
            <span className="text-blue-400 text-sm font-semibold">Chapter 06 - RESTful Web Service Security</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 text-transparent bg-clip-text">
            JWT Authentication Flow
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            Implementing Secure Authentication in RESTful Web Services
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center text-sm text-slate-400 mb-12">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              ByteByteGo Style Diagrams
            </span>
            <span>•</span>
            <span>PRN232</span>
            <span>•</span>
            <span>JSON Web Token</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="byte-card text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Stateless</h3>
              <p className="text-sm text-slate-400">No server-side session storage</p>
            </div>
            <div className="byte-card text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">Scalable</h3>
              <p className="text-sm text-slate-400">Perfect for distributed systems</p>
            </div>
            <div className="byte-card text-center transform hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Cross-Domain</h3>
              <p className="text-sm text-slate-400">Works across different domains</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-slate-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* JWT Authentication Flow Diagram */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">JWT Authentication Flow</h2>
            <p className="text-slate-400 text-lg">Complete request-response cycle with JWT tokens</p>
          </div>

          <div className="byte-card-large">
            <JwtFlowDiagram />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="byte-card border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-blue-400">①</span>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-1">Login Request</h4>
                  <p className="text-sm text-slate-400">Client sends username & password to Auth Server</p>
                </div>
              </div>
            </div>
            <div className="byte-card border-l-4 border-green-500">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-green-400">②③</span>
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">Validation</h4>
                  <p className="text-sm text-slate-400">Auth Server validates credentials with Database</p>
                </div>
              </div>
            </div>
            <div className="byte-card border-l-4 border-orange-500">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-orange-400">④</span>
                <div>
                  <h4 className="font-semibold text-orange-400 mb-1">Generate JWT</h4>
                  <p className="text-sm text-slate-400">Server creates and returns signed JWT token</p>
                </div>
              </div>
            </div>
            <div className="byte-card border-l-4 border-purple-500">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-purple-400">⑤⑥⑦</span>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-1">API Access</h4>
                  <p className="text-sm text-slate-400">Client uses JWT to access protected resources</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JWT Structure */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">JWT Structure</h2>
            <p className="text-slate-400 text-lg">Understanding the three components of a JWT token</p>
          </div>

          <div className="byte-card-large mb-12">
            <JwtStructureDiagram />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Header */}
            <div className="byte-card border-t-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-400">Header</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-800/50 rounded-lg font-mono text-sm text-slate-300">
                  {`{\n  "alg": "HS256",\n  "typ": "JWT"\n}`}
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>
                    <span className="text-blue-400 font-semibold">alg:</span> Algorithm (HS256, RS256)
                  </p>
                  <p>
                    <span className="text-blue-400 font-semibold">typ:</span> Token type (JWT)
                  </p>
                </div>
              </div>
            </div>

            {/* Payload */}
            <div className="byte-card border-t-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="text-2xl font-bold text-green-400">Payload</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-800/50 rounded-lg font-mono text-sm text-slate-300">
                  {`{\n  "sub": "user123",\n  "name": "John",\n  "exp": 1735689600\n}`}
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>
                    <span className="text-green-400 font-semibold">sub:</span> Subject (user ID)
                  </p>
                  <p>
                    <span className="text-green-400 font-semibold">exp:</span> Expiration time
                  </p>
                  <p>
                    <span className="text-green-400 font-semibold">iat:</span> Issued at time
                  </p>
                  <p>
                    <span className="text-green-400 font-semibold">Custom claims:</span> Role, permissions
                  </p>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="byte-card border-t-4 border-orange-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <span className="text-2xl">🔐</span>
                </div>
                <h3 className="text-2xl font-bold text-orange-400">Signature</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-800/50 rounded-lg font-mono text-xs text-slate-300 break-all">
                  HMACSHA256( base64UrlEncode(header) + "." + base64UrlEncode(payload), secret )
                </div>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>
                    <span className="text-orange-400 font-semibold">Purpose:</span> Verify integrity
                  </p>
                  <p>
                    <span className="text-orange-400 font-semibold">Secret:</span> Known only to server
                  </p>
                  <p>
                    <span className="text-orange-400 font-semibold">Prevents:</span> Token tampering
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Example Token */}
          <div className="byte-card mt-8">
            <h4 className="text-lg font-semibold text-white mb-3">Complete JWT Token Example:</h4>
            <div className="p-4 bg-slate-800/50 rounded-lg font-mono text-xs overflow-x-auto">
              <div className="flex gap-1 items-center flex-wrap">
                <span className="text-blue-400">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
                <span className="text-slate-500">.</span>
                <span className="text-green-400">eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkpvaG4iLCJleHAiOjE3MzU2ODk2MDB9</span>
                <span className="text-slate-500">.</span>
                <span className="text-orange-400">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
              </div>
            </div>
            <div className="flex gap-6 mt-3 text-xs">
              <span className="text-blue-400">■ Header</span>
              <span className="text-green-400">■ Payload</span>
              <span className="text-orange-400">■ Signature</span>
            </div>
          </div>
        </div>
      </section>

      {/* JWT vs Session Authentication */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">JWT vs Session Authentication</h2>
            <p className="text-slate-400 text-lg">Understanding the key differences</p>
          </div>

          <div className="byte-card-large mb-12">
            <JwtVsSessionDiagram />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="byte-card border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
                <span>🔵</span> JWT (Stateless)
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-slate-200">No server storage</p>
                    <p className="text-sm text-slate-400">Token contains all user info</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-slate-200">Highly scalable</p>
                    <p className="text-sm text-slate-400">Works across multiple servers</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-slate-200">Cross-domain support</p>
                    <p className="text-sm text-slate-400">CORS-friendly for SPAs</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-400 text-xl">✗</span>
                  <div>
                    <p className="font-semibold text-slate-200">Cannot invalidate</p>
                    <p className="text-sm text-slate-400">Valid until expiration</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-400 text-xl">✗</span>
                  <div>
                    <p className="font-semibold text-slate-200">Token size</p>
                    <p className="text-sm text-slate-400">Larger payload in requests</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="byte-card border-l-4 border-orange-500">
              <h3 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-3">
                <span>🟠</span> Session (Stateful)
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-slate-200">Easy to revoke</p>
                    <p className="text-sm text-slate-400">Logout immediately effective</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-slate-200">Small cookie</p>
                    <p className="text-sm text-slate-400">Only session ID transmitted</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <div>
                    <p className="font-semibold text-slate-200">Server control</p>
                    <p className="text-sm text-slate-400">Full session management</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-400 text-xl">✗</span>
                  <div>
                    <p className="font-semibold text-slate-200">Server memory/DB</p>
                    <p className="text-sm text-slate-400">Requires storage infrastructure</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-red-400 text-xl">✗</span>
                  <div>
                    <p className="font-semibold text-slate-200">Scaling challenges</p>
                    <p className="text-sm text-slate-400">Session sharing complexity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Refresh Token Flow */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Refresh Token Strategy</h2>
            <p className="text-slate-400 text-lg">Secure session management with short-lived access tokens</p>
          </div>

          <div className="byte-card-large mb-12">
            <RefreshTokenFlowDiagram />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="byte-card">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Access Token</h3>
              <div className="space-y-3 text-sm">
                <p className="text-slate-300">
                  <span className="text-blue-400 font-semibold">Purpose:</span> Access protected resources
                </p>
                <p className="text-slate-300">
                  <span className="text-blue-400 font-semibold">Lifetime:</span> Short (15 minutes - 1 hour)
                </p>
                <p className="text-slate-300">
                  <span className="text-blue-400 font-semibold">Storage:</span> Memory or localStorage
                </p>
                <p className="text-slate-300">
                  <span className="text-blue-400 font-semibold">Security:</span> Minimize damage if stolen
                </p>
              </div>
            </div>

            <div className="byte-card">
              <h3 className="text-xl font-bold text-green-400 mb-4">Refresh Token</h3>
              <div className="space-y-3 text-sm">
                <p className="text-slate-300">
                  <span className="text-green-400 font-semibold">Purpose:</span> Obtain new access token
                </p>
                <p className="text-slate-300">
                  <span className="text-green-400 font-semibold">Lifetime:</span> Long (7 days - 30 days)
                </p>
                <p className="text-slate-300">
                  <span className="text-green-400 font-semibold">Storage:</span> Secure httpOnly cookie
                </p>
                <p className="text-slate-300">
                  <span className="text-green-400 font-semibold">Security:</span> Can be revoked in database
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Security Best Practices</h2>
            <p className="text-slate-400 text-lg">Essential guidelines for JWT implementation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🔒",
                title: "Always Use HTTPS",
                desc: "Encrypt all communication to prevent token interception",
                color: "blue",
              },
              {
                icon: "⏱️",
                title: "Short Expiration",
                desc: "Set exp claim to 15-60 minutes for access tokens",
                color: "green",
              },
              {
                icon: "🔄",
                title: "Refresh Tokens",
                desc: "Implement refresh token rotation for better security",
                color: "orange",
              },
              {
                icon: "🚫",
                title: "No Sensitive Data",
                desc: "Never store passwords or credit cards in JWT payload",
                color: "red",
              },
              {
                icon: "🍪",
                title: "Secure Storage",
                desc: "Use httpOnly cookies or secure storage mechanisms",
                color: "purple",
              },
              {
                icon: "✅",
                title: "Validate Signature",
                desc: "Always verify JWT signature on every request",
                color: "pink",
              },
              {
                icon: "🔑",
                title: "Strong Secret",
                desc: "Use long random string (256+ bits) for HMAC secret",
                color: "yellow",
              },
              {
                icon: "📝",
                title: "Token Whitelist",
                desc: "Maintain blacklist/whitelist for revocation support",
                color: "cyan",
              },
              {
                icon: "🛡️",
                title: "CSRF Protection",
                desc: "Implement CSRF tokens when using cookie storage",
                color: "indigo",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`byte-card border-l-4 border-${item.color}-500 hover:scale-105 transition-transform`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <h3 className={`font-bold text-${item.color}-400 mb-2`}>{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Vulnerabilities */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Common JWT Vulnerabilities</h2>
            <p className="text-slate-400 text-lg">What to watch out for and how to prevent</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="byte-card border-l-4 border-red-500">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-400">None Algorithm Attack</h3>
                  <p className="text-sm text-slate-400 mt-1">Attacker changes "alg" to "none"</p>
                </div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg mb-3 font-mono text-xs text-red-300">
                {`// Vulnerable\n{\n  "alg": "none",\n  "typ": "JWT"\n}`}
              </div>
              <div className="text-sm text-slate-300">
                <span className="text-green-400 font-semibold">Prevention:</span> Always enforce algorithm validation
              </div>
            </div>

            <div className="byte-card border-l-4 border-orange-500">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🔓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-orange-400">Weak Secret Key</h3>
                  <p className="text-sm text-slate-400 mt-1">Easily guessable or short secrets</p>
                </div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg mb-3 font-mono text-xs text-orange-300">
                {`// Bad\nsecret = "password123"\n\n// Good\nsecret = "x9k2...256bits...8f3q"`}
              </div>
              <div className="text-sm text-slate-300">
                <span className="text-green-400 font-semibold">Prevention:</span> Use cryptographically secure random
                strings
              </div>
            </div>

            <div className="byte-card border-l-4 border-yellow-500">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📦</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400">Sensitive Data Exposure</h3>
                  <p className="text-sm text-slate-400 mt-1">Storing confidential info in payload</p>
                </div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg mb-3 font-mono text-xs text-yellow-300">
                {`// Never do this!\n{\n  "password": "secret123",\n  "creditCard": "1234-5678"\n}`}
              </div>
              <div className="text-sm text-slate-300">
                <span className="text-green-400 font-semibold">Prevention:</span> JWT is Base64 encoded, not encrypted
              </div>
            </div>

            <div className="byte-card border-l-4 border-purple-500">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">⏰</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-purple-400">No Expiration Time</h3>
                  <p className="text-sm text-slate-400 mt-1">Token valid forever if stolen</p>
                </div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg mb-3 font-mono text-xs text-purple-300">
                {`// Always include exp\n{\n  "sub": "user123",\n  "exp": 1735689600\n}`}
              </div>
              <div className="text-sm text-slate-300">
                <span className="text-green-400 font-semibold">Prevention:</span> Always set reasonable expiration time
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Example */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Implementation Example</h2>
            <p className="text-slate-400 text-lg">ASP.NET Core JWT Authentication</p>
          </div>

          <div className="space-y-6">
            <div className="byte-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-400">Program.cs - Configuration</h3>
                <span className="text-xs text-slate-500 px-3 py-1 bg-slate-800 rounded-full">C#</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-lg overflow-x-auto">
                <pre className="text-sm text-slate-300 font-mono">
                  {`builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });`}
                </pre>
              </div>
            </div>

            <div className="byte-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-400">Generate JWT Token</h3>
                <span className="text-xs text-slate-500 px-3 py-1 bg-slate-800 rounded-full">C#</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-lg overflow-x-auto">
                <pre className="text-sm text-slate-300 font-mono">
                  {`public string GenerateToken(User user)
{
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new[]
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Role, user.Role)
    };

    var token = new JwtSecurityToken(
        issuer: _config["Jwt:Issuer"],
        audience: _config["Jwt:Audience"],
        claims: claims,
        expires: DateTime.Now.AddMinutes(30),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}`}
                </pre>
              </div>
            </div>

            <div className="byte-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-orange-400">Protect API Endpoint</h3>
                <span className="text-xs text-slate-500 px-3 py-1 bg-slate-800 rounded-full">C#</span>
              </div>
              <div className="p-4 bg-slate-900 rounded-lg overflow-x-auto">
                <pre className="text-sm text-slate-300 font-mono">
                  {`[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    [Authorize] // Requires valid JWT
    public IActionResult GetProducts()
    {
        return Ok(products);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")] // Requires Admin role
    public IActionResult CreateProduct(Product product)
    {
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h3 className="text-3xl font-bold text-white">Thank You</h3>
          <p className="text-xl text-slate-400">Chapter 06 - JWT Authentication Flow</p>
          <p className="text-slate-500">Implement Security in RESTful Web Service • PRN232</p>

          <div className="flex flex-wrap gap-4 justify-center items-center text-sm text-slate-600 pt-8">
            <span>Diagram Style: ByteByteGo</span>
            <span>•</span>
            <span>Team 2 - PRN232</span>
            <span>•</span>
            <span>2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
