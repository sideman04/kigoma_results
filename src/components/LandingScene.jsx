import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LandingScene() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 7;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const points = [];
    const positions = [];
    const random = (seed) => {
      const value = Math.sin(seed * 12.9898) * 43758.5453;
      return value - Math.floor(value);
    };

    for (let i = 0; i < 34; i += 1) {
      const angle = (i / 34) * Math.PI * 2;
      const radius = 1.1 + random(i + 2) * 1.25;
      const point = new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.62, (random(i + 8) - 0.5) * 1.2);
      points.push(point);
      positions.push(point.x, point.y, point.z);
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const nodes = new THREE.Points(nodeGeometry, new THREE.PointsMaterial({ color: 0x16bd35, size: 0.065, transparent: true, opacity: 0.9 }));
    group.add(nodes);

    const linePositions = [];
    points.forEach((point, index) => {
      points.slice(index + 1).forEach((other) => {
        if (point.distanceTo(other) < 1.25) linePositions.push(point.x, point.y, point.z, other.x, other.y, other.z);
      });
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const network = new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: 0x42aaff, transparent: true, opacity: 0.18 }));
    group.add(network);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const pointer = { x: 0, y: 0 };
    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const move = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.15;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.1;
    };
    const render = () => {
      frame = requestAnimationFrame(render);
      if (!reduced) {
        group.rotation.y += (pointer.x - group.rotation.y) * 0.015;
        group.rotation.x += (-pointer.y - group.rotation.x) * 0.015;
        group.rotation.z += 0.0007;
      }
      renderer.render(scene, camera);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    render();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      nodeGeometry.dispose();
      lineGeometry.dispose();
      nodes.material.dispose();
      network.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="landing-scene" aria-hidden="true" />;
}
