"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Github } from "lucide-react";

import type { Project } from "@/types/portfolio";
import { sound } from "@/lib/sound";

interface Props {
  projects: Project[];
  onOpenModal: (p: Project) => void;
  myList: string[];
  onToggleMyList: (id: string) => void;
}

export default function MissionVaultGrid({
  projects,
  onOpenModal,
  myList = [],
  onToggleMyList,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "AI & Vision", "Full-Stack", "Web Apps", "Mobile"];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return projects;
    return projects.filter(p => p.categories.includes(selectedCategory));
  }, [projects, selectedCategory]);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text tracking-tight mb-2"
            >
              Selected Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted font-body"
            >
              A showcase of my recent architectural achievements.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 p-1.5 rounded-full bg-surface border border-black/5 shadow-sm"
          >
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playWhoosh();
                    setSelectedCategory(cat);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                    active
                      ? "bg-text text-white shadow-md"
                      : "bg-transparent text-muted hover:text-text hover:bg-black/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Works Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((proj, idx) => {
              const inList = myList.includes(proj.id);
              const backdropFrom = proj.backdrop.from || "#FAFAFA";
              const backdropTo = proj.backdrop.to || "#E0E0E0";

              return (
                <motion.article
                  key={proj.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative flex flex-col rounded-3xl overflow-hidden glass-panel cursor-pointer border border-white/50"
                  onClick={() => {
                    sound.playWhoosh();
                    onOpenModal(proj);
                  }}
                  onMouseEnter={() => sound.playHover()}
                >
                  {/* Artwork Banner */}
                  <div
                    className="relative h-60 w-full flex items-center justify-center overflow-hidden bg-surface"
                    style={{
                      background: `linear-gradient(135deg, ${backdropFrom}22, ${backdropTo}44)`,
                    }}
                  >
                    <span className="text-7xl transform transition-transform duration-700 group-hover:scale-110 drop-shadow-sm z-10">
                      {proj.backdrop.emoji || "⚡"}
                    </span>

                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-white/80 text-text font-mono font-semibold text-xs shadow-sm backdrop-blur-md">
                        {proj.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1 justify-between bg-surface/50 space-y-6">
                    <div>
                      <h3 className="font-display font-semibold text-text text-2xl group-hover:text-accent-blue transition-colors duration-200 mb-2">
                        {proj.title}
                      </h3>
                      
                      <p className="text-sm text-accent-blue font-mono mb-3">
                        {proj.tagline}
                      </p>

                      <p className="text-sm text-muted font-body line-clamp-3 leading-relaxed">
                        {proj.synopsis}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-black/5 flex items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2 max-w-[200px]">
                        {proj.tech.slice(0, 3).map(t => (
                          <span
                            key={t}
                            className="px-2.5 py-1 text-xs rounded-full bg-black/5 text-muted font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            sound.playClick();
                            onToggleMyList(proj.id);
                          }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            inList
                              ? "bg-text text-white shadow-md"
                              : "bg-surface text-text border border-black/10 hover:border-black/20"
                          }`}
                          title={inList ? "Saved" : "Save to List"}
                        >
                          {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </button>

                        {proj.repo && (
                          <a
                            href={proj.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => {
                              e.stopPropagation();
                              sound.playClick();
                            }}
                            className="w-10 h-10 rounded-full bg-surface hover:bg-black/5 text-text border border-black/10 transition-all flex items-center justify-center"
                            title="View Source"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
