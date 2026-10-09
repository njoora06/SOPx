import * as THREE from "three";

/**
 * The hero's 3D neural brain: dual-hemisphere synaptic particles, axon lines,
 * cybernetic rings and a pulsing core that follow the cursor. Loaded only via
 * dynamic import from HeroNeuralScene, so three.js stays out of the main bundle.
 */

const PARTICLE_COUNT = 720;
const MAX_CONNECT_DISTANCE = 1.7;

const RED = new THREE.Color(0xf50c0c);
const BLUE = new THREE.Color(0x3b82f6);
const WHITE = new THREE.Color(0xffffff);

/** Points on two ellipsoid lobes with a fissure between them; left lobe red, right blue, some white. */
function createNodes() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const points: THREE.Vector3[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const isRight = i % 2 === 0;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 4.2 + Math.sin(theta * 4) * Math.cos(phi * 3) * 0.8 + (Math.random() - 0.5) * 0.6;

    // Split into hemispheres with a natural cerebral fissure gap
    const x = r * Math.sin(phi) * Math.cos(theta) * 0.85 + (isRight ? 0.65 : -0.65);
    const y = r * 0.82 * Math.cos(phi);
    const z = r * 1.15 * Math.sin(phi) * Math.sin(theta);
    positions.set([x, y, z], i * 3);
    points.push(new THREE.Vector3(x, y, z));

    const color = Math.random() > 0.82 ? WHITE.clone() : (isRight ? BLUE : RED).clone().lerp(WHITE, Math.random() * 0.35);
    colors.set([color.r, color.g, color.b], i * 3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
  return { mesh: new THREE.Points(geometry, material), material, points };
}

/** Synaptic axon lines: up to three links from each node to nearby nodes on the same side. */
function createAxons(points: THREE.Vector3[]) {
  const positions: number[] = [];
  const colors: number[] = [];

  for (let i = 0; i < points.length; i += 2) {
    const p1 = points[i]!;
    const c = i % 2 !== 0 ? RED : BLUE;
    let connections = 0;
    for (let j = i + 1; j < points.length && connections < 3; j++) {
      const p2 = points[j]!;
      // Don't cross the cerebral boundary indiscriminately
      if (p1.distanceTo(p2) < MAX_CONNECT_DISTANCE && Math.abs(p1.x - p2.x) < 2) {
        positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        colors.push(c.r, c.g, c.b, c.r, c.g, c.b);
        connections++;
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const material = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending });
  return new THREE.LineSegments(geometry, material);
}

/** Wireframe orbital gimbal ring. */
function createRing(radius: number, tube: number, color: number, rotX: number, rotY: number) {
  const material = new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.45, wireframe: true, transparent: true, opacity: 0.45 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 16, 100), material);
  ring.rotation.set(rotX, rotY, 0);
  return ring;
}

/** Central wireframe core that "breathes". */
function createCore() {
  const material = new THREE.MeshPhongMaterial({ color: 0x0e172a, emissive: 0x1e3a8a, emissiveIntensity: 0.7, wireframe: true, transparent: true, opacity: 0.7 });
  return new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 2), material);
}

/**
 * Renders the scene into `container`. Animates only while on screen, or draws
 * a single still frame when `reducedMotion` is set. Returns a cleanup function
 * that stops rendering and frees every GPU resource.
 */
export function mountNeuralBrainScene(container: HTMLElement, { reducedMotion }: { reducedMotion: boolean }) {
  // Match the legacy (r125) colour pipeline the design was authored against.
  THREE.ColorManagement.enabled = false;

  const width = container.clientWidth || window.innerWidth || 800;
  const height = container.clientHeight || window.innerHeight || 600;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 18);

  // Default power preference: "high-performance" forces the discrete GPU on dual-GPU laptops.
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const redLight = new THREE.PointLight(0xf50c0c, 3.5, 40, 1);
  redLight.position.set(10, 8, 12);
  const blueLight = new THREE.PointLight(0x1d4ed8, 3.8, 40, 1);
  blueLight.position.set(-10, -8, 12);
  scene.add(redLight, blueLight);

  // Everything in the group turns together with the cursor
  const brain = new THREE.Group();
  const nodes = createNodes();
  const rings = [
    createRing(5.6, 0.03, 0xf50c0c, Math.PI / 3, 0.2),
    createRing(6.2, 0.03, 0x3b82f6, -Math.PI / 4, 0.5),
    createRing(6.8, 0.02, 0xffffff, Math.PI / 2, 0),
  ] as const;
  const core = createCore();
  brain.add(nodes.mesh, createAxons(nodes.points), ...rings, core);
  scene.add(brain);

  // Mouse parallax tracking, normalised to -1..1 across the container
  let mouseX = 0;
  let mouseY = 0;
  const onMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / (rect.width || window.innerWidth) - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / (rect.height || window.innerHeight) - 0.5) * 2;
  };
  window.addEventListener("mousemove", onMouseMove);

  const render = () => renderer.render(scene, camera);

  // Keep the canvas sized to its container at every breakpoint
  const resizeObserver = new ResizeObserver(() => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    if (reducedMotion) render();
  });
  resizeObserver.observe(container);

  const start = performance.now();
  let frame = 0;
  const animate = () => {
    frame = requestAnimationFrame(animate);
    const t = (performance.now() - start) / 1000;

    // Smooth mouse damping on top of a slow spin
    brain.rotation.y += (mouseX * 0.7 + t * 0.18 - brain.rotation.y) * 0.05;
    brain.rotation.x += (mouseY * 0.4 - brain.rotation.x) * 0.05;

    rings[0].rotation.z += 0.006;
    rings[1].rotation.z -= 0.008;
    rings[2].rotation.x += 0.004;

    const pulse = 1 + Math.sin(t * 2.8) * 0.08;
    core.scale.set(pulse, pulse, pulse);
    nodes.material.size = 0.15 + Math.sin(t * 3.5) * 0.03;

    render();
  };

  // Render only while the scene is on screen, so it doesn't compete with
  // scroll animations further down the page for the GPU.
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(frame);
    if (!entry?.isIntersecting) return;
    if (reducedMotion) render();
    else animate();
  });
  visibilityObserver.observe(container);

  return () => {
    cancelAnimationFrame(frame);
    visibilityObserver.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("mousemove", onMouseMove);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments) {
        obj.geometry.dispose();
        (obj.material as THREE.Material).dispose();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
