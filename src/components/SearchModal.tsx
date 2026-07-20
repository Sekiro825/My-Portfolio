"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Film, Code, Sparkles } from "lucide-react";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectProject }: Props) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTechTags = useMemo(() => {
    const set = new Set<string>();
    portfolio.projects.forEach(p => p.tech.forEach(t => set.add(t)));
    return Array.from(set).slice(0, 10);
  }, []);

  const filteredProjects = useMemo(() => {
    return portfolio.projects.filter(p => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.synopsis.toLowerCase().includes(q) ||
        p.tech.some(t => t.toLowerCase().includes(q)) ||
        p.categories.some(c => c.toLowerCase().includes(q));

      const matchesTag = !selectedTag || p.tech.includes(selectedTag);
      return matchesQuery && matchesTag;
    });
  }, [query, selectedTag]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[160] flex flex-col bg-[#141414]/98 backdrop-blur-3xl overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-16 py-6 bg-[#141414]/90 border-b border-white/10">
          <div className="flex items-center gap-4 flex-1 max-w-3xl">
            <Search className="w-6 h-6 text-red-600 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search projects, technologies, or keywords (e.g. Python, RAG, React)..."
              autoFocus
              className="w-full bg-transparent text-xl md:text-2xl text-white placeholder:text-white/40 focus:outline-none font-display"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors ml-4"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="max-w-7xl w-full mx-auto px-6 md:px-16 py-10">
          {/* Quick Tag Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs uppercase tracking-widest text-white/50 mr-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-red-500" /> Popular Tags:
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                selectedTag === null
                  ? "bg-red-600 text-white font-semibold"
                  : "bg-white/5 hover:bg-white/15 text-white/70"
              }`}
            >
              All
            </button>
            {allTechTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  selectedTag === tag
                    ? "bg-red-600 text-white font-semibold"
                    : "bg-white/5 hover:bg-white/15 text-white/70"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Heading */}
          <h2 className="text-xl font-semibold text-white/90 mb-6 flex items-center gap-2">
            <Film className="w-5 h-5 text-red-600" />
            {query || selectedTag ? `Search Results (${filteredProjects.length})` : "Explore All Titles"}
          </h2>

          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center text-white/50">
              <Code className="w-12 h-12 mx-auto mb-4 text-white/20" />
              <p className="text-lg">No matching projects found for &quot;{query}&quot;</p>
              <p className="text-sm mt-1">Try searching for Python, React, Supabase, or Cybersecurity.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProjects.map(p => (
                <motion.div
                  key={p.id}
                  layout
                  onClick={() => {
                    onSelectProject(p);
                    onClose();
                  }}
                  className="group cursor-pointer rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(229,9,20,0.3)]"
                >
                  <div
                    className="h-40 relative flex items-center justify-center text-5xl"
                    style={{
                      background: p.backdrop.kind === "circuit"
                        ? `linear-gradient(135deg, ${p.backdrop.from}, ${p.backdrop.to})`
                        : `linear-gradient(135deg, ${p.backdrop.from}, ${p.backdrop.via || p.backdrop.to})`
                    }}
                  >
                    <span>{p.backdrop.emoji || "⚡"}</span>
                    {p.matchScore && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-500/90 text-white text-[10px] font-bold tracking-wide">
                        {p.matchScore}% Match
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-white text-lg group-hover:text-red-500 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 mt-1 font-light">
                      {p.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tech.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-0.5 text-[10px] rounded bg-white/10 text-white/80 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
