"use client";

/**
 * JWT Authentication Flow - ByteByteGo Style Learning Platform
 * Comprehensive Interactive Learning Experience
 * Chapter 06 - Implement Security in RESTful Web Service
 */

import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import JwtFlowDiagram from "./JwtFlowDiagram";
import InteractiveFlowAnimation from "./InteractiveFlowAnimation";
import JwtDecoder from "./JwtDecoder";
import JwtStructureDiagram from "./JwtStructureDiagram";
import AuthVsAuthzSection from "./AuthVsAuthzSection";
import JwtVsSessionDiagram from "./JwtVsSessionDiagram";
import AlgorithmsComparison from "./AlgorithmsComparison";
import RefreshTokenFlowDiagram from "./RefreshTokenFlowDiagram";
import TokenLifecycleTimeline from "./TokenLifecycleTimeline";
import SecurityAttackDemo from "./SecurityAttackDemo";
import CodePlayground from "./CodePlayground";
import ComparisonTable from "./ComparisonTable";
import JwtGlossary from "./JwtGlossary";
import JwtQuiz from "./JwtQuiz";
import NavigationSidebar from "./NavigationSidebar";

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
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Sidebar */}
      <NavigationSidebar />

      {/* Main Content — offset for sidebar on desktop */}
      <div className="lg:ml-56">
        {/* ===== HERO ===== */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-green-900/20" />
          <div className="absolute inset-0 hidden sm:block">
            <div className="absolute top-20 left-10 sm:left-20 w-40 sm:w-64 h-40 sm:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 left-1/2 w-36 sm:w-72 h-36 sm:h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="inline-block px-4 py-2 mb-6 rounded-full bg-blue-500/20 border border-blue-500/30">
                <span className="text-blue-400 text-sm font-semibold">Chapter 06 — RESTful Web Service Security</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-orange-400 text-transparent bg-clip-text leading-tight">
                JWT Authentication
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-base sm:text-xl md:text-2xl text-slate-300 mb-4 leading-relaxed">
                Interactive Learning Platform for JWT Authentication
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8">⏱️ ~15 phút · ⌨️ Dùng J/K để navigate · 🧪 Có Quiz kiểm tra kiến thức</p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  { icon: "🔐", title: "Stateless", desc: "No server-side session storage", color: "blue" },
                  { icon: "⚡", title: "Scalable", desc: "Perfect for distributed systems", color: "green" },
                  { icon: "🌐", title: "Cross-Domain", desc: "Works across different domains", color: "orange" },
                ].map((card) => (
                  <div key={card.title} className="byte-card text-center transform hover:scale-105 transition-transform">
                    <div className="text-4xl mb-3">{card.icon}</div>
                    <h3 className={`text-lg font-semibold text-${card.color}-400 mb-2`}>{card.title}</h3>
                    <p className="text-sm text-slate-400">{card.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-slate-400 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* ===== JWT AUTHENTICATION FLOW ===== */}
        <section id="jwt-flow" className="py-16 sm:py-24 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">01</span>
                <h2 className="section-title">JWT Authentication Flow</h2>
                <p className="section-subtitle">Complete request-response cycle with JWT tokens</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="byte-card-large mb-8">
                <JwtFlowDiagram />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="byte-card-large">
                <h3 className="text-xl font-bold text-white mb-4">🎬 Interactive Step-by-Step</h3>
                <p className="text-sm text-slate-400 mb-6">Nhấn Play hoặc click từng bước để xem chi tiết HTTP request/response</p>
                <InteractiveFlowAnimation />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== JWT DECODER ===== */}
        <section id="jwt-decoder" className="py-16 sm:py-24 px-3 sm:px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">02</span>
                <h2 className="section-title">JWT Decoder / Encoder</h2>
                <p className="section-subtitle">Paste a JWT token to decode, or edit payload to re-encode</p>
                <a
                  href="https://www.jwt.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/30 text-blue-400 hover:text-white hover:border-blue-400 transition-all group"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:rotate-12 transition-transform">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span className="text-sm font-semibold">Kiểm chứng tại jwt.io →</span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <JwtDecoder />
            </ScrollReveal>
          </div>
        </section>

        {/* ===== JWT STRUCTURE ===== */}
        <section id="jwt-structure" className="py-16 sm:py-24 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">03</span>
                <h2 className="section-title">JWT Structure</h2>
                <p className="section-subtitle">Understanding the three components of a JWT token</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="byte-card-large mb-12">
                <JwtStructureDiagram />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="byte-card border-t-4 border-blue-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center"><span className="text-2xl">📋</span></div>
                    <h3 className="text-2xl font-bold text-blue-400">Header</h3>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg font-mono text-sm text-slate-300 mb-3">
                    {`{\\n  "alg": "HS256",\\n  "typ": "JWT"\\n}`}
                  </div>
                  <p className="text-sm text-slate-400"><span className="text-blue-400 font-semibold">alg:</span> Algorithm (HS256, RS256)</p>
                  <p className="text-sm text-slate-400"><span className="text-blue-400 font-semibold">typ:</span> Token type (JWT)</p>
                </div>

                <div className="byte-card border-t-4 border-green-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center"><span className="text-2xl">📦</span></div>
                    <h3 className="text-2xl font-bold text-green-400">Payload</h3>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg font-mono text-sm text-slate-300 mb-3">
                    {`{\\n  "sub": "user123",\\n  "name": "John",\\n  "exp": 1735689600\\n}`}
                  </div>
                  <p className="text-sm text-slate-400"><span className="text-green-400 font-semibold">sub:</span> Subject (user ID)</p>
                  <p className="text-sm text-slate-400"><span className="text-green-400 font-semibold">exp:</span> Expiration time</p>
                  <p className="text-sm text-slate-400"><span className="text-green-400 font-semibold">Custom:</span> Role, permissions</p>
                </div>

                <div className="byte-card border-t-4 border-orange-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center"><span className="text-2xl">🔐</span></div>
                    <h3 className="text-2xl font-bold text-orange-400">Signature</h3>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg font-mono text-xs text-slate-300 break-all mb-3">
                    HMACSHA256( base64UrlEncode(header) + &quot;.&quot; + base64UrlEncode(payload), secret )
                  </div>
                  <p className="text-sm text-slate-400"><span className="text-orange-400 font-semibold">Purpose:</span> Verify integrity</p>
                  <p className="text-sm text-slate-400"><span className="text-orange-400 font-semibold">Prevents:</span> Token tampering</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="byte-card mt-8">
                <h4 className="text-lg font-semibold text-white mb-3">Complete JWT Token Example:</h4>
                <div className="p-4 bg-slate-800/50 rounded-lg font-mono text-xs overflow-x-auto">
                  <span className="text-blue-400">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
                  <span className="text-slate-500">.</span>
                  <span className="text-green-400">eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkpvaG4iLCJleHAiOjE3MzU2ODk2MDB9</span>
                  <span className="text-slate-500">.</span>
                  <span className="text-orange-400">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
                </div>
                <div className="flex gap-6 mt-3 text-xs">
                  <span className="text-blue-400">■ Header</span>
                  <span className="text-green-400">■ Payload</span>
                  <span className="text-orange-400">■ Signature</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== AUTH VS AUTHZ ===== */}
        <section id="auth-vs-authz" className="py-16 sm:py-24 px-3 sm:px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">04</span>
                <h2 className="section-title">Authentication vs Authorization</h2>
                <p className="section-subtitle">&quot;Bạn là ai?&quot; vs &quot;Bạn được làm gì?&quot;</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <AuthVsAuthzSection />
            </ScrollReveal>
          </div>
        </section>

        {/* ===== JWT VS SESSION ===== */}
        <section id="jwt-vs-session" className="py-16 sm:py-24 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">05</span>
                <h2 className="section-title">JWT vs Session Authentication</h2>
                <p className="section-subtitle">Understanding the key differences</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="byte-card-large mb-12">
                <JwtVsSessionDiagram />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="byte-card border-l-4 border-blue-500">
                  <h3 className="text-2xl font-bold text-blue-400 mb-6">🔵 JWT (Stateless)</h3>
                  <div className="space-y-3">
                    {[
                      { ok: true, title: "No server storage", desc: "Token contains all user info" },
                      { ok: true, title: "Highly scalable", desc: "Works across multiple servers" },
                      { ok: true, title: "Cross-domain support", desc: "CORS-friendly for SPAs" },
                      { ok: false, title: "Cannot invalidate", desc: "Valid until expiration" },
                      { ok: false, title: "Token size", desc: "Larger payload in requests" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <span className={`text-xl ${item.ok ? "text-green-400" : "text-red-400"}`}>{item.ok ? "✓" : "✗"}</span>
                        <div>
                          <p className="font-semibold text-slate-200">{item.title}</p>
                          <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="byte-card border-l-4 border-orange-500">
                  <h3 className="text-2xl font-bold text-orange-400 mb-6">🟠 Session (Stateful)</h3>
                  <div className="space-y-3">
                    {[
                      { ok: true, title: "Easy to revoke", desc: "Logout immediately effective" },
                      { ok: true, title: "Small cookie", desc: "Only session ID transmitted" },
                      { ok: true, title: "Server control", desc: "Full session management" },
                      { ok: false, title: "Server memory/DB", desc: "Requires storage infrastructure" },
                      { ok: false, title: "Scaling challenges", desc: "Session sharing complexity" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <span className={`text-xl ${item.ok ? "text-green-400" : "text-red-400"}`}>{item.ok ? "✓" : "✗"}</span>
                        <div>
                          <p className="font-semibold text-slate-200">{item.title}</p>
                          <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== ALGORITHMS ===== */}
        <section id="algorithms" className="py-16 sm:py-24 px-3 sm:px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">06</span>
                <h2 className="section-title">JWT Signing Algorithms</h2>
                <p className="section-subtitle">HS256 vs RS256 vs ES256 — Khi nào dùng cái nào?</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <AlgorithmsComparison />
            </ScrollReveal>
          </div>
        </section>

        {/* ===== REFRESH TOKEN ===== */}
        <section id="refresh-token" className="py-16 sm:py-24 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">07</span>
                <h2 className="section-title">Refresh Token Strategy</h2>
                <p className="section-subtitle">Secure session management with short-lived access tokens</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="byte-card-large mb-12">
                <RefreshTokenFlowDiagram />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="byte-card">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Access Token</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-300"><span className="text-blue-400 font-semibold">Purpose:</span> Access protected resources</p>
                    <p className="text-slate-300"><span className="text-blue-400 font-semibold">Lifetime:</span> Short (15 min – 1 hour)</p>
                    <p className="text-slate-300"><span className="text-blue-400 font-semibold">Storage:</span> Memory or sessionStorage</p>
                    <p className="text-slate-300"><span className="text-blue-400 font-semibold">Security:</span> Minimize damage if stolen</p>
                  </div>
                </div>
                <div className="byte-card">
                  <h3 className="text-xl font-bold text-green-400 mb-4">Refresh Token</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-slate-300"><span className="text-green-400 font-semibold">Purpose:</span> Obtain new access token</p>
                    <p className="text-slate-300"><span className="text-green-400 font-semibold">Lifetime:</span> Long (7 – 30 days)</p>
                    <p className="text-slate-300"><span className="text-green-400 font-semibold">Storage:</span> Secure httpOnly cookie</p>
                    <p className="text-slate-300"><span className="text-green-400 font-semibold">Security:</span> Can be revoked in database</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== TOKEN LIFECYCLE ===== */}
        <section id="token-lifecycle" className="py-16 sm:py-24 px-3 sm:px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">08</span>
                <h2 className="section-title">Token Lifecycle</h2>
                <p className="section-subtitle">Vòng đời hoàn chỉnh: Create → Store → Use → Expire → Refresh → Revoke</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <TokenLifecycleTimeline />
            </ScrollReveal>
          </div>
        </section>

        {/* ===== BEST PRACTICES ===== */}
        <section id="best-practices" className="py-16 sm:py-24 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">09</span>
                <h2 className="section-title">Security Best Practices</h2>
                <p className="section-subtitle">Essential guidelines for JWT implementation</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "🔒", title: "Always Use HTTPS", desc: "Encrypt all communication to prevent token interception", color: "blue" },
                  { icon: "⏱️", title: "Short Expiration", desc: "Set exp claim to 15-60 minutes for access tokens", color: "green" },
                  { icon: "🔄", title: "Refresh Tokens", desc: "Implement refresh token rotation for better security", color: "orange" },
                  { icon: "🚫", title: "No Sensitive Data", desc: "Never store passwords or credit cards in JWT payload", color: "red" },
                  { icon: "🍪", title: "Secure Storage", desc: "Use httpOnly cookies or memory for token storage", color: "purple" },
                  { icon: "✅", title: "Validate Signature", desc: "Always verify JWT signature on every request", color: "pink" },
                  { icon: "🔑", title: "Strong Secret", desc: "Use 256+ bits random string for HMAC secret key", color: "yellow" },
                  { icon: "📝", title: "Token Blacklist", desc: "Maintain blacklist/whitelist for revocation support", color: "cyan" },
                  { icon: "🛡️", title: "CSRF Protection", desc: "Implement CSRF tokens when using cookie storage", color: "indigo" },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 50}>
                    <div className={`byte-card border-l-4 border-${item.color}-500 hover:scale-105 transition-transform h-full`}>
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{item.icon}</div>
                        <div>
                          <h3 className={`font-bold text-${item.color}-400 mb-2`}>{item.title}</h3>
                          <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== VULNERABILITIES & ATTACKS ===== */}
        <section id="vulnerabilities" className="py-16 sm:py-24 px-3 sm:px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">10</span>
                <h2 className="section-title">Security Attack Scenarios</h2>
                <p className="section-subtitle">Interactive demo: cách attacker tấn công JWT và cách phòng chống</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <SecurityAttackDemo />
            </ScrollReveal>
          </div>
        </section>

        {/* ===== IMPLEMENTATION / CODE PLAYGROUND ===== */}
        <section id="implementation" className="py-16 sm:py-24 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">11</span>
                <h2 className="section-title">Implementation Examples</h2>
                <p className="section-subtitle">JWT implementation across C#, Node.js, Python, Java</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <CodePlayground />
            </ScrollReveal>
          </div>
        </section>

        {/* ===== AUTH METHODS COMPARISON ===== */}
        <section id="comparison" className="py-16 sm:py-24 px-3 sm:px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">12</span>
                <h2 className="section-title">Authentication Methods Comparison</h2>
                <p className="section-subtitle">JWT vs Session vs OAuth 2.0 vs API Key vs Basic Auth</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="byte-card-large">
                <ComparisonTable />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== GLOSSARY ===== */}
        <section id="glossary" className="py-16 sm:py-24 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">13</span>
                <h2 className="section-title">JWT Glossary</h2>
                <p className="section-subtitle">Từ điển thuật ngữ JWT — Search và filter theo category</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <JwtGlossary />
            </ScrollReveal>
          </div>
        </section>

        {/* ===== QUIZ ===== */}
        <section id="quiz" className="py-16 sm:py-24 px-3 sm:px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">14</span>
                <h2 className="section-title">Knowledge Check Quiz</h2>
                <p className="section-subtitle">Kiểm tra kiến thức JWT — 15 câu hỏi trắc nghiệm</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <JwtQuiz />
            </ScrollReveal>
          </div>
        </section>

        {/* ===== VIDEO ===== */}
        <section id="video" className="py-16 sm:py-24 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="section-header">
                <span className="section-number">15</span>
                <h2 className="section-title">Video Explanation</h2>
                <p className="section-subtitle">Xem video giải thích chi tiết về JWT Authentication</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="byte-card-large">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/fyTxwIa-1U0"
                    title="JWT Authentication Explained"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="video-iframe"
                  />
                </div>
                <div className="mt-6 text-center">
                  <a
                    href="https://www.youtube.com/watch?v=fyTxwIa-1U0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <span>▶</span>
                    <span>Xem trên YouTube</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="py-10 sm:py-16 px-3 sm:px-6 border-t border-slate-800">
          <div className="max-w-7xl mx-auto text-center space-y-4 sm:space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Thank You</h3>
            <p className="text-base sm:text-xl text-slate-400">Chapter 06 — JWT Authentication Flow</p>
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
    </div>
  );
}
