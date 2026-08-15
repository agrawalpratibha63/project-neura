"use client";

import { FormEvent, useState } from "react";

type Msg = { role: "user" | "bot"; text: string; error?: boolean };

type Props = {
  apiUrl?: string;
  title?: string;
  subtitle?: string;
  welcome?: string;
};

const DEFAULT_API =
  process.env.NEXT_PUBLIC_PORTFOLIO_AI_URL ??
  "https://portfolio-ai-8wwa.onrender.com/api/chat";

export default function PortfolioChat({
  apiUrl = DEFAULT_API,
  title = "Ask about Pratibha",
  subtitle = "Portfolio AI assistant",
  welcome = "Hi! Ask me about Pratibha's skills, projects, education, or contact info.",
}: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: welcome },
  ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          typeof data.detail === "string" ? data.detail : "Request failed"
        );
      }
      setMessages((m) => [
        ...m,
        { role: "bot", text: data.answer || "No answer returned." },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          error: true,
          text: `Could not reach the assistant.\n${message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 99999,
        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      }}
    >
      {open && (
        <div
          style={{
            width: "min(380px, calc(100vw - 24px))",
            height: "min(560px, calc(100vh - 100px))",
            marginBottom: 12,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "#1a1424",
            boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
            color: "#FAF7F2",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
            <div style={{ fontSize: 12, color: "#b9b0c4", marginTop: 4 }}>
              {subtitle}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "90%",
                  padding: "10px 12px",
                  borderRadius: 14,
                  fontSize: 13.5,
                  lineHeight: 1.45,
                  whiteSpace: "pre-wrap",
                  background: msg.role === "user" ? "#3a2a55" : "#241b33",
                  border: msg.error
                    ? "1px solid #ff7b7b"
                    : "1px solid rgba(255,255,255,0.08)",
                  color: msg.error ? "#ffc9c9" : "#FAF7F2",
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{ fontSize: 12, color: "#b9b0c4" }}>Thinking...</div>
            )}
          </div>

          <form
            onSubmit={onSubmit}
            style={{
              display: "flex",
              gap: 8,
              padding: 12,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills..."
              style={{
                flex: 1,
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                padding: "10px 14px",
                background: "#120e1a",
                color: "#FAF7F2",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                border: 0,
                borderRadius: 999,
                padding: "0 16px",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 600,
                color: "#120e1a",
                background: "#c9a227",
                opacity: loading ? 0.6 : 1,
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open portfolio assistant"
        style={{
          width: 56,
          height: 56,
          border: 0,
          borderRadius: 999,
          cursor: "pointer",
          color: "#120e1a",
          fontWeight: 700,
          fontSize: 14,
          background: "linear-gradient(135deg, #c9a227, #e8d48b)",
          boxShadow: "0 18px 50px rgba(0,0,0,0.45)",
        }}
      >
        AI
      </button>
    </div>
  );
}
