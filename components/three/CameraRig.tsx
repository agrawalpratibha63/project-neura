"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { INTRO_STAGES, useIntro } from "./useIntro";

export default function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const stage = useIntro((state) => state.stage);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    let desiredPosition = new THREE.Vector3(0, 0, 7.2);

    if (stage <= INTRO_STAGES.ENERGY_CORE) {
      desiredPosition.set(0, 0, 7.2);
    } else if (stage === INTRO_STAGES.RINGS_PARTICLES) {
      desiredPosition.set(0, 0, 6.5);
    } else if (stage === INTRO_STAGES.CAMERA_ZOOM || stage === INTRO_STAGES.HUD) {
      desiredPosition.set(
        Math.sin(t * 0.25) * 0.25,
        Math.cos(t * 0.18) * 0.12,
        5.5
      );
    } else if (stage >= INTRO_STAGES.HANDS_ENTER && stage <= INTRO_STAGES.TOUCH_BLAST) {
      desiredPosition.set(
        Math.sin(t * 0.28) * 0.18,
        Math.cos(t * 0.18) * 0.08,
        5.8
      );
    } else if (stage === INTRO_STAGES.TUNNEL || stage === INTRO_STAGES.NAME_REVEAL) {
      desiredPosition.set(0, 0, 4.5 - t * 0.1 % 2);
    }

    camera.position.lerp(desiredPosition, 0.035);
    target.current.set(0, 0, 0);
    camera.lookAt(target.current);
  });

  return null;
}
