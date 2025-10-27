import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useRef } from "react";
import {
  imagePositions,
  particleCount,
  randomPositions,
} from "../signals/state";
import { BufferAttribute } from "three";
import { OrbitControls } from "@react-three/drei";

function Renderer() {
  const pointsRef = useRef<any>(null);

  useFrame((_: RootState, delta: number) => {
    if (!pointsRef.current) return;
    const points = pointsRef.current;

    let pos: Float32Array = points.geometry.attributes.position.array;

    // Check if the position array needs to be resized
    if (pos.length !== particleCount.value * 3) {
      const newPos = new Float32Array(particleCount.value * 3);

      // Copy the old position array to the new one, set new position as random
      const minLength = Math.min(pos.length, newPos.length);
      const maxLenth = Math.max(pos.length, newPos.length);
      for (let i = 0; i < maxLenth; i++) {
        if (i < minLength) newPos[i] = pos[i];
        else newPos[i] = Math.random() * 2 - 1;
      }

      // points.geometry.attributes.position.array = null;
      points.geometry.setAttribute("position", new BufferAttribute(newPos, 3));

      pos = points.geometry.attributes.position.array;
    }

    // Animate particles towards target position
    const imgPos = imagePositions.value;
    const randPos = randomPositions.value;
    const targetPos = imgPos ? imgPos : randPos;

    const t = Math.min(delta * 3, 0.05);
    for (let i = 0; i < particleCount.value; i++) {
      const i3 = i * 3;
      pos[i3] = pos[i3] + (targetPos[i3] - pos[i3]) * t;
      pos[i3 + 1] = pos[i3 + 1] + (targetPos[i3 + 1] - pos[i3 + 1]) * t;
      pos[i3 + 2] = pos[i3 + 2] + (targetPos[i3 + 2] - pos[i3 + 2]) * t;
    }

    // Tell Three.js to update
    points.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200 * 200}
          args={[new Float32Array(new Array(256 * 256 * 3).fill(0)), 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color={"black"} transparent={true} />
    </points>
  );
}

function ParticleCanvas() {
  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Renderer />
        <OrbitControls
          enablePan={true} // disable panning
          enableRotate={false} // allow rotation
          enableZoom={true} // allow scroll & pinch zoom
          zoomSpeed={1} // optional, slower zoom
          minDistance={1.3} // how close you can zoom in
          maxDistance={15} // how far you can zoom out
          zoomToCursor={false}
        />
      </Canvas>
    </div>
  );
}

export default ParticleCanvas;
