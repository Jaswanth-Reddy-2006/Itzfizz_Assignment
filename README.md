# ✈️ Scroll-Driven Hero Section Animation — ItzFizz Assignment

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A frontend scroll-driven hero section animation inspired by the [ItzFizz reference animation](https://paraschaturvedi.github.io/car-scroll-animation), built with **Next.js**, **React**, **GSAP ScrollTrigger**, and **Tailwind CSS**.

---

## 🚀 Live Demo & Links

- **Live Webpage**: [https://Jaswanth-Reddy-2006.github.io/Itzfizz_Assignment](https://Jaswanth-Reddy-2006.github.io/Itzfizz_Assignment)
- **GitHub Repository**: [https://github.com/Jaswanth-Reddy-2006/Itzfizz_Assignment](https://github.com/Jaswanth-Reddy-2006/Itzfizz_Assignment)

---

## 📌 Assignment Overview & Requirements

| Requirement | Description | Status |
|---|---|:---:|
| **Hero Section Layout** | Occupies the first screen above the fold, featuring a letter-spaced headline `W E L C O M E   I T Z F I Z Z` and impact statistics cards with percentages and descriptions. | ✅ Completed |
| **Initial Load Animation** | Smooth entrance on page load: track fades in smoothly and headline letters stagger in with a natural `back.out(1.7)` bounce easing before settling. | ✅ Completed |
| **Scroll-Driven Animation** | Pinned hero track responding to user scroll progress. Stealth fighter jet travels smoothly across the runway, leaving an expanding supersonic green trail and progressively revealing each letter in solid black. | ✅ Completed |
| **Dynamic Directional Flight** | Jet dynamically detects scroll direction: flies forward (facing right) on scroll-down, and smoothly executes a 180° tactical banking flip (facing left) when scrolling in reverse (scroll-up). | ✅ Completed |
| **Impact Metric Cards** | 4 enlarged, high-contrast metric cards (`58%`, `27%`, `23%`, `40%`) animate in at staggered scroll intervals with non-overlapping positions and generous padding. | ✅ Completed |
| **Motion & Performance** | GPU-accelerated transforms (`x`, `scaleX`, `opacity`), `will-change` hints, and decoupled event handling for a steady 60fps performance without layout reflows. | ✅ Completed |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Animation Engine**: [GSAP](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🎯 Architecture & Animation Mechanics

```
Pinned Section (350vh scroll distance)
└── Sticky / Pinned Track (100vh Viewport)
    ├── Runway Strip (Dark Gray #1e1e1e)
    │   ├── Green Supersonic Trail (Width tied dynamically to jet engines)
    │   ├── Stealth Fighter Jet (F-22 Raptor with directional banking scaleX)
    │   ├── Headline Letters ("WELCOME ITZFIZZ" revealed as jet passes)
    │   └── Runway Centerline Markings
    ├── 4 × Enlarged Stat Cards (58% Yellow, 27% Dark, 23% Blue, 40% Orange)
    └── Directional Flight Flip (Scroll Down = Face Right, Scroll Up = Face Left)
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Jaswanth-Reddy-2006/Itzfizz_Assignment.git
cd Itzfizz_Assignment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production (Static HTML Export)
```bash
npm run build
```
The static export files will be generated in the `/out` directory.

---

## 🌐 GitHub Pages Deployment

This repository includes an automated GitHub Actions deployment workflow at `.github/workflows/deploy.yml`.

To deploy on GitHub Pages:
1. Push code to the `main` branch.
2. Go to repository **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The workflow will automatically build the Next.js static export and deploy it live to GitHub Pages.

---

## 👤 Author

**Jaswanth Reddy**
- **Email**: jaswanthre9@gmail.com
- **GitHub**: [@Jaswanth-Reddy-2006](https://github.com/Jaswanth-Reddy-2006)
