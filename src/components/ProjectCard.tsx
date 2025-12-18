"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    title: string;
    description: string;
    image?: string;
    tags?: string[];
    href?: string;
    github?: string;
    index?: number;
}

const ProjectCard = ({
    title,
    description,
    image,
    tags = [],
    href,
    github,
    index = 0,
}: ProjectCardProps) => {
    const CardWrapper = href ? Link : "div";
    const wrapperProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
        >
            <CardWrapper
                {...(wrapperProps as any)}
                className="group relative block rounded-2xl overflow-hidden bg-surface border border-white/5 hover:border-accent/40 transition-all duration-200"
                data-cursor-hover
            >
                <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="h-full"
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-alt/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {/* Border glow */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/30 transition-all duration-200" />

                    {/* Image */}
                    {image ? (
                        <div className="relative aspect-video overflow-hidden">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                        </div>
                    ) : (
                        <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent-alt/20 flex items-center justify-center">
                            <span className="text-4xl text-accent/50">📁</span>
                        </div>
                    )}

                    {/* Content */}
                    <div className="relative p-6">
                        <h3 className="font-heading text-xl font-semibold tracking-heading text-primary mb-2 group-hover:text-accent transition-colors duration-200">
                            {title}
                        </h3>
                        <p className="text-sm text-secondary mb-4 line-clamp-2">
                            {description}
                        </p>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex items-center gap-4">
                            {href && (
                                <span className="text-sm text-accent flex items-center gap-1 group-hover:underline">
                                    View Project
                                    <svg
                                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>
                            )}
                            {github && (
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-secondary hover:text-accent transition-colors duration-200"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    GitHub
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </CardWrapper>
        </motion.div>
    );
};

export default ProjectCard;
