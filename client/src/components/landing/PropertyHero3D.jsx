import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Layers,
  Sparkles,
  Camera,
  Wrench,
  Lock,
  Maximize2,
  RotateCcw,
  Eye,
  Sliders,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause
} from 'lucide-react';

const PropertyHero3D = () => {
  const mountRef = useRef(null);
  const [activePin, setActivePin] = useState('living-room');
  const [cameraMode, setCameraMode] = useState('cinematic'); // 'cinematic' | 'overview' | 'living' | 'kitchen' | 'balcony' | 'bedroom'
  const [isExploded, setIsExploded] = useState(false);
  const [isCinematicAuto, setIsCinematicAuto] = useState(true);
  const [webglSupported, setWebglSupported] = useState(true);
  const [loading3D, setLoading3D] = useState(true);
  const [timelinePhase, setTimelinePhase] = useState('Approaching Asset');

  // References for Three.js instances
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const houseGroupRef = useRef(null);
  const explodedPartsRef = useRef([]);
  const targetCamPosRef = useRef(new THREE.Vector3(12, 10, 14));
  const targetLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const touchStartDistRef = useRef(0);
  const animFrameIdRef = useRef(null);
  const lastInteractionTimeRef = useRef(Date.now());

  const hotspots = [
    {
      id: 'living-room',
      title: 'Living Room Baseline',
      category: 'Move-In Inspection',
      status: 'Verified Baseline',
      statusColor: 'emerald',
      confidence: '99.4%',
      room: 'Living Room',
      camPos: { x: 5, y: 4.5, z: 7.5 },
      lookAt: { x: 2.6, y: 0.8, z: 2.4 },
      icon: Camera,
      preview: 'Hardwood floor & perimeter wall photographic ledger registered to unit coordinates.',
      timestamp: '01 Apr 2026 • 10:14 AM',
      hash: 'SHA256: 8f92a...c014'
    },
    {
      id: 'kitchen-plumbing',
      title: 'Kitchen Fixture Audit',
      category: 'Maintenance & Service',
      status: 'Resolved & Signed',
      statusColor: 'blue',
      confidence: '96.8%',
      room: 'Kitchen & Island',
      camPos: { x: 6.5, y: 5.2, z: -3.0 },
      lookAt: { x: 2.8, y: 1.0, z: -3.2 },
      icon: Wrench,
      preview: 'Under-sink water supply line verified and signed off with contractor photo.',
      timestamp: '18 Jun 2026 • 02:40 PM',
      hash: 'SHA256: 4b17e...98f1'
    },
    {
      id: 'balcony-door',
      title: 'Balcony Slider Scan',
      category: 'AI Visual Variance',
      status: 'Flagged for Review',
      statusColor: 'amber',
      confidence: '84.2%',
      room: 'Balcony Terrace',
      camPos: { x: -6.5, y: 4.2, z: 6.5 },
      lookAt: { x: -3.3, y: 0.9, z: 3.8 },
      icon: Sparkles,
      preview: 'Track scratch variance detected vs move-in baseline. Non-destructive mark.',
      timestamp: '15 Sep 2026 • 11:30 AM',
      hash: 'SHA256: 9e33a...55d2'
    },
    {
      id: 'master-bed',
      title: 'Bedroom Wall Condition',
      category: 'Condition Benchmark',
      status: 'Verified Intact',
      statusColor: 'emerald',
      confidence: '98.9%',
      room: 'Master Bedroom',
      camPos: { x: -6.8, y: 5.5, z: -3.5 },
      lookAt: { x: -3.5, y: 1.1, z: -2.5 },
      icon: ShieldCheck,
      preview: 'Even matte emulsion coat with no anchor holes or drywall stress cracks.',
      timestamp: '01 Apr 2026 • 10:38 AM',
      hash: 'SHA256: 1a77d...ee09'
    }
  ];

  const currentHotspot = hotspots.find((h) => h.id === activePin) || hotspots[0];

  useEffect(() => {
    // Check WebGL availability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglSupported(false);
      setLoading3D(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(14, 12, 16);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // ==========================================
    // LIGHTING SETUP (Architectural Film Palette)
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.8);
    sunLight.position.set(16, 22, 12);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 45;
    sunLight.shadow.camera.left = -12;
    sunLight.shadow.camera.right = 12;
    sunLight.shadow.camera.top = 12;
    sunLight.shadow.camera.bottom = -12;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const cyanRimLight = new THREE.DirectionalLight(0x06b6d4, 1.4);
    cyanRimLight.position.set(-14, 10, -14);
    scene.add(cyanRimLight);

    const interiorGlow = new THREE.PointLight(0x38bdf8, 1.2, 16, 1.8);
    interiorGlow.position.set(1, 2.5, 1);
    scene.add(interiorGlow);

    // ==========================================
    // 3D ARCHITECTURAL PROPERTY MODEL
    // ==========================================
    const houseGroup = new THREE.Group();
    houseGroupRef.current = houseGroup;
    scene.add(houseGroup);

    // Materials
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.2
    });

    const woodFloorMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.45,
      metalness: 0.05
    });

    const tileFloorMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.25,
      metalness: 0.35
    });

    const outerWallMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
      metalness: 0.1
    });

    const innerWallMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.65,
      metalness: 0.05
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.75,
      ior: 1.4
    });

    const furnitureMatDark = new THREE.MeshStandardMaterial({
      color: 0x020617,
      roughness: 0.5
    });

    const furnitureMatSofa = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.6
    });

    // 1. Base Foundation Floor
    const foundationGeo = new THREE.BoxGeometry(14, 0.4, 12);
    const foundation = new THREE.Mesh(foundationGeo, floorMat);
    foundation.position.y = -0.2;
    foundation.receiveShadow = true;
    houseGroup.add(foundation);

    // Foundation Grid Line Accents
    const gridHelper = new THREE.GridHelper(14, 14, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = 0.01;
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    houseGroup.add(gridHelper);

    // 2. Room Floor Zones
    // Living Room (Wood Floor - Front Right)
    const livingFloorGeo = new THREE.BoxGeometry(6.6, 0.05, 5.6);
    const livingFloor = new THREE.Mesh(livingFloorGeo, woodFloorMat);
    livingFloor.position.set(2.8, 0.03, 2.4);
    livingFloor.receiveShadow = true;
    houseGroup.add(livingFloor);

    // Kitchen & Dining (Tiled Floor - Back Right)
    const kitchenFloorGeo = new THREE.BoxGeometry(6.6, 0.05, 5.6);
    const kitchenFloor = new THREE.Mesh(kitchenFloorGeo, tileFloorMat);
    kitchenFloor.position.set(2.8, 0.03, -2.8);
    kitchenFloor.receiveShadow = true;
    houseGroup.add(kitchenFloor);

    // Master Bedroom (Front Left)
    const bedFloorGeo = new THREE.BoxGeometry(6.6, 0.05, 6.6);
    const bedFloor = new THREE.Mesh(bedFloorGeo, woodFloorMat);
    bedFloor.position.set(-3.3, 0.03, -2.3);
    bedFloor.receiveShadow = true;
    houseGroup.add(bedFloor);

    // Balcony / Sun Deck
    const balconyFloorGeo = new THREE.BoxGeometry(6.6, 0.05, 4.6);
    const balconyFloor = new THREE.Mesh(balconyFloorGeo, tileFloorMat);
    balconyFloor.position.set(-3.3, 0.03, 3.2);
    balconyFloor.receiveShadow = true;
    houseGroup.add(balconyFloor);

    // 3. Walls & Architectural Cutaways
    const explodedParts = [];
    explodedPartsRef.current = explodedParts;

    const createWall = (w, h, d, x, y, z, mat = innerWallMat, explodeVec = new THREE.Vector3(0, 0, 0)) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      houseGroup.add(mesh);

      explodedParts.push({
        mesh,
        basePos: new THREE.Vector3(x, y, z),
        explodeOffset: explodeVec
      });
      return mesh;
    };

    const wallHeight = 2.4;
    const wallThick = 0.25;

    // Outer Walls
    createWall(13.4, wallHeight, wallThick, 0, wallHeight / 2, -5.7, outerWallMat, new THREE.Vector3(0, 0, -2.5));
    createWall(wallThick, wallHeight, 11.4, 6.3, wallHeight / 2, 0, outerWallMat, new THREE.Vector3(2.5, 0, 0));
    createWall(wallThick, wallHeight, 6.0, -6.3, wallHeight / 2, -2.7, outerWallMat, new THREE.Vector3(-2.5, 0, 0));

    // Balcony Glass Railing
    const glassRailingGeo = new THREE.BoxGeometry(6.4, 1.0, 0.1);
    const glassRailing = new THREE.Mesh(glassRailingGeo, glassMat);
    glassRailing.position.set(-3.3, 0.5, 5.4);
    houseGroup.add(glassRailing);

    // Interior Dividers
    createWall(wallThick, wallHeight, 8.0, -0.3, wallHeight / 2, -1.7, innerWallMat, new THREE.Vector3(0, 1.6, 0));
    createWall(6.0, wallHeight, wallThick, 3.0, wallHeight / 2, -0.2, innerWallMat, new THREE.Vector3(0, 1.4, 0));

    // 4. Furniture Elements
    // Living Room Sofa
    const sofaBaseGeo = new THREE.BoxGeometry(3.2, 0.45, 1.4);
    const sofaBase = new THREE.Mesh(sofaBaseGeo, furnitureMatSofa);
    sofaBase.position.set(2.6, 0.25, 3.2);
    sofaBase.castShadow = true;
    houseGroup.add(sofaBase);

    const sofaBackGeo = new THREE.BoxGeometry(3.2, 0.65, 0.35);
    const sofaBack = new THREE.Mesh(sofaBackGeo, furnitureMatSofa);
    sofaBack.position.set(2.6, 0.6, 3.75);
    sofaBack.castShadow = true;
    houseGroup.add(sofaBack);

    // Coffee Table
    const coffeeTableGeo = new THREE.BoxGeometry(1.4, 0.3, 0.9);
    const coffeeTable = new THREE.Mesh(coffeeTableGeo, furnitureMatDark);
    coffeeTable.position.set(2.6, 0.18, 1.8);
    coffeeTable.castShadow = true;
    houseGroup.add(coffeeTable);

    // Kitchen Island
    const islandGeo = new THREE.BoxGeometry(3.0, 0.9, 1.2);
    const islandMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.4 });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.set(2.8, 0.45, -3.2);
    island.castShadow = true;
    houseGroup.add(island);

    // Master Bed
    const bedBaseGeo = new THREE.BoxGeometry(2.4, 0.4, 2.8);
    const bedBase = new THREE.Mesh(bedBaseGeo, furnitureMatDark);
    bedBase.position.set(-3.5, 0.22, -2.5);
    bedBase.castShadow = true;
    houseGroup.add(bedBase);

    const mattressGeo = new THREE.BoxGeometry(2.2, 0.35, 2.6);
    const mattressMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.8 });
    const mattress = new THREE.Mesh(mattressGeo, mattressMat);
    mattress.position.set(-3.5, 0.5, -2.5);
    mattress.castShadow = true;
    houseGroup.add(mattress);

    // 5. Floating Evidence Markers
    const markerGeometry = new THREE.SphereGeometry(0.18, 16, 16);
    const markerGroup = new THREE.Group();
    houseGroup.add(markerGroup);

    const markerPoints = [
      { id: 'living-room', x: 2.6, y: 1.2, z: 2.4, color: 0x10b981 },
      { id: 'kitchen-plumbing', x: 2.8, y: 1.3, z: -3.2, color: 0x38bdf8 },
      { id: 'balcony-door', x: -3.3, y: 1.1, z: 4.8, color: 0xf59e0b },
      { id: 'master-bed', x: -3.5, y: 1.2, z: -2.5, color: 0xa855f7 }
    ];

    markerPoints.forEach((pt) => {
      const mat = new THREE.MeshStandardMaterial({
        color: pt.color,
        emissive: pt.color,
        emissiveIntensity: 0.9,
        roughness: 0.2
      });
      const marker = new THREE.Mesh(markerGeometry, mat);
      marker.position.set(pt.x, pt.y, pt.z);

      const ringGeo = new THREE.RingGeometry(0.24, 0.34, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: pt.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -0.08;
      marker.add(ring);

      markerGroup.add(marker);
    });

    setLoading3D(false);

    // ==========================================
    // CONTINUOUS CINEMATIC FILM TIMELINE (18s Loop)
    // ==========================================
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const timeSinceInteraction = (Date.now() - lastInteractionTimeRef.current) / 1000;

      // Auto-resume cinematic choreography if user is idle for > 4.5 seconds
      const isCinematicActive = isCinematicAuto && timeSinceInteraction > 4.5 && !isDraggingRef.current;

      if (isCinematicActive) {
        // Continuous 18-second looping timeline
        const loopTime = elapsedTime % 18;

        if (loopTime < 3.0) {
          // 0-3s: Aerial Approach
          setTimelinePhase('Aerial Architectural Survey');
          targetCamPosRef.current.set(13 + Math.sin(loopTime * 0.5) * 1.5, 11, 15 + Math.cos(loopTime * 0.5) * 1.5);
          targetLookAtRef.current.set(0, 0.5, 0);
          setActivePin('living-room');
        } else if (loopTime < 7.0) {
          // 3-7s: Swoop down & focus Living Room Baseline
          setTimelinePhase('Inspecting Living Room Baseline');
          targetCamPosRef.current.set(5.5, 4.2, 7.8);
          targetLookAtRef.current.set(2.6, 0.8, 2.4);
          setActivePin('living-room');
        } else if (loopTime < 11.0) {
          // 7-11s: Orbit to Kitchen Plumbing & Service Audit
          setTimelinePhase('Auditing Kitchen Plumbing Fixture');
          targetCamPosRef.current.set(6.8, 5.0, -2.8);
          targetLookAtRef.current.set(2.8, 1.0, -3.2);
          setActivePin('kitchen-plumbing');
        } else if (loopTime < 15.0) {
          // 11-15s: Glide across to Balcony & AI Variance Laser Pin
          setTimelinePhase('Scanning Balcony Slider Variance');
          targetCamPosRef.current.set(-6.5, 4.5, 6.8);
          targetLookAtRef.current.set(-3.3, 0.9, 3.8);
          setActivePin('balcony-door');
        } else {
          // 15-18s: Smooth wide pull-back into rotating orbit
          setTimelinePhase('Global Evidence Synchronization');
          targetCamPosRef.current.set(12, 10, 14);
          targetLookAtRef.current.set(0, 0.5, 0);
          setActivePin('master-bed');
        }

        // Ambient continuous slow rotation
        if (houseGroupRef.current) {
          houseGroupRef.current.rotation.y += 0.0025;
        }
      } else {
        // Manual orbit idle rotation when overview is active
        if (houseGroupRef.current && cameraMode === 'overview' && !isDraggingRef.current) {
          houseGroupRef.current.rotation.y += 0.003;
        }
      }

      // Smooth camera interpolation
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, 0.045);
        currentLookAtRef.current.lerp(targetLookAtRef.current, 0.045);
        cameraRef.current.lookAt(currentLookAtRef.current);
      }

      // Marker floating & ring pulse
      markerGroup.children.forEach((marker, i) => {
        marker.position.y = markerPoints[i].y + Math.sin(elapsedTime * 2.8 + i) * 0.09;
        const ring = marker.children[0];
        if (ring) {
          ring.scale.setScalar(1.0 + Math.sin(elapsedTime * 3.2 + i) * 0.25);
          ring.material.opacity = 0.5 + Math.sin(elapsedTime * 3.2 + i) * 0.3;
        }
      });

      // Exploded View Lerp
      explodedParts.forEach((part) => {
        const target = isExploded
          ? part.basePos.clone().add(part.explodeOffset)
          : part.basePos;
        part.mesh.position.lerp(target, 0.08);
      });

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Mouse Drag
    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      lastInteractionTimeRef.current = Date.now();
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current || !houseGroupRef.current) return;
      lastInteractionTimeRef.current = Date.now();
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      houseGroupRef.current.rotation.y += deltaX * 0.008;
      houseGroupRef.current.rotation.x = Math.max(
        -0.3,
        Math.min(0.4, houseGroupRef.current.rotation.x + deltaY * 0.005)
      );

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      lastInteractionTimeRef.current = Date.now();
    };

    // Touch Support
    const onTouchStart = (e) => {
      lastInteractionTimeRef.current = Date.now();
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1 && isDraggingRef.current && houseGroupRef.current) {
        lastInteractionTimeRef.current = Date.now();
        const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
        const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

        houseGroupRef.current.rotation.y += deltaX * 0.01;
        houseGroupRef.current.rotation.x = Math.max(
          -0.3,
          Math.min(0.4, houseGroupRef.current.rotation.x + deltaY * 0.006)
        );

        previousMousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      lastInteractionTimeRef.current = Date.now();
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    domElem.addEventListener('touchmove', onTouchMove, { passive: true });
    domElem.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElem.removeEventListener('touchstart', onTouchStart);
      domElem.removeEventListener('touchmove', onTouchMove);
      domElem.removeEventListener('touchend', onTouchEnd);
      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }
      renderer.dispose();
    };
  }, []);

  const selectHotspot = (spot) => {
    setActivePin(spot.id);
    setCameraMode(spot.id);
    lastInteractionTimeRef.current = Date.now();
    targetCamPosRef.current.set(spot.camPos.x, spot.camPos.y, spot.camPos.z);
    targetLookAtRef.current.set(spot.lookAt.x, spot.lookAt.y, spot.lookAt.z);
  };

  const resetToOverview = () => {
    setCameraMode('overview');
    lastInteractionTimeRef.current = Date.now();
    targetCamPosRef.current.set(12, 10, 14);
    targetLookAtRef.current.set(0, 0.5, 0);
  };

  return (
    <div className="relative w-full h-[480px] sm:h-[580px] lg:h-[660px] rounded-3xl overflow-hidden border border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-[#090d16] shadow-2xl group select-none">
      {/* 3D WebGL Canvas Mount Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Cinematic Film Timeline Status Pill */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs text-slate-300 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-bold text-cyan-300">Live 3D Film:</span>
        <span className="text-slate-300 font-medium truncate max-w-[150px] sm:max-w-none">{timelinePhase}</span>
      </div>

      {/* 3D Control Action Bar (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => {
            setIsExploded(!isExploded);
            lastInteractionTimeRef.current = Date.now();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-lg border ${
            isExploded
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-cyan-900/40'
              : 'bg-slate-900/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
          }`}
          title="Toggle Exploded Room View"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Exploded Reveal</span>
        </button>

        <button
          onClick={() => {
            setIsCinematicAuto(!isCinematicAuto);
            lastInteractionTimeRef.current = Date.now();
          }}
          className={`p-2 rounded-xl text-xs font-bold transition-all shadow-lg border ${
            isCinematicAuto
              ? 'bg-brand-500/20 text-brand-300 border-brand-400/60'
              : 'bg-slate-900/80 text-slate-400 border-slate-700 hover:bg-slate-800'
          }`}
          title={isCinematicAuto ? 'Pause Cinematic Director' : 'Play Cinematic Director'}
        >
          {isCinematicAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={resetToOverview}
          className="p-2 rounded-xl bg-slate-900/80 text-slate-300 border border-slate-700/80 hover:bg-slate-800 shadow-lg text-xs"
          title="Reset to Overview Angle"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Holographic Evidence Card (Bottom Left) */}
      <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm z-20 pointer-events-auto">
        <div className="p-4 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-cyan-500/40 shadow-2xl space-y-2.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
              {currentHotspot.category}
            </span>
            <span className="text-[10px] font-mono text-slate-400">{currentHotspot.hash}</span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {currentHotspot.title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{currentHotspot.preview}</p>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>{currentHotspot.timestamp}</span>
            <span className="text-emerald-400 font-semibold">{currentHotspot.status}</span>
          </div>
        </div>
      </div>

      {/* Room Quick-Choreography Pills (Bottom Right) */}
      <div className="hidden sm:flex absolute bottom-4 right-4 z-20 flex-col gap-1.5 max-w-[200px]">
        {hotspots.map((spot) => (
          <button
            key={spot.id}
            onClick={() => selectHotspot(spot)}
            className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold text-left transition-all border ${
              activePin === spot.id
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-400/60 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <span className="truncate">{spot.room}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-1 opacity-70" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyHero3D;
