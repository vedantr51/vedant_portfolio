"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Button from "@/components/Button";
import { contactVariants, sectionHeaderVariants } from "@/lib/animations";

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/vedantr51",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/vedant-rathour/",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        ),
    },
    {
        name: "Email",
        email: "vedantr51@gmail.com",
        href: "mailto:vedantr51@gmail.com",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
            </svg>
        ),
    },
];

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Using Formspree to send emails to vedantr51@gmail.com
            const response = await fetch("https://formspree.io/f/xrezzvaz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormState({ name: "", email: "", message: "" });
            } else {
                setError("Failed to send message. Please try again.");
            }
        } catch (err) {
            setError("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center px-6 py-32">
            <motion.div
                className="max-w-4xl mx-auto w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={contactVariants.container}
            >
                {/* Section Header */}
                <motion.div
                    variants={sectionHeaderVariants}
                    className="mb-12 text-center"
                >
                    <p className="text-accent text-sm font-medium tracking-wide uppercase mb-2">
                        Get in Touch
                    </p>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-heading text-primary mb-4">
                        Let&apos;s Work Together
                    </h1>
                    <p className="text-secondary max-w-xl mx-auto">
                        Have a project in mind or just want to chat? I&apos;m always open
                        to discussing new opportunities and ideas.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        variants={contactVariants.item}
                    >
                        {submitted ? (
                            <div className="p-8 rounded-2xl bg-surface border border-accent/30 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-accent"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                                    Message Sent!
                                </h3>
                                <p className="text-secondary">
                                    Thanks for reaching out. I&apos;ll get back to you soon.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-primary mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formState.name}
                                        onChange={(e) =>
                                            setFormState({ ...formState, name: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 text-primary placeholder-secondary/50 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-primary mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) =>
                                            setFormState({ ...formState, email: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 text-primary placeholder-secondary/50 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-primary mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) =>
                                            setFormState({ ...formState, message: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 text-primary placeholder-secondary/50 focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={() => { }}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        )}
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        variants={contactVariants.item}
                        className="space-y-6"
                    >
                        <div className="p-6 rounded-2xl bg-surface border border-white/5">
                            <h3 className="font-heading text-lg font-semibold text-primary mb-4">
                                Or connect with me on
                            </h3>
                            <div className="space-y-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/10 text-secondary hover:text-accent transition-all duration-200 group"
                                        data-cursor-hover
                                    >
                                        <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-accent/20 transition-colors duration-200">
                                            {link.icon}
                                        </span>
                                        <span className="font-medium">{link.email || link.name}</span>
                                        <svg
                                            className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200"
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
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-surface border border-white/5">
                            <h3 className="font-heading text-lg font-semibold text-primary mb-2">
                                Availability
                            </h3>
                            <p className="text-secondary text-sm">
                                I&apos;m currently available for freelance work and full-time
                                opportunities. Response time is usually within 24 hours.
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-alt animate-pulse" />
                                <span className="text-sm text-accent-alt">Open to opportunities</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
