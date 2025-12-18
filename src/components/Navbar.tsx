"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
];

const Navbar = () => {
    const pathname = usePathname();

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <nav className="max-w-6xl mx-auto">
                <div className="glass rounded-full px-6 py-3 flex items-center justify-between">
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
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${isActive
                                                ? "text-accent"
                                                : "text-secondary hover:text-primary"
                                            }`}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.span
                                                layoutId="navbar-indicator"
                                                className="absolute inset-0 bg-accent/10 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </motion.header>
    );
};

export default Navbar;
