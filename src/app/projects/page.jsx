"use client";

import { motion } from "framer-motion";

export default function Projects() {
    return (
        <section className="min-h-screen flex items-center px-6 py-32">
            <div className="max-w-6xl mx-auto w-full">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mb-12 text-center"
                >
                    <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">
                        Featured Work
                    </p>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-heading text-primary mb-4">
                        Selected Projects
                    </h1>
                    <p className="text-secondary max-w-2xl mx-auto">
                        A collection of projects that showcase my skills in building
                        modern, performant, and visually polished web applications.
                    </p>
                </motion.div>

                {/* Empty State */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center py-20"
                >
                    <div className="w-24 h-24 mb-6 rounded-2xl bg-surface border border-white/10 flex items-center justify-center">
                        <span className="text-4xl">🚀</span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                        Projects Coming Soon
                    </h3>
                    <p className="text-secondary text-center max-w-md">
                        I&apos;m currently curating my best work to showcase here.
                        Check back soon for exciting projects!
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
