import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AnimatedSpheres() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create spheres with more variety
    const spheres: THREE.Mesh[] = [];
    const sphereCount = 22;
    const geometries = [
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.SphereGeometry(1.3, 32, 32)
    ];
    for (let i = 0; i < sphereCount; i++) {
      const color = new THREE.Color(
        0.5 + Math.random() * 0.5,
        0.5 + Math.random() * 0.5,
        0.7 + Math.random() * 0.3
      );
      const material = new THREE.MeshPhysicalMaterial({
        color,
        transparent: true,
        opacity: 0.5 + Math.random() * 0.3,
        roughness: 0.2,
        metalness: 0.7,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        emissive: color.clone().multiplyScalar(0.2 + Math.random() * 0.3),
        emissiveIntensity: 0.5 + Math.random() * 0.5,
      });
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 18
      );
      sphere.scale.setScalar(Math.random() * 0.7 + 0.5);
      spheres.push(sphere);
      scene.add(sphere);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.2, 100);
    pointLight.position.set(10, 20, 20);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0x8ecae6, 0.7, 100);
    pointLight2.position.set(-15, -10, 10);
    scene.add(pointLight2);

    // Camera position
    camera.position.z = 15;

    // Mouse parallax
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      // Parallax camera
      camera.position.x += (mouse.current.x * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouse.current.y * 2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      // Animate spheres
      spheres.forEach((sphere, i) => {
        const t = Date.now() * 0.001 + i;
        sphere.position.x += Math.sin(t + i) * 0.008 + Math.cos(t * 0.7 + i) * 0.006;
        sphere.position.y += Math.cos(t + i) * 0.008 + Math.sin(t * 0.5 + i) * 0.006;
        sphere.position.z += Math.sin(t * 0.3 + i) * 0.004;
        sphere.rotation.x += 0.002 * (i % 3 + 1);
        sphere.rotation.y += 0.003 * (i % 2 + 1);
      });
      renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0"
      style={{ pointerEvents: 'none' }}
    />
  );
} 