"use client";

import { motion } from "framer-motion";
import { Plus, Check, Github, Flame } from "lucide-react";

import type { Project } from "@/types/portfolio";
import { sound } from "@/lib/sound";

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
  const backdropFrom = project.backdrop.from || "#12131c";
  const backdropTo = project.backdrop.to || "#ff0055";
  
  const backdropStyle = `linear-gradient(135deg, ${backdropFrom}, rgba(0, 240, 255, 0.2), ${backdropTo})`;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex-shrink-0 group cursor-pointer ${rankNumber ? "w-[290px] md:w-[320px] pl-10 md:pl-12" : "w-[260px] md:w-[290px]"}`}
      onClick={() => {
        sound.playWhoosh();
        onOpenModal(project);
      }}
      onMouseEnter={() => sound.playHover()}
    >
      {/* Sleek Side Rank Number */}
      {rankNumber && (
        <div className="absolute left-0 top-6 z-0 flex items-center justify-center select-none pointer-events-none">
          <span className="font-mono font-black text-6xl md:text-7xl text-[#ff0055]/30 group-hover:text-[#00f0ff] transition-colors text-glow-pink">
            0{rankNumber}
          </span>
        </div>
      )}

      {/* Main Holographic Card Container */}
      <div className="relative z-10 flex flex-col rounded-xl overflow-hidden bg-[#12131c] border-2 border-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#ff0055] group-hover:shadow-[0_0_30px_rgba(255,0,85,0.4)] clip-cyber-card">
        
        {/* Top Visual Banner */}
        <div
          className="relative h-44 md:h-48 w-full flex items-center justify-center overflow-hidden"
          style={{ background: backdropStyle }}
        >
          {/* Cyber grid & manga dots */}
          <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12131c] via-transparent to-transparent opacity-90" />

          {/* Icon/Emoji Art */}
          <span className="text-6xl md:text-7xl transform transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(0,240,255,0.6)] z-10">
            {project.backdrop.emoji || "⚡"}
          </span>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded bg-[#0a0a0f]/90 text-[#00f0ff] font-mono font-black text-[10px] uppercase tracking-wider shadow-sm border border-[#00f0ff]/40">
              S-RANK MISSION
            </span>
            {project.matchScore && (
              <span className="px-2.5 py-1 rounded bg-gradient-to-r from-[#e5b84c] to-[#ff0055] text-black font-mono font-black text-[10px] tracking-tight shadow-md flex items-center gap-1 uppercase">
                <Flame className="w-3 h-3 fill-current text-black" />
                {project.matchScore}%
              </span>
            )}
          </div>
        </div>

        {/* Card Body Info */}
        <div className="p-5 flex flex-col flex-1 justify-between bg-[#12131c] space-y-3">
          <div>
            {/* Categories */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.categories.slice(0, 2).map(c => (
                <span
                  key={c}
                  className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-[#ff0055]/20 text-[#ff0055] border border-[#ff0055]/40 uppercase"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Project Title */}
            <h3 className="font-display font-extrabold text-white text-lg leading-snug group-hover:text-[#00f0ff] transition-colors duration-200 line-clamp-1 uppercase">
              {project.title}
            </h3>

            {/* Tagline */}
            <p className="text-xs text-gray-300 font-sans line-clamp-2 mt-1 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Bottom Row: Tech Chips & Actions */}
          <div className="pt-3 border-t border-gray-800 flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1 max-w-[170px]">
              {project.tech.slice(0, 3).map(t => (
                <span key={t} className="px-1.5 py-0.5 text-[9px] rounded bg-[#181926] text-[#00f0ff] font-mono border border-[#00f0ff]/30">
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              {onToggleMyList && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    sound.playClick();
                    onToggleMyList(project.id);
                  }}
                  className={`w-8 h-8 rounded border flex items-center justify-center transition-all ${
                    inList
                      ? "bg-[#e5b84c] border-[#e5b84c] text-black shadow-[0_0_12px_rgba(229,184,76,0.5)]"
                      : "bg-[#181926] text-white border-gray-700 hover:border-[#ff0055] hover:text-[#ff0055]"
                  }`}
                  title={inList ? "In Deck" : "Add to Deck"}
                >
                  {inList ? <Check className="w-4 h-4 font-bold" /> : <Plus className="w-4 h-4" />}
                </button>
              )}

              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => {
                    e.stopPropagation();
                    sound.playClick();
                  }}
                  className="w-8 h-8 rounded bg-[#181926] hover:bg-[#202235] text-white hover:text-[#00f0ff] border border-gray-700 hover:border-[#00f0ff] transition-all flex items-center justify-center"
                  title="View Source Code"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}