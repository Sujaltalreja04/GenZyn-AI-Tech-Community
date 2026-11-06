import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { getEnvironmentBytes } from './environmentAsset';

let environmentTexturePromise: Promise<THREE.DataTexture> | null = null;

async function loadEnvironmentTexture() {
  const parsed = new RGBELoader().parse(await getEnvironmentBytes());
  const texture = new THREE.DataTexture(
    parsed.data,
    parsed.width,
    parsed.height,
    THREE.RGBAFormat,
    parsed.type,
  );

  texture.name = 'GenZyn city environment';
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.LinearSRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.flipY = true;
  texture.needsUpdate = true;

  return texture;
}

function getEnvironmentTexture() {
  if (!environmentTexturePromise) {
    environmentTexturePromise = loadEnvironmentTexture().catch((error) => {
      environmentTexturePromise = null;
      throw error;
    });
  }

  return environmentTexturePromise;
}

function CachedCityEnvironment() {
  const [environmentMap, setEnvironmentMap] = useState<THREE.DataTexture | null>(null);

  useEffect(() => {
    let isMounted = true;

    void getEnvironmentTexture()
      .then((texture) => {
        if (isMounted) setEnvironmentMap(texture);
      })
      .catch(() => {
        // The directional lights keep the model visible if the external asset
        // is temporarily unavailable.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return environmentMap ? <Environment map={environmentMap} /> : null;
}

function AnimatedBlackModel() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[1, 3]} scale={2.5}>
      <MeshDistortMaterial
        color="#000000"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </Icosahedron>
  );
}

export function Background3D() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        performance={{ min: 0.5, max: 1, debounce: 200 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#478ECC" />
        <directionalLight position={[-10, -10, -10]} intensity={2} color="#E34A7B" />
        <CachedCityEnvironment />
        <AnimatedBlackModel />
      </Canvas>
    </div>
  );
}
