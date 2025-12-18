Project Name

Vedant — Futuristic Portfolio (working title)

1. Product Overview

Type: Personal portfolio website
Primary Goal:
Showcase that you are strong in React + Tailwind, with modern UI thinking, smooth animations, and tasteful interactions — without overdoing effects.

Secondary Goal:
Create a memorable first impression for recruiters in the first 5 seconds.

2. Target Audience

Recruiters (frontend / full-stack)

Hiring managers

Fellow developers

Tech-savvy visitors

3. Pages & Structure (Standard Portfolio)

A simple but complete portfolio typically has 5 pages — we’ll include all:

Home

About

Skills

Projects

Contact

Implemented as separate routes to show real React app structure (not a single long page).

4. Tech Stack (Locked)
Core Stack

React (Next.js) → recruiter-friendly, production-grade

Tailwind CSS → utility mastery showcase

Framer Motion → smooth, declarative animations

Extras (Chosen Carefully)

GSAP (optional) → cursor & background micro-interactions

Canvas (light usage) → animated background

No Three.js (overkill for a portfolio)

5. Deployment Choice
✅ Vercel

Why:

Zero-config for Next.js

Fastest setup

Best recruiter perception

Auto previews on GitHub push

👉 Fastest + easiest option

6. Design Direction (Chosen for You)
Overall Vibe

Dark Futuristic × Clean × Premium

Think:

Apple-level cleanliness

Vercel-style motion

Subtle sci-fi depth

No neon overload. No cyberpunk chaos.

7. Color System
Base

Background: #0B0D10 (deep near-black)

Surface cards: #12151C

Accent (1 primary)

Accent: Soft electric violet / cyan

Example: #7C7CFF or #5EEAD4

Text

Primary: #EDEDED

Secondary: #A1A1AA

8. Typography

Headings: Space Grotesk / Inter

Body: Inter

Slight letter-spacing on headings

No fancy fonts — professionalism first

9. Background Animation (Subtle but Alive)
Global Background

Animated gradient mesh OR particle noise

Very slow movement

Barely noticeable but always “alive”

Interaction

Slight parallax on mouse move

Reduced motion respected automatically

⚠️ Rule:
If the user stops noticing it → perfect

10. Cursor Interactions (Controlled, Not Noisy)
Base Cursor

Small dot cursor

Smooth interpolation (lerp)

On Hover

Cursor grows slightly

Soft glow appears

Magnetic pull on:

Buttons

Project cards

Links

Optional Enhancements

Very light trail (opacity < 0.2)

Click ripple effect

🚫 No cartoon cursors
🚫 No heavy particles everywhere

11. Page-wise Breakdown
🏠 Home

Strong headline (who you are)

One-line value proposition

Animated background most visible here

CTA: “View Projects”

👤 About

Minimal text

Focus on mindset, not life story

Smooth text reveal on scroll

🛠 Skills

Tech stack cards

Hover glow + micro motion

Show React, Tailwind, JS clearly

📂 Projects

Card-based layout

Hover:

Lift

Glow border

Cursor magnetic effect

Click → project detail / external link

📬 Contact

Minimal form or links

Calm animations (reduce intensity)

Smooth fade-out background

12. Animation Rules (Very Important)

No animation > 300ms

No bounce unless meaningful

Easing: ease-out, ease-in-out

Always prioritize smoothness > flashiness

13. Accessibility & Performance

Keyboard navigation

Reduced motion support

Lighthouse score target: 90+

Mobile-first responsiveness

14. Folder Structure (Preview)
src/
 ├─ app/
 │   ├─ page.tsx (Home)
 │   ├─ about/
 │   ├─ skills/
 │   ├─ projects/
 │   └─ contact/
 ├─ components/
 │   ├─ Cursor.tsx
 │   ├─ Background.tsx
 │   ├─ Navbar.tsx
 │   └─ ProjectCard.tsx
 ├─ styles/
 └─ lib/

15. Future Enhancements (Optional)

Theme toggle (dark / darker)

Page transition loader

Sound on hover (very subtle)

WebGL hero experiment

16. Success Criteria

Recruiter understands your skill in 5 seconds

Feels premium, not experimental

Smooth on low-end devices

Makes people want to scroll