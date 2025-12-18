# Vedant Portfolio

A modern, futuristic portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Dark Futuristic Design** - Clean, premium aesthetic with subtle animations
- **Custom Cursor** - Smooth lerp interpolation with hover effects
- **Animated Background** - Gradient mesh with parallax movement
- **Responsive Design** - Mobile-first approach
- **Contact Form** - Integrated with Formspree for email submissions
- **Tech Stack Display** - SVG logos with official brand colors

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **Form**: Formspree
- **Language**: TypeScript

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/vedantr51/Portfolio.git

# Navigate to project directory
cd Portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📁 Project Structure

```
portfolio2/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page
│   │   ├── about/            # About page
│   │   ├── skills/           # Skills page
│   │   ├── projects/         # Projects page
│   │   ├── contact/          # Contact page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   └── components/
│       ├── Navbar.tsx        # Navigation bar
│       ├── Cursor.tsx        # Custom cursor
│       ├── Background.tsx    # Animated background
│       ├── Button.tsx        # Reusable button
│       ├── SkillCard.tsx     # Skill display card
│       └── ProjectCard.tsx   # Project card
├── public/                   # Static assets
└── tailwind.config.ts        # Tailwind configuration
```

## 🎨 Color Palette

- **Background**: `#0B0D10`
- **Surface**: `#12151C`
- **Accent**: `#7C7CFF`
- **Accent Alt**: `#5EEAD4`
- **Primary Text**: `#EDEDED`
- **Secondary Text**: `#A1A1AA`

## 📧 Contact Form Setup

The contact form uses Formspree. To set it up:

1. Sign up at [formspree.io](https://formspree.io/)
2. Create a new form
3. Update the form endpoint in `src/app/contact/page.tsx`

See `CONTACT_FORM_SETUP.md` for detailed instructions.

## 🚀 Deployment

Deploy easily with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vedantr51/Portfolio)

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Vedant Rathour**

- GitHub: [@vedantr51](https://github.com/vedantr51)
- LinkedIn: [vedant-rathour](https://www.linkedin.com/in/vedant-rathour/)
- Email: vedantr51@gmail.com
