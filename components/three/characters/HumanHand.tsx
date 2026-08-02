"use client";

import { Group } from "three";
import { useEffect, useRef } from "react";
import ModelLoader from "../loaders/ModelLoader";
import { CHARACTER, useCharacterRig } from "./CharacterRig";

export default function HumanHand() {
  const ref = useRef<Group>(null);

  const humanHandRef = useCharacterRig(
    (s) => s.humanHandRef
  );

  useEffect(() => {
    humanHandRef.current = ref.current;
  }, [humanHandRef]);

  return (
    <group
      ref={ref}
      position={CHARACTER.HUMAN_START}
      rotation={[0, 0.8, 0]}
      scale={1}
    >
      <ModelLoader path="/models/human/human-hand.glb" />
    </group>
  );
}