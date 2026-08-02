"use client";

import { motion } from "framer-motion";
import AIProfileCard from "./AIProfileCard";

export default function AboutVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full flex justify-center"
    >
      <AIProfileCard />
    </motion.div>
  );
}
