"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play, Plus, Check, Film } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { portfolio } from "@data/portfolio";

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
    if (e.key === "Escape") onClose();
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

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[180] flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop overlay */}
        <div
          className="fixed inset-0 bg-[#141414]/90 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Drawer Container */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#181818] border border-white/15 rounded-xl shadow-2xl z-10 hide-scrollbar"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-[#181818]/80 hover:bg-[#2a2a2a] text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Hero Banner Header */}
          <div
            className="relative h-64 md:h-80 flex flex-col justify-end p-6 md:p-10 overflow-hidden"
            style={{
              background: project.backdrop.kind === "circuit"
                ? `linear-gradient(135deg, ${project.backdrop.from}, ${project.backdrop.to})`
                : `linear-gradient(135deg, ${project.backdrop.from}, ${project.backdrop.via || project.backdrop.to})`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-8xl md:text-9xl opacity-20">
              <span>{project.backdrop.emoji || "⚡"}</span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />

            {/* Title & Netflix Original Branding */}
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-display font-black text-xl text-red-600">N</span>
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/70 uppercase">
                  S A K E T &bull; O R I G I N A L
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
                {project.title}
              </h2>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-white/80 text-[#141414] font-bold rounded text-sm transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" /> Source Code
                  </a>
                )}
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded text-sm transition-all"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
                {onToggleMyList && (
                  <button
                    onClick={() => onToggleMyList(project.id)}
                    className={`p-2.5 rounded-full border transition-all ${
                      inList
                        ? "bg-red-600 border-red-600 text-white"
                        : "bg-white/10 border-white/30 text-white/80 hover:text-white"
                    }`}
                  >
                    {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="p-6 md:p-10 space-y-8">
            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              <span className="text-emerald-400 font-bold text-sm">
                {project.matchScore || 98}% Match
              </span>
              <span className="px-2 py-0.5 border border-white/30 text-white/80 rounded">
                {project.year}
              </span>
              <span className="px-2 py-0.5 border border-white/30 text-white/80 rounded">
                {project.rating || "TV-MA"}
              </span>
              <span className="text-white/60 font-mono">
                {project.duration || "1 Season"}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase text-[10px]">
                {project.status}
              </span>
            </div>

            {/* Synopsis & Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-white">Overview</h3>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                  {project.synopsis}
                </p>
                <p className="text-xs text-white/50 italic">
                  Key Focus: {project.tagline}
                </p>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-white/40 block mb-1">Categories:</span>
                  <div className="flex flex-wrap gap-1">
                    {project.categories.map(c => (
                      <span key={c} className="text-white/80 font-medium">
                        {c} &bull;
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-white/40 block mb-1">Tech Stack & Frameworks:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Titles ("More Like This") */}
            {related.length > 0 && (
              <div className="pt-6 border-t border-white/10">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Film className="w-4 h-4 text-red-600" /> More Like This
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map(rel => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectProject && onSelectProject(rel)}
                      className="cursor-pointer group rounded-lg bg-[#222222] border border-white/10 overflow-hidden hover:scale-105 transition-all"
                    >
                      <div
                        className="h-28 flex items-center justify-center text-4xl"
                        style={{
                          background: `linear-gradient(135deg, ${rel.backdrop.from}, ${rel.backdrop.to})`
                        }}
                      >
                        <span>{rel.backdrop.emoji || "⚡"}</span>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold mb-1">
                          <span>{rel.matchScore || 95}% Match</span>
                          <span className="text-white/50">{rel.year}</span>
                        </div>
                        <h4 className="font-bold text-white text-sm group-hover:text-red-500 transition-colors">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-white/50 line-clamp-2 mt-1">
                          {rel.tagline}
                        </p>
                      </div>
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