'use client';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function VillaScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 6, 4]}  intensity={2.2} color="#D4A853" />
      <pointLight position={[-4, 2, 3]} intensity={1.0} color="#FAF7F2" />
      <pointLight position={[0, 8, -3]} intensity={0.6} color="#C4714A" />
      <Environment preset="sunset" />

      <Float speed={0.6} rotationIntensity={0.08} floatIntensity={0.5}>
        <group ref={groupRef}>
          {/* Corps principal */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[3.2, 1.8, 2.4]} />
            <meshStandardMaterial color="#C4714A" metalness={0.15} roughness={0.55} />
          </mesh>

          {/* Toit plat + rebord */}
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[3.5, 0.18, 2.7]} />
            <meshStandardMaterial color="#9E5535" metalness={0.1} roughness={0.5} />
          </mesh>

          {/* Aile droite */}
          <mesh position={[2.0, -0.5, 0]}>
            <boxGeometry args={[1.0, 0.8, 1.8]} />
            <meshStandardMaterial color="#B8644A" metalness={0.1} roughness={0.6} />
          </mesh>

          {/* Terrasse / piscine */}
          <mesh position={[-1.2, -0.95, 0]} receiveShadow>
            <boxGeometry args={[0.9, 0.06, 1.4]} />
            <meshStandardMaterial color="#D4A853" metalness={0.4} roughness={0.2} />
          </mesh>
          {/* Eau piscine */}
          <mesh position={[-1.2, -0.9, 0]}>
            <boxGeometry args={[0.7, 0.04, 1.1]} />
            <MeshDistortMaterial
              color="#4A90C4"
              metalness={0.1} roughness={0.05}
              transparent opacity={0.75}
              distort={0.04} speed={0.8}
            />
          </mesh>

          {/* Fenêtres */}
          {[-0.9, 0.3, 1.1].map((x, i) => (
            <mesh key={i} position={[x, 0.1, 1.22]}>
              <boxGeometry args={[0.5, 0.65, 0.04]} />
              <meshStandardMaterial color="#D4A853" metalness={0.6} roughness={0.1} emissive="#C4714A" emissiveIntensity={0.3} />
            </mesh>
          ))}

          {/* Porte */}
          <mesh position={[0.3, -0.5, 1.22]}>
            <boxGeometry args={[0.55, 0.9, 0.04]} />
            <meshStandardMaterial color="#5C3828" metalness={0.3} roughness={0.4} />
          </mesh>

          {/* Arche décorative (arcade marocaine) */}
          <mesh position={[0.3, -0.08, 1.28]}>
            <torusGeometry args={[0.3, 0.04, 12, 24, Math.PI]} />
            <meshStandardMaterial color="#D4A853" metalness={0.5} roughness={0.2} />
          </mesh>

          {/* Sol / jardin */}
          <mesh position={[0, -1.0, 0]} receiveShadow>
            <boxGeometry args={[5.0, 0.1, 4.2]} />
            <meshStandardMaterial color="#E8D4B0" metalness={0} roughness={0.9} />
          </mesh>

          {/* Palmier stylisé */}
          <mesh position={[1.8, -0.55, -0.8]}>
            <cylinderGeometry args={[0.07, 0.09, 0.9, 8]} />
            <meshStandardMaterial color="#7A5030" roughness={0.9} />
          </mesh>
          <mesh position={[1.8, -0.05, -0.8]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshStandardMaterial color="#5A8040" roughness={0.8} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

export default function VillaObject3D() {
  return (
    <Canvas
      camera={{ position: [4, 2.5, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      shadows
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <VillaScene />
      </Suspense>
    </Canvas>
  );
}
