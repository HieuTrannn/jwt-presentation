"use client";

import React from "react";

/**
 * Markdown to JSX renderer for chatbot messages.
 * Supports: bold, italic, inline code, code blocks, headings,
 * bullet lists, numbered lists, links, tables, line breaks.
 */

interface MarkdownRendererProps {
  content: string;
}

function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const m = match[0];
    if (m.startsWith("`")) {
      nodes.push(
        <code key={key++} className="md-inline-code">
          {m.slice(1, -1)}
        </code>
      );
    } else if (m.startsWith("**")) {
      nodes.push(<strong key={key++}>{m.slice(2, -2)}</strong>);
    } else if (m.startsWith("*")) {
      nodes.push(<em key={key++}>{m.slice(1, -1)}</em>);
    } else if (m.startsWith("[")) {
      const linkMatch = m.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        nodes.push(
          <a
            key={key++}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="md-link"
          >
            {linkMatch[1]}
          </a>
        );
      }
    }
    lastIndex = match.index + m.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : [text];
}

/** Check if a line looks like a markdown table row: | col | col | */
function isTableRow(line: string): boolean {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|") && trimmed.includes("|");
}

/** Check if a line is a table separator: |---|---|---| or | :--- | :---: | */
function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) return false;
  const inner = trimmed.slice(1, -1);
  return inner.split("|").every((cell) => /^\s*:?-{2,}:?\s*$/.test(cell));
}

/** Parse table cells from a row */
function parseTableCells(line: string): string[] {
  const trimmed = line.trim();
  const inner = trimmed.startsWith("|") ? trimmed.slice(1) : trimmed;
  const withoutEnd = inner.endsWith("|") ? inner.slice(0, -1) : inner;
  return withoutEnd.split("|").map((c) => c.trim());
}

function renderTable(rows: string[], startKey: number): { node: React.ReactNode; key: number } {
  let key = startKey;
  const headerCells = parseTableCells(rows[0]);

  // Determine if row[1] is a separator
  const hasSeparator = rows.length > 1 && isTableSeparator(rows[1]);
  const bodyStartIdx = hasSeparator ? 2 : 1;

  return {
    node: (
      <div key={key++} className="md-table-wrap">
        <table className="md-table">
          <thead>
            <tr>
              {headerCells.map((cell, ci) => (
                <th key={ci}>{parseInline(cell)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(bodyStartIdx).map((row, ri) => {
              const cells = parseTableCells(row);
              return (
                <tr key={ri}>
                  {headerCells.map((_, ci) => (
                    <td key={ci}>{parseInline(cells[ci] || "")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    ),
    key,
  };
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trimStart().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={key++} className="md-code-block">
          {lang && <span className="md-code-lang">{lang}</span>}
          <pre>
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      continue;
    }

    // Table — detect consecutive table rows
    if (isTableRow(line)) {
      const tableRows: string[] = [];
      while (i < lines.length && (isTableRow(lines[i]) || isTableSeparator(lines[i]))) {
        tableRows.push(lines[i]);
        i++;
      }
      if (tableRows.length >= 2) {
        const result = renderTable(tableRows, key);
        elements.push(result.node);
        key = result.key;
      } else {
        // Single row fallback — render as paragraph
        elements.push(
          <p key={key++} className="md-p">
            {parseInline(tableRows[0])}
          </p>
        );
      }
      continue;
    }

    // Heading
    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={key++} className="md-h3">
          {parseInline(line.slice(4))}
        </h4>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h3 key={key++} className="md-h2">
          {parseInline(line.slice(3))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      elements.push(
        <h2 key={key++} className="md-h1">
          {parseInline(line.slice(2))}
        </h2>
      );
      i++;
      continue;
    }

    // Bullet list
    if (/^[\s]*[-*]\s/.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[\s]*[-*]\s/.test(lines[i])) {
        items.push(
          <li key={key++}>{parseInline(lines[i].replace(/^[\s]*[-*]\s/, ""))}</li>
        );
        i++;
      }
      elements.push(
        <ul key={key++} className="md-ul">
          {items}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^[\s]*\d+\.\s/.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[\s]*\d+\.\s/.test(lines[i])) {
        items.push(
          <li key={key++}>
            {parseInline(lines[i].replace(/^[\s]*\d+\.\s/, ""))}
          </li>
        );
        i++;
      }
      elements.push(
        <ol key={key++} className="md-ol">
          {items}
        </ol>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="md-p">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className="md-content">{elements}</div>;
}
