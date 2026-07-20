"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/portfolio";

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
    const el = containerRef.current;
    if (!el) return;
    const gap = 24;
    const cardW = el.querySelector("article")?.clientWidth ?? 280;
    el.scrollBy({ left: dir === "left" ? -(cardW + gap) : cardW + gap, behavior: "smooth" });
  };

  return (
    <section className="mb-12 relative group/rail">
      {/* Rail Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-baseline gap-3"
        >
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            {title}
          </h2>
          {isTop10 && (
            <span className="text-xs font-bold text-red-600 tracking-wider uppercase">
              Top 10 Today
            </span>
          )}
        </motion.div>

        <div className="flex gap-2">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-lg backdrop-blur-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all shadow-lg backdrop-blur-md"
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
        className="overflow-x-auto hide-scrollbar py-3 px-2 scroll-smooth"
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