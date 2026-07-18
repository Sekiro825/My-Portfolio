"use client";

import { motion } from "framer-motion";
import { Github, Info } from "lucide-react";
import type { Project } from "@/types/portfolio";
import { cardHover, prefersReduced } from "@/lib/motion";

export default function ProjectCard({
  project,
  onOpenModal,
  index = 0,
}: {
  project: Project;
  onOpenModal: (p: Project) => void;
  index?: number;
}) {
  const reduced = prefersReduced();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={reduced ? undefined : cardHover.whileHover}
      className="relative flex-shrink-0 w-[300px] md:w-[340px] h-[420px] rounded-2xl overflow-hidden bg-ink-800/50 border border-white/5 group cursor-pointer"
      onClick={() => onOpenModal(project)}
    >
      {/* Backdrop gradient */}
      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500" style={{
        background: project.backdrop.kind === "gradient"
          ? `linear-gradient(135deg, ${project.backdrop.from}, ${project.backdrop.via || project.backdrop.to}, ${project.backdrop.to})`
          : `radial-gradient(ellipse 60% 50% at 50% 40%, ${project.backdrop.accent}20, transparent 70%), linear-gradient(180deg, ${project.backdrop.from}, ${project.backdrop.to})`
      }} />

      {/* Shine effect */}
      <div className="card-shine" />

      {/* Status badge */}
      {project.status === "in-progress" && (
        <span className="absolute top-4 left-4 z-20 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-semibold tracking-[0.1em] uppercase">
          In Progress
        </span>
      )}

      {/* Content */}
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent">
        {/* Category */}
        <div className="flex gap-2 mb-3">
          {project.categories.slice(0, 2).map(c => (
            <span key={c} className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-accent-crimson/15 text-accent-crimson border border-accent-crimson/20 uppercase tracking-[0.1em]">
              {c}
            </span>
          ))}
        </div>

        <h3 className="font-display text-2xl md:text-3xl tracking-tight text-white mb-2 group-hover:text-glow transition-all duration-300">{project.title}</h3>
        <p className="text-sm text-ink-300 mb-4 line-clamp-2">{project.tagline}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map(t => (
            <span key={t} className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 border border-white/10 text-ink-400 font-mono">
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
               className="flex items-center gap-1.5 text-sm text-ink-300 hover:text-accent-electric transition-colors">
              <Github className="w-4 h-4" /> Code
            </a>
          )}
          <button onClick={e => { e.stopPropagation(); onOpenModal(project); }}
                  className="flex items-center gap-1.5 text-sm text-ink-300 hover:text-accent-crimson transition-colors ml-auto">
            <Info className="w-4 h-4" /> Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}