"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Cityscape() {
  const groupRef = useRef<THREE.Group>(null!);

  const buildings = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 20,
        h: 0.5 + Math.random() * 3,
        w: 0.3 + Math.random() * 0.5,
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, b.z]}>
          <boxGeometry args={[b.w, b.h, b.w]} />
          <meshStandardMaterial
            color="#1F1528"
            emissive="#E8A838"
            emissiveIntensity={0.1 + Math.random() * 0.3}
          />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1A1025" />
      </mesh>
    </group>
  );
}

function CityCanvas() {
  return (
    <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#E8A838" />
      <fog attach="fog" args={["#1A1025", 5, 25]} />
      <Cityscape />
    </Canvas>
  );
}

function CityParallax2D() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-saffron/5 to-transparent" />
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 bg-saffron/10 border border-copper/20"
          style={{
            left: `${(i * 9) % 100}%`,
            width: `${20 + (i % 3) * 15}px`,
            height: `${60 + (i % 5) * 30}px`,
            opacity: 0.3 + (i % 4) * 0.1,
          }}
        />
      ))}
    </div>
  );
}

export default function AICitySection() {
  return (
    <section id="ai-city" className="relative h-[80vh] min-h-[500px] overflow-hidden" style={{ background: "#1A1025" }}>
      <div className="absolute inset-0 hidden md:block">
        <CityCanvas />
      </div>
      <div className="absolute inset-0 md:hidden">
        <CityParallax2D />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center">
          <h2 className="font-orbitron text-4xl md:text-6xl font-black text-white brand-glow tracking-widest">AI CITY</h2>
          <p className="text-saffron/80 font-mono text-sm tracking-[6px] mt-4">NEURAL METROPOLIS</p>
        </div>
      </div>
    </section>
  );
}
