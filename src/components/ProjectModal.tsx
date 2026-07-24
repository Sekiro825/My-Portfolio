"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play, Plus, Check, Cpu, Sparkles } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { portfolio } from "@data/portfolio";
import { sound } from "@/lib/sound";

interface Props {
  project: Project | null;
  onClose: () => void;
  onSelectProject?: (p: Project) => void;
  inList?: boolean;
  onToggleMyList?: (id: string) => void;
}

export default function ProjectModal({
  project,
  onClose,
  onSelectProject,
  inList = false,
  onToggleMyList
}: Props) {
  const esc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      sound.playClick();
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [project, esc]);

  if (!project) return null;

  const related = portfolio.projects.filter(
    p => p.id !== project.id && p.categories.some(c => project.categories.includes(c))
  ).slice(0, 3);

  const backdropFrom = project.backdrop.from || "#2C1A14";
  const backdropTo = project.backdrop.to || "#D98A5B";
  const bannerGradient = `linear-gradient(135deg, ${backdropFrom}, ${project.backdrop.via || "#8C5A3C"}, ${backdropTo})`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[180] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop Overlay */}
        <div
          className="fixed inset-0 bg-[#2C1A14]/75 backdrop-blur-md"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
        />

        {/* Modal Container */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FAF6F0] border-2 border-[#E8DFD5] rounded-3xl shadow-[0_25px_60px_rgba(44,26,20,0.3)] z-10 hide-scrollbar"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            onMouseEnter={() => sound.playHover()}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-2xl bg-white/90 hover:bg-[#2C1A14] text-[#2C1A14] hover:text-white border border-[#E8DFD5] transition-all shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner Header */}
          <div
            className="relative h-64 md:h-80 flex flex-col justify-end p-6 md:p-10 overflow-hidden"
            style={{ background: bannerGradient }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-8xl md:text-9xl opacity-25">
              <span>{project.backdrop.emoji || "⚡"}</span>
            </div>
            <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/40 to-transparent" />

            {/* Title & Badge */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-xl bg-[#2C1A14]/90 text-[#FAF6F0] font-mono text-[10px] font-bold uppercase tracking-widest shadow-md">
                  TACTICAL DEPLOYMENT DOSSIER
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-[#2C1A14] tracking-tight mb-4 drop-shadow-sm">
                {project.title}
              </h2>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="flex items-center gap-2 px-6 py-3 bg-[#2C1A14] hover:bg-[#3D261D] text-[#FAF6F0] font-mono font-bold rounded-xl text-xs transition-all shadow-md uppercase tracking-wider"
                  >
                    <Play className="w-4 h-4 fill-current text-[#D98A5B]" /> ACCESS SOURCE CODE
                  </a>
                )}
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="flex items-center gap-2 px-5 py-3 bg-white border border-[#E8DFD5] text-[#2C1A14] hover:bg-[#F4EBE1] font-mono font-bold rounded-xl text-xs transition-all shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4 text-[#D98A5B]" /> LIVE DEMO MATRIX
                  </a>
                )}
                {onToggleMyList && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onToggleMyList(project.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`p-3 rounded-xl border transition-all shadow-sm ${
                      inList
                        ? "bg-[#D98A5B] border-[#D98A5B] text-white shadow-md"
                        : "bg-white border-[#E8DFD5] text-[#2C1A14] hover:text-[#D98A5B]"
                    }`}
                  >
                    {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="p-6 md:p-10 space-y-8 bg-[#FAF6F0]">
            {/* Meta Stats Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#6E584E] pb-6 border-b border-[#E8DFD5]">
              <span className="text-[#2C1A14] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D98A5B]" /> POWER MATCH: {project.matchScore || 99}%
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E8DFD5]">YEAR: {project.year}</span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-[#E8DFD5]">RATING: {project.rating || "S-RANK"}</span>
            </div>

            {/* Synopsis & Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-mono text-sm font-bold text-[#2C1A14] uppercase tracking-wider">
                  MISSION BRIEF & OVERVIEW
                </h3>
                <p className="text-[#6E584E] text-sm leading-relaxed font-sans">{project.synopsis}</p>
                
                {project.highlights && project.highlights.length > 0 && (
                  <div className="pt-4">
                    <h4 className="font-mono text-xs font-bold text-[#D98A5B] uppercase tracking-wider mb-2">
                      SYSTEM CAPABILITIES
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#6E584E] font-mono">
                      {project.highlights.map((h: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#D98A5B]">▸</span> {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tech Matrix Panel */}
              <div className="cyber-panel p-5 rounded-2xl border border-[#E8DFD5] bg-white space-y-3 shadow-sm">
                <h3 className="font-mono text-xs font-bold text-[#2C1A14] uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#D98A5B]" /> TECH STACK MATRIX
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[10px] rounded-lg bg-[#FAF6F0] text-[#2C1A14] font-mono border border-[#E8DFD5] font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Builds */}
            {related.length > 0 && (
              <div className="pt-6 border-t border-[#E8DFD5]">
                <h3 className="font-mono text-xs font-bold text-[#2C1A14] uppercase tracking-wider mb-4">
                  SIMILAR ARCHITECTURAL BUILDS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        sound.playClick();
                        if (onSelectProject) onSelectProject(p);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className="p-3.5 rounded-2xl bg-white border border-[#E8DFD5] hover:border-[#D98A5B] cursor-pointer transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
                    >
                      <span className="text-xs font-display font-bold text-[#2C1A14] mb-1 hover:text-[#D98A5B]">
                        {p.title}
                      </span>
                      <span className="text-[9px] font-mono text-[#6E584E]">{p.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}