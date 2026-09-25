import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ShieldCheck, Lock, Sparkles, Building2, Layers } from 'lucide-react';

const AuthVisual3D = ({ title, subtitle, badgeText = 'Cryptographic Ledger' }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(8, 7, 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Subtle lighting
    const ambLight = new THREE.AmbientLight(0x38bdf8, 0.8);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(10, 15, 8);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 1.5, 20);
    pointLight.position.set(-5, 4, -5);
    scene.add(pointLight);

    // Architectural Wireframe Building Group
    const group = new THREE.Group();
    scene.add(group);

    // Ground Grid
    const grid = new THREE.GridHelper(12, 12, 0x06b6d4, 0x1e293b);
    grid.position.y = -0.5;
    group.add(grid);

    // Building Floors & Columns
    const floorGeo = new THREE.BoxGeometry(6, 0.15, 6);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.8
    });

    for (let i = 0; i < 3; i++) {
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.position.y = i * 1.8;
      group.add(floor);

      // Edge glow wireframe
      const edges = new THREE.EdgesGeometry(floorGeo);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 })
      );
      line.position.y = i * 1.8;
      group.add(line);
    }

    // Floating Evidence Rings
    const ringGeo = new THREE.TorusGeometry(1.2, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    ring.position.set(0, 2.5, 0);
    group.add(ring);

    // Orbiting Evidence Particle Spheres
    const spheresGroup = new THREE.Group();
    group.add(spheresGroup);
    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);

    const sphereColors = [0x10b981, 0x38bdf8, 0xa855f7, 0xf59e0b];
    const spheres = [];

    for (let i = 0; i < 4; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: sphereColors[i],
        emissive: sphereColors[i],
        emissiveIntensity: 0.8
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      spheresGroup.add(mesh);
      spheres.push(mesh);
    }

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      group.rotation.y = t * 0.15;
      ring.rotation.z = t * 0.3;

      spheres.forEach((s, idx) => {
        const ang = t * 0.8 + (idx * Math.PI) / 2;
        const radius = 2.4 + Math.sin(t * 0.5 + idx) * 0.3;
        s.position.set(Math.cos(ang) * radius, 2.5 + Math.sin(t * 1.5 + idx) * 0.4, Math.sin(ang) * radius);
      });

      camera.lookAt(0, 1.8, 0);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[580px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-[#090d16] border border-slate-800/80 p-8 flex flex-col justify-between shadow-2xl">
      {/* 3D Canvas Background */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none opacity-85" />

      {/* Top Brand Pill */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/40 backdrop-blur-md text-xs font-bold text-cyan-300 shadow-lg">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>{badgeText}</span>
        </div>
      </div>

      {/* Center Cinematic Overlay */}
      <div className="relative z-10 space-y-3 pointer-events-none mt-auto">
        <div className="p-5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-slate-800/90 shadow-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Asset Protection</span>
          </div>
          <h3 className="text-lg font-black text-white">{title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthVisual3D;
