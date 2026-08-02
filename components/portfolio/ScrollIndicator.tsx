"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 2,
      }}
      style={{
        position: "absolute",

        left: "50%",

        bottom: 35,

        transform: "translateX(-50%)",

        zIndex: 50,

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        gap: 12,
      }}
    >
      <div
        style={{
          width: 28,

          height: 48,

          border: "2px solid rgba(255,255,255,.35)",

          borderRadius: 20,

          display: "flex",

          justifyContent: "center",

          paddingTop: 8,
        }}
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            repeat: Infinity,

            duration: 1.5,
          }}
          style={{
            width: 5,

            height: 8,

            borderRadius: 20,

            background: "#E8C4A0",
          }}
        />
      </div>

      <span
        style={{
          color: "#E8C4A0",

          fontSize: 12,

          letterSpacing: 3,
        }}
      >
        SCROLL
      </span>
    </motion.div>
  );
}