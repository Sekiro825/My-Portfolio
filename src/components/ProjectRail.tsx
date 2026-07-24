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
          <div className="w-2 h-6 bg-gradient-to-b from-[#d98a5b] to-[#a66e4e] rounded-full shadow-sm" />
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#2c1a14] tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {isTop10 && (
            <span className="flex items-center gap-1 text-xs font-mono font-bold text-[#a66e4e] px-2.5 py-0.5 rounded-lg bg-[#a66e4e]/10 border border-[#a66e4e]/30 uppercase tracking-widest">
              <Trophy className="w-3.5 h-3.5 text-[#e6a756]" /> RANKED TOP
            </span>
          )}
        </motion.div>

        {/* Scroll Nav Controls */}
        <div className="flex gap-2">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              onMouseEnter={() => sound.playHover()}
              className="p-2 rounded-xl bg-white border border-[#e8dfd5] text-[#2c1a14] hover:bg-[#f4ebe1] transition-all shadow-sm"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              onMouseEnter={() => sound.playHover()}
              className="p-2 rounded-xl bg-white border border-[#e8dfd5] text-[#2c1a14] hover:bg-[#f4ebe1] transition-all shadow-sm"
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