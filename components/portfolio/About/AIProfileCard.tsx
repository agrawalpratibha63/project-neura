"use client";

import { motion } from "framer-motion";

import ProfileImage from "./ProfileImage";
import InfoCard from "./InfoCard";

export default function AIProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      style={{
        position: "relative",

        width: "100%",
        maxWidth: 520,

        borderRadius: 28,

        overflow: "hidden",

        padding: 32,

        background:
          "linear-gradient(180deg,rgba(42,31,26,.95),rgba(36,21,48,.85))",

        backdropFilter: "blur(24px)",

        border: "1px solid rgba(200,121,65,.25)",

        boxShadow: `
          0 0 60px rgba(200,121,65,.18),
          inset 0 0 30px rgba(232,168,56,.04)
        `,
      }}
    >
      {/* Heading */}

      <div
        style={{
          textAlign: "center",

          marginBottom: 28,
        }}
      >
        <span
          style={{
            color: "#E8C4A0",

            fontSize: 14,

            letterSpacing: 5,

            fontWeight: 700,
          }}
        >
          AI PROFILE
        </span>
      </div>

      {/* Photo */}

      <ProfileImage />

      {/* Name */}

      <div
        style={{
          textAlign: "center",

          marginTop: 24,
        }}
      >
        <h2
          style={{
            margin: 0,

            color: "white",

            fontSize: 32,

            fontWeight: 800,
          }}
        >
          Pratibha Agrawal
        </h2>

        <p
          style={{
            marginTop: 10,

            color: "#E8C4A0",

            fontWeight: 600,

            fontSize: 18,
          }}
        >
          AI / ML Engineer
        </p>
      </div>

      {/* Info */}

      <div
        style={{
          display: "grid",

          gap: 14,

          marginTop: 28,
        }}
      >
        <InfoCard
          label="University"
          value="GLA University"
        />

        <InfoCard
          label="Degree"
          value="B.Tech AI & ML"
        />
      </div>
    </motion.div>
  );
}