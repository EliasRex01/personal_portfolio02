# Elias Oviedo — 3D Portfolio (React + Tailwind + GSAP + Framer Motion)

A premium, cinematic, dark-mode portfolio site with a built-in rule-based
FAQ chatbot. Pure React stack — no CMS, no backend required to run it.

## Stack
- **React 18** + **Vite** — component architecture & fast dev server
- **Tailwind CSS** — utility-first styling, design tokens in `tailwind.config.js`
- **GSAP** (+ ScrollTrigger) — hero entrance timeline & scroll-reveal animations
- **Framer Motion** — 3D tilt project cards, custom cursor spring physics, chatbot transitions, magnetic buttons

## Getting started

```bash
npm install
npm run dev        # starts a local dev server (usually http://localhost:5173)
npm run build       # production build, output in /dist
npm run preview     # preview the production build locally
```

## Project structure

```
src/
  components/
    CustomCursor.jsx      # dot + lagging ring cursor (Framer Motion springs)
    ParticleBackground.jsx# 3D-style particle canvas for the hero
    Navbar.jsx             # sticky nav, scroll state, mobile menu
    Hero.jsx                # GSAP entrance timeline + magnetic CTA
    About.jsx                # split bio/skills layout, animated counters
    ProjectCard.jsx           # 3D tilt card (Framer Motion useTransform/useSpring)
    Projects.jsx                # project grid
    Contact.jsx                   # floating-label form
    Chatbot.jsx                    # rule-based FAQ chatbot widget
    Footer.jsx
  data/
    chatbotKnowledge.js    # keyword -> canned response knowledge base
  hooks/
    useScrollReveal.js    # GSAP ScrollTrigger reveal hook
    useMagnetic.js        # magnetic-button hover hook
  App.jsx
  main.jsx
  index.css
```

## Customizing the chatbot

The chatbot in `src/components/Chatbot.jsx` is 100% client-side and
rule-based — it matches keywords against `src/data/chatbotKnowledge.js`
and returns an instant canned response. No API key, no network call.

- **To edit answers**: add/edit entries in `KNOWLEDGE_BASE` in
  `chatbotKnowledge.js`. Each entry is `{ keywords: [...], response: '...' }`.
- **To upgrade to a real AI backend** (OpenAI, Claude, etc.): replace the
  `setTimeout` block inside `handleSend()` in `Chatbot.jsx` with a `fetch()`
  call to your own backend API route. Never call a third-party AI API
  directly from the browser with an embedded API key — always proxy it
  through your own server so the key stays secret.

## Customizing content

- **Projects**: edit the `PROJECTS` array in `src/components/Projects.jsx`.
- **Skills / stats**: edit `SKILLS` / `STATS` in `src/components/About.jsx`.
- **Colors / fonts**: edit `tailwind.config.js` — every component reads
  from those tokens (`bg-violet`, `text-cyan`, `font-display`, etc.).
- **Contact form submission**: currently simulated in `Contact.jsx`
  (`setTimeout`). Wire it to a real endpoint (Formspree, EmailJS, your own
  API route) by replacing that block with a `fetch()` call.

## Deploying

This is a static site once built (`npm run build` → `/dist`). Deploy the
`/dist` folder to Vercel, Netlify, GitHub Pages, or any static host.
