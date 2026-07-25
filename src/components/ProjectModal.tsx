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

  const backdropFrom = project.backdrop.from || "#FAFAFA";
  const backdropTo = project.backdrop.to || "#E0E0E0";
  const bannerGradient = `linear-gradient(135deg, ${backdropFrom}44, ${backdropTo}22)`;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[180] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop Overlay */}
        <div
          className="fixed inset-0 bg-white/60 backdrop-blur-md"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
        />

        {/* Modal Container */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface border border-black/5 rounded-3xl shadow-2xl z-10 hide-scrollbar"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
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
            className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-white/80 hover:bg-white text-text border border-black/10 transition-all shadow-sm backdrop-blur-md hover:shadow"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Banner Header */}
          <div
            className="relative h-72 md:h-80 flex flex-col justify-end p-8 md:p-12 overflow-hidden bg-bg"
            style={{ background: bannerGradient }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-8xl md:text-[140px] opacity-20 pointer-events-none drop-shadow-sm">
              <span>{project.backdrop.emoji || "⚡"}</span>
            </div>

            {/* Title & Badge */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-text font-mono text-xs font-semibold uppercase tracking-widest shadow-sm">
                  Project Dossier
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-text tracking-tight mb-6">
                {project.title}
              </h2>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="flex items-center gap-2 px-6 py-3.5 bg-text hover:bg-text/90 text-white font-body font-semibold rounded-full text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Play className="w-4 h-4 fill-current" /> View Source
                  </a>
                )}
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="flex items-center gap-2 px-6 py-3.5 bg-white border border-black/10 text-text hover:border-black/20 font-body font-medium rounded-full text-sm transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
                  >
                    <ExternalLink className="w-4 h-4 text-accent-blue" /> Live Demo
                  </a>
                )}
                {onToggleMyList && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onToggleMyList(project.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all shadow-sm hover:shadow hover:-translate-y-0.5 ${
                      inList
                        ? "bg-text border-text text-white"
                        : "bg-white border-black/10 text-text"
                    }`}
                  >
                    {inList ? <Check className="w-5 h-5 font-bold" /> : <Plus className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="p-8 md:p-12 space-y-12">
            {/* Meta Stats Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-medium text-muted pb-8 border-b border-black/5">
              <span className="px-4 py-2 rounded-full bg-accent-blue/10 text-accent-blue flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> {project.year}
              </span>
              <span className="px-4 py-2 rounded-full bg-black/5 text-text border border-black/5">
                Rating: {project.rating || "Excellent"}
              </span>
            </div>

            {/* Synopsis & Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-text mb-4">
                    Overview
                  </h3>
                  <p className="text-muted text-base leading-relaxed font-body">
                    {project.synopsis}
                  </p>
                </div>
                
                {project.highlights && project.highlights.length > 0 && (
                  <div className="pt-2">
                    <h4 className="font-display text-lg font-semibold text-text mb-4">
                      Key Highlights
                    </h4>
                    <ul className="space-y-3 text-sm text-muted font-body">
                      {project.highlights.map((h: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-accent-blue mt-0.5">●</span>
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tech Matrix Panel */}
              <div className="glass-panel p-6 rounded-3xl border border-black/5 bg-white/50 h-fit space-y-5">
                <h3 className="font-display text-sm font-semibold text-text flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-accent-blue" /> Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-xs rounded-full bg-black/5 text-muted font-mono font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Builds */}
            {related.length > 0 && (
               <div className="pt-8 border-t border-black/5">
                <h3 className="font-display text-lg font-semibold text-text mb-6">
                  Similar Works
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {related.map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        sound.playClick();
                        if (onSelectProject) onSelectProject(p);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className="p-5 rounded-2xl bg-surface border border-black/5 hover:border-black/10 cursor-pointer transition-all flex flex-col justify-between shadow-sm hover:shadow group"
                    >
                      <span className="text-sm font-display font-semibold text-text mb-2 group-hover:text-accent-blue transition-colors">
                        {p.title}
                      </span>
                      <span className="text-xs font-mono text-muted">{p.year}</span>
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