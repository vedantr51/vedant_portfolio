"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
];

const Navbar = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <nav className="max-w-6xl mx-auto">
                <motion.div
                    className={`glass rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/20" : ""
                        }`}
                    style={{
                        backdropFilter: scrolled ? "blur(16px)" : "blur(12px)",
                        backgroundColor: scrolled
                            ? "rgba(18, 21, 28, 0.85)"
                            : "rgba(18, 21, 28, 0.7)",
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-heading text-xl font-bold tracking-heading text-primary hover:text-accent transition-colors duration-200"
                    >
                        Vedant
                    </Link>

                    {/* Navigation Links */}
                    <ul className="flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const isHovered = hoveredLink === link.href;

                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${isActive
                                            ? "text-accent"
                                            : "text-secondary hover:text-primary"
                                            }`}
                                        onMouseEnter={() => setHoveredLink(link.href)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        {link.label}

                                        {/* Active pill background */}
                                        {isActive && (
                                            <motion.span
                                                layoutId="navbar-indicator"
                                                className="absolute inset-0 bg-accent/10 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                                            />
                                        )}

                                        {/* Animated underline on hover (only for non-active links) */}
                                        {!isActive && (
                                            <motion.span
                                                className="absolute bottom-1 left-1/2 h-0.5 bg-accent rounded-full"
                                                initial={{ width: 0, x: "-50%" }}
                                                animate={{
                                                    width: isHovered ? "60%" : "0%",
                                                    x: "-50%"
                                                }}
                                                transition={{ duration: 0.2, ease: "easeOut" }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </motion.div>
            </nav>
        </motion.header>
    );
};

export default Navbar;

