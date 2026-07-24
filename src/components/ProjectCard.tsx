"use client";

import { motion } from "framer-motion";
import { Plus, Check, Github, Sparkles } from "lucide-react";
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
  const backdropFrom = project.backdrop.from || "#3D261D";
  const backdropTo = project.backdrop.to || "#D98A5B";
  
  const backdropStyle = `linear-gradient(135deg, ${backdropFrom}, ${project.backdrop.via || backdropTo}, ${backdropTo})`;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex-shrink-0 group cursor-pointer ${rankNumber ? "w-[290px] md:w-[320px] pl-10 md:pl-12" : "w-[260px] md:w-[290px]"}`}
      onClick={() => {
        sound.playClick();
        onOpenModal(project);
      }}
      onMouseEnter={() => sound.playHover()}
    >
      {/* Sleek Side Rank Number */}
      {rankNumber && (
        <div className="absolute left-0 top-6 z-0 flex items-center justify-center select-none pointer-events-none">
          <span className="font-mono font-black text-6xl md:text-7xl text-[#D98A5B]/30 group-hover:text-[#D98A5B] transition-colors">
            0{rankNumber}
          </span>
        </div>
      )}

      {/* Main Juicy Card Container */}
      <div className="relative z-10 flex flex-col rounded-3xl overflow-hidden bg-white border-2 border-[#E8DFD5] shadow-[0_10px_30px_rgba(74,48,34,0.06)] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-[#D98A5B] group-hover:shadow-[0_20px_45px_rgba(217,138,91,0.22)]">
        
        {/* Top Visual Banner */}
        <div
          className="relative h-44 md:h-48 w-full flex items-center justify-center overflow-hidden"
          style={{ background: backdropStyle }}
        >
          {/* Subtle manga grid & speedlines */}
          <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />

          {/* Icon/Emoji Art */}
          <span className="text-6xl md:text-7xl transform transition-transform duration-500 group-hover:scale-110 drop-shadow-md z-10">
            {project.backdrop.emoji || "⚡"}
          </span>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-xl bg-[#2C1A14]/90 text-[#FAF6F0] font-mono font-bold text-[10px] uppercase tracking-wider shadow-sm backdrop-blur-md">
              ORIGINAL
            </span>
            {project.matchScore && (
              <span className="px-2.5 py-1 rounded-xl bg-[#D98A5B] text-white font-mono font-bold text-[10px] tracking-tight shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E6A756]" />
                {project.matchScore}%
              </span>
            )}
          </div>
        </div>

        {/* Card Body Info */}
        <div className="p-5 flex flex-col flex-1 justify-between bg-white space-y-3">
          <div>
            {/* Categories */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {project.categories.slice(0, 2).map(c => (
                <span
                  key={c}
                  className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-lg bg-[#D98A5B]/10 text-[#D98A5B] border border-[#D98A5B]/30 uppercase"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Project Title */}
            <h3 className="font-display font-extrabold text-[#2C1A14] text-lg leading-snug group-hover:text-[#D98A5B] transition-colors duration-200 line-clamp-1">
              {project.title}
            </h3>

            {/* Tagline */}
            <p className="text-xs text-[#6E584E] font-sans line-clamp-2 mt-1 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Bottom Row: Tech Chips & Actions */}
          <div className="pt-2 border-t border-[#E8DFD5] flex items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1 max-w-[170px]">
              {project.tech.slice(0, 3).map(t => (
                <span key={t} className="px-1.5 py-0.5 text-[9px] rounded-md bg-[#FAF6F0] text-[#6E584E] font-mono border border-[#E8DFD5]">
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
                  className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all ${
                    inList
                      ? "bg-[#D98A5B] border-[#D98A5B] text-white shadow-sm"
                      : "bg-[#FAF6F0] text-[#2C1A14] border-[#E8DFD5] hover:border-[#D98A5B] hover:text-[#D98A5B]"
                  }`}
                  title={inList ? "In Deck" : "Add to Deck"}
                >
                  {inList ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
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
                  className="w-7 h-7 rounded-xl bg-[#FAF6F0] hover:bg-[#2C1A14] text-[#2C1A14] hover:text-white border border-[#E8DFD5] transition-all flex items-center justify-center"
                  title="View Source Code"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}