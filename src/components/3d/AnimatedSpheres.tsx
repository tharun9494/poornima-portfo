import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const AnimatedSpheres: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create multiple spheres with different properties
    const spheres: THREE.Mesh[] = [];
    const sphereCount = 15;
    const colors = [
      0xff6b6b, // Coral
      0x4ecdc4, // Turquoise
      0x45b7d1, // Sky Blue
      0x96ceb4, // Sage
      0xffeead, // Cream
      0xff9999, // Pink
      0x99ccff, // Light Blue
    ];

    for (let i = 0; i < sphereCount; i++) {
      const geometry = new THREE.SphereGeometry(
        Math.random() * 0.5 + 0.2, // Random size between 0.2 and 0.7
        32,
        32
      );
      
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.6,
        shininess: 100,
        specular: 0x444444,
      });

      const sphere = new THREE.Mesh(geometry, material);
      
      // Random position within a larger space
      sphere.position.x = (Math.random() - 0.5) * 10;
      sphere.position.y = (Math.random() - 0.5) * 10;
      sphere.position.z = (Math.random() - 0.5) * 10;
      
      // Store initial position for animation
      sphere.userData = {
        initialX: sphere.position.x,
        initialY: sphere.position.y,
        initialZ: sphere.position.z,
        speed: Math.random() * 0.02 + 0.01,
        rotationSpeed: Math.random() * 0.02 + 0.01,
      };

      spheres.push(sphere);
      scene.add(sphere);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point lights
    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    camera.position.z = 5;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Update sphere positions and rotations
      spheres.forEach((sphere) => {
        const time = Date.now() * sphere.userData.speed;
        
        // Create floating motion
        sphere.position.x = sphere.userData.initialX + Math.sin(time) * 0.5;
        sphere.position.y = sphere.userData.initialY + Math.cos(time) * 0.5;
        sphere.position.z = sphere.userData.initialZ + Math.sin(time * 0.5) * 0.5;

        // Add rotation
        sphere.rotation.x += sphere.userData.rotationSpeed;
        sphere.rotation.y += sphere.userData.rotationSpeed;

        // Mouse interaction
        sphere.position.x += (mouseX * 0.5 - sphere.position.x) * 0.05;
        sphere.position.y += (mouseY * 0.5 - sphere.position.y) * 0.05;
      });

      // Update camera position based on mouse movement
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedSpheres; 