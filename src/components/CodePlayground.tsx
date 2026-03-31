"use client";

import { useState } from "react";
import { CODE_EXAMPLES } from "../data/codeExamples";

export default function CodePlayground() {
  const [activeLanguage, setActiveLanguage] = useState(0);
  const [activeTab, setActiveTab] = useState<"configure" | "generateToken" | "protectEndpoint">("configure");

  const example = CODE_EXAMPLES[activeLanguage];

  const tabs = [
    { key: "configure" as const, label: "⚙️ Configuration", desc: "Thiết lập JWT middleware" },
    { key: "generateToken" as const, label: "🔑 Generate Token", desc: "Tạo JWT token" },
    { key: "protectEndpoint" as const, label: "🛡️ Protect Endpoint", desc: "Bảo vệ API" },
  ];

  function copyCode() {
    navigator.clipboard.writeText(example[activeTab]);
  }

  return (
    <div className="code-playground">
      {/* Language selector */}
      <div className="code-playground__langs">
        {CODE_EXAMPLES.map((ex, i) => (
          <button
            key={ex.language}
            className={`code-playground__lang ${i === activeLanguage ? "active" : ""}`}
            onClick={() => setActiveLanguage(i)}
          >
            <span className="text-lg">{ex.icon}</span>
            <span>{ex.label}</span>
          </button>
        ))}
      </div>

      {/* Tab selector */}
      <div className="code-playground__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`code-playground__tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code display */}
      <div className="code-playground__code">
        <div className="code-playground__code-header">
          <span className="text-xs text-slate-500">
            {example.icon} {example.label} — {tabs.find((t) => t.key === activeTab)?.desc}
          </span>
          <button onClick={copyCode} className="code-playground__copy">
            📋 Copy
          </button>
        </div>
        <pre className="code-playground__pre">
          <code>{example[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
}
