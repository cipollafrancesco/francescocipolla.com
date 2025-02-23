"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function InfiniteGridWalk() {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Grid Helper
        const gridSize = 1000;
        const gridDivisions = 100;
        const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x444444, 0x444444);
        gridHelper.position.y = -0.5; // Slightly below the camera
        scene.add(gridHelper);

        // Camera Setup
        camera.position.set(0, 1.5, 5); // First-person perspective
        camera.lookAt(0, 0, 0);

        // Animation variables
        let speed = 0.05; // Walking speed
        let walkDistance = 0; // Accumulated distance for resetting grid

        // Animation loop
        const animate = () => {
            walkDistance += speed;
            camera.position.z -= speed;

            // Reset grid position for infinite effect
            gridHelper.position.z = -(walkDistance % (gridSize / gridDivisions));

            // Render the scene
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}
