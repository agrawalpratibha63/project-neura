"use client";

import AboutContent from "./AboutContent";
import AboutVisual from "./AboutVisual";
import FloatingTechIcons from "./FloatingTechIcons";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex justify-center items-start overflow-visible"
      style={{ background: "linear-gradient(180deg, #1A1025 0%, #2A1F1A 45%, #241530 100%)" }}
    >
      <FloatingTechIcons />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 30%,rgba(232,168,56,.08),transparent 35%),
            radial-gradient(circle at 80% 70%,rgba(200,121,65,.08),transparent 35%)
          `,
        }}
      />

      <div className="relative w-full max-w-[1500px] px-[8%] py-32 lg:py-40 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center z-[2]">
        <AboutContent />
        <AboutVisual />
      </div>
    </section>
  );
}
