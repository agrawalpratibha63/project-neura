"use client";

import { motion } from "framer-motion";
import { Hand, Sparkles } from "lucide-react";
import { useGestureControl } from "@/store/useGestureControl";

export default function GestureFeatureBadge() {
  const enabled = useGestureControl((s) => s.enabled);
  const setEnabled = useGestureControl((s) => s.setEnabled);

  return (
    <motion.button
      type="button"
      onClick={() => setEnabled(!enabled)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border mb-6 transition-all ${
        enabled
          ? "border-saffron/50 bg-saffron/10 text-saffron"
          : "border-copper/30 bg-white/5 text-cream hover:border-saffron/40"
      }`}
    >
      <Sparkles size={13} className="text-saffron" />
      <Hand size={13} />
      <span>
        {enabled ? "Hand Control Active" : "Try Computer Vision Hand Control"}
      </span>
    </motion.button>
  );
}
