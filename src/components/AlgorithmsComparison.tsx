"use client";

import { useState } from "react";

interface Algorithm {
  name: string;
  type: string;
  keyType: string;
  signKey: string;
  verifyKey: string;
  performance: string;
  keySize: string;
  useCase: string;
  color: string;
  icon: string;
}

const ALGORITHMS: Algorithm[] = [
  {
    name: "HS256",
    type: "Symmetric (đối xứng)",
    keyType: "Shared Secret",
    signKey: "Secret Key",
    verifyKey: "Same Secret Key",
    performance: "⚡ Rất nhanh",
    keySize: "256 bits",
    useCase: "Monolithic apps, single server, internal APIs",
    color: "blue",
    icon: "🔵",
  },
  {
    name: "RS256",
    type: "Asymmetric (bất đối xứng)",
    keyType: "RSA Key Pair",
    signKey: "Private Key 🔒",
    verifyKey: "Public Key 🔓",
    performance: "🐢 Chậm hơn HS256",
    keySize: "2048+ bits",
    useCase: "Microservices, multi-server, public verification",
    color: "green",
    icon: "🟢",
  },
  {
    name: "ES256",
    type: "Asymmetric (bất đối xứng)",
    keyType: "ECDSA Key Pair",
    signKey: "Private Key 🔒",
    verifyKey: "Public Key 🔓",
    performance: "⚡ Nhanh hơn RS256",
    keySize: "256 bits",
    useCase: "Mobile, IoT, modern APIs, nhỏ gọn",
    color: "purple",
    icon: "🟣",
  },
];

export default function AlgorithmsComparison() {
  const [selected, setSelected] = useState(0);
  const algo = ALGORITHMS[selected];

  return (
    <div className="space-y-8">
      {/* Selector */}
      <div className="grid grid-cols-3 gap-4">
        {ALGORITHMS.map((a, i) => (
          <button
            key={a.name}
            onClick={() => setSelected(i)}
            className={`p-5 rounded-xl border-2 transition-all text-center ${
              i === selected
                ? `border-${a.color}-500 bg-${a.color}-500/10`
                : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600"
            }`}
          >
            <span className="text-3xl block mb-2">{a.icon}</span>
            <span className={`text-xl font-bold ${i === selected ? `text-${a.color}-400` : "text-slate-300"}`}>
              {a.name}
            </span>
            <p className="text-xs text-slate-500 mt-1">{a.type}</p>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className={`byte-card border-l-4 border-${algo.color}-500`}>
        <h3 className={`text-2xl font-bold text-${algo.color}-400 mb-6`}>
          {algo.icon} {algo.name} — {algo.type}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <span className="text-xs font-semibold text-slate-400 block mb-1">🔑 Key Type</span>
              <span className="text-slate-200">{algo.keyType}</span>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <span className="text-xs font-semibold text-slate-400 block mb-1">✍️ Sign với</span>
              <span className="text-slate-200">{algo.signKey}</span>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <span className="text-xs font-semibold text-slate-400 block mb-1">✅ Verify với</span>
              <span className="text-slate-200">{algo.verifyKey}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <span className="text-xs font-semibold text-slate-400 block mb-1">⚡ Performance</span>
              <span className="text-slate-200">{algo.performance}</span>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <span className="text-xs font-semibold text-slate-400 block mb-1">📏 Key Size</span>
              <span className="text-slate-200">{algo.keySize}</span>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <span className="text-xs font-semibold text-slate-400 block mb-1">🎯 Use Case</span>
              <span className="text-slate-200">{algo.useCase}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual: Symmetric vs Asymmetric */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="byte-card border-t-4 border-blue-500">
          <h4 className="text-lg font-bold text-blue-400 mb-4">🔵 Symmetric (HS256)</h4>
          <div className="flex items-center justify-between gap-4">
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center text-2xl mb-2">🔐</div>
              <p className="text-xs text-slate-400">Auth Server</p>
              <p className="text-xs text-blue-400 font-semibold mt-1">Secret Key</p>
            </div>
            <div className="text-center">
              <div className="text-slate-500 text-2xl">↔️</div>
              <p className="text-xs text-slate-500">Cùng 1 key</p>
            </div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center text-2xl mb-2">⚙️</div>
              <p className="text-xs text-slate-400">API Server</p>
              <p className="text-xs text-blue-400 font-semibold mt-1">Same Secret Key</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">⚠️ Mọi server đều phải biết secret → rủi ro nếu bị lộ</p>
        </div>

        <div className="byte-card border-t-4 border-green-500">
          <h4 className="text-lg font-bold text-green-400 mb-4">🟢 Asymmetric (RS256/ES256)</h4>
          <div className="flex items-center justify-between gap-4">
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-2xl mb-2">🔐</div>
              <p className="text-xs text-slate-400">Auth Server</p>
              <p className="text-xs text-red-400 font-semibold mt-1">🔒 Private Key</p>
            </div>
            <div className="text-center">
              <div className="text-slate-500 text-2xl">→</div>
              <p className="text-xs text-slate-500">Khác key</p>
            </div>
            <div className="text-center flex-1">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-2xl mb-2">⚙️</div>
              <p className="text-xs text-slate-400">API Server(s)</p>
              <p className="text-xs text-green-400 font-semibold mt-1">🔓 Public Key</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">✅ Chỉ auth server giữ private key → an toàn hơn</p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="byte-card overflow-x-auto">
        <h4 className="text-lg font-bold text-white mb-4">📊 So sánh chi tiết</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left p-3 text-slate-400 font-semibold">Tiêu chí</th>
              <th className="text-center p-3 text-blue-400 font-semibold">HS256</th>
              <th className="text-center p-3 text-green-400 font-semibold">RS256</th>
              <th className="text-center p-3 text-purple-400 font-semibold">ES256</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-b border-slate-800"><td className="p-3 text-slate-400">Loại</td><td className="p-3 text-center">Đối xứng</td><td className="p-3 text-center">Bất đối xứng</td><td className="p-3 text-center">Bất đối xứng</td></tr>
            <tr className="border-b border-slate-800"><td className="p-3 text-slate-400">Tốc độ ký</td><td className="p-3 text-center text-green-400">Nhanh nhất</td><td className="p-3 text-center text-yellow-400">Chậm</td><td className="p-3 text-center text-green-400">Nhanh</td></tr>
            <tr className="border-b border-slate-800"><td className="p-3 text-slate-400">Key size</td><td className="p-3 text-center">256 bits</td><td className="p-3 text-center">2048+ bits</td><td className="p-3 text-center">256 bits</td></tr>
            <tr className="border-b border-slate-800"><td className="p-3 text-slate-400">Token size</td><td className="p-3 text-center text-green-400">Nhỏ</td><td className="p-3 text-center text-red-400">Lớn</td><td className="p-3 text-center text-green-400">Nhỏ</td></tr>
            <tr className="border-b border-slate-800"><td className="p-3 text-slate-400">Public verify?</td><td className="p-3 text-center text-red-400">✗</td><td className="p-3 text-center text-green-400">✓</td><td className="p-3 text-center text-green-400">✓</td></tr>
            <tr><td className="p-3 text-slate-400">Best cho</td><td className="p-3 text-center">Monolith</td><td className="p-3 text-center">Enterprise</td><td className="p-3 text-center">Modern/Mobile</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
