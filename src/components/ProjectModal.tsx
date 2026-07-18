"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Calendar, FolderOpen } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { prefersReduced } from "@/lib/motion";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduced = prefersReduced();

  const esc = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => {
    if (!project) return;
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [project, esc]);

  if (!project) return null;

  const statusColor = project.status === "released"
    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
    : "bg-amber-500/15 border-amber-500/30 text-amber-400";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0.01 : 0.25 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

        {/* Panel */}
        <motion.div
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-ink-800 border border-white/10 rounded-2xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: reduced ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog" aria-modal="true" aria-labelledby={`modal-${project.id}`}
        >
          {/* Backdrop gradient top */}
          <div className="absolute top-0 left-0 right-0 h-32 rounded-t-2xl opacity-30 pointer-events-none" style={{
            background: project.backdrop.kind === "gradient"
              ? `linear-gradient(180deg, ${project.backdrop.accent}30, transparent)`
              : `radial-gradient(ellipse 100% 100% at 50% 0%, ${project.backdrop.accent}30, transparent)`,
          }} />

          <div className="relative p-6 md:p-8">
            {/* Close */}
            <button onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-ink-400 hover:text-white transition-colors z-10"
              aria-label="Close">
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColor} uppercase tracking-[0.1em]`}>
                {project.status}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-ink-400">
                <Calendar className="w-4 h-4" /> {project.year}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-ink-400">
                <FolderOpen className="w-4 h-4" /> {project.categories[0]}
              </span>
            </div>

            {/* Title */}
            <h2 id={`modal-${project.id}`} className="font-display text-4xl md:text-5xl tracking-tight text-white mb-3 text-glow">
              {project.title}
            </h2>

            {/* Tagline */}
            <p className="text-lg text-ink-300 font-medium mb-4">{project.tagline}</p>

            {/* Synopsis */}
            <p className="text-base text-ink-400 leading-relaxed mb-6">{project.synopsis}</p>

            {/* Tech */}
            <div className="mb-6">
              <p className="text-xs text-ink-500 uppercase tracking-[0.15em] mb-3">Built with</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 text-ink-300 font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-crimson hover:bg-accent-crimson/80 text-white font-medium transition-all">
                  <Github className="w-5 h-5" /> Source Code
                </a>
              )}
              {project.externalUrl && (
                <a href={project.externalUrl} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium transition-all">
                  <ExternalLink className="w-5 h-5" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}