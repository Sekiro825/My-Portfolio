"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Info, Plus, Check, Github, Zap, Sparkles } from "lucide-react";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";
import { PROFILES, ProfileId } from "@/types/profile";
import Hero3DVisual from "./Hero3DVisual";
import { sound } from "@/lib/sound";

interface Props {
  activeProfile: ProfileId;
  onOpenModal: (p: Project) => void;
  myList: string[];
  onToggleMyList: (id: string) => void;
}

const Backdrop = ({ proj }: { proj: Project }) => {
  const { backdrop } = proj;
  if (!backdrop) return null;
  const { from } = backdrop;
  
  return (
    <>
      <motion.div
        className="absolute inset-0 z-0 bg-cyber-grid opacity-60"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 20%, ${from}22 0%, transparent 75%),
                       radial-gradient(ellipse 60% 50% at 80% 70%, #ebdcd0 0%, transparent 65%),
                       linear-gradient(180deg, #faf6f0, #f4ebe1)`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      {/* Coffee Dots & Speed lines */}
      <div className="absolute inset-0 z-[1] manga-dots opacity-20 pointer-events-none" />
      {/* Gradient Overlay Vignettes */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#faf6f0] via-[#faf6f0]/40 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#faf6f0] via-[#faf6f0]/60 to-transparent w-full lg:w-2/3" />
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
    name: "Coffee Explorer",
    subtitle: "",
    avatarBg: "from-amber-500 to-amber-800",
    avatarIcon: "☕",
    accentColor: "#D98A5B",
    badge: "RANK #01 SHOWCASE",
    heroTagline: "",
    primaryCategory: "Trending Builds"
  };

  useEffect(() => {
    if (featured.length < 2) return;
    timer.current = setInterval(() => {
      setI(prev => (prev + 1) % featured.length);
    }, paused ? 99999 : 7000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [featured.length, paused]);

  const proj = featured[i];
  if (!proj) return null;

  const inList = (myList || []).includes(proj.id);

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <Backdrop key={`bg-${proj.id}-${i}`} proj={proj} />
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
        {/* Left: Info */}
        <div className="flex-1 text-center lg:text-left">
          {/* Episode & Rank Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-[#d98a5b]/15 border border-[#d98a5b]/40 text-[#2c1a14] text-xs font-mono font-bold tracking-widest uppercase shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-[#d98a5b]" />
            <span>EPISODE 0{i + 1} {"//"} FEATURED BUILD</span>
            <span className="text-[#6e584e]/40">•</span>
            <span className="text-[#a66e4e]">{currentProfile.badge}</span>
          </motion.div>

          {/* Subtitle Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-center justify-center lg:justify-start gap-2 mb-2"
          >
            <span className="font-mono text-xs tracking-[0.25em] text-[#6e584e] uppercase font-bold">
              {"SAKET POKALE // ARCHITECT ORIGINALS"}
            </span>
          </motion.div>

          {/* Project Main Title */}
          <motion.h1
            key={`t-${i}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-[#2c1a14] tracking-tight leading-[0.95] mb-4 text-glow-cyan"
          >
            {proj.title}
          </motion.h1>

          {/* Match Score & Badges */}
          <motion.div
            key={`meta-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-4 text-xs font-mono font-semibold"
          >
            <span className="text-[#2c1a14] font-bold text-sm flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-white border border-[#e8dfd5] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#d98a5b]" />
              POWER MATCH: {proj.matchScore || 99}%
            </span>
            <span className="px-2 py-0.5 border border-[#a66e4e]/40 text-[#a66e4e] bg-[#a66e4e]/10 rounded-lg font-bold">{proj.year}</span>
            <span className="px-2 py-0.5 border border-[#e8dfd5] text-[#6e584e] rounded-lg bg-white">{proj.rating || "S-RANK • FULL-STACK"}</span>
            <span className="px-2 py-0.5 bg-[#e6a756]/20 border border-[#e6a756]/40 text-[#2c1a14] font-bold rounded-lg text-[10px] tracking-wider">COFFEE 4K</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            key={`tag-${i}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#d98a5b] font-medium mb-3 max-w-2xl font-mono"
          >
            {proj.tagline}
          </motion.p>

          {/* Synopsis */}
          <motion.p
            key={`syn-${i}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm md:text-base text-[#6e584e] max-w-xl mb-6 leading-relaxed line-clamp-3 font-sans"
          >
            {proj.synopsis}
          </motion.p>

          {/* Tech Matrix Chips */}
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
                className="px-2.5 py-1 text-xs rounded-lg bg-white text-[#2c1a14] border border-[#e8dfd5] font-mono font-medium shadow-sm"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* Action Controls */}
          <motion.div
            key={`cta-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-3.5 justify-center lg:justify-start"
          >
            <button
              onClick={() => {
                sound.playClick();
                onOpenModal(proj);
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 px-8 py-3.5 bg-[#2c1a14] hover:bg-[#3d261d] text-[#faf6f0] font-mono font-bold rounded-xl text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(44,26,20,0.25)] hover:scale-105 uppercase tracking-wider"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>SUMMON DEMO</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenModal(proj);
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 px-7 py-3.5 bg-white hover:bg-[#f4ebe1] text-[#2c1a14] font-mono font-semibold rounded-xl text-sm transition-all border border-[#e8dfd5] shadow-sm"
            >
              <Info className="w-4 h-4 text-[#d98a5b]" />
              <span>TACTICAL DATA</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onToggleMyList(proj.id);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`p-3.5 rounded-xl border transition-all flex items-center justify-center shadow-sm ${
                inList
                  ? "bg-[#d98a5b] border-[#d98a5b] text-white shadow-[0_4px_15px_rgba(217,138,91,0.4)]"
                  : "bg-white border-[#e8dfd5] text-[#2c1a14] hover:text-[#d98a5b]"
              }`}
              title={inList ? "Remove from Deck" : "Add to Deck"}
            >
              {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>

            {proj.repo && (
              <a
                href={proj.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="p-3.5 rounded-xl bg-white hover:bg-[#f4ebe1] border border-[#e8dfd5] text-[#2c1a14] hover:text-[#d98a5b] transition-all shadow-sm"
                title="View GitHub Code Matrix"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Right: 3D Aesthetic Art Frame */}
        <div className="flex items-center justify-center flex-shrink-0 w-[340px] h-[340px] relative z-20">
          <div className="absolute inset-0 rounded-3xl border border-[#e8dfd5] bg-white/70 backdrop-blur-md shadow-[0_10px_35px_rgba(74,48,34,0.08)] pointer-events-none" />
          <Hero3DVisual
            emoji={proj.backdrop.emoji || "⚡"}
            accent="#d98a5b"
          />
        </div>
      </div>

      {/* Coffee Slide Switcher */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-3">
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              sound.playClick();
              setI(idx);
            }}
            onMouseEnter={() => sound.playHover()}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === i
                ? "w-10 bg-gradient-to-r from-[#d98a5b] to-[#a66e4e] shadow-sm"
                : "w-2 bg-[#2c1a14]/20 hover:bg-[#2c1a14]/50"
            }`}
            aria-label={`Switch to Episode ${idx + 1}`}
          />
        ))}
        {featured.length > 1 && (
          <button
            onClick={() => {
              sound.playClick();
              setPaused(!paused);
            }}
            onMouseEnter={() => sound.playHover()}
            className="ml-2 p-1.5 rounded-lg bg-white text-[#2c1a14] border border-[#e8dfd5] shadow-sm transition-colors"
            aria-label={paused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {paused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        )}
      </div>
    </section>
  );
}