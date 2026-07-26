"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { sound } from "@/lib/sound";

// Minimalist, high-end Neural Brain Point-Cloud
function NeuralBrainMesh({ color = "#2979FF" }: { color?: string }) {
  const pointsRef = useRef<any>(null!);
  const linesRef = useRef<any>(null!);
  const groupRef = useRef<any>(null!);

  const { positions, linePositions } = useMemo(() => {
    const nodeCount = 800; // slightly less for cleaner look
    const pos = new Float32Array(nodeCount * 3);
    const rawNodes: THREE.Vector3[] = [];

    let pIdx = 0;
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const isRightHemisphere = i % 2 === 0;
      const xSide = isRightHemisphere ? 0.35 : -0.35;

      const baseR = 1.3 + Math.sin(phi * 4) * 0.1 + Math.cos(theta * 4) * 0.1;
      const x = baseR * Math.sin(phi) * Math.cos(theta) * 0.8 + xSide;
      const y = baseR * Math.sin(phi) * Math.sin(theta) * 1.1;
      const z = baseR * Math.cos(phi) * 0.95;

      pos[pIdx++] = x;
      pos[pIdx++] = y;
      pos[pIdx++] = z;
      rawNodes.push(new THREE.Vector3(x, y, z));
    }

    const lineIndices: number[] = [];
    const maxDistSq = 0.45 * 0.45;
    for (let i = 0; i < rawNodes.length; i++) {
      const nodeA = rawNodes[i];
      if (!nodeA) continue;
      for (let j = i + 1; j < rawNodes.length; j++) {
        const nodeB = rawNodes[j];
        if (nodeB && nodeA.distanceToSquared(nodeB) < maxDistSq) {
          lineIndices.push(i, j);
        }
      }
    }

    const linePos = new Float32Array(lineIndices.length * 3);
    let lIdx = 0;
    for (let i = 0; i < lineIndices.length; i++) {
      const idx = lineIndices[i];
      if (typeof idx === "number" && rawNodes[idx]) {
        const v = rawNodes[idx];
        linePos[lIdx++] = v.x;
        linePos[lIdx++] = v.y;
        linePos[lIdx++] = v.z;
      }
    }

    return { positions: pos, linePositions: linePos };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={color}
          size={0.04}
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

// Sleek Data Rings (replacing aggressive Arc Reactor)
function DataRings({ color = "#00E5FF" }: { color?: string }) {
  const outerRingRef = useRef<any>(null!);
  const midRingRef = useRef<any>(null!);
  const innerCoreRef = useRef<any>(null!);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.1;
      outerRingRef.current.rotation.x = Math.cos(time * 0.2) * 0.15;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.z -= delta * 0.15;
      midRingRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }
    if (innerCoreRef.current) {
      const scale = 1 + Math.sin(time * 2) * 0.03;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <mesh ref={innerCoreRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={color}
          emissiveIntensity={1.5}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh ref={midRingRef} scale={1.8}>
        <torusGeometry args={[1.2, 0.005, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>

      <mesh ref={outerRingRef} scale={2.2}>
        <torusGeometry args={[1.1, 0.002, 16, 100]} />
        <meshBasicMaterial color="#2979FF" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function Hero3DVisual({ accent = "#2979FF" }: { accent?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handlePointerDown = () => {
    sound.playClick(); // Softer click for light theme
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      className="w-full h-full min-h-[460px] cursor-grab active:cursor-grabbing pointer-events-auto relative z-20 overflow-visible"
    >
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        {/* Soft, clean lighting for light mode */}
        <ambientLight intensity={2.5} color="#ffffff" />
        <directionalLight position={[10, 10, 8]} intensity={3} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#2979FF" />
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#00E5FF" />

        <Environment preset="studio" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
          <group>
            <NeuralBrainMesh color={accent} />
            <DataRings color="#00E5FF" />
          </group>
        </Float>

        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.15}
          scale={12}
          blur={2.5}
          far={4}
          color="#111111"
        />
      </Canvas>
    </div>
  );
}
