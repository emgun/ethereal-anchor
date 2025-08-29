import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';
import { useRitual } from '@/context/RitualContext';

const createEnvironment = (scene: THREE.Scene, world: 'forest' | 'ocean' | 'desert') => {
  const color = world === 'forest' ? 0x0b1f16 : world === 'ocean' ? 0x071522 : 0x23190f;
  scene.background = new THREE.Color(color);
  const fog = new THREE.Fog(color, 6, 16); scene.fog = fog;

  // ground
  const groundGeo = new THREE.PlaneGeometry(50, 50);
  const groundMat = new THREE.MeshStandardMaterial({ color: world === 'ocean' ? 0x0b2a3d : world === 'forest' ? 0x10271d : 0x3a2a1a, roughness: 0.9, metalness: 0.05 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.5;
  scene.add(ground);

  // ambient particles
  const count = 800;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 30;
    pos[i * 3 + 1] = Math.random() * 6 + 0.2;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pColor = world === 'forest' ? 0xa8ffd1 : world === 'ocean' ? 0xa8e6ff : 0xffe4b3;
  const mat = new THREE.PointsMaterial({ color: pColor, size: 0.06, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(geo, mat);
  points.name = 'ambientParticles';
  scene.add(points);
};

export default function Garden() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { world } = useTheme();
  const { awardXp } = useRitual();
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const w = mount.clientWidth || window.innerWidth;
    const h = mount.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    setRenderer(renderer);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 1.2, 6);

    createEnvironment(scene, world === 'desert' ? 'desert' : world === 'ocean' ? 'ocean' : 'forest');

    // Sanctuary centerpiece
    const centerpieceGeo = new THREE.IcosahedronGeometry(1.1, 2);
    const centerColor = world === 'forest' ? 0x6bd0a0 : world === 'ocean' ? 0x6ec7ff : 0xf1c07b;
    const centerpieceMat = new THREE.MeshPhysicalMaterial({ color: centerColor, metalness: 0.2, roughness: 0.25, transmission: 0.5, thickness: 0.7, emissive: new THREE.Color(centerColor).multiplyScalar(0.2) });
    const centerpiece = new THREE.Mesh(centerpieceGeo, centerpieceMat);
    centerpiece.position.y = 0.4;
    scene.add(centerpiece);

    // Collectibles as small floating sprites
    const makeCollectible = (c: number, x: number, z: number, name: string) => {
      const geo = new THREE.SphereGeometry(0.14, 16, 16);
      const mat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.9 });
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, 0.6 + Math.random() * 0.6, z);
      m.userData.name = name;
      scene.add(m);
      return m;
    };

    const collectibles: THREE.Mesh[] = [];
    const makeRing = (color: number, label: string, radius = 2.2, count = 6) => {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        collectibles.push(makeCollectible(color, x, z, label));
      }
    };
    if (world === 'ocean') makeRing(0x9fe7ff, 'Shell', 2.2, 8);
    if (world === 'forest') makeRing(0xa8ffcf, 'Leaf', 2.2, 8);
    if (world === 'desert') makeRing(0xffe4b3, 'Seed', 2.2, 8);

    const lights = [new THREE.AmbientLight(0xffffff, 0.35), new THREE.DirectionalLight(0xffffff, 0.6)];
    lights[1].position.set(2, 3, 2); lights.forEach(l => scene.add(l));

    const raycaster = new THREE.Raycaster(); const mouse = new THREE.Vector2();
    let isDragging = false; let prevX = 0; let prevY = 0; let yaw = 0; let pitch = 0;
    const onClick = (e: MouseEvent) => {
      if (!renderer) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(collectibles, false);
      if (hits.length > 0) {
        const obj = hits[0].object as THREE.Mesh;
        // pop + reward
        awardXp(20, `Collected ${obj.userData.name}`);
        scene.remove(obj);
      }
    };
    renderer.domElement.addEventListener('click', onClick);

    const onPointerDown = (e: PointerEvent) => { isDragging = true; prevX = e.clientX; prevY = e.clientY; };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX; const dy = e.clientY - prevY;
      prevX = e.clientX; prevY = e.clientY;
      yaw -= dx * 0.003; pitch = Math.max(-0.6, Math.min(0.6, pitch - dy * 0.003));
    };
    const onPointerUp = () => { isDragging = false; };
    const onWheel = (e: WheelEvent) => {
      camera.position.z = Math.max(3, Math.min(10, camera.position.z + (e.deltaY > 0 ? 0.4 : -0.4)));
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: true });

    let t = 0; let raf = 0;
    const loop = () => {
      t += 0.01;
      centerpiece.rotation.y += 0.004;
      // apply camera orbit
      const radius = camera.position.z;
      const cx = Math.sin(yaw) * Math.cos(pitch) * radius;
      const cz = Math.cos(yaw) * Math.cos(pitch) * radius;
      const cy = Math.sin(pitch) * radius * 0.4 + 1.2;
      camera.position.set(cx, cy, cz);
      camera.lookAt(0, 0.4, 0);
      centerpiece.position.y = 0.4 + Math.sin(t * 0.9) * 0.06;
      collectibles.forEach((m, i) => {
        m.position.y += Math.sin(t * 1.3 + i) * 0.002;
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onResize = () => {
      const w2 = mount.clientWidth || window.innerWidth;
      const h2 = mount.clientHeight || window.innerHeight;
      renderer.setSize(w2, h2);
      camera.aspect = w2 / h2; camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('wheel', onWheel as any);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [world]);

  return (
    <div className="min-h-screen bg-background/10 pb-20">
      <div className="px-6 pt-6 pb-2">
        <h1 className="font-heading text-2xl font-semibold text-foreground">Ritual Garden</h1>
        <p className="text-muted-foreground font-body">Explore your evolving sanctuary.</p>
      </div>
      <div ref={mountRef} className="px-2 relative z-10" style={{ height: 'calc(100dvh - 140px)', cursor: 'grab' }} />
    </div>
  );
}


