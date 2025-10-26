import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { imageData } from "../signals/data";
import { imageData2Points } from "../utils/image";
import { computed } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

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

function Renderer() {
  const pointsRef = useRef<any>(null);

  // useFrame((state: RootState) => {
  //   if (!pointsRef.current) return;
  //   const points = pointsRef.current;

  //   const positions = points.geometry.attributes.position.array;

  //   for (let i = 0; i < particlesCount; i++) {
  //     const i3 = i * 3;

  //     // Lerp toward target
  //     positions[i3] = positions[i3] + state.clock.elapsedTime * 0.005;
  //     positions[i3 + 1] = positions[i3 + 1] + state.clock.elapsedTime * 0.005;
  //     positions[i3 + 2] = positions[i3 + 2] + state.clock.elapsedTime * 0.005;
  //   }

  //   // Tell Three.js to update
  //   points.geometry.attributes.position.needsUpdate = true;
  // });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlePositions.value.length / 3}
          args={[particlePositions.value, 3]}
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
