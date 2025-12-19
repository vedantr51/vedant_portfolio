"use client";

import { useEffect, useRef, useCallback } from "react";

// Particle class for physics simulation
class Particle {
    constructor(x, y, vx = 0, vy = 0, hue = 245) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = Math.random() * 4 + 2;
        this.hue = hue;
        this.life = 1;
        this.trail = [];
        this.maxTrail = 8;
    }

    update(gravity, friction, bounds) {
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= friction;
        this.vy *= friction;

        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        // Bounce off walls
        if (this.x < this.radius) { this.x = this.radius; this.vx *= -0.8; }
        if (this.x > bounds.width - this.radius) { this.x = bounds.width - this.radius; this.vx *= -0.8; }
        if (this.y < this.radius) { this.y = this.radius; this.vy *= -0.8; }
        if (this.y > bounds.height - this.radius) { this.y = bounds.height - this.radius; this.vy *= -0.8; }
    }

    draw(ctx, showTrails) {
        if (showTrails && this.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (let i = 1; i < this.trail.length; i++) {
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.strokeStyle = `hsla(${this.hue}, 70%, 60%, 0.3)`;
            ctx.lineWidth = this.radius * 0.5;
            ctx.lineCap = "round";
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, 0.9)`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, 0.3)`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - this.radius * 3, this.y - this.radius * 3, this.radius * 6, this.radius * 6);
    }

    attractTo(target, strength) {
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 300) {
            const force = strength / dist;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
        }
    }
}

export default function ParticlePhysics({ settings }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0, isDown: false });
    const animationRef = useRef(null);

    const { gravity, friction, attractionMode, colorMode, showTrails } = settings;

    const getHue = useCallback(() => {
        switch (colorMode) {
            case "rainbow": return Math.random() * 360;
            case "purple": return 245 + Math.random() * 30 - 15;
            case "teal": return 170 + Math.random() * 30 - 15;
            case "fire": return Math.random() * 60;
            default: return 245;
        }
    }, [colorMode]);

    const spawnParticles = useCallback((x, y, count = 5) => {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            particlesRef.current.push(new Particle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, getHue()));
        }
        if (particlesRef.current.length > 500) {
            particlesRef.current = particlesRef.current.slice(-500);
        }
    }, [getHue]);

    // Expose methods via ref
    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.spawnParticles = spawnParticles;
            canvasRef.current.explode = () => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                for (let i = 0; i < 50; i++) {
                    const angle = (i / 50) * Math.PI * 2;
                    const speed = Math.random() * 8 + 4;
                    particlesRef.current.push(new Particle(centerX, centerY, Math.cos(angle) * speed, Math.sin(angle) * speed, getHue()));
                }
            };
            canvasRef.current.clear = () => { particlesRef.current = []; };
            canvasRef.current.getCount = () => particlesRef.current.length;
        }
    }, [spawnParticles, getHue]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            if (mouseRef.current.isDown) spawnParticles(mouseRef.current.x, mouseRef.current.y, 2);
        };

        const handleMouseDown = (e) => {
            mouseRef.current.isDown = true;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
            spawnParticles(mouseRef.current.x, mouseRef.current.y, 8);
        };

        const handleMouseUp = () => { mouseRef.current.isDown = false; };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseleave", handleMouseUp);

        const animate = () => {
            ctx.fillStyle = "rgba(11, 13, 16, 0.15)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                if (attractionMode !== "none") {
                    const strength = attractionMode === "attract" ? 2 : -3;
                    particle.attractTo(mouseRef.current, strength);
                }
                particle.update(gravity, friction, { width: canvas.width, height: canvas.height });
                particle.draw(ctx, showTrails);
            });

            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("mouseleave", handleMouseUp);
            cancelAnimationFrame(animationRef.current);
        };
    }, [gravity, friction, attractionMode, showTrails, spawnParticles]);

    return <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />;
}
