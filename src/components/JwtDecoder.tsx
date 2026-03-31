"use client";

import { useState, useEffect } from "react";

function base64UrlDecode(str: string): string {
  try {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return "Invalid Base64URL";
  }
}

function base64UrlEncode(str: string): string {
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  } catch {
    return "";
  }
}

function formatJson(str: string): string {
  try {
    return JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return str;
  }
}

const SAMPLE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzE2MjM5MDIyLCJleHAiOjE3MzU2ODk2MDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE_TOKEN);
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [signature, setSignature] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedPayload, setEditedPayload] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    decodeToken(token);
  }, [token]);

  function decodeToken(t: string) {
    setError("");
    const parts = t.trim().split(".");
    if (parts.length !== 3) {
      setError("JWT phải có đúng 3 phần, phân cách bằng dấu chấm (.)");
      setHeader("");
      setPayload("");
      setSignature("");
      return;
    }
    const h = base64UrlDecode(parts[0]);
    const p = base64UrlDecode(parts[1]);
    setHeader(formatJson(h));
    setPayload(formatJson(p));
    setEditedPayload(formatJson(p));
    setSignature(parts[2]);
  }

  function handleEditPayload() {
    if (!editMode) {
      setEditMode(true);
      return;
    }
    // Re-encode with edited payload
    try {
      JSON.parse(editedPayload); // validate JSON
      const parts = token.trim().split(".");
      const newPayloadEncoded = base64UrlEncode(editedPayload);
      const newToken = `${parts[0]}.${newPayloadEncoded}.${parts[2]}`;
      setToken(newToken);
      setEditMode(false);
    } catch {
      setError("Payload JSON không hợp lệ!");
    }
  }

  function copyToken() {
    navigator.clipboard.writeText(token);
  }

  return (
    <div className="jwt-decoder">
      <div className="jwt-decoder__input-section">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white">Encoded Token</h3>
          <div className="flex gap-2">
            <button onClick={() => setToken(SAMPLE_TOKEN)} className="jwt-decoder__btn">
              Sample
            </button>
            <button onClick={copyToken} className="jwt-decoder__btn">
              Copy
            </button>
            <button onClick={() => setToken("")} className="jwt-decoder__btn">
              Clear
            </button>
          </div>
        </div>
        <textarea
          className="jwt-decoder__textarea"
          rows={4}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste JWT token ở đây..."
          spellCheck={false}
        />
        {/* Color-coded token preview */}
        {token && !error && (
          <div className="jwt-decoder__preview mt-3">
            {token.split(".").map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="text-slate-500 text-lg font-bold">.</span>}
                <span
                  className={`jwt-decoder__part jwt-decoder__part--${
                    ["header", "payload", "signature"][i]
                  }`}
                >
                  {part}
                </span>
              </span>
            ))}
          </div>
        )}
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      {!error && header && (
        <div className="jwt-decoder__decoded">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Header */}
            <div className="jwt-decoder__panel jwt-decoder__panel--header">
              <div className="jwt-decoder__panel-title">
                <span className="jwt-decoder__dot" style={{ background: "#3b82f6" }} />
                Header
              </div>
              <pre className="jwt-decoder__json">{header}</pre>
              <p className="text-xs text-slate-500 mt-2">
                Algorithm & Token Type
              </p>
            </div>

            {/* Payload */}
            <div className="jwt-decoder__panel jwt-decoder__panel--payload">
              <div className="flex items-center justify-between">
                <div className="jwt-decoder__panel-title">
                  <span className="jwt-decoder__dot" style={{ background: "#22c55e" }} />
                  Payload
                </div>
                <button onClick={handleEditPayload} className="jwt-decoder__edit-btn">
                  {editMode ? "✓ Apply" : "✎ Edit"}
                </button>
              </div>
              {editMode ? (
                <textarea
                  className="jwt-decoder__edit-area"
                  value={editedPayload}
                  onChange={(e) => setEditedPayload(e.target.value)}
                  rows={8}
                  spellCheck={false}
                />
              ) : (
                <pre className="jwt-decoder__json">{payload}</pre>
              )}
              <p className="text-xs text-slate-500 mt-2">
                Claims & User Data
              </p>
            </div>

            {/* Signature */}
            <div className="jwt-decoder__panel jwt-decoder__panel--signature">
              <div className="jwt-decoder__panel-title">
                <span className="jwt-decoder__dot" style={{ background: "#f97316" }} />
                Signature
              </div>
              <div className="jwt-decoder__sig-display">
                <code className="text-xs break-all text-orange-300">{signature}</code>
              </div>
              <div className="mt-3 p-3 bg-slate-800/50 rounded-lg">
                <p className="text-xs text-slate-400 font-mono">
                  HMACSHA256(
                  <br />
                  &nbsp;&nbsp;base64UrlEncode(<span className="text-blue-400">header</span>) + "." +
                  <br />
                  &nbsp;&nbsp;base64UrlEncode(<span className="text-green-400">payload</span>),
                  <br />
                  &nbsp;&nbsp;<span className="text-orange-400">secret</span>
                  <br />)
                </p>
              </div>
            </div>
          </div>

          {/* Claim explanation */}
          {payload && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {(() => {
                try {
                  const p = JSON.parse(payload);
                  const claimInfo: Record<string, string> = {
                    sub: "Subject (User ID)",
                    name: "User Name",
                    role: "User Role",
                    iss: "Issuer",
                    aud: "Audience",
                    exp: "Expiration Time",
                    iat: "Issued At",
                    nbf: "Not Before",
                    jti: "JWT ID",
                    email: "Email",
                  };
                  return Object.entries(p).map(([k, v]) => (
                    <div key={k} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-xs text-green-400 font-semibold mb-1">{k}</div>
                      <div className="text-sm text-slate-300 truncate" title={String(v)}>
                        {k === "exp" || k === "iat" || k === "nbf"
                          ? new Date(Number(v) * 1000).toLocaleString()
                          : String(v)}
                      </div>
                      {claimInfo[k] && (
                        <div className="text-xs text-slate-500 mt-1">{claimInfo[k]}</div>
                      )}
                    </div>
                  ));
                } catch {
                  return null;
                }
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
