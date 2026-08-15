"use client";

import { Group } from "three";
import { useEffect, useRef } from "react";
import ModelLoader from "../loaders/ModelLoader";
import { CHARACTER, useCharacterRig } from "./CharacterRig";

export default function AIHand() {
  const ref = useRef<Group>(null);

  const aiHandRef = useCharacterRig(
    (s) => s.aiHandRef
  );

  useEffect(() => {
    aiHandRef.current = ref.current;
  }, [aiHandRef]);

  return (
    <group
      ref={ref}
      position={CHARACTER.AI_START}
      rotation={[0, -0.8, 0]}
      scale={1}
    >
      <ModelLoader path="/models/ai/ai-hand.glb" />
    </group>
  );
}