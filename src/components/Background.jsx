"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

const Background = () => {
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: 0.5, y: 0.5 });
    const targetMousePos = useRef({ x: 0.5, y: 0.5 });
    const animationRef = useRef(0);
    const streamNodesRef = useRef([]);
    const sparklesRef = useRef([]);
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const isHeroPage = pathname === "/";

    // Create a flowing stream node
    const createStreamNode = useCallback((canvas, index, total) => {
        const angle = (index / total) * Math.PI * 2;
        const centerX = canvas.width * 0.5;
        const centerY = canvas.height * 0.5;
        const radiusX = canvas.width * 0.35;
        const radiusY = canvas.height * 0.3;

        return {
            baseX: centerX + Math.cos(angle) * radiusX,
            baseY: centerY + Math.sin(angle) * radiusY,
            x: centerX + Math.cos(angle) * radiusX,
            y: centerY + Math.sin(angle) * radiusY,
            angle,
            speed: 0.0003 + Math.random() * 0.0002,
            offset: Math.random() * Math.PI * 2,
            amplitude: 30 + Math.random() * 40,
            hue: index % 2 === 0 ? 245 : 180, // Purple or Teal
            size: 2 + Math.random() * 2,
            trail: [],
            trailLength: 25 + Math.floor(Math.random() * 15),
        };
    }, []);

    // Create sparkle
    const createSparkle = useCallback((canvas) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: 0,
        maxOpacity: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.02,
        hue: Math.random() > 0.5 ? 245 : 180,
    }), []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(motionQuery.matches);

        const checkMobile = () => {
            const mobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
            setIsMobile(mobile);
            return mobile;
        };
        let mobile = checkMobile();

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            mobile = checkMobile();
            initElements();
        };

        const initElements = () => {
            // Create flowing stream nodes in an orbital pattern
            streamNodesRef.current = [];
            const nodeCount = mobile ? 6 : 12;
            for (let i = 0; i < nodeCount; i++) {
                streamNodesRef.current.push(createStreamNode(canvas, i, nodeCount));
            }

            // Create sparkles
            sparklesRef.current = [];
            const sparkleCount = mobile ? 30 : 60;
            for (let i = 0; i < sparkleCount; i++) {
                sparklesRef.current.push(createSparkle(canvas));
            }
        };

        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e) => {
            if (mobile || prefersReducedMotion) return;
            targetMousePos.current = {
                x: e.clientX / canvas.width,
                y: e.clientY / canvas.height,
            };
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });

        let time = 0;

        const animate = () => {
            if (!ctx || !canvas) return;

            time += 1;

            // Smooth mouse interpolation
            mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * 0.03;
            mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * 0.03;

            const mouseX = mousePos.current.x * canvas.width;
            const mouseY = mousePos.current.y * canvas.height;

            // Clear with dark background
            ctx.fillStyle = "#0B0D10";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Gradient mesh (ambient glow zones)
            const meshPoints = [
                { x: 0.2, y: 0.25, radius: 0.5, color: { r: 100, g: 80, b: 200, a: 0.12 } },
                { x: 0.8, y: 0.7, radius: 0.55, color: { r: 60, g: 180, b: 170, a: 0.1 } },
                { x: 0.5, y: 0.5, radius: 0.4, color: { r: 120, g: 100, b: 220, a: 0.08 } },
            ];

            meshPoints.forEach((point, i) => {
                const wobbleX = Math.sin(time * 0.001 + i * 1.5) * 0.03;
                const wobbleY = Math.cos(time * 0.0008 + i * 2) * 0.02;

                const x = (point.x + wobbleX) * canvas.width;
                const y = (point.y + wobbleY) * canvas.height;
                const radius = point.radius * Math.min(canvas.width, canvas.height);

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, ${point.color.a})`);
                gradient.addColorStop(0.6, `rgba(${point.color.r}, ${point.color.g}, ${point.color.b}, ${point.color.a * 0.3})`);
                gradient.addColorStop(1, "rgba(11, 13, 16, 0)");

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            // Draw flowing streams
            if (!prefersReducedMotion) {
                streamNodesRef.current.forEach((node, index) => {
                    // Update position with orbital motion
                    node.angle += node.speed;

                    const centerX = canvas.width * 0.5;
                    const centerY = canvas.height * 0.5;
                    const radiusX = canvas.width * 0.35;
                    const radiusY = canvas.height * 0.3;

                    // Base orbital position
                    const orbitalX = centerX + Math.cos(node.angle) * radiusX;
                    const orbitalY = centerY + Math.sin(node.angle) * radiusY;

                    // Organic wave motion
                    const waveX = Math.sin(time * 0.002 + node.offset) * node.amplitude;
                    const waveY = Math.cos(time * 0.0015 + node.offset * 1.3) * node.amplitude * 0.7;

                    // Mouse attraction (subtle)
                    let attractX = 0, attractY = 0;
                    if (isHeroPage && !mobile) {
                        const dx = mouseX - node.x;
                        const dy = mouseY - node.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 250 && dist > 0) {
                            const force = (250 - dist) / 250 * 0.15;
                            attractX = (dx / dist) * force * 50;
                            attractY = (dy / dist) * force * 50;
                        }
                    }

                    node.x = orbitalX + waveX + attractX;
                    node.y = orbitalY + waveY + attractY;

                    // Update trail
                    node.trail.unshift({ x: node.x, y: node.y });
                    if (node.trail.length > node.trailLength) {
                        node.trail.pop();
                    }

                    // Draw stream trail
                    if (node.trail.length > 2) {
                        ctx.beginPath();
                        ctx.moveTo(node.trail[0].x, node.trail[0].y);

                        for (let i = 1; i < node.trail.length - 1; i++) {
                            const xc = (node.trail[i].x + node.trail[i + 1].x) / 2;
                            const yc = (node.trail[i].y + node.trail[i + 1].y) / 2;
                            ctx.quadraticCurveTo(node.trail[i].x, node.trail[i].y, xc, yc);
                        }

                        const gradient = ctx.createLinearGradient(
                            node.trail[0].x, node.trail[0].y,
                            node.trail[node.trail.length - 1].x,
                            node.trail[node.trail.length - 1].y
                        );
                        gradient.addColorStop(0, `hsla(${node.hue}, 70%, 65%, 0.4)`);
                        gradient.addColorStop(0.5, `hsla(${node.hue}, 60%, 55%, 0.2)`);
                        gradient.addColorStop(1, "transparent");

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = node.size;
                        ctx.lineCap = "round";
                        ctx.stroke();
                    }

                    // Draw node glow
                    const nodeGlow = ctx.createRadialGradient(
                        node.x, node.y, 0,
                        node.x, node.y, node.size * 8
                    );
                    nodeGlow.addColorStop(0, `hsla(${node.hue}, 70%, 65%, 0.3)`);
                    nodeGlow.addColorStop(0.5, `hsla(${node.hue}, 60%, 55%, 0.1)`);
                    nodeGlow.addColorStop(1, "transparent");
                    ctx.fillStyle = nodeGlow;
                    ctx.fillRect(node.x - node.size * 8, node.y - node.size * 8, node.size * 16, node.size * 16);

                    // Draw node core
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${node.hue}, 80%, 75%, 0.8)`;
                    ctx.fill();
                });

                // Draw connections between nearby nodes
                for (let i = 0; i < streamNodesRef.current.length; i++) {
                    for (let j = i + 1; j < streamNodesRef.current.length; j++) {
                        const n1 = streamNodesRef.current[i];
                        const n2 = streamNodesRef.current[j];
                        const dx = n2.x - n1.x;
                        const dy = n2.y - n1.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 200) {
                            const opacity = (1 - dist / 200) * 0.15;
                            ctx.beginPath();
                            ctx.moveTo(n1.x, n1.y);
                            ctx.lineTo(n2.x, n2.y);
                            ctx.strokeStyle = `hsla(${(n1.hue + n2.hue) / 2}, 60%, 60%, ${opacity})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            }

            // Draw sparkles
            sparklesRef.current.forEach(sparkle => {
                sparkle.phase += sparkle.speed;
                sparkle.opacity = (Math.sin(sparkle.phase) * 0.5 + 0.5) * sparkle.maxOpacity;

                if (sparkle.opacity > 0.01) {
                    ctx.beginPath();
                    ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${sparkle.hue}, 70%, 70%, ${sparkle.opacity})`;
                    ctx.fill();
                }
            });

            // Interactive cursor glow (hero only)
            if (isHeroPage && !mobile && !prefersReducedMotion) {
                const cursorGlow = ctx.createRadialGradient(
                    mouseX, mouseY, 0,
                    mouseX, mouseY, 100
                );
                cursorGlow.addColorStop(0, "rgba(124, 124, 255, 0.08)");
                cursorGlow.addColorStop(0.5, "rgba(94, 234, 212, 0.04)");
                cursorGlow.addColorStop(1, "transparent");
                ctx.fillStyle = cursorGlow;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Vignette
            const vignetteGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.7
            );
            vignetteGradient.addColorStop(0, "rgba(11, 13, 16, 0)");
            vignetteGradient.addColorStop(1, "rgba(11, 13, 16, 0.3)");
            ctx.fillStyle = vignetteGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, [isHeroPage, createStreamNode, createSparkle, prefersReducedMotion]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
};

export default Background;
