"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info, Pause, Play, Github } from "lucide-react";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";
import { prefersReduced } from "@/lib/motion";
import Hero3DVisual from "./Hero3DVisual";

type Props = { onOpenModal: (p: Project) => void };

// Backdrop component for cinematic gradient rendering
const Backdrop = ({ proj }: { proj: Project }) => {
  const { backdrop } = proj;
  if (!backdrop) return null;
  const { kind, from, via, to, accent } = backdrop;
  const gradient =
    kind === "gradient"
      ? `linear-gradient(135deg, ${from}, ${via || to}, ${to})`
    : kind === "circuit"
      ? `radial-gradient(ellipse 60% 50% at 30% 20%, ${from} 0%, transparent 55%),
         radial-gradient(ellipse 50% 40% at 65% 75%, ${accent || to} 0%, transparent 50%),
         linear-gradient(180deg, ${from}, ${to})`
      : `linear-gradient(135deg, ${from}, ${to})`;
  return (
    <>
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: gradient }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink-900/80 via-transparent to-ink-900/80" />
      {kind === "grid" && (
        <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      )}
    </>
  );
};

export default function HeroBillboard({ onOpenModal }: Props) {
  const featured = portfolio.projects.filter(p => p.featured);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = prefersReduced();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduced || featured.length < 2) return;
    timer.current = setInterval(() => {
      setI(prev => (prev + 1) % featured.length);
    }, paused ? 99999 : 8000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [featured.length, paused, reduced]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI(prev => (prev + 1) % featured.length);
      if (e.key === "ArrowLeft") setI(prev => (prev - 1 + featured.length) % featured.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [featured.length]);

  const proj = featured[i];
  if (!proj || featured.length === 0) return null;

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden"
             onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="wait">
        <Backdrop key={`bg-${proj.id}-${i}`} proj={proj} />
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
        {/* Left: titles */}
        <div className="flex-1 text-center lg:text-left">
          <motion.span
            key={`badge-${i}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 mb-6 rounded-full bg-accent-crimson/15 border border-accent-crimson/30 text-accent-crimson text-xs font-medium tracking-[0.15em] uppercase"
          >
            Featured Project
          </motion.span>

          <motion.h1
            key={`t-${i}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-9xl leading-[0.85] tracking-tight text-white text-glow mb-4"
          >
            {proj.title}
          </motion.h1>

          <motion.p
            key={`tag-${i}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl md:text-2xl text-ink-300 font-light mb-6"
          >
            {proj.tagline}
          </motion.p>

          <motion.p
            key={`syn-${i}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-base md:text-lg text-ink-400 max-w-xl mb-8 leading-relaxed"
          >
            {proj.synopsis}
          </motion.p>

          {/* Tech chips */}
          <motion.div
            key={`tech-${i}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start"
          >
            {proj.tech.slice(0, 6).map(t => (
              <span key={t} className="px-3 py-1 text-xs rounded-full bg-ink-600/50 border border-ink-500/50 text-ink-300 font-mono">
                {t}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            key={`cta-${i}`}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button onClick={() => onOpenModal(proj)}
              className="group flex items-center gap-2 px-8 py-4 bg-accent-crimson hover:bg-accent-crimson/80 text-white font-semibold rounded-xl text-lg transition-all shadow-[0_0_30px_rgba(229,9,20,0.5)] hover:shadow-[0_0_50px_rgba(229,9,20,0.7)]">
              <span>View Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => onOpenModal(proj)}
              className="group flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 font-medium rounded-xl text-lg transition-all">
              <Info className="w-5 h-5" /> <span>More Info</span>
            </button>
            {proj.repo && (
              <a href={proj.repo} target="_blank" rel="noopener noreferrer"
                 className="group flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 font-medium rounded-xl text-lg transition-all">
                <Github className="w-5 h-5" /> <span>Source</span>
              </a>
            )}
          </motion.div>
        </div>

        {/* Right: large 3D visual */}
        <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] relative z-20">
          <Hero3DVisual emoji={proj.backdrop.emoji || "⚡"} accent={proj.backdrop.accent || "#e50914"} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-center gap-6">
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === i
                ? "bg-accent-crimson w-10 h-2 shadow-[0_0_15px_var(--accent-crimson)]"
                : "bg-white/20 w-2 h-2 hover:bg-white/40 hover:w-3"
            }`}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
        {featured.length > 1 && (
          <button onClick={() => setPaused(!paused)}
                  className="ml-2 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-ink-400 hover:text-white transition-colors"
                  aria-label={paused ? "Resume auto-play" : "Pause auto-play"}>
            {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </section>
  );
}