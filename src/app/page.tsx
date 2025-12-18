"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";

export default function Home() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">
            <div className="max-w-4xl mx-auto text-center">
                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                    className="text-accent text-sm font-medium tracking-wide uppercase mb-4"
                >
                    Frontend Developer
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
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 rounded-full border-2 border-secondary/30 flex items-start justify-center p-1"
                    >
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-3 bg-accent rounded-full"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
