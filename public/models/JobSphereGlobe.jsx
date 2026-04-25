"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function JobSphereGlobe({ size = 400 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const W = size;
    const H = size;

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // transparent background
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // fully transparent
    mountRef.current.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.z = 2.8;

    // ── Colors ────────────────────────────────────────────
    const LINE_COLOR = new THREE.Color("#2d6e45");   // dark green lines
    const DOT_COLOR  = new THREE.Color("#1e4d2b");   // darker green dots

    const RADIUS      = 1;
    const LAT_LINES   = 12;   // horizontal rings
    const LON_LINES   = 16;   // vertical rings
    const DOT_RADIUS  = 0.022; // small dots
    const LINE_WIDTH  = 1;    // WebGL linewidth (only 1 works cross-browser)

    const group = new THREE.Group();
    scene.add(group);

    // ── Helper: point on sphere ───────────────────────────
    const spherePt = (lat, lon) => {
      const phi   = (90 - lat)  * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -RADIUS * Math.sin(phi) * Math.cos(theta),
         RADIUS * Math.cos(phi),
         RADIUS * Math.sin(phi) * Math.sin(theta)
      );
    };

    const lineMat = new THREE.LineBasicMaterial({
      color: LINE_COLOR,
      linewidth: LINE_WIDTH,
      transparent: true,
      opacity: 0.85,
    });

    const dotMat = new THREE.MeshBasicMaterial({ color: DOT_COLOR });

    // ── Latitude lines (horizontal rings) ─────────────────
    for (let i = 1; i < LAT_LINES; i++) {
      const lat    = -90 + (180 / LAT_LINES) * i;
      const points = [];
      for (let j = 0; j <= 64; j++) {
        points.push(spherePt(lat, -180 + (360 / 64) * j));
      }
      const geo  = new THREE.BufferGeometry().setFromPoints(points);
      group.add(new THREE.Line(geo, lineMat));
    }

    // ── Longitude lines (vertical rings) ──────────────────
    for (let i = 0; i < LON_LINES; i++) {
      const lon    = -180 + (360 / LON_LINES) * i;
      const points = [];
      for (let j = 0; j <= 64; j++) {
        points.push(spherePt(-90 + (180 / 64) * j, lon));
      }
      const geo  = new THREE.BufferGeometry().setFromPoints(points);
      group.add(new THREE.Line(geo, lineMat));
    }

    // ── Dots at every intersection ─────────────────────────
    const dotGeo = new THREE.SphereGeometry(DOT_RADIUS, 8, 8);

    for (let i = 1; i < LAT_LINES; i++) {
      const lat = -90 + (180 / LAT_LINES) * i;
      for (let j = 0; j < LON_LINES; j++) {
        const lon  = -180 + (360 / LON_LINES) * j;
        const pos  = spherePt(lat, lon);
        const mesh = new THREE.Mesh(dotGeo, dotMat);
        mesh.position.copy(pos);
        // scale dot smaller near poles for natural look
        const scale = Math.max(0.5, Math.cos(lat * Math.PI / 180));
        mesh.scale.setScalar(scale);
        group.add(mesh);
      }
    }

    // Top & bottom pole dots
    const poleTop = new THREE.Mesh(dotGeo, dotMat);
    poleTop.position.set(0, RADIUS, 0);
    group.add(poleTop);
    const poleBot = new THREE.Mesh(dotGeo, dotMat);
    poleBot.position.set(0, -RADIUS, 0);
    group.add(poleBot);

    // ── Mouse interaction ─────────────────────────────────
    let isDragging  = false;
    let prevMouse   = { x: 0, y: 0 };
    let autoRotate  = true;
    let velX = 0, velY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      autoRotate = false;
      prevMouse  = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      velX = dy * 0.005;
      velY = dx * 0.005;
      group.rotation.x += velX;
      group.rotation.y += velY;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
      // resume auto-rotate after 2 s
      setTimeout(() => { autoRotate = true; }, 2000);
    };

    // Touch support
    const onTouchStart = (e) => {
      isDragging = true;
      autoRotate = false;
      prevMouse  = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - prevMouse.x;
      const dy = e.touches[0].clientY - prevMouse.y;
      velX = dy * 0.005;
      velY = dx * 0.005;
      group.rotation.x += velX;
      group.rotation.y += velY;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseup",    onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: true });
    canvas.addEventListener("touchend",   onMouseUp);

    // ── Animation loop ────────────────────────────────────
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoRotate) {
        group.rotation.y += 0.003;
        group.rotation.x += 0.0005;
      }
      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown",  onMouseDown);
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseup",    onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onMouseUp);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      style={{
        width:  size,
        height: size,
        cursor: "grab",
        display: "inline-block",
      }}
    />
  );
}
