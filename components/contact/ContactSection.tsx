"use client";

import { useState, useEffect } from "react";
import { contact } from "@/lib/content/portfolio";
import DigitalCard from "./DigitalCard";

export default function ContactSection() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const msg = contact.terminalMessages[msgIndex];
    let i = 0;
    setTyped("");
    const interval = setInterval(() => {
      if (i < msg.length) {
        setTyped((prev) => prev + msg.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setMsgIndex((m) => (m + 1) % contact.terminalMessages.length), 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [msgIndex]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            email: formState.email.trim(),
            message: formState.message.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Message delivery failed");
      }

      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32 px-[8%]" style={{ background: "linear-gradient(180deg, #1F1528 0%, #141210 100%)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal-item">
          <span className="inline-block px-5 py-2 rounded-full text-saffron text-sm tracking-widest border border-copper/25 bg-saffron/5 mb-6">CONTACT</span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">{contact.heading}</h2>
          <p className="text-zinc-400 mt-4">{contact.subheading}</p>
        </div>

        <div className="glass-card rounded-2xl border border-white/10 overflow-hidden" style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.05)" }}>
          <div className="bg-zinc-900/80 px-4 py-3 flex items-center gap-2 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="font-mono text-xs text-zinc-500 ml-2">terminal</span>
          </div>
          <div className="p-6 font-mono text-sm">
            <p className="text-saffron">{contact.terminalPrompt}{typed}<span className="animate-pulse">_</span></p>
          </div>

          {status === "sent" ? (
            <div className="p-8 text-center font-mono">
              <p className="text-green-400">Message sent successfully. ✓</p>
              <p className="mt-2 text-xs text-zinc-500">Thanks for reaching out — I’ll get back to you as soon as I can.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-5 text-xs text-saffron hover:text-white transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-4">
              <input
                type="text"
                placeholder="Name"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:border-copper/50 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:border-copper/50 outline-none"
              />
              <textarea
                placeholder="Message"
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:border-copper/50 outline-none resize-none"
              />
              {status === "error" && (
                <p className="text-sm text-red-300" role="alert">
                  Message could not be sent. Please try again in a moment.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron to-copper text-white font-semibold hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <div className="mt-20">
          <p className="text-center text-zinc-500 text-sm uppercase tracking-widest mb-8">Digital Card</p>
          <DigitalCard />
        </div>
      </div>
    </section>
  );
}
