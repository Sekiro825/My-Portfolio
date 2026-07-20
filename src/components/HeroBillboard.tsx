"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Info, Plus, Check, Github } from "lucide-react";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";
import { PROFILES, ProfileId } from "@/types/profile";
import Hero3DVisual from "./Hero3DVisual";

interface Props {
  activeProfile: ProfileId;
  onOpenModal: (p: Project) => void;
  myList: string[];
  onToggleMyList: (id: string) => void;
}

const Backdrop = ({ proj }: { proj: Project }) => {
  const { backdrop } = proj;
  if (!backdrop) return null;
  const { kind, from, via, to, accent } = backdrop;
  const gradient =
    kind === "gradient"
      ? `linear-gradient(135deg, ${from}, ${via || to}, ${to})`
      : kind === "circuit"
      ? `radial-gradient(ellipse 70% 60% at 30% 20%, ${from} 0%, transparent 60%),
         radial-gradient(ellipse 60% 50% at 70% 70%, ${accent || to} 0%, transparent 55%),
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
      {/* Netflix Cinematic Vignette Gradients */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent w-full md:w-3/4" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#141414]/70 via-transparent to-transparent h-40" />
    </>
  );
};

export default function HeroBillboard({
  activeProfile = "explorer",
  onOpenModal,
  myList = [],
  onToggleMyList,
}: Props) {
  const featured = portfolio.projects.filter(p => p.featured);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentProfile = PROFILES.find(p => p.id === activeProfile) || PROFILES[0] || {
    id: "explorer",
    name: "1st-Time Visitor",
    subtitle: "",
    avatarBg: "from-amber-500 to-red-600",
    avatarIcon: "🍿",
    accentColor: "#F5C542",
    badge: "POPULAR FEATURED SHOWCASE",
    heroTagline: "",
    primaryCategory: "Trending Builds"
  };

  useEffect(() => {
    if (featured.length < 2) return;
    timer.current = setInterval(() => {
      setI(prev => (prev + 1) % featured.length);
    }, paused ? 99999 : 8000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [featured.length, paused]);

  const proj = featured[i];
  if (!proj) return null;

  const inList = (myList || []).includes(proj.id);

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <Backdrop key={`bg-${proj.id}-${i}`} proj={proj} />
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
        {/* Left: Metadata & Titles */}
        <div className="flex-1 text-center lg:text-left">
          {/* Profile Badge Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-red-600/20 border border-red-600/40 text-red-500 text-xs font-bold tracking-widest uppercase"
          >
            <span>Featured Project</span>
            <span>&bull; {currentProfile.badge}</span>
          </motion.div>

          {/* Netflix Original Brand */}
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
            <span className="font-display text-2xl font-black text-red-600 tracking-tighter">N</span>
            <span className="text-xs font-mono tracking-[0.3em] text-white/70 uppercase">
              S A K E T &bull; O R I G I N A L
            </span>
          </div>

          <motion.h1
            key={`t-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[0.95] mb-4 text-drop-shadow"
          >
            {proj.title}
          </motion.h1>

          {/* Netflix Match & Badges Row */}
          <motion.div
            key={`meta-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4 text-xs font-semibold"
          >
            <span className="text-emerald-400 font-bold text-sm">
              {proj.matchScore || 98}% Match
            </span>
            <span className="px-2 py-0.5 border border-white/30 text-white/80 rounded">
              {proj.year}
            </span>
            <span className="px-2 py-0.5 border border-white/30 text-white/80 rounded">
              {proj.rating || "TV-MA • AI/ML"}
            </span>
            <span className="text-white/60 font-mono">
              {proj.duration || "1 Season"}
            </span>
            <span className="px-1.5 py-0.5 bg-red-600 text-white font-bold rounded text-[10px] tracking-wider">
              4K ULTRA HD
            </span>
          </motion.div>

          <motion.p
            key={`tag-${i}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 font-medium mb-3 max-w-2xl"
          >
            {proj.tagline}
          </motion.p>

          <motion.p
            key={`syn-${i}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm md:text-base text-white/60 max-w-xl mb-6 leading-relaxed line-clamp-3"
          >
            {proj.synopsis}
          </motion.p>

          {/* Tech stack tags */}
          <motion.div
            key={`tech-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start"
          >
            {proj.tech.slice(0, 6).map(t => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded bg-white/10 text-white/80 border border-white/10 font-mono"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            key={`cta-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <button
              onClick={() => onOpenModal(proj)}
              className="flex items-center gap-2.5 px-8 py-3.5 bg-white hover:bg-white/80 text-[#141414] font-bold rounded-md text-base transition-all shadow-lg hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>View Project</span>
            </button>

            <button
              onClick={() => onOpenModal(proj)}
              className="flex items-center gap-2.5 px-7 py-3.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-md text-base transition-all backdrop-blur-md"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>

            <button
              onClick={() => onToggleMyList(proj.id)}
              className={`p-3.5 rounded-md border transition-all flex items-center justify-center ${
                inList
                  ? "bg-red-600/30 border-red-600 text-white"
                  : "bg-white/10 border-white/20 text-white/80 hover:text-white hover:bg-white/20"
              }`}
              title={inList ? "Remove from My List" : "Add to My List"}
            >
              {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>

            {proj.repo && (
              <a
                href={proj.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-all"
                title="View GitHub Source"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Right: 3D Visual Artwork */}
        <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-[320px] h-[320px] relative z-20">
          <Hero3DVisual
            emoji={proj.backdrop.emoji || "⚡"}
            accent={proj.backdrop.accent || "#e50914"}
          />
        </div>
      </div>

      {/* Bottom Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-2">
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === i ? "w-8 bg-red-600" : "w-3 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
        {featured.length > 1 && (
          <button
            onClick={() => setPaused(!paused)}
            className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label={paused ? "Resume auto-play" : "Pause auto-play"}
          >
            {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </section>
  );
}