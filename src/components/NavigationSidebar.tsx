"use client";

import { useState, useEffect } from "react";

interface NavSection {
  id: string;
  label: string;
  icon: string;
}

const SECTIONS: NavSection[] = [
  { id: "hero", label: "Giới thiệu", icon: "🏠" },
  { id: "jwt-flow", label: "Authentication Flow", icon: "🔄" },
  { id: "jwt-decoder", label: "JWT Decoder", icon: "🔧" },
  { id: "jwt-structure", label: "JWT Structure", icon: "📦" },
  { id: "auth-vs-authz", label: "AuthN vs AuthZ", icon: "🆚" },
  { id: "jwt-vs-session", label: "JWT vs Session", icon: "⚖️" },
  { id: "algorithms", label: "Algorithms", icon: "🔐" },
  { id: "refresh-token", label: "Refresh Token", icon: "🔄" },
  { id: "token-lifecycle", label: "Token Lifecycle", icon: "⏱️" },
  { id: "best-practices", label: "Best Practices", icon: "✅" },
  { id: "vulnerabilities", label: "Vulnerabilities", icon: "⚠️" },
  { id: "implementation", label: "Implementation", icon: "💻" },
  { id: "comparison", label: "Auth Comparison", icon: "📊" },
  { id: "glossary", label: "Glossary", icon: "📖" },
  { id: "quiz", label: "Quiz", icon: "🧪" },
  { id: "video", label: "Video", icon: "🎬" },
];

export default function NavigationSidebar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.round((window.scrollY / totalScroll) * 100);
      setReadProgress(p);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const currentIdx = SECTIONS.findIndex((s) => s.id === activeSection);

      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = SECTIONS[Math.min(currentIdx + 1, SECTIONS.length - 1)];
        document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = SECTIONS[Math.max(currentIdx - 1, 0)];
        document.getElementById(prev.id)?.scrollIntoView({ behavior: "smooth" });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  }

  const activeIdx = SECTIONS.findIndex((s) => s.id === activeSection);

  return (
    <>
      {/* Mobile hamburger */}
      <button onClick={() => setIsOpen(!isOpen)} className="nav-sidebar__mobile-toggle">
        <div className={`nav-sidebar__hamburger ${isOpen ? "open" : ""}`}>
          <span /><span /><span />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && <div className="nav-sidebar__overlay" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <nav className={`nav-sidebar ${isOpen ? "open" : ""}`}>
        <div className="nav-sidebar__header">
          <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-green-400 text-transparent bg-clip-text">
            JWT Guide
          </span>
          <span className="text-xs text-slate-500">{readProgress}%</span>
        </div>

        {/* Progress bar in sidebar */}
        <div className="nav-sidebar__progress">
          <div className="nav-sidebar__progress-fill" style={{ width: `${readProgress}%` }} />
        </div>

        <div className="nav-sidebar__items">
          {SECTIONS.map((section, i) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`nav-sidebar__item ${section.id === activeSection ? "active" : ""} ${i <= activeIdx ? "read" : ""}`}
            >
              <span className="nav-sidebar__item-icon">{section.icon}</span>
              <span className="nav-sidebar__item-label">{section.label}</span>
              {i < activeIdx && <span className="nav-sidebar__item-check">✓</span>}
            </button>
          ))}
        </div>

        <div className="nav-sidebar__footer">
          <p className="text-xs text-slate-600 text-center">
            ⌨️ J/K hoặc ↑↓ để navigate
          </p>
          <p className="text-xs text-slate-600 text-center mt-1">
            ⏱️ ~15 phút đọc
          </p>
        </div>
      </nav>
    </>
  );
}
