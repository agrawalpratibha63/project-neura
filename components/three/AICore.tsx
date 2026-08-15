"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useIntro } from "./useIntro";

export default function AICore() {
  const shell = useRef<THREE.Mesh>(null!);
  const crystal = useRef<THREE.Mesh>(null!);
  const coreLight = useRef<THREE.PointLight>(null!);

  const stage = useIntro((state) => state.stage);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (
      !shell.current ||
      !crystal.current ||
      !coreLight.current
    )
      return;

    //------------------------------------
    // Reactor Light
    //------------------------------------

    let lightIntensity = 8 + Math.sin(t * 3) * 2;

    if (stage >= 2)
      lightIntensity = 14 + Math.sin(t * 6) * 3;

    if (stage >= 3)
      lightIntensity = 22 + Math.sin(t * 10) * 6;

    coreLight.current.intensity = lightIntensity;

    coreLight.current.distance = 10;

    //------------------------------------
    // Shell Opacity
    //------------------------------------

    const shellMaterial =
      shell.current.material as THREE.MeshPhysicalMaterial;

    shellMaterial.opacity =
      stage === 0
        ? 0.25
        : stage === 1
        ? 0.45
        : stage === 2
        ? 0.7
        : 1;

    //------------------------------------
    // Rotation
    //------------------------------------

    shell.current.rotation.y +=
      stage >= 2 ? 0.008 : 0.003;

    shell.current.rotation.x =
      Math.sin(t * 0.4) * 0.08;

    shell.current.rotation.z =
      Math.cos(t * 0.25) * 0.05;

    //------------------------------------
    // Reactor Pulse
    //------------------------------------

    const shellScale =
      1 + Math.sin(t * 4) * 0.02;

    shell.current.scale.setScalar(shellScale);

    //------------------------------------
    // Crystal Rotation
    //------------------------------------

    crystal.current.rotation.x += 0.012;
    crystal.current.rotation.y += 0.018;
    crystal.current.rotation.z += 0.01;

    //------------------------------------
    // Crystal Pulse
    //------------------------------------

    const crystalScale =
      0.42 +
      Math.sin(t * 5) * 0.025;

    crystal.current.scale.setScalar(crystalScale);

    const crystalMaterial =
      crystal.current.material as THREE.MeshStandardMaterial;

    crystalMaterial.emissiveIntensity =
      8 +
      Math.sin(t * 5) * 2;
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.15}
      floatIntensity={0.45}
    >
      <group>
        {/* Reactor Shell */}

        <mesh
          ref={shell}
          castShadow
          receiveShadow
        >
          <icosahedronGeometry
            args={[1.1, 6]}
          />

          <MeshTransmissionMaterial
            transmission={1}
            roughness={0}
            thickness={0.8}
            ior={1.5}
            chromaticAberration={0.08}
            distortion={0.08}
            distortionScale={0.25}
            temporalDistortion={0.15}
            color="#C87941"
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Crystal */}

        <mesh ref={crystal}>
          <octahedronGeometry
            args={[0.35]}
          />

          <meshStandardMaterial
            color="#baf7ff"
            emissive="#E8C4A0"
            emissiveIntensity={8}
            roughness={0}
            metalness={0.2}
          />
        </mesh>

        {/* Light */}

        <pointLight
          ref={coreLight}
          color="#E8C4A0"
          intensity={8}
          distance={10}
          decay={2}
          position={[0, 0, 0]}
        />
      </group>
    </Float>
  );
}