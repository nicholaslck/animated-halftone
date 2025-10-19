import { useEffect, useEffectEvent, useRef } from "react";
import * as THREE from "three";
import * as QUARKS from "three.quarks";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 10;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current?.appendChild(renderer.domElement);

    // Create a batched renderer for efficient particle rendering
    const batchedRenderer = new QUARKS.BatchedRenderer();
    scene.add(batchedRenderer);

    // Create a particle system
    const particleSystem = new QUARKS.ParticleSystem({
      // Duration of the particle system in seconds
      duration: 2,

      // Whether the particle system should loop
      looping: true,

      // Emission shape (where particles are emitted from)
      shape: new QUARKS.SphereEmitter({
        radius: 1,
        thickness: 1,
      }),

      // Initial particle properties
      startLife: new QUARKS.IntervalValue(1, 3),
      startSpeed: new QUARKS.ConstantValue(5),
      startSize: new QUARKS.ConstantValue(0.5),
      startColor: new QUARKS.ConstantColor(new THREE.Vector4(1, 0.5, 0.1, 1)),

      // Whether to use world space coordinates
      worldSpace: true,

      // Material for particles
      material: new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        blending: THREE.AdditiveBlending,
      }),

      // Behaviors controlling particle evolution over time
      behaviors: [
        new QUARKS.SizeOverLife(
          new QUARKS.PiecewiseBezier([[new QUARKS.Bezier(1, 0.8, 0.2, 0), 0]]),
        ),
        new QUARKS.ColorOverLife(
          new QUARKS.Gradient(
            [
              [new THREE.Vector3(1, 0.5, 0.1), 0],
              [new THREE.Vector3(0.1, 0.1, 0.1), 1],
            ],
            [
              [1, 0],
              [0, 1],
            ],
          ),
        ),
      ],
    });

    // Add the particle system to the scene
    scene.add(particleSystem.emitter);

    // Add the particle system to the batched renderer
    batchedRenderer.addSystem(particleSystem);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Update the batched renderer
      batchedRenderer.update(0.016); // Pass delta time in seconds

      renderer.render(scene, camera);
    }
    animate();
  }, [canvasRef]);

  return <div ref={canvasRef}></div>;
}

export default ParticleCanvas;
