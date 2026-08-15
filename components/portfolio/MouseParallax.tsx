"use client";

import { useEffect, useRef } from "react";

export default function MouseParallax({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!wrapper.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      wrapper.current.style.transform = `
        perspective(1800px)
        rotateX(${-y * 0.18}deg)
        rotateY(${x * 0.18}deg)
        translate3d(${x * 0.7}px, ${y * 0.7}px, 0)
      `;
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={wrapper}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transformStyle: "preserve-3d",
        transition: "transform .12s linear",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}