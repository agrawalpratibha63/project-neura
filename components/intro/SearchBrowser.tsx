"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Mic, Camera } from "lucide-react";
import { siteMeta } from "@/lib/content/portfolio";
import { introSounds } from "@/lib/audio/introSounds";
import { INTRO_STAGES, useIntro } from "@/components/three/useIntro";

const GOOGLE = ["G", "o", "o", "g", "l", "e"];
const COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#4285F4", "#34A853", "#EA4335"];

export default function SearchBrowser() {
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [clicked, setClicked] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stage = useIntro((s) => s.stage);
  const audioEnabled = useIntro((s) => s.audioEnabled);
  const setStage = useIntro((s) => s.setStage);

  useEffect(() => {
    if (stage !== INTRO_STAGES.SEARCH) return;

    const query = siteMeta.searchQuery;
    let index = 0;
    const interval = setInterval(() => {
      if (index < query.length) {
        setSearchText((prev) => prev + query.charAt(index));
        if (audioEnabled) introSounds.playClick();
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowResults(true);
          if (audioEnabled) introSounds.playNav();
          setTimeout(() => {
            if (cursorRef.current && resultRef.current) {
              const rect = resultRef.current.getBoundingClientRect();
              gsap.to(cursorRef.current, {
                x: rect.left + rect.width / 2 - window.innerWidth / 2,
                y: rect.top + 30 - window.innerHeight / 2,
                duration: 1.1,
                ease: "power3.inOut",
                onComplete: () => {
                  setClicked(true);
                  if (audioEnabled) introSounds.playNav();
                  gsap.to(resultRef.current, {
                    scale: 1.02,
                    backgroundColor: "rgba(66,133,244,0.08)",
                    duration: 0.15,
                  });
                  gsap.to(containerRef.current, {
                    opacity: 0,
                    scale: 0.96,
                    filter: "blur(8px)",
                    duration: 0.7,
                    ease: "power2.inOut",
                    delay: 0.25,
                    onComplete: () => setStage(INTRO_STAGES.HUD),
                  });
                },
              });
            }
          }, 700);
        }, 600);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [stage, audioEnabled, setStage]);

  if (stage !== INTRO_STAGES.SEARCH) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="intro-search flex flex-col items-center justify-center w-full h-full bg-white p-4 font-sans"
    >
      <div className="w-full max-w-3xl flex flex-col items-center">
        {/* Google logo — staggered bounce */}
        <div className="flex items-center gap-1 mb-8 select-none">
          {GOOGLE.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 12 }}
              className="text-5xl font-normal"
              style={{ color: COLORS[i] }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-xl border border-gray-200 rounded-full px-5 py-3.5 flex items-center gap-3 shadow-md bg-white"
        >
          <Search size={20} className="text-gray-400 shrink-0" />
          <span className="text-gray-800 flex-1 text-base">
            {searchText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-5 bg-gray-600 ml-0.5 align-middle"
            />
          </span>
          <Mic size={20} className="text-[#4285F4] shrink-0" />
          <Camera size={20} className="text-[#4285F4] shrink-0" />
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-2xl mt-10"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-gray-500 mb-4"
              >
                About 248 results (0.34 seconds)
              </motion.p>
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className={`py-3 px-3 rounded-xl cursor-pointer transition-colors ${
                  clicked ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Globe size={14} />
                  <span>pratibha-agrawal.dev</span>
                </div>
                <h3 className="text-xl text-[#1a0dab] font-normal">
                  {siteMeta.name} — {siteMeta.role}
                </h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  Portfolio of Pratibha Agrawal. AI/ML student, web developer, and graphics designer.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-1/2 left-1/2 w-5 h-5 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
      >
        <svg viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1">
          <path d="M5 3l14 9-6 1-3 7z" />
        </svg>
      </div>
    </motion.div>
  );
}
