import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface Box3DProps {
  color: string;
  brandName: string;
}

export function Box3D({ color, brandName }: Box3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  // Cardboard texture material
  const material = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.9,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });

  return (
    <group>
      {/* Main box */}
      <mesh ref={meshRef}>
        {/* Bottom */}
        <mesh position={[0, -0.5, 0]} material={material}>
          <boxGeometry args={[2, 0.1, 1]} />
        </mesh>
        
        {/* Top */}
        <mesh position={[0, 0.5, 0]} material={material}>
          <boxGeometry args={[2, 0.1, 1]} />
          <Text
            position={[0, 0.06, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {brandName}
          </Text>
        </mesh>
        
        {/* Front */}
        <mesh position={[0, 0, 0.5]} material={material}>
          <boxGeometry args={[2, 1, 0.1]} />
        </mesh>
        
        {/* Back */}
        <mesh position={[0, 0, -0.5]} material={material}>
          <boxGeometry args={[2, 1, 0.1]} />
        </mesh>
        
        {/* Left */}
        <mesh position={[-1, 0, 0]} material={material}>
          <boxGeometry args={[0.1, 1, 1]} />
        </mesh>
        
        {/* Right */}
        <mesh position={[1, 0, 0]} material={material}>
          <boxGeometry args={[0.1, 1, 1]} />
        </mesh>
      </mesh>
    </group>
  );
}