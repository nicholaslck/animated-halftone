import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useRef } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import {
  imagePositions,
  particleCount,
  randomPositions,
} from "../signals/state";

function Renderer() {
  useSignals();
  const pointsRef = useRef<any>(null);

  useFrame((state: RootState) => {
    if (!pointsRef.current) return;
    const points = pointsRef.current;
    const pos: Float32Array = points.geometry.attributes.position.array;
    const imgPos = imagePositions.value;

    if (imgPos) {
      for (let i = 0; i < particleCount.value; i++) {
        const i3 = i * 3;

        // jump to image position immediately
        // pos[i3] = imgPos[i3];
        // pos[i3 + 1] = imgPos[i3 + 1];
        // pos[i3 + 2] = imgPos[i3 + 2];

        const x_diff = imgPos[i3] - pos[i3];
        const y_diff = imgPos[i3 + 1] - pos[i3 + 1];
        const z_diff = imgPos[i3 + 2] - pos[i3 + 2];

        if (Math.abs(x_diff) < 0.001) {
          pos[i3] = imgPos[i3];
        } else {
          pos[i3] = pos[i3] + x_diff * 0.05;
        }

        if (Math.abs(y_diff) < 0.001) {
          pos[i3 + 1] = imgPos[i3 + 1];
        } else {
          pos[i3 + 1] = pos[i3 + 1] + y_diff * 0.05;
        }

        if (Math.abs(z_diff) < 0.001) {
          pos[i3 + 2] = imgPos[i3 + 2];
        } else {
          pos[i3 + 2] = pos[i3 + 2] + z_diff * 0.05;
        }
      }

      // Tell Three.js to update
      points.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount.value}
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
      <div className="fixed top-0 right-0">{particleCount.value}</div>
      <Canvas camera={{ zoom: 2.6 }}>
        <Renderer />
      </Canvas>
    </div>
  );
}

export default ParticleCanvas;
