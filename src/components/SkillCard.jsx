"use client";

import { motion } from "framer-motion";

const SkillCard = ({
    name,
    icon,
    level = "advanced",
    description,
    index = 0,
}) => {
    const levelColors = {
        beginner: "bg-secondary/30",
        intermediate: "bg-accent-alt/30",
        advanced: "bg-accent/50",
        expert: "bg-accent",
    };

    const levelWidths = {
        beginner: "w-1/4",
        intermediate: "w-1/2",
        advanced: "w-3/4",
        expert: "w-full",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="group relative p-6 rounded-2xl bg-surface border border-white/5 hover:border-accent/30 transition-all duration-200"
            data-cursor-hover
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            <div className="relative z-10">
                {/* Icon */}
                {icon && (
                    <div className="w-12 h-12 mb-4 flex items-center justify-center text-2xl text-accent">
                        {icon}
                    </div>
                )}

                {/* Name */}
                <h3 className="font-heading text-lg font-semibold tracking-heading text-primary mb-2">
                    {name}
                </h3>

                {/* Description */}
                {description && (
                    <p className="text-sm text-secondary mb-4">{description}</p>
                )}

                {/* Level indicator */}
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 + 0.2, ease: "easeOut" }}
                        className={`h-full ${levelColors[level]} ${levelWidths[level]} rounded-full`}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default SkillCard;
