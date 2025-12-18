"use client";

import { useEffect, useRef } from "react";

const Background = () => {
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: 0.5, y: 0.5 });
    const animationRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Track mouse for parallax
        const handleMouseMove = (e) => {
            mousePos.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Gradient colors
        const colors = [
            { r: 124, g: 124, b: 255, a: 0.15 }, // accent
            { r: 94, g: 234, b: 212, a: 0.1 },   // accent-alt
            { r: 18, g: 21, b: 28, a: 0.8 },     // surface
        ];

        // Blob positions with slow movement
        const blobs = [
            { x: 0.2, y: 0.3, radius: 0.4, vx: 0.0002, vy: 0.0001, color: colors[0] },
            { x: 0.8, y: 0.7, radius: 0.5, vx: -0.00015, vy: 0.00012, color: colors[1] },
            { x: 0.5, y: 0.5, radius: 0.3, vx: 0.0001, vy: -0.0001, color: colors[2] },
        ];

        let time = 0;

        const animate = () => {
            if (!ctx || !canvas) return;

            // Clear canvas with background color
            ctx.fillStyle = "#0B0D10";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Parallax offset based on mouse
            const parallaxX = (mousePos.current.x - 0.5) * 0.02;
            const parallaxY = (mousePos.current.y - 0.5) * 0.02;

            // Update and draw blobs
            blobs.forEach((blob) => {
                if (!prefersReducedMotion) {
                    // Update position with very slow movement
                    blob.x += blob.vx;
                    blob.y += blob.vy;

                    // Bounce off edges
                    if (blob.x < 0 || blob.x > 1) blob.vx *= -1;
                    if (blob.y < 0 || blob.y > 1) blob.vy *= -1;
                }

                // Calculate position with parallax
                const x = (blob.x + parallaxX) * canvas.width;
                const y = (blob.y + parallaxY) * canvas.height;
                const radius = blob.radius * Math.min(canvas.width, canvas.height);

                // Create radial gradient
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.color.a})`);
                gradient.addColorStop(1, "rgba(11, 13, 16, 0)");

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            // Add subtle noise overlay
            if (!prefersReducedMotion) {
                time += 0.01;
                ctx.globalAlpha = 0.02;
                for (let i = 0; i < 50; i++) {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    const size = Math.random() * 2;
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
                    ctx.fillRect(x, y, size, size);
                }
                ctx.globalAlpha = 1;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
};

export default Background;
