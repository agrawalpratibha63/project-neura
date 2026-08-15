"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGestureControl } from "@/store/useGestureControl";

export default function GestureCursor() {
  const enabled = useGestureControl((s) => s.enabled);
  const pointer = useGestureControl((s) => s.pointer);
  const isPinching = useGestureControl((s) => s.isPinching);
  const handDetected = useGestureControl((s) => s.handDetected);
  const gestureMode = useGestureControl((s) => s.gestureMode);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {handDetected && gestureMode !== "scroll" && (
        <motion.div
          className="gesture-cursor pointer-events-none fixed z-[99998]"
          style={{ left: pointer.x, top: pointer.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-100"
            style={{
              width: isPinching ? 32 : 22,
              height: isPinching ? 32 : 22,
              background: isPinching ? "rgba(232,168,56,1)" : "rgba(200,121,65,0.9)",
              boxShadow: isPinching
                ? "0 0 30px rgba(232,168,56,1), 0 0 60px rgba(200,121,65,0.5)"
                : "0 0 18px rgba(232,168,56,0.6)",
              border: "2.5px solid rgba(255,255,255,0.8)",
            }}
          />
          {!isPinching && (
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-saffron/50"
              style={{ width: 48, height: 48 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
