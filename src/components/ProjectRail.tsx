"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";

import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/portfolio";
import { sound } from "@/lib/sound";

interface Props {
  title: string;
  projects: Project[];
  onOpenModal: (p: Project) => void;
  isTop10?: boolean;
  myList?: string[];
  onToggleMyList?: (id: string) => void;
}

export default function ProjectRail({
  title,
  projects,
  onOpenModal,
  isTop10 = false,
  myList = [],
  onToggleMyList
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll, projects]);

  const scroll = (dir: "left" | "right") => {
    sound.playWhoosh();
    const el = containerRef.current;
    if (!el) return;
    const gap = 20;
    const cardW = el.querySelector("article")?.clientWidth ?? 290;
    el.scrollBy({ left: dir === "left" ? -(cardW + gap) : cardW + gap, behavior: "smooth" });
  };

  return (
    <section className="mb-14 relative group/rail">
      {/* Rail Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <div className="w-2.5 h-7 bg-gradient-to-b from-[#ff0055] to-[#00f0ff] rounded-full shadow-[0_0_12px_rgba(255,0,85,0.8)]" />
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3 uppercase text-glow-cyan">
            {title}
          </h2>
          {isTop10 && (
            <span className="flex items-center gap-1.5 text-xs font-mono font-black text-[#e5b84c] px-3 py-1 rounded bg-[#e5b84c]/20 border border-[#e5b84c]/50 uppercase tracking-widest shadow-[0_0_15px_rgba(229,184,76,0.3)]">
              <Trophy className="w-4 h-4 text-[#e5b84c]" /> S-RANKED MATRIX
            </span>
          )}
        </motion.div>

        {/* Scroll Nav Controls */}
        <div className="flex gap-2">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded bg-[#181926] border border-[#00f0ff]/40 text-white hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all shadow-[0_0_12px_rgba(0,240,255,0.2)]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded bg-[#181926] border border-[#ff0055]/40 text-white hover:border-[#ff0055] hover:text-[#ff0055] transition-all shadow-[0_0_12px_rgba(255,0,85,0.2)]"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Rail Scroll Container */}
      <div
        ref={containerRef}
        className="overflow-x-auto hide-scrollbar py-3 px-1 scroll-smooth"
      >
        <div className="flex gap-5 w-max">
          {projects.map((proj, idx) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onOpenModal={onOpenModal}
              index={idx}
              rankNumber={isTop10 ? idx + 1 : undefined}
              inList={myList.includes(proj.id)}
              onToggleMyList={onToggleMyList}
            />
          ))}
        </div>
      </div>
    </section>
  );
}