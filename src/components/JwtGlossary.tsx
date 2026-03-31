"use client";

import { useState } from "react";
import { GLOSSARY_DATA, type GlossaryTerm } from "../data/glossaryData";

const CATEGORIES = [
  { key: "all", label: "Tất cả", icon: "📖" },
  { key: "core", label: "Core", icon: "🔵" },
  { key: "claims", label: "Claims", icon: "📋" },
  { key: "security", label: "Security", icon: "🔒" },
  { key: "implementation", label: "Implementation", icon: "⚙️" },
  { key: "protocol", label: "Protocol", icon: "🌐" },
];

export default function JwtGlossary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filtered = GLOSSARY_DATA.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch =
      !search ||
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="glossary">
      {/* Search & filter */}
      <div className="glossary__controls">
        <div className="glossary__search">
          <span className="text-slate-500">🔍</span>
          <input
            type="text"
            placeholder="Tìm thuật ngữ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="glossary__search-input"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-slate-500 hover:text-slate-300">✕</button>
          )}
        </div>
        <div className="glossary__categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`glossary__cat-btn ${activeCategory === cat.key ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms grid */}
      <div className="glossary__grid">
        {filtered.map((t) => (
          <div
            key={t.term}
            className={`glossary__item ${expandedTerm === t.term ? "expanded" : ""}`}
            onClick={() => setExpandedTerm(expandedTerm === t.term ? null : t.term)}
          >
            <div className="glossary__item-header">
              <h4 className="glossary__term">{t.term}</h4>
              <span className={`glossary__badge glossary__badge--${t.category}`}>
                {t.category}
              </span>
            </div>
            <p className={`glossary__def ${expandedTerm === t.term ? "expanded" : ""}`}>
              {t.definition}
            </p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 py-8">Không tìm thấy thuật ngữ phù hợp.</p>
      )}

      <p className="text-center text-sm text-slate-600 mt-4">
        📖 {GLOSSARY_DATA.length} thuật ngữ · Click để mở rộng
      </p>
    </div>
  );
}
