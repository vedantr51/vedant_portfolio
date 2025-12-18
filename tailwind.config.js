const config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0B0D10",
                surface: "#12151C",
                accent: "#7C7CFF",
                "accent-alt": "#5EEAD4",
                primary: "#EDEDED",
                secondary: "#A1A1AA",
            },
            fontFamily: {
                heading: ["var(--font-space-grotesk)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
            },
            letterSpacing: {
                heading: "0.02em",
            },
            animation: {
                "glow-pulse": "glow-pulse 2s ease-in-out infinite",
            },
            keyframes: {
                "glow-pulse": {
                    "0%, 100%": { opacity: "0.5" },
                    "50%": { opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};

module.exports = config;
