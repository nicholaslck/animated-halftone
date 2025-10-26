import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { imageData } from "../signals/data";
import { imageData2Points } from "../utils/image";
import { computed } from "@preact/signals-react";
import { useComputed, useSignals } from "@preact/signals-react/runtime";

const particlePositions = computed(() => {
  if (imageData.value) {
    console.log("render image");
    return imageData2Points(imageData.value);
  } else {
    console.log("render random points");
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      positions[i3] = Math.random() * 2 - 1;
      positions[i3 + 1] = Math.random() * 2 - 1;
      positions[i3 + 2] = Math.random() * 2 - 1;
    }
    // console.table(positions);
    return positions;
  }
});

const particlesCount = computed(() => particlePositions.value.length / 3);

function Renderer() {
  const pointsRef = useRef<any>(null);

  const randomPositions = useComputed(() => {
    const positions = new Float32Array(particlesCount.value * 3);
    for (let i = 0; i < particlesCount.value; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 3; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3; // y
      positions[i * 3 + 2] = 0.2; // z
    }
    return positions;
  });

  useFrame((state: RootState) => {
    if (!pointsRef.current) return;
    const points = pointsRef.current;
    const positions: Float32Array = points.geometry.attributes.position.array;
    const _randomPositions = randomPositions.value;
    const _imagePositions = particlePositions.value;
    for (let i = 0; i < particlesCount.value; i++) {
      const i3 = i * 3;

      positions[i3] =
        positions[i3] + (_imagePositions[i3] - positions[i3]) * 0.05;
      positions[i3 + 1] =
        positions[i3 + 1] +
        (_imagePositions[i3 + 1] - positions[i3 + 1]) * 0.05;
      // Lerp toward target
      // positions[i3] = positions[i3] + state.clock.elapsedTime * 0.005;
      // positions[i3 + 1] = positions[i3 + 1] + state.clock.elapsedTime * 0.005;
      // positions[i3 + 2] = positions[i3 + 2] + state.clock.elapsedTime * 0.005;
    }

    // Tell Three.js to update
    points.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={randomPositions.value.length / 3}
          args={[randomPositions.value, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={"black"} transparent={true} />
    </points>
  );
}

function ParticleCanvas() {
  useSignals();
  return (
    <div id="canvas-container" className="h-full w-full">
      <div className="fixed top-0 right-0">
        {particlePositions.value.length}
      </div>
      <Canvas camera={{ zoom: 2.6 }}>
        <Renderer />
      </Canvas>
    </div>
  );
}

export default ParticleCanvas;
