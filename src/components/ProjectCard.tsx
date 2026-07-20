"use client";

import { motion } from "framer-motion";
import { Plus, Check, Github, Info } from "lucide-react";
import type { Project } from "@/types/portfolio";

interface Props {
  project: Project;
  onOpenModal: (p: Project) => void;
  index?: number;
  rankNumber?: number;
  inList?: boolean;
  onToggleMyList?: (id: string) => void;
}

export default function ProjectCard({
  project,
  onOpenModal,
  index = 0,
  rankNumber,
  inList = false,
  onToggleMyList
}: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`relative flex-shrink-0 group cursor-pointer ${
        rankNumber ? "w-[310px] md:w-[360px] pl-16 md:pl-24" : "w-[240px] md:w-[280px]"
      }`}
      onClick={() => onOpenModal(project)}
    >
      {/* Netflix Top 10 Giant Rank Number */}
      {rankNumber && (
        <div className="absolute left-0 bottom-0 top-0 z-0 flex items-center justify-center select-none pointer-events-none">
          <span className="font-display font-black text-[120px] md:text-[170px] leading-none text-[#141414] stroke-text text-glow-red">
            {rankNumber}
          </span>
        </div>
      )}

      {/* Main Card Container */}
      <div className="relative z-10 aspect-[16/10] rounded-lg overflow-hidden bg-[#181818] border border-white/10 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:z-30 group-hover:shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(229,9,20,0.3)]">
        {/* Backdrop Visual */}
        <div
          className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl transition-transform duration-500 group-hover:scale-110"
          style={{
            background: project.backdrop.kind === "circuit"
              ? `linear-gradient(135deg, ${project.backdrop.from}, ${project.backdrop.to})`
              : `linear-gradient(135deg, ${project.backdrop.from}, ${project.backdrop.via || project.backdrop.to})`
          }}
        >
          <span>{project.backdrop.emoji || "⚡"}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-80" />
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between">
          <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-bold text-[9px] uppercase tracking-wider">
            N ORIGINAL
          </span>
          {project.matchScore && (
            <span className="px-2 py-0.5 rounded bg-emerald-500/90 text-white font-bold text-[10px] tracking-tight">
              {project.matchScore}% Match
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="absolute inset-0 z-20 p-4 flex flex-col justify-end bg-gradient-to-t from-[#181818] via-[#181818]/60 to-transparent">
          {/* Categories */}
          <div className="flex flex-wrap gap-1 mb-1">
            {project.categories.slice(0, 2).map(c => (
              <span key={c} className="px-1.5 py-0.5 text-[9px] font-semibold rounded bg-red-600/20 text-red-400 border border-red-600/30 uppercase tracking-wider">
                {c}
              </span>
            ))}
          </div>

          <h3 className="font-display font-bold text-white text-lg md:text-xl leading-snug group-hover:text-red-500 transition-colors">
            {project.title}
          </h3>

          {/* Tech tags (up to 4) */}
          <div className="flex flex-wrap gap-1 my-1">
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="px-1.5 py-0.5 text-[9px] rounded bg-white/10 text-white/70 font-mono">
                {t}
              </span>
            ))}
          </div>

          {/* Hover Actions & Links */}
          <div className="flex items-center gap-2 mt-1">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" /> <span>Code</span>
              </a>
            )}

            {onToggleMyList && (
              <button
                onClick={e => {
                  e.stopPropagation();
                  onToggleMyList(project.id);
                }}
                className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                  inList
                    ? "bg-red-600 border-red-600 text-white"
                    : "bg-[#2a2a2a]/80 text-white hover:border-white"
                }`}
                title={inList ? "In My List" : "Add to My List"}
              >
                {inList ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              </button>
            )}

            <button
              onClick={e => {
                e.stopPropagation();
                onOpenModal(project);
              }}
              className="flex items-center gap-1 text-[11px] text-white/70 hover:text-white transition-colors ml-auto"
              aria-label="Details"
            >
              <Info className="w-3.5 h-3.5" /> <span>Details</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .stroke-text {
          -webkit-text-stroke: 4px #444444;
          color: #141414;
        }
        .group:hover .stroke-text {
          -webkit-text-stroke: 4px #e50914;
        }
      `}</style>
    </motion.article>
  );
}