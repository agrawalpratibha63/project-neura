"use client";

import { motion } from "framer-motion";

const arcs = [
  {
    size: 410,
    border: "3px solid rgba(232,168,56,.9)",
    duration: 4,
    start: 0,
  },
  {
    size: 340,
    border: "2px solid rgba(232,196,160,.75)",
    duration: 3.2,
    start: 180,
  },
  {
    size: 270,
    border: "2px solid rgba(255,255,255,.65)",
    duration: 2.6,
    start: 90,
  },
];

export default function EnergyArcs() {
  return (
    <>
      {arcs.map((arc, index) => (
        <motion.div
          key={index}
          animate={{
            rotate: [arc.start, arc.start + 360],
          }}
          transition={{
            duration: arc.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",

            width: arc.size,
            height: arc.size,

            borderRadius: "50%",

            borderTop: arc.border,

            borderLeft: "3px solid transparent",
            borderRight: "3px solid transparent",
            borderBottom: "3px solid transparent",

            boxShadow:
              "0 0 20px #E8A838,0 0 45px #C87941",

            filter: "blur(.4px)",
          }}
        />
      ))}
    </>
  );
}