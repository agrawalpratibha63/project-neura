"use client";

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

import { BlendFunction } from "postprocessing";

export default function PostProcessing() {
  return (
    <EffectComposer multisampling={8}>
      <Bloom
  intensity={2.8}
  luminanceThreshold={0}
  luminanceSmoothing={0.25}
  mipmapBlur
/>
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0025, 0.0025]}
      />

      <Noise
        opacity={0.025}
      />

      <Vignette
        eskil={false}
        offset={0.15}
        darkness={1.2}
      />
    </EffectComposer>
  );
}