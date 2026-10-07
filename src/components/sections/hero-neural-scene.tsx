"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive 3D neural AI brain / robotic core: dual-hemisphere synaptic
 * particles, axon lines, cybernetic rings and a pulsing core that follow the
 * cursor. Three.js is loaded on the client only.
 */
export function HeroNeuralScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (!containerElem) return;

    let disposed = false;
    let cleanup = () => {};

    void import("three").then((THREE) => {
      if (disposed) return;

      // Match the legacy (r125) colour pipeline the design was authored against.
      THREE.ColorManagement.enabled = false;

      const width = containerElem.clientWidth || window.innerWidth || 800;
      const height = containerElem.clientHeight || window.innerHeight || 600;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(0, 0, 18);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      containerElem.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const redLight = new THREE.PointLight(0xf50c0c, 3.5, 40, 1);
      redLight.position.set(10, 8, 12);
      scene.add(redLight);

      const blueLight = new THREE.PointLight(0x1d4ed8, 3.8, 40, 1);
      blueLight.position.set(-10, -8, 12);
      scene.add(blueLight);

      // Group container for mouse interaction and smooth rotation
      const brainGroup = new THREE.Group();
      scene.add(brainGroup);

      // Dual hemisphere neural brain geometry
      const particleCount = 720;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const nodePositions: InstanceType<typeof THREE.Vector3>[] = [];

      const redColor = new THREE.Color(0xf50c0c);
      const blueColor = new THREE.Color(0x3b82f6);
      const whiteColor = new THREE.Color(0xffffff);

      let pIdx = 0;
      for (let i = 0; i < particleCount; i++) {
        // Ellipsoid brain lobe mapping (left / right hemisphere)
        const isRight = i % 2 === 0;
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 4.2 + Math.sin(theta * 4.0) * Math.cos(phi * 3.0) * 0.8 + (Math.random() - 0.5) * 0.6;

        let x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * 0.82 * Math.cos(phi);
        const z = r * 1.15 * Math.sin(phi) * Math.sin(theta);

        // Split into hemispheres with a natural cerebral fissure gap
        const xOffset = isRight ? 0.65 : -0.65;
        x = x * 0.85 + xOffset;

        positions[pIdx] = x;
        positions[pIdx + 1] = y;
        positions[pIdx + 2] = z;

        nodePositions.push(new THREE.Vector3(x, y, z));

        // Left is cognitive red, right is deep-tech blue, core points are white
        const mixColor = new THREE.Color();
        if (Math.random() > 0.82) {
          mixColor.copy(whiteColor);
        } else if (isRight) {
          mixColor.copy(blueColor).lerp(whiteColor, Math.random() * 0.35);
        } else {
          mixColor.copy(redColor).lerp(whiteColor, Math.random() * 0.35);
        }

        colors[pIdx] = mixColor.r;
        colors[pIdx + 1] = mixColor.g;
        colors[pIdx + 2] = mixColor.b;

        pIdx += 3;
      }

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      nodeGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Synaptic nodes
      const nodeMat = new THREE.PointsMaterial({
        size: 0.16,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      const nodeMesh = new THREE.Points(nodeGeo, nodeMat);
      brainGroup.add(nodeMesh);

      // Synaptic axon lines between nearby points
      const linePositions: number[] = [];
      const lineColors: number[] = [];
      const maxConnectDistance = 1.7;

      for (let i = 0; i < particleCount; i += 2) {
        const p1 = nodePositions[i]!;
        let connections = 0;
        for (let j = i + 1; j < particleCount && connections < 3; j++) {
          const p2 = nodePositions[j]!;
          const dist = p1.distanceTo(p2);
          // Don't cross the cerebral boundary indiscriminately
          if (dist < maxConnectDistance && Math.abs(p1.x - p2.x) < 2.0) {
            linePositions.push(p1.x, p1.y, p1.z);
            linePositions.push(p2.x, p2.y, p2.z);

            const isP1Red = i % 2 !== 0;
            const c = isP1Red ? redColor : blueColor;
            lineColors.push(c.r, c.g, c.b);
            lineColors.push(c.r, c.g, c.b);
            connections++;
          }
        }
      }

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

      const lineMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        linewidth: 1,
      });
      const synapticLines = new THREE.LineSegments(lineGeo, lineMat);
      brainGroup.add(synapticLines);

      // Cybernetic cortex rings (orbital gimbal rings)
      const createCyberRing = (radius: number, tube: number, colorHex: number, rotX: number, rotY: number) => {
        const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 100);
        const ringMat = new THREE.MeshPhongMaterial({
          color: colorHex,
          emissive: colorHex,
          emissiveIntensity: 0.45,
          wireframe: true,
          transparent: true,
          opacity: 0.45,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = rotX;
        ringMesh.rotation.y = rotY;
        return ringMesh;
      };

      const ring1 = createCyberRing(5.6, 0.03, 0xf50c0c, Math.PI / 3, 0.2);
      const ring2 = createCyberRing(6.2, 0.03, 0x3b82f6, -Math.PI / 4, 0.5);
      const ring3 = createCyberRing(6.8, 0.02, 0xffffff, Math.PI / 2, 0);
      brainGroup.add(ring1);
      brainGroup.add(ring2);
      brainGroup.add(ring3);

      // Central neural pulse core
      const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
      const coreMat = new THREE.MeshPhongMaterial({
        color: 0x0e172a,
        emissive: 0x1e3a8a,
        emissiveIntensity: 0.7,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      brainGroup.add(coreMesh);

      // Mouse parallax tracking
      let mouseX = 0;
      let mouseY = 0;

      const onMouseMove = (e: MouseEvent) => {
        const rect = containerElem.getBoundingClientRect();
        const x = (e.clientX - rect.left) / (rect.width || window.innerWidth);
        const y = (e.clientY - rect.top) / (rect.height || window.innerHeight);
        mouseX = (x - 0.5) * 2;
        mouseY = (y - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouseMove);

      // Keep the canvas sized to its container at every breakpoint
      const resizeObserver = new ResizeObserver(() => {
        const newW = containerElem.clientWidth || window.innerWidth;
        const newH = containerElem.clientHeight || window.innerHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      });
      resizeObserver.observe(containerElem);

      const start = performance.now();
      let frame = 0;

      const animate = () => {
        frame = requestAnimationFrame(animate);
        const elapsedTime = (performance.now() - start) / 1000;

        // Smooth mouse damping
        const targetRotY = mouseX * 0.7 + elapsedTime * 0.18;
        const targetRotX = mouseY * 0.4;

        brainGroup.rotation.y += (targetRotY - brainGroup.rotation.y) * 0.05;
        brainGroup.rotation.x += (targetRotX - brainGroup.rotation.x) * 0.05;

        // Orbit ring rotations
        ring1.rotation.z += 0.006;
        ring2.rotation.z -= 0.008;
        ring3.rotation.x += 0.004;

        // Neural core breathing pulsation
        const pulse = 1.0 + Math.sin(elapsedTime * 2.8) * 0.08;
        coreMesh.scale.set(pulse, pulse, pulse);
        nodeMat.size = 0.15 + Math.sin(elapsedTime * 3.5) * 0.03;

        renderer.render(scene, camera);
      };

      // Render only while the scene is on screen, so it doesn't compete with
      // scroll animations further down the page for the GPU.
      const visibilityObserver = new IntersectionObserver(([entry]) => {
        cancelAnimationFrame(frame);
        if (entry?.isIntersecting) animate();
      });
      visibilityObserver.observe(containerElem);

      cleanup = () => {
        cancelAnimationFrame(frame);
        visibilityObserver.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        resizeObserver.disconnect();
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments) {
            obj.geometry.dispose();
            (obj.material as InstanceType<typeof THREE.Material>).dispose();
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="h-full min-h-[460px] w-full bg-transparent" style={{ display: "block" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
