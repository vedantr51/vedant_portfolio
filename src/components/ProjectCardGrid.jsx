"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

/**
 * ProjectCardGrid - Wrapper component that dims non-hovered cards
 * When one card is hovered, others subtly dim to create focus effect
 */
const ProjectCardGrid = ({ projects }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const isAnyHovered = hoveredIndex !== null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
                <motion.div
                    key={project.title || index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                        opacity: isAnyHovered && hoveredIndex !== index ? 0.5 : 1,
                        scale: isAnyHovered && hoveredIndex !== index ? 0.98 : 1,
                        filter: isAnyHovered && hoveredIndex !== index ? "blur(1px)" : "blur(0px)",
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ willChange: "opacity, transform, filter" }}
                >
                    <ProjectCard
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        href={project.href}
                        github={project.github}
                        index={index}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default ProjectCardGrid;
