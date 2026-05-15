'use client';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function CarScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.22;
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 4]}  intensity={2.0} color="#D4A853" />
      <pointLight position={[-4, 3, 3]} intensity={1.2} color="#FAF7F2" />
      <Environment preset="city" />

      <Float speed={0.5} rotationIntensity={0.06} floatIntensity={0.4}>
        <group ref={groupRef}>
          {/* Carrosserie basse */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.8, 0.65, 1.7]} />
            <meshStandardMaterial color="#C4714A" metalness={0.55} roughness={0.2} />
          </mesh>

          {/* Cabine */}
          <mesh position={[0.1, 0.6, 0]}>
            <boxGeometry args={[2.1, 0.62, 1.55]} />
            <meshStandardMaterial color="#9E5535" metalness={0.5} roughness={0.2} />
          </mesh>

          {/* Pare-brise avant */}
          <mesh position={[1.05, 0.62, 0]} rotation={[0, 0, -0.48]}>
            <boxGeometry args={[0.04, 0.62, 1.4]} />
            <meshStandardMaterial color="#A0C8E0" metalness={0.1} roughness={0.05} transparent opacity={0.55} />
          </mesh>

          {/* Lunette arrière */}
          <mesh position={[-0.98, 0.6, 0]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[0.04, 0.6, 1.35]} />
            <meshStandardMaterial color="#A0C8E0" metalness={0.1} roughness={0.05} transparent opacity={0.5} />
          </mesh>

          {/* 4 roues */}
          {[
            [1.4, -0.38, 1.0],
            [1.4, -0.38, -1.0],
            [-1.4, -0.38, 1.0],
            [-1.4, -0.38, -1.0],
          ].map(([x, y, z], i) => (
            <group key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh>
                <torusGeometry args={[0.38, 0.13, 16, 32]} />
                <meshStandardMaterial color="#2C1810" metalness={0.1} roughness={0.8} />
              </mesh>
              <mesh>
                <cylinderGeometry args={[0.24, 0.24, 0.14, 24]} />
                <meshStandardMaterial color="#D4A853" metalness={0.7} roughness={0.15} />
              </mesh>
            </group>
          ))}

          {/* Phares avant */}
          {[[0.9], [-0.9]].map(([z], i) => (
            <mesh key={i} position={[1.92, 0.1, z as number]}>
              <boxGeometry args={[0.04, 0.22, 0.35]} />
              <meshStandardMaterial color="#FFF8E0" emissive="#FFC040" emissiveIntensity={0.6} metalness={0.2} roughness={0.1} />
            </mesh>
          ))}

          {/* Sol / ombre */}
          <mesh position={[0, -0.72, 0]} receiveShadow>
            <boxGeometry args={[4.5, 0.06, 2.4]} />
            <meshStandardMaterial color="#E8D4B0" roughness={0.9} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

export default function CarObject3D() {
  return (
    <Canvas
      camera={{ position: [3.5, 2, 5.5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      shadows
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <CarScene />
      </Suspense>
    </Canvas>
  );
}
