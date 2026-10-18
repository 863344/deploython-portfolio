"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  Network,
  Search,
  Terminal,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { PointerEvent } from "react";

const DATA = {
  profile: {
    name: "Sharan G",
    role: "Computer Science & Engineering Student",
    bio: "I’m a Computer Science and Engineering student building projects across software, databases, and machine learning, with a growing interest in financial systems and practical product development.",
  },
  skills: [
    "C",
    "Python",
    "Java",
    "SQL",
    "JavaScript",
    "React",
    "PostgreSQL",
    "MongoDB",
    "Linux",
    "Git & GitHub",
  ],
  projects: [
    {
      title: "Neuro-Financial FusionNet",
      tech: "Python • PyTorch • FinBERT",
      desc: "Undergraduate research at KL University exploring financial volatility forecasting with a temporal Transformer, graph attention network, and news embeddings. Work includes data extraction, aligned datasets, and model comparisons.",
    },
    {
      title: "Shellforge",
      tech: "C • POSIX • Linux",
      desc: "A modular shell exploring process execution with fork, execvp, and wait. Supports pipes, redirection, quoting, background jobs, signals, environment variables, and persistent command history.",
    },
    {
      title: "Cold Chain Fleet Engine",
      tech: "React • FastAPI • PostgreSQL • MongoDB",
      desc: "A college DBMS project for temperature-sensitive deliveries, with admin, driver, and customer workspaces. Combines stock reservation and dispatch transactions with sensor history, shipment holds, and incident records.",
    },
    {
      title: "Smart Search Engine",
      tech: "Java • Data Structures • BM25",
      desc: "A team-built document search system with a local browser interface. Uses positional indexes for phrase and Boolean queries, BM25 ranking, Trie autocomplete, and BK-Tree spelling suggestions, with views into the underlying data structures.",
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "KL University",
      year: "2026–2029 · Expected graduation 2029",
    },
  ],
  links: {
    github: "https://github.com/863344",
    email: "sharangunamoni@gmail.com",
    linkedin: "https://www.linkedin.com/in/sharan-g-213888431/",
  },
};

