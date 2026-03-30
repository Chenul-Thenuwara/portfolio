"use client";

import { useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// ─────────────────────────────────────────────
//  GLSL Shaders
// ─────────────────────────────────────────────
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform float uTime;

  varying vec2 vUv;

  // Smooth polar ripple displacement
  vec2 ripple(vec2 uv, vec2 center, float intensity) {
    vec2 delta = uv - center;
    float dist = length(delta);

    // Tight falloff — effect strong near cursor, fades over ~0.25 UV units
    float falloff = exp(-dist * 8.0);

    // Ripple: sine wave radiating outward from mouse
    float wave = sin(dist * 22.0 - uTime * 4.0) * falloff;

    // Displace UV along the direction from cursor to fragment
    vec2 dir = normalize(delta + vec2(0.0001));
    return uv + dir * wave * intensity * 0.035;
  }

  void main() {
    // Apply ripple displacement
    vec2 distortedUV = ripple(vUv, uMouse, uIntensity);

    // Sample texture at displaced UV
    vec4 tex = texture2D(uTexture, distortedUV);

    // Subtle vignette
    float vignette = smoothstep(0.9, 0.3, length(vUv - 0.5) * 1.4);
    tex.rgb *= vignette;

    gl_FragColor = tex;
  }
`;

// ─────────────────────────────────────────────
//  Inner mesh that uses useFrame for per-frame lerp
// ─────────────────────────────────────────────
interface PlaneProps {
  textureSrc: string;
  targetIntensity: React.MutableRefObject<number>;
  targetMouse: React.MutableRefObject<[number, number]>;
}

function FluidPlane({ textureSrc, targetIntensity, targetMouse }: PlaneProps) {
  const { viewport } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  // Load texture; on error (no URL) we still get a solid color via the gradient bg
  const texture = useTexture(textureSrc);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const mat = matRef.current;

    // Damp intensity toward target (lerp factor 0.08 = very smooth)
    mat.uniforms.uIntensity.value +=
      (targetIntensity.current - mat.uniforms.uIntensity.value) * 0.08;

    // Damp mouse position
    mat.uniforms.uMouse.value.x +=
      (targetMouse.current[0] - mat.uniforms.uMouse.value.x) * 0.10;
    mat.uniforms.uMouse.value.y +=
      (targetMouse.current[1] - mat.uniforms.uMouse.value.y) * 0.10;

    mat.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uIntensity: { value: 0 },
          uTime: { value: 0 },
        }}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────
//  Public component
// ─────────────────────────────────────────────
interface FluidImageCardProps {
  textureSrc: string;
  fallbackColor?: string;
  className?: string;
}

export default function FluidImageCard({
  textureSrc,
  fallbackColor = "#1a0f0e",
  className = "",
}: FluidImageCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetIntensity = useRef(0);
  const targetMouse = useRef<[number, number]>([0.5, 0.5]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Convert to UV space [0,1] — flip Y for WebGL convention
    targetMouse.current = [
      (e.clientX - rect.left) / rect.width,
      1.0 - (e.clientY - rect.top) / rect.height,
    ];
  }, []);

  const handleMouseEnter = useCallback(() => {
    targetIntensity.current = 1;
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetIntensity.current = 0;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 1], fov: 75 }}
      >
        <FluidPlane
          textureSrc={textureSrc}
          targetIntensity={targetIntensity}
          targetMouse={targetMouse}
        />
      </Canvas>
    </div>
  );
}
