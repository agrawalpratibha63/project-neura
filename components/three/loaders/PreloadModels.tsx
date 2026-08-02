"use client";

import { useGLTF } from "@react-three/drei";

useGLTF.preload("/models/ai/ai-hand.glb");
useGLTF.preload("/models/human/human-hand.glb");

export default function PreloadModels() {
  return null;
}