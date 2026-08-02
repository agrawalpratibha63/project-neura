"use client";

import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { CHARACTER, useCharacterRig } from "./CharacterRig";

const aiTarget = new Vector3(...CHARACTER.AI_END);
const humanTarget = new Vector3(...CHARACTER.HUMAN_END);

export default function CharacterAnimator() {
  const stage = useCharacterRig((s) => s.stage);

  const aiHandRef = useCharacterRig((s) => s.aiHandRef);
  const humanHandRef = useCharacterRig((s) => s.humanHandRef);

  useFrame(() => {
    if (!aiHandRef.current || !humanHandRef.current) return;

    if (stage >= 4) {
      aiHandRef.current.position.lerp(aiTarget, 0.02);
      humanHandRef.current.position.lerp(humanTarget, 0.02);

      aiHandRef.current.rotation.y += 0.002;
      humanHandRef.current.rotation.y -= 0.002;
    }
  });

  return null;
}