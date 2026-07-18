"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/portfolio";
import { prefersReduced } from "@/lib/motion";

export default function ProjectRail({
  title,
  projects,
  onOpenModal,
}: {
  title: string;
  projects: Project[];
  onOpenModal: (p: Project) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const reduced = prefersReduced();

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
    const cardW = el.querySelector("article")?.clientWidth ?? 300;
    el.scrollBy({ left: dir === "left" ? -(cardW + gap) : cardW + gap, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section className="mb-16">
      {/* Section header */}
      <div className="flex items-end justify-between mb-4 px-2">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-3xl tracking-[0.05em] text-white"
        >
          {title}
        </motion.h2>
        <div className="hidden md:flex gap-2">
          {canScrollLeft && (
            <button onClick={() => scroll("left")} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-ink-400 hover:text-white transition-all"
                    aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollRight && (
            <button onClick={() => scroll("right")} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-ink-400 hover:text-white transition-all"
                    aria-label="Scroll right">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Scroll row */}
      <div ref={containerRef} className="overflow-x-auto hide-scrollbar pb-2">
        <div className="flex gap-6 w-max px-2">
          {projects.map((proj, idx) => (
            <ProjectCard key={proj.id} project={proj} onOpenModal={onOpenModal} index={idx} />
          ))}
        </div>
      </div>

      {/* Gradient fade at edges */}
      <div className="relative mt-[-56px] h-[56px] pointer-events-none bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
    </section>
  );
}