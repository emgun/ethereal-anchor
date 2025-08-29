import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/context/ThemeContext';

interface Props {
  isActive?: boolean;
  size?: number; // px
}

export const ThreeBreathOrb = ({ isActive = true, size = 280 }: Props) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { world } = useTheme();

  useEffect(() => {
    const mount = mountRef.current!;
    const width = size;
    const height = size;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const group = new THREE.Group();
    scene.add(group);

    // Orb
    const orbGeo = new THREE.SphereGeometry(1, 64, 64);
    const baseColor = world === 'forest' ? 0x82c59b : world === 'ocean' ? 0x79c7ff : world === 'desert' ? 0xf2c27b : 0xb38ad7;
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      transmission: 0.6,
      thickness: 0.6,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
      emissive: new THREE.Color(baseColor).multiplyScalar(0.15),
      emissiveIntensity: 0.8,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    group.add(orb);

    // Glow
    const glowGeo = new THREE.SphereGeometry(1.15, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color: baseColor, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    group.add(glow);

    // Particles
    const particleCount = 250;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.8 + Math.random() * 0.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pColor = world === 'forest' ? 0xa8ffd1 : world === 'ocean' ? 0xa8e6ff : world === 'desert' ? 0xffe4b3 : 0xe7c6ff;
    const pMat = new THREE.PointsMaterial({ color: pColor, size: 0.02, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Lights
    const key = new THREE.DirectionalLight(0xffffff, 0.6); key.position.set(2, 2, 2); scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.3); fill.position.set(-1, -1, 2); scene.add(fill);
    const amb = new THREE.AmbientLight(0xffffff, 0.3); scene.add(amb);

    let t = 0; let raf = 0;
    const breathe = () => {
      t += 0.016;
      const scale = isActive ? 1 + Math.sin(t) * 0.05 : 1;
      group.scale.setScalar(scale);
      glow.material.opacity = 0.18 + (Math.sin(t) * 0.08 + 0.08);
      particles.rotation.y += 0.0015;
      particles.rotation.x += 0.0008;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(breathe);
    };
    breathe();

    const onResize = () => {
      const w = size; const h = size;
      renderer.setSize(w, h);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      pGeo.dispose();
      orbGeo.dispose(); glowGeo.dispose();
    };
  }, [isActive, size, world]);

  return <div ref={mountRef} style={{ width: size, height: size }} />;
};


