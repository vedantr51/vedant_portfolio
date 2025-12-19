"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function Home() {
    // Track scroll progress for hero exit animation (0-400px scroll range)
    const scrollProgress = useScrollProgress(0, 400);

    // Calculate transform values based on scroll
    const scale = 1 - scrollProgress * 0.08; // Scale from 1 to 0.92
    const opacity = 1 - scrollProgress * 0.6; // Opacity from 1 to 0.4
    const blur = scrollProgress * 4; // Blur from 0 to 4px
    const y = scrollProgress * -30; // Move up slightly

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
            <motion.div
                className="max-w-4xl mx-auto text-center"
                style={{
                    transform: `scale(${scale}) translateY(${y}px)`,
                    opacity,
                    filter: `blur(${blur}px)`,
                    willChange: 'transform, opacity, filter',
                }}
            >
                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                    className="text-accent text-sm font-medium tracking-wide uppercase mb-4"
                >
                    Software Developer
                </motion.p>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                    className="font-heading text-5xl md:text-7xl font-bold tracking-heading text-primary mb-6"
                >
                    Hi, I&apos;m{" "}
                    <span className="text-gradient">Vedant</span>
                </motion.h1>

                {/* Value Proposition */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                    className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-10"
                >
                    I craft premium digital experiences with React, Next.js, and modern web technologies.
                    Clean code. Smooth animations. Pixel-perfect designs.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Button href="/projects" variant="primary">
                        View Projects
                    </Button>
                    <Button href="/contact" variant="secondary">
                        Get in Touch
                    </Button>
                    <Button href="/resume_Vedant.pdf" variant="secondary" external>
                        View Resume
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
