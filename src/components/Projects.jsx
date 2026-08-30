import ProjectCard from './ProjectCard.jsx';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const PROJECTS = [
  {
    number: '01',
    title: 'Nebula Dashboard',
    description: 'A real-time analytics dashboard with animated data visualizations and a fully custom charting engine.',
    tags: ['React', 'D3.js', 'WebSocket'],
  },
  {
    number: '02',
    title: 'Aurora Commerce',
    description: 'A headless e-commerce storefront focused on sub-second load times and buttery-smooth transitions.',
    tags: ['Next.js', 'Stripe', 'GraphQL'],
  },
  {
    number: '03',
    title: 'Pulse Studio',
    description: 'An audio-reactive visual playground built with the Web Audio API and hand-written canvas shaders.',
    tags: ['Canvas', 'Web Audio', 'JS'],
  },
  {
    number: '04',
    title: 'Vertex CRM',
    description: 'An internal tool for a logistics company, rebuilt from scratch to cut task completion time by 40%.',
    tags: ['Vue', 'Node.js', 'PostgreSQL'],
  },
  {
    number: '05',
    title: 'Orbit Docs',
    description: 'A documentation platform with instant full-text search and a distraction-free reading mode.',
    tags: ['Svelte', 'Rust', 'WASM'],
  },
  {
    number: '06',
    title: 'Halo Fitness',
    description: 'A mobile-first fitness tracker with offline-first data sync and motion-based workout logging.',
    tags: ['React Native', 'SQLite', 'PWA'],
  },
];

export default function Projects() {
  const headerRef = useScrollReveal({});

  return (
    <section id="work" className="px-8 py-32">
      <div ref={headerRef} className="mx-auto mb-14 max-w-6xl">
        <span className="section-tag">02 — Selected Work</span>
        <h2 className="section-title">Projects worth showing off</h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} index={i} {...project} />
        ))}
      </div>
    </section>
  );
}
