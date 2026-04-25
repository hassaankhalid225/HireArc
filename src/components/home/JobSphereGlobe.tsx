"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function JobSphereGlobe({ size = 400 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Clear ALL existing canvases (fixes React StrictMode double-mount) ──
    while (mount.firstChild) mount.removeChild(mount.firstChild);

    let cancelled = false;

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    mount.appendChild(canvas);

    // ── Scene & Camera ────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2.8;

    const LINE_COLOR = new THREE.Color("#3a8c5c");
    const DOT_COLOR  = new THREE.Color("#2d6e45");
    const RADIUS     = 1;
    const LAT_LINES  = 12;
    const LON_LINES  = 16;
    const DOT_RADIUS = 0.022;

    const group = new THREE.Group();
    scene.add(group);

    const spherePt = (lat: number, lon: number) => {
      const phi   = (90 - lat)  * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -RADIUS * Math.sin(phi) * Math.cos(theta),
         RADIUS * Math.cos(phi),
         RADIUS * Math.sin(phi) * Math.sin(theta)
      );
    };

    const lineMat = new THREE.LineBasicMaterial({ color: LINE_COLOR, transparent: true, opacity: 0.7 });
    const dotMat  = new THREE.MeshBasicMaterial({ color: DOT_COLOR });
    const dotGeo  = new THREE.SphereGeometry(DOT_RADIUS, 8, 8);

    // Latitude lines
    for (let i = 1; i < LAT_LINES; i++) {
      const lat = -90 + (180 / LAT_LINES) * i;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) pts.push(spherePt(lat, -180 + (360 / 64) * j));
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    }

    // Longitude lines
    for (let i = 0; i < LON_LINES; i++) {
      const lon = -180 + (360 / LON_LINES) * i;
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) pts.push(spherePt(-90 + (180 / 64) * j, lon));
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    }

    // Dots
    for (let i = 1; i < LAT_LINES; i++) {
      const lat = -90 + (180 / LAT_LINES) * i;
      for (let j = 0; j < LON_LINES; j++) {
        const lon  = -180 + (360 / LON_LINES) * j;
        const mesh = new THREE.Mesh(dotGeo, dotMat);
        mesh.position.copy(spherePt(lat, lon));
        mesh.scale.setScalar(Math.max(0.5, Math.cos(lat * Math.PI / 180)));
        group.add(mesh);
      }
    }
    [RADIUS, -RADIUS].forEach(y => {
      const p = new THREE.Mesh(dotGeo, dotMat);
      p.position.set(0, y, 0);
      group.add(p);
    });

    // ── Drag Interaction ──────────────────────────────────
    let isDragging = false;
    let prev = { x: 0, y: 0 };
    let autoRotate = true;
    let resumeTimer: ReturnType<typeof setTimeout> | null = null;

    const onDown  = (x: number, y: number) => { isDragging = true; autoRotate = false; if (resumeTimer) clearTimeout(resumeTimer); prev = { x, y }; };
    const onMove  = (x: number, y: number) => { if (!isDragging) return; group.rotation.x += (y - prev.y) * 0.005; group.rotation.y += (x - prev.x) * 0.005; prev = { x, y }; };
    const onUp    = () => { isDragging = false; resumeTimer = setTimeout(() => { autoRotate = true; }, 2000); };

    const md = (e: MouseEvent) => onDown(e.clientX, e.clientY);
    const mm = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const ts = (e: TouchEvent) => onDown(e.touches[0].clientX, e.touches[0].clientY);
    const tm = (e: TouchEvent) => onMove(e.touches[0].clientX, e.touches[0].clientY);

    canvas.addEventListener("mousedown",  md);
    canvas.addEventListener("mousemove",  mm);
    canvas.addEventListener("mouseup",    onUp);
    canvas.addEventListener("mouseleave", onUp);
    canvas.addEventListener("touchstart", ts, { passive: true });
    canvas.addEventListener("touchmove",  tm, { passive: true });
    canvas.addEventListener("touchend",   onUp);

    // ── Animation Loop ────────────────────────────────────
    let animId: number;
    const animate = () => {
      if (cancelled) return; // stop if cleaned up
      animId = requestAnimationFrame(animate);
      if (autoRotate) {
        group.rotation.y += 0.004;
        group.rotation.x += 0.0006;
      }
      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────
    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      if (resumeTimer) clearTimeout(resumeTimer);
      canvas.removeEventListener("mousedown",  md);
      canvas.removeEventListener("mousemove",  mm);
      canvas.removeEventListener("mouseup",    onUp);
      canvas.removeEventListener("mouseleave", onUp);
      canvas.removeEventListener("touchstart", ts);
      canvas.removeEventListener("touchmove",  tm);
      canvas.removeEventListener("touchend",   onUp);
      renderer.dispose();
      if (mount.contains(canvas)) mount.removeChild(canvas);
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      style={{ width: size, height: size, cursor: "grab", display: "block" }}
    />
  );
}
