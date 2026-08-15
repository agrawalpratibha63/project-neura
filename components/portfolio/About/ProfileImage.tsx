"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScanLines from "./ScanLines";


export default function ProfileImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      whileHover={{
        scale: 1.02,
      }}
      style={{
        position: "relative",

        width: "100%",
        maxWidth: 330,
        height: 460,

        margin: "0 auto",

        overflow: "hidden",

        borderRadius: 28,

        background:
          "linear-gradient(180deg,#0f172a,#111827)",

        border: "1px solid rgba(232,168,56,.28)",

        boxShadow: `
            0 0 25px rgba(232,168,56,.20),
            0 20px 60px rgba(0,0,0,.45)
        `,
      }}
    >
      {/* IMAGE */}

      <Image
        src="/images/profile.jpeg"
        alt="Pratibha Agrawal"
        fill
        priority
       style={{
objectFit:"cover",
objectPosition:"center top"
}}
        />
      {/* DARK OVERLAY */}
      <div
  style={{
    position: "absolute",
    inset: 0,

    background:
      "linear-gradient(to top, rgba(2,6,23,.45), rgba(2,6,23,.08), transparent)",

    pointerEvents: "none",
  }}
/>

      {/* GLOW */}

      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        style={{
          position: "absolute",

          inset: 0,

          background:
            "radial-gradient(circle at top,rgba(232,168,56,.25),transparent 60%)",

          pointerEvents: "none",
        }}
      />

      {/* SCAN */}
      <ScanLines />

      
    </motion.div>
  );
}