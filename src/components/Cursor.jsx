"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Cursor = () => {
    const cursorRef = useRef(null);
    const cursorOuterRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Check for touch devices or reduced motion preference
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (isTouchDevice || prefersReducedMotion) return;

        const cursor = cursorRef.current;
        const cursorOuter = cursorOuterRef.current;
        if (!cursor || !cursorOuter) return;

        // Show cursor on mouse move
        const handleMouseMove = (e) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        // Lerp animation for smooth cursor movement
        const animate = () => {
            const dx = mousePos.current.x - cursorPos.current.x;
            const dy = mousePos.current.y - cursorPos.current.y;

            cursorPos.current.x += dx * 0.15;
            cursorPos.current.y += dy * 0.15;

            gsap.set(cursor, {
                x: mousePos.current.x,
                y: mousePos.current.y,
            });

            gsap.set(cursorOuter, {
                x: cursorPos.current.x,
                y: cursorPos.current.y,
            });

            requestAnimationFrame(animate);
        };

        // Handle hover states
        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        // Add event listeners to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, [data-cursor-hover]'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Hide cursor when leaving window
        const handleMouseLeaveWindow = () => setIsVisible(false);
        const handleMouseEnterWindow = () => setIsVisible(true);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeaveWindow);
        document.addEventListener("mouseenter", handleMouseEnterWindow);

        // Start animation loop
        animate();

        // MutationObserver to handle dynamic elements
        const observer = new MutationObserver(() => {
            const newElements = document.querySelectorAll(
                'a, button, [role="button"], input, textarea, [data-cursor-hover]'
            );
            newElements.forEach((el) => {
                el.addEventListener("mouseenter", handleMouseEnter);
                el.addEventListener("mouseleave", handleMouseLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeaveWindow);
            document.removeEventListener("mouseenter", handleMouseEnterWindow);
            observer.disconnect();
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [isVisible]);

    return (
        <>
            {/* Inner dot cursor */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent pointer-events-none z-[9999] transition-transform duration-150 ease-out ${isVisible ? "opacity-100" : "opacity-0"
                    } ${isHovering ? "scale-150" : "scale-100"}`}
                style={{ mixBlendMode: "difference" }}
            />
            {/* Outer ring cursor */}
            <div
                ref={cursorOuterRef}
                className={`fixed top-0 left-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 pointer-events-none z-[9998] transition-all duration-200 ease-out ${isVisible ? "opacity-100" : "opacity-0"
                    } ${isHovering ? "scale-150 border-accent bg-accent/10" : "scale-100"}`}
            />
        </>
    );
};

export default Cursor;
