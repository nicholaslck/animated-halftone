import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";

function Renderer() {
  const pointsRef = useRef<any>(null);
  const particlesCount = 1000;
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = Math.random();
      positions[i3 + 1] = Math.random();
      positions[i3 + 2] = Math.random();
    }
    return positions;
  }, [particlesCount]);

  useFrame((state: RootState) => {
    if (!pointsRef.current) return;
    const points = pointsRef.current;

    const positions = points.geometry.attributes.position.array;

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Lerp toward target
      positions[i3] = positions[i3] + state.clock.elapsedTime * 0.005;
      positions[i3 + 1] = positions[i3 + 1] + state.clock.elapsedTime * 0.005;
      positions[i3 + 2] = positions[i3 + 2] + state.clock.elapsedTime * 0.005;
    }

    // Tell Three.js to update
    points.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={"black"} transparent />
    </points>
  );
}

function ParticleCanvas() {
  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas>
        <Renderer />
      </Canvas>
    </div>
  );
}

export default ParticleCanvas;
