"use client";

export default function ComparisonTable() {
  const methods = [
    {
      name: "JWT",
      icon: "🔑",
      type: "Token-based",
      stateless: true,
      scalability: "⭐⭐⭐⭐⭐",
      revocation: "Khó (cần blacklist)",
      storage: "Client-side",
      crossDomain: true,
      complexity: "Trung bình",
      bestFor: "SPAs, Mobile APIs, Microservices",
      highlight: true,
    },
    {
      name: "Session Cookie",
      icon: "🍪",
      type: "Session-based",
      stateless: false,
      scalability: "⭐⭐",
      revocation: "Dễ (xóa session)",
      storage: "Server-side",
      crossDomain: false,
      complexity: "Thấp",
      bestFor: "Traditional web apps, MVC",
      highlight: false,
    },
    {
      name: "OAuth 2.0",
      icon: "🔐",
      type: "Authorization Framework",
      stateless: true,
      scalability: "⭐⭐⭐⭐",
      revocation: "Tùy implementation",
      storage: "Client + Auth Server",
      crossDomain: true,
      complexity: "Cao",
      bestFor: "Third-party integration, Social login",
      highlight: false,
    },
    {
      name: "API Key",
      icon: "🗝️",
      type: "Key-based",
      stateless: true,
      scalability: "⭐⭐⭐⭐",
      revocation: "Dễ (xóa key)",
      storage: "Client config",
      crossDomain: true,
      complexity: "Rất thấp",
      bestFor: "Server-to-server, Public APIs",
      highlight: false,
    },
    {
      name: "Basic Auth",
      icon: "👤",
      type: "Credentials per request",
      stateless: true,
      scalability: "⭐⭐⭐",
      revocation: "Đổi password",
      storage: "Client (encoded)",
      crossDomain: true,
      complexity: "Rất thấp",
      bestFor: "Simple internal APIs, Testing",
      highlight: false,
    },
  ];

  return (
    <div className="comparison-table overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left text-slate-400 font-semibold border-b border-slate-700 sticky left-0 bg-slate-900/95 z-10">
              Phương thức
            </th>
            {methods.map((m) => (
              <th
                key={m.name}
                className={`p-3 text-center border-b font-semibold min-w-[140px] ${
                  m.highlight ? "border-blue-500 text-blue-400 bg-blue-500/5" : "border-slate-700 text-slate-300"
                }`}
              >
                <span className="text-xl block mb-1">{m.icon}</span>
                {m.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-300">
          <tr>
            <td className="p-3 text-slate-400 border-b border-slate-800 sticky left-0 bg-slate-900/95 font-semibold">Loại</td>
            {methods.map((m) => (
              <td key={m.name} className={`p-3 text-center border-b border-slate-800 text-xs ${m.highlight ? "bg-blue-500/5" : ""}`}>{m.type}</td>
            ))}
          </tr>
          <tr>
            <td className="p-3 text-slate-400 border-b border-slate-800 sticky left-0 bg-slate-900/95 font-semibold">Stateless?</td>
            {methods.map((m) => (
              <td key={m.name} className={`p-3 text-center border-b border-slate-800 ${m.highlight ? "bg-blue-500/5" : ""}`}>
                {m.stateless ? <span className="text-green-400">✓ Yes</span> : <span className="text-red-400">✗ No</span>}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 text-slate-400 border-b border-slate-800 sticky left-0 bg-slate-900/95 font-semibold">Scalability</td>
            {methods.map((m) => (
              <td key={m.name} className={`p-3 text-center border-b border-slate-800 ${m.highlight ? "bg-blue-500/5" : ""}`}>{m.scalability}</td>
            ))}
          </tr>
          <tr>
            <td className="p-3 text-slate-400 border-b border-slate-800 sticky left-0 bg-slate-900/95 font-semibold">Revocation</td>
            {methods.map((m) => (
              <td key={m.name} className={`p-3 text-center border-b border-slate-800 text-xs ${m.highlight ? "bg-blue-500/5" : ""}`}>{m.revocation}</td>
            ))}
          </tr>
          <tr>
            <td className="p-3 text-slate-400 border-b border-slate-800 sticky left-0 bg-slate-900/95 font-semibold">Storage</td>
            {methods.map((m) => (
              <td key={m.name} className={`p-3 text-center border-b border-slate-800 text-xs ${m.highlight ? "bg-blue-500/5" : ""}`}>{m.storage}</td>
            ))}
          </tr>
          <tr>
            <td className="p-3 text-slate-400 border-b border-slate-800 sticky left-0 bg-slate-900/95 font-semibold">Cross-Domain?</td>
            {methods.map((m) => (
              <td key={m.name} className={`p-3 text-center border-b border-slate-800 ${m.highlight ? "bg-blue-500/5" : ""}`}>
                {m.crossDomain ? <span className="text-green-400">✓</span> : <span className="text-red-400">✗</span>}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-3 text-slate-400 border-b border-slate-800 sticky left-0 bg-slate-900/95 font-semibold">Complexity</td>
            {methods.map((m) => (
              <td key={m.name} className={`p-3 text-center border-b border-slate-800 text-xs ${m.highlight ? "bg-blue-500/5" : ""}`}>{m.complexity}</td>
            ))}
          </tr>
          <tr>
            <td className="p-3 text-slate-400 sticky left-0 bg-slate-900/95 font-semibold">Best for</td>
            {methods.map((m) => (
              <td key={m.name} className={`p-3 text-center text-xs ${m.highlight ? "bg-blue-500/5 text-blue-300 font-semibold" : ""}`}>{m.bestFor}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
