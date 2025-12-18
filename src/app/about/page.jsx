"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section className="min-h-screen flex items-center px-6 py-32">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mb-12"
                >
                    <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">
                        About Me
                    </p>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-heading text-primary">
                        The Mindset Behind the Code
                    </h1>
                </motion.div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Column - Main Text */}
                    <div className="space-y-6">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                            className="text-lg text-secondary leading-relaxed"
                        >
                            I believe great software is invisible. When it works perfectly,
                            users don&apos;t notice the code—they just enjoy the experience.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                            className="text-lg text-secondary leading-relaxed"
                        >
                            That philosophy drives everything I build. Every animation should feel
                            natural, not showy. Every interaction should be intuitive, not clever.
                            The best interfaces get out of the way.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                            className="text-lg text-secondary leading-relaxed"
                        >
                            I specialize in React and the modern frontend ecosystem—not because
                            it&apos;s popular, but because it gives me the precision to craft
                            experiences that feel premium and perform flawlessly.
                        </motion.p>
                    </div>

                    {/* Right Column - Highlights */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                            className="p-6 rounded-2xl bg-surface border border-white/5"
                        >
                            <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                                My Approach
                            </h3>
                            <ul className="space-y-2 text-secondary">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    Performance-first development
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    Clean, maintainable code
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    Thoughtful micro-interactions
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    Accessibility by default
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                            className="p-6 rounded-2xl bg-surface border border-white/5"
                        >
                            <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                                Currently
                            </h3>
                            <p className="text-secondary">
                                Building user interfaces that make people stop and say
                                &ldquo;wow, this feels nice.&rdquo;
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
