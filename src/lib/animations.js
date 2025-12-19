/**
 * Section-specific animation variants for Framer Motion
 * Each section gets a slightly different animation style to feel unique
 * All animations respect the 300ms duration constraint
 */

// Hero section - Clean vertical fade with slight scale
export const heroVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    },
    item: {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
    },
};

// About section - Horizontal reveal with perspective
export const aboutVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.05,
            },
        },
    },
    itemLeft: {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
    },
    itemRight: {
        hidden: { opacity: 0, x: 30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
    },
};

// Skills section - Staggered grid with scale pop
export const skillsVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    },
    item: {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
        },
    },
};

// Projects section - Diagonal reveal
export const projectsVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1,
            },
        },
    },
    item: {
        hidden: { opacity: 0, y: 40, x: -20 },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
    },
};

// Contact section - Soft expand from center
export const contactVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
            },
        },
    },
    item: {
        hidden: { opacity: 0, scale: 0.96 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.28, ease: "easeOut" },
        },
    },
};

// Section header - Common for all sections
export const sectionHeaderVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" },
    },
};
