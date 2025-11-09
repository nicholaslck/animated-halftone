import { Canvas, useFrame, type RootState } from "@react-three/fiber";
import { useContext, useEffect, useRef } from "react";
import {
  imagePositions,
  particleCount,
  randomPositions,
} from "../signals/data";
import { BufferAttribute } from "three";
import { CameraControls, CameraControlsImpl } from "@react-three/drei";
import { EventContext } from "../contexts/EventContext";

function Renderer() {
  const pointsRef = useRef<any>(null);

  useFrame((_: RootState, delta: number) => {
    if (!pointsRef.current) return;
    const points = pointsRef.current;

    const count = particleCount.peek();
    const imgPos = imagePositions.peek();
    const randPos = randomPositions.peek();

    let pos: Float32Array = points.geometry.attributes.position.array;

    // Check if the position array needs to be resized
    if (pos.length !== count * 3) {
      const newPos = new Float32Array(count * 3);

      // Copy the old position array to the new one, set new position as random
      const copyLength = Math.min(pos.length, newPos.length);
      for (let i = 0; i < copyLength; i++) {
        newPos[i] = pos[i];
      }
      for (let i = copyLength; i < newPos.length; i++) {
        newPos[i] = Math.random() * 2 - 1;
      }

      // points.geometry.attributes.position.array = null;
      points.geometry.setAttribute("position", new BufferAttribute(newPos, 3));

      pos = points.geometry.attributes.position.array;
    }

    // Animate particles towards target position
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
      <pointsMaterial size={0.01} color={"black"} transparent={true} />
    </points>
  );
}

function ParticleCanvas() {
  const cameraControlsRef = useRef<CameraControlsImpl | null>(null);

  const { on } = useContext(EventContext);

  useEffect(() => {
    return on("reset-camera", () => {
      cameraControlsRef.current?.setLookAt(0, 0, 2, 0, 0, 0, true);
      cameraControlsRef.current?.setFocalOffset(0, 0, 0, true);
    });
  }, [on, cameraControlsRef]);

  return (
    <div id="canvas-container" className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Renderer />
        <CameraControls
          ref={cameraControlsRef}
          minDistance={1.2}
          enabled={true}
          dollyToCursor={false}
          infinityDolly={false}
          dragToOffset={true}
        />
      </Canvas>
    </div>
  );
}

export default ParticleCanvas;
