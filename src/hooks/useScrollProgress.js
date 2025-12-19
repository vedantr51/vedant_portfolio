"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to track scroll progress within a specified range
 * Returns a value between 0 and 1 based on scroll position
 */
export function useScrollProgress(start = 0, end = 500) {
    const [progress, setProgress] = useState(0);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);

        const handleScroll = () => {
            if (prefersReducedMotion) {
                setProgress(0);
                return;
            }

            const scrollY = window.scrollY;
            const clampedProgress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);
            setProgress(clampedProgress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener("scroll", handleScroll);
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [start, end, prefersReducedMotion]);

    return prefersReducedMotion ? 0 : progress;
}

/**
 * Hook to detect if user prefers reduced motion
 */
export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return prefersReducedMotion;
}