const sections = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function CursorSpotlight() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.07), transparent 45%)`;

  useEffect(() => {
    const followPointer = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", followPointer, { passive: true });
    return () => window.removeEventListener("pointermove", followPointer);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      style={{ background }}
    />
  );
}

function Navigation() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      let current = atBottom ? "contact" : "home";
      if (!atBottom) {
        for (const { id } of sections) {
          const section = document.getElementById(id);
          if (
            section &&
            section.getBoundingClientRect().top <= window.innerHeight * 0.35
          )
            current = id;
        }
      }
      setActive(current);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <nav aria-label="Main navigation" className="floating-nav">
      <a className="nav-monogram" href="#home" aria-label="Sharan G, home">
        SG<span>.</span>
      </a>
      <div className="flex items-center gap-1">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            className="nav-link"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

const projectCategories = [
  "Machine learning",
  "Operating systems",
  "Database systems",
  "Data structures",
];
const projectIcons = [Network, Terminal, Truck, Search];

function ProjectIllustration({ index }: { index: number }) {
  const Icon = projectIcons[index];
  return (
    <div className={`project-art project-art-${index}`} aria-hidden="true">
      <div className="art-grid" />
      <div className="art-orbit art-orbit-outer" />
      <div className="art-orbit art-orbit-inner" />
      {index === 1 ? (
        <div className="terminal-preview">
          <div className="terminal-dots">
            <i />
            <i />
            <i />
          </div>
          <p>
            <span>~ / shellforge</span>
          </p>
          <p>
            <span>$</span> printf &quot;hello&quot; | cat
          </p>
          <p className="terminal-output">
            hello
            <span className="terminal-caret" />
          </p>
        </div>
      ) : (
        <>
          <div className="art-node art-node-left" />
          <div className="art-node art-node-right" />
          <div className="art-core">
            <Icon size={34} strokeWidth={1.2} />
          </div>
          <span className="art-caption">
            {
              [
                "TIME SERIES + NEWS",
                "",
                "STOCK · DISPATCH · TELEMETRY",
                "INDEX · QUERY · RANK",
              ][index]
            }
          </span>
        </>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof DATA.projects)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useMotionValue(-500);
  const glowY = useMotionValue(-500);
  const rotateX = useSpring(pointerX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const background = useMotionTemplate`radial-gradient(360px circle at ${glowX}px ${glowY}px, rgba(255,255,255,0.09), transparent 65%)`;

  function moveHighlight(event: PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    glowX.set(x);
    glowY.set(y);
    pointerX.set((0.5 - y / bounds.height) * 3);
    pointerY.set((x / bounds.width - 0.5) * 3);
  }

  return (
    <motion.article
      className={`project-card project-card-${index}`}
      onPointerMove={moveHighlight}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      aria-labelledby={`project-${index}`}
    >
      <motion.div
        aria-hidden="true"
        className="card-highlight"
        style={{ background }}
      />
      <div className="project-card-top">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{projectCategories[index]}</span>
      </div>
      <ProjectIllustration index={index} />
      <div className="project-card-body">
        <h3 id={`project-${index}`}>{project.title}</h3>
        <p className="project-tech">{project.tech}</p>
        <p className="project-description">{project.desc}</p>
      </div>
    </motion.article>
  );
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );

  useEffect(() => {
    if (copyStatus === "idle") return;
    const timeout = window.setTimeout(() => setCopyStatus("idle"), 3000);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(DATA.links.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <section id="contact" className="contact-section">
      <FadeIn>
        <div className="section-eyebrow">
          <span>04 / CONTACT</span>
          <span className="eyebrow-line" />
        </div>
        <h2 className="contact-heading">
          Let’s build
          <br />
          <span>something useful.</span>
        </h2>
        <p className="max-w-md text-zinc-400 leading-relaxed mt-6">
          Exploring internships and opportunities in software, financial
          systems, and AI applications.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <a href={`mailto:${DATA.links.email}`} className="primary-button">
            <Mail size={18} />
            Email Me
            <ArrowUpRight size={18} />
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="copy-button"
            aria-label="Copy email address"
          >
            {copyStatus === "copied" ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
        <p className="copy-feedback" role="status" aria-live="polite">
          {copyStatus === "copied"
            ? "Email address copied."
            : copyStatus === "failed"
              ? `Copy unavailable. ${DATA.links.email}`
              : ""}
        </p>
      </FadeIn>
    </section>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });

  return (
    <div className="portfolio relative min-h-screen bg-black overflow-hidden selection:bg-white selection:text-black">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <CursorSpotlight />
      <motion.div
        aria-hidden="true"
        className="reading-progress"
        style={{ scaleX: progress }}
      />
      <div aria-hidden="true" className="architectural-grid" />
      <Navigation />
      <main id="main" className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10">
        <section id="home" className="hero-section">
          <FadeIn>
            <p className="hero-kicker">
              <span className="status-dot" />
              STUDENT. BUILDER. ALWAYS LEARNING.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="hero-name">
              {DATA.profile.name}
              <span>.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="hero-role">{DATA.profile.role}</p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p className="hero-bio">{DATA.profile.bio}</p>
          </FadeIn>
          <FadeIn delay={0.32}>
            <div className="hero-actions">
              <a href="#work" className="primary-button">
                Explore my work
                <ArrowDown size={17} />
              </a>
              <a
                href={DATA.links.github}
                className="social-link"
                aria-label="Sharan G on GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.9c0-1.1-.1-1.6-.6-2.2 2.8-.3 5.7-1.4 5.7-6.3A4.9 4.9 0 0 0 18.8 5c.1-.3.6-1.6-.1-3.3 0 0-1.1-.4-3.6 1.3a12.5 12.5 0 0 0-6.5 0C6.1 1.3 5 1.7 5 1.7c-.7 1.7-.2 3-.1 3.3a4.9 4.9 0 0 0-1.3 3.5c0 4.9 2.9 6 5.7 6.3-.5.5-.7 1.2-.7 2.2v4.3" />
                </svg>
              </a>
              <a
                href={DATA.links.linkedin}
                className="social-link"
                aria-label="Sharan G on LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </FadeIn>
          <div className="hero-bottom">
            <span>SOFTWARE / SYSTEMS / AI</span>
            <a href="#work">
              SCROLL TO EXPLORE
              <ArrowDown size={13} />
            </a>
          </div>
        </section>

        <section id="work" className="work-section">
          <FadeIn>
            <div className="section-eyebrow">
              <span>01 / SELECTED WORK</span>
              <span className="eyebrow-line" />
              <span>2026</span>
            </div>
            <div className="section-title-row">
              <h2>
                Built to understand.
                <br />
                <span>Made to work.</span>
              </h2>
              <p>
                Four projects.
                <br />
                Different ways of thinking.
              </p>
            </div>
          </FadeIn>
          <div className="project-grid">
            {DATA.projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        <section id="about" className="about-section">
          <FadeIn>
            <div className="section-eyebrow">
              <span>02 / TOOLKIT</span>
              <span className="eyebrow-line" />
            </div>
            <h2 className="small-heading">Learning by building.</h2>
            <div className="skill-list">
              {DATA.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="education-block">
              <div className="section-eyebrow">
                <span>03 / EDUCATION</span>
                <span className="eyebrow-line" />
              </div>
              {DATA.education.map((education) => (
                <div key={education.institution}>
                  <h3>{education.degree}</h3>
                  <p>{education.institution}</p>
                  <span>{education.year}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
        <Contact />
        <footer className="site-footer">
          <a href="#home" className="footer-name">
            Sharan G<span>.</span>
          </a>
          <span>BUILT WITH CURIOSITY.</span>
          <a href="#home" className="back-to-top">
            Back to top
            <ArrowUpRight size={14} />
          </a>
        </footer>
      </main>
    </div>
  );
}
