"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Info, Plus, Check, Github, Zap, Sparkles, Shield, Flame } from "lucide-react";
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

  return (
    <>
      <motion.div
        className="absolute inset-0 z-0 cyber-grid opacity-70"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 20%, rgba(255, 0, 85, 0.15) 0%, transparent 75%),
                       radial-gradient(ellipse 60% 50% at 80% 70%, rgba(0, 240, 255, 0.12) 0%, transparent 65%),
                       linear-gradient(180deg, #0a0a0f, #12131c)`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      />
      {/* Anime Manga Dots & Vignette */}
      <div className="absolute inset-0 z-[1] manga-dots opacity-25 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/60" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent w-full lg:w-2/3" />
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
    avatarBg: "from-red-500 to-red-800",
    avatarIcon: "⚡",
    accentColor: "#ff0055",
    badge: "S-CLASS SHADOW ARCHITECT",
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
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-24 pb-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <Backdrop key={`bg-${proj.id}-${i}`} proj={proj} />
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left: Kinetic Anime Hero Narrative */}
        <div className="flex-1 text-center lg:text-left">
          
          {/* Episode & HUD Rank Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 mb-5 rounded-md bg-[#ff0055]/15 border border-[#ff0055]/50 text-[#ff0055] text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,0,85,0.3)] clip-cyber-corner"
          >
            <Zap className="w-4 h-4 text-[#00f0ff] animate-pulse" />
            <span>ACT I {"//"} S-RANK MISSION #{i + 1}</span>
            <span className="text-white/30">•</span>
            <span className="text-[#e5b84c] font-black">{currentProfile.badge || "S-CLASS ARCHITECT"}</span>
          </motion.div>

          {/* Subtitle Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-center justify-center lg:justify-start gap-2 mb-3"
          >
            <Shield className="w-4 h-4 text-[#00f0ff]" />
            <span className="font-mono text-xs tracking-[0.3em] text-[#00f0ff] uppercase font-bold text-glow-cyan">
              {"SAKET POKALE // SHADOW ARCHITECT MATRIX"}
            </span>
          </motion.div>

          {/* Project Main Title (Anime Action Style) */}
          <motion.h1
            key={`t-${i}`}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.95] mb-5 text-glow-pink uppercase"
          >
            {proj.title}
          </motion.h1>

          {/* Power Stats Bar */}
          <motion.div
            key={`meta-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-5 text-xs font-mono font-bold"
          >
            <span className="text-black font-black text-xs flex items-center gap-1.5 px-3 py-1 rounded bg-gradient-to-r from-[#e5b84c] to-[#ff0055] shadow-[0_0_15px_rgba(229,184,76,0.4)] uppercase">
              <Flame className="w-4 h-4 fill-current text-black" />
              MATCH POWER: {proj.matchScore || 99}%
            </span>
            <span className="px-2.5 py-1 border border-[#ff0055]/60 text-[#ff0055] bg-[#ff0055]/10 rounded font-bold">{proj.year}</span>
            <span className="px-2.5 py-1 border border-[#00f0ff]/40 text-[#00f0ff] rounded bg-[#00f0ff]/10 font-bold">{proj.rating || "S-RANK • FULL-STACK"}</span>
            <span className="px-2.5 py-1 bg-[#e5b84c]/20 border border-[#e5b84c]/50 text-[#e5b84c] font-bold rounded text-[10px] tracking-widest uppercase">CYBER 4K</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            key={`tag-${i}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#00f0ff] font-bold mb-3 max-w-2xl font-mono text-glow-cyan"
          >
            {proj.tagline}
          </motion.p>

          {/* Synopsis */}
          <motion.p
            key={`syn-${i}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm md:text-base text-gray-300 max-w-xl mb-6 leading-relaxed line-clamp-3 font-sans"
          >
            {proj.synopsis}
          </motion.p>

          {/* Tech Chips */}
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
                className="px-3 py-1 text-xs rounded bg-[#181926] text-[#00f0ff] border border-[#00f0ff]/30 font-mono font-medium shadow-[0_0_10px_rgba(0,240,255,0.15)]"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* High Energy CTA Controls */}
          <motion.div
            key={`cta-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => {
                sound.playWhoosh();
                onOpenModal(proj);
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#ff0055] to-[#ff2a4b] hover:from-[#ff2a4b] hover:to-[#ff0055] text-white font-mono font-black rounded-lg text-sm transition-all duration-300 shadow-[0_0_25px_rgba(255,0,85,0.6)] hover:scale-105 uppercase tracking-widest clip-cyber-corner"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>LAUNCH MISSION DEMO</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenModal(proj);
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 px-7 py-4 bg-[#181926] hover:bg-[#202235] text-white font-mono font-bold rounded-lg text-sm transition-all border border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:border-[#00f0ff]"
            >
              <Info className="w-4 h-4 text-[#00f0ff]" />
              <span>TACTICAL DATA</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onToggleMyList(proj.id);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`p-4 rounded-lg border transition-all flex items-center justify-center shadow-lg ${
                inList
                  ? "bg-[#e5b84c] border-[#e5b84c] text-black shadow-[0_0_20px_rgba(229,184,76,0.6)]"
                  : "bg-[#181926] border-gray-700 text-white hover:border-[#ff0055] hover:text-[#ff0055]"
              }`}
              title={inList ? "Remove from Deck" : "Bookmark to Deck"}
            >
              {inList ? <Check className="w-5 h-5 font-bold" /> : <Plus className="w-5 h-5" />}
            </button>

            {proj.repo && (
              <a
                href={proj.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="p-4 rounded-lg bg-[#181926] hover:bg-[#202235] border border-gray-700 text-white hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all shadow-md"
                title="View GitHub Code Matrix"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Right: Floating Manga Character Showcase & 3D Core */}
        <div className="flex flex-col items-center justify-center flex-shrink-0 w-full lg:w-[480px] relative z-20">
          
          {/* Hero Avatar Card Frame */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#ff0055]/60 bg-[#12131c] shadow-[0_0_40px_rgba(255,0,85,0.35)] group">
            
            {/* Background Manga FX */}
            <div className="absolute inset-0 manga-dots-pink opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10" />

            {/* Profile Avatar Image */}
            <img
              src="/My-Portfolio/Saket_Pokale.png"
              alt="Saket Pokale - Anime Shadow Architect"
              className="w-full h-full object-cover object-top filter contrast-110 saturate-110 group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src.includes("saket_avatar_stylized.png")) {
                  target.onerror = null;
                } else {
                  target.src = "/My-Portfolio/saket_avatar_stylized.png";
                }
              }}
            />

            {/* Character Info Overlay Tag */}
            <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-lg bg-[#0a0a0f]/90 border border-[#00f0ff]/40 backdrop-blur-md">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-[#ff0055] uppercase tracking-wider">
                  HERO ARCHTYPE
                </span>
                <span className="px-2 py-0.5 rounded bg-[#e5b84c] text-black font-mono font-black text-[10px]">
                  LVL 99 S-CLASS
                </span>
              </div>
              <h3 className="text-xl font-display font-black text-white tracking-wide">
                SAKET POKALE
              </h3>
              <p className="text-xs font-mono text-[#00f0ff]">
                Full-Stack Systems & AI Intelligence Architect
              </p>
            </div>

            {/* Corner Cyber HUD Decals */}
            <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-[#ff0055] text-white font-mono font-black text-[10px] uppercase rounded clip-cyber-corner">
              LIVE TRANSMISSION
            </div>
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-[#0a0a0f]/80 border border-[#00f0ff]/40 text-[#00f0ff] font-mono text-[10px] rounded">
              <Sparkles className="w-3 h-3 text-[#e5b84c]" />
              <span>SEKIRO MODE</span>
            </div>
          </div>

          {/* 3D Visual Core Container below frame */}
          <div className="w-full h-[180px] -mt-10 relative z-30">
            <Hero3DVisual
              key={proj.id}
              accent="#ff0055"
            />
          </div>

        </div>

      </div>

      {/* Anime Episode Controls Switcher */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-3">
        {featured.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              sound.playClick();
              setI(idx);
            }}
            onMouseEnter={() => sound.playHover()}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === i
                ? "w-12 bg-gradient-to-r from-[#ff0055] to-[#00f0ff] shadow-[0_0_12px_rgba(255,0,85,0.8)]"
                : "w-3 bg-gray-700 hover:bg-gray-400"
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
            className="ml-3 p-2 rounded bg-[#181926] text-[#00f0ff] border border-[#00f0ff]/40 hover:border-[#00f0ff] shadow-md transition-colors"
            aria-label={paused ? "Resume auto-scroll" : "Pause auto-scroll"}
          >
            {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </section>
  );
}