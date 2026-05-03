# Frame by Ashish — Portfolio Frontend

A modern, cinematic portfolio site for photographer & cinematographer **Ashish**, built with **React + Vite + Tailwind CSS + Framer Motion**.

## Stack
- React 18 (functional components)
- Vite
- Tailwind CSS (custom dark + amber theme)
- Framer Motion (animations)
- Lucide React (icons)

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Structure

```
frontend/
├── index.html
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── data/
    │   └── portfolio.js
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Portfolio.jsx
        ├── Showreel.jsx
        ├── Services.jsx
        ├── Testimonials.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Theme
- Background: `#08090b` (deep black) with subtle radial glow
- Accent: `#f59e0b` (amber) — buttons, highlights, hover states
- Typography: Inter (body) + Playfair Display (display)

All images are placeholders from Unsplash. Swap with your own assets in `src/data/portfolio.js` and component files.
