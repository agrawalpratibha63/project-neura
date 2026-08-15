"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "./three/useIntro";

export default function IntroOverlay() {
  const stage = useIntro((s) => s.stage);
  console.log("Overlay Render", stage);



  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        style={{
  position: "absolute",
  inset: 0,
  zIndex: 100,
  pointerEvents: "none",
  overflow: "hidden",
}}
      >
        {/* AI HAND */}

       <motion.div
  initial={{ x: -900, opacity: 0 }}
  animate={{
    x: stage >= 3 ? 0 : -900,
    opacity: stage >= 3 ? 1 : 0,
  }}
  transition={{
     duration:2.2,
     ease:"easeOut"

  }}
  style={{
  position: "absolute",
  left: "50%",
  top: "50%",
  width: 760,
  height: 460,
  marginLeft: -760,
  marginTop: -120,
  zIndex: 20,
}}
>
  <Image
    src="/images/ai-hand-left.png"
    alt=""
    fill
    priority
    style={{
      objectFit: "contain",
    }}
  />
</motion.div>

        {/* HUMAN HAND */}

       <motion.div
  initial={{ x: 900, opacity: 0 }}
  animate={{
    x: stage >= 3 ? 0 : 900,
    opacity: stage >= 3 ? 1 : 0,
  }}
  transition={{
    duration:2.2,
     ease:"easeOut"
  }}
  style={{
  position: "absolute",
  left: "50%",
  top: "50%",
  width: 760,
  height: 460,
  marginLeft: 10,
  marginTop: -120,
  zIndex: 20,
}}
>
  <Image
    src="/images/human-hand-right.png"
    alt=""
    fill
    priority
    style={{
    objectFit:"contain",
    transform:"scaleX(-1)"
}}
  />
</motion.div>

        {/* SPARK */}

        <motion.div
  initial={{
    scale:0,
    opacity:0
  }}
  animate={{
  opacity: stage >= 4 ? 1 : 0,
  scale: stage >= 4 ? 1 : 0.2,
}}

transition={{
    duration:.35,
    ease:"easeOut"
}}
 
 style={{
  position: "absolute",
  left: "50%",
  top: "50%",

width:1100,
height:1100,

marginLeft:-550,
marginTop:-550,

  zIndex: 35,
}}
>
  <Image
    src="/images/spark.png"
    alt=""
    fill
    priority
    style={{
  objectFit: "contain",

  filter:
`
drop-shadow(0 0 80px #E8C4A0)
drop-shadow(0 0 180px #E8A838)
drop-shadow(0 0 260px #C87941)
`
}}
  />
</motion.div>

        {/* NAME */}

        <motion.div
          
         initial={{
  opacity: 0,
  y: -30,
}}

animate={{
  opacity: stage >= 4 ? 1 : 0,
  y: stage >= 4 ? 0 : -30,
}}

transition={{
  delay: 0.35,
  duration: 0.8,
  ease: "easeOut",
}}
  style={{
  position: "absolute",

  top: "8%",

  left: 0,
  right: 0,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  zIndex: 9999,
  pointerEvents: "none",
}}
        >
          <h1
  style={{
    color: "#fff",

    fontSize: "clamp(56px, 6vw, 88px)",

    fontWeight: 900,

    margin: 0,

    width: "100%",

    textAlign: "center",

    letterSpacing: "2px",

    textShadow:
      "0 0 20px #E8C4A0,0 0 60px #E8A838,0 0 120px #C87941",
  }}
>
  Pratibha Agrawal
</h1>

          <p
       style={{
    color: "#8ddcff",

    fontSize: "28px",

    letterSpacing: "8px",

    marginTop: 10,

    textAlign: "center",
  }}
          >
            AI / ML ENGINEER
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}