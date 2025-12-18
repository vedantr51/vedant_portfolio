"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
    className?: string;
    external?: boolean;
}

const Button = ({
    children,
    href,
    onClick,
    variant = "primary",
    className = "",
    external = false,
}: ButtonProps) => {
    const baseStyles =
        "relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full overflow-hidden transition-all duration-200 group";

    const variants = {
        primary:
            "bg-accent text-background hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25",
        secondary:
            "border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent",
    };

    const buttonContent = (
        <>
            <span className="relative z-10">{children}</span>
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-accent to-accent-alt opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                initial={false}
            />
        </>
    );

    const motionProps = {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.15, ease: "easeOut" },
    };

    if (href && external) {
        return (
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseStyles} ${variants[variant]} ${className}`}
                data-cursor-hover
                {...motionProps}
            >
                {buttonContent}
            </motion.a>
        );
    }

    if (href) {
        return (
            <Link href={href} passHref legacyBehavior>
                <motion.a
                    className={`${baseStyles} ${variants[variant]} ${className}`}
                    data-cursor-hover
                    {...motionProps}
                >
                    {buttonContent}
                </motion.a>
            </Link>
        );
    }

    return (
        <motion.button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            data-cursor-hover
            {...motionProps}
        >
            {buttonContent}
        </motion.button>
    );
};

export default Button;
