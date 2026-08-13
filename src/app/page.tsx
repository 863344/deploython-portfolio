"use client";

import { motion } from "framer-motion";
import { Mail, Code2 } from "lucide-react";
import { useEffect, useState } from "react";

const DATA = {
  profile: {
    name: "Sharan",
    role: "Full-Stack Developer",
    bio: "I build resilient, scalable systems and intuitive interfaces, focusing on performance and seamless digital experiences.",
  },
  skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
  projects: [
    { title: "Alpha Build", tech: "Next.js • Tailwind", desc: "High-performance marketing engine." },
    { title: "Omega Protocol", tech: "React • Node.js", desc: "Real-time data visualization dashboard." },
  ],
  education: [
    { degree: "B.S. Computer Science", institution: "University Name", year: "2025" }
  ],
  links: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "sharan@example.com"
  }
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden selection:bg-white selection:text-black">
      {/* Dynamic Cursor Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />
      
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <main className="relative z-10 mx-auto max-w-4xl px-6 py-24 sm:py-32 flex flex-col gap-32">
        {/* Hero */}
        <section className="flex flex-col gap-6 pt-12">
          <FadeIn>
            <h1 className="text-7xl sm:text-9xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-200 to-zinc-600 drop-shadow-2xl">
              {DATA.profile.name}.
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-300">
              {DATA.profile.role}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="max-w-2xl text-lg text-zinc-400 leading-relaxed font-light">
              {DATA.profile.bio}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex gap-4 pt-6">
              <a href={DATA.links.github} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 text-zinc-400 backdrop-blur-md hover:scale-105 hover:-rotate-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <a href={DATA.links.linkedin} className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 text-zinc-400 backdrop-blur-md hover:scale-105 hover:rotate-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </FadeIn>
        </section>

        {/* Skills */}
        <section>
          <FadeIn>
            <h2 className="text-sm uppercase tracking-widest text-zinc-500 font-semibold mb-8">Technical Arsenal</h2>
            <div className="flex flex-wrap gap-3">
              {DATA.skills.map((skill) => (
                <span key={skill} className="px-5 py-2.5 bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Projects */}
        <section>
          <FadeIn>
            <h2 className="text-sm uppercase tracking-widest text-zinc-500 font-semibold mb-8">Featured Work</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {DATA.projects.map((project, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative p-8 border border-zinc-800/50 rounded-[2rem] bg-zinc-900/20 backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Code2 className="mb-6 text-zinc-500 group-hover:text-white transition-colors duration-300" size={32} />
                  <h3 className="text-2xl font-semibold text-zinc-200 mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                  <p className="text-xs font-mono text-zinc-500 mb-6 uppercase tracking-wider">{project.tech}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{project.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Education & Contact */}
        <section className="grid sm:grid-cols-2 gap-12 pt-16 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          <FadeIn>
            <h2 className="text-sm uppercase tracking-widest text-zinc-500 font-semibold mb-8">Education</h2>
            {DATA.education.map((ed, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-lg font-semibold text-zinc-200">{ed.degree}</h3>
                <p className="text-zinc-500">{ed.institution} • {ed.year}</p>
              </div>
            ))}
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-sm uppercase tracking-widest text-zinc-500 font-semibold mb-8">Contact</h2>
            <p className="text-zinc-400 mb-8">Ready to engineer the next standard?</p>
            <a href={`mailto:${DATA.links.email}`} className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-2xl overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <Mail size={20} className="relative z-10" /> 
              <span className="relative z-10">Initiate Contact</span>
            </a>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}