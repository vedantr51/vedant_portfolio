"use client";

import { motion } from "framer-motion";
import { projectsVariants, sectionHeaderVariants } from "@/lib/animations";
import ProjectCardGrid from "@/components/ProjectCardGrid";

export default function Projects() {
    return (
        <section className="min-h-screen flex items-center px-6 py-32">
            <motion.div
                className="max-w-6xl mx-auto w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={projectsVariants.container}
            >
                {/* Section Header */}
                <motion.div
                    variants={sectionHeaderVariants}
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

                {/* Projects Grid */}
                <ProjectCardGrid projects={[
                    {
                        title: "ResumeInsight",
                        description: "ResumeInsight is an AI-driven resume evaluator that performs structured, senior-level hiring analysis by connecting skills, experience, and role intent to deliver practical, improvement-focused feedback.",
                        href: "https://ai-resume-reviewer-umber.vercel.app/",
                        tags: ["Next.js", "AI", "Resume Analysis"],
                        image: "/images/resumeinsight.png",
                    }
                ]} />
            </motion.div>
        </section>
    );
}

