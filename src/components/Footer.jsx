"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 px-6 py-12 border-t border-white/5"
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                        className="text-center md:text-left"
                    >
                        <Link
                            href="/"
                            className="font-heading text-lg font-bold tracking-heading text-primary hover:text-accent transition-colors duration-200"
                        >
                            Vedant
                        </Link>
                        <p className="text-secondary text-sm mt-1">
                            Crafting digital experiences
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.nav
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                        className="flex items-center gap-6"
                        aria-label="Footer navigation"
                    >
                        {[
                            { href: "/about", label: "About" },
                            { href: "/projects", label: "Projects" },
                            { href: "/contact", label: "Contact" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-secondary hover:text-accent transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.nav>

                    {/* Copyright */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                        className="text-secondary text-sm"
                    >
                        © {currentYear} Vedant. All rights reserved.
                    </motion.p>
                </div>

                {/* Subtle decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="mt-8 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
                    style={{ transformOrigin: "center" }}
                />
            </div>
        </motion.footer>
    );
};

export default Footer;
