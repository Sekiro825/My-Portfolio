"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Code, Sparkles, Terminal } from "lucide-react";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";
import { sound } from "@/lib/sound";

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
        className="fixed inset-0 z-[160] flex flex-col bg-bg/90 backdrop-blur-xl overflow-y-auto"
      >
        {/* Header Search Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-16 py-6 bg-surface/90 border-b border-black/5 shadow-sm backdrop-blur-lg">
          <div className="flex items-center gap-4 flex-1 max-w-3xl">
            <Search className="w-6 h-6 text-accent-blue flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search projects, skills, or keywords..."
              autoFocus
              className="w-full bg-transparent text-xl md:text-2xl text-text placeholder:text-muted focus:outline-none font-body font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-muted hover:text-text transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            onMouseEnter={() => sound.playHover()}
            className="p-3 rounded-full bg-white hover:bg-black/5 text-text border border-black/10 transition-all ml-4 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-w-7xl w-full mx-auto px-6 md:px-16 py-12">
          {/* Quick Tag Chips */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-sm font-mono font-medium text-muted mr-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent-blue" /> Filter by tech:
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedTag(null);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 text-xs font-mono rounded-full transition-all font-semibold ${
                selectedTag === null
                  ? "bg-text text-white shadow-md"
                  : "bg-surface text-muted border border-black/10 hover:border-black/20 hover:text-text"
              }`}
            >
              All
            </button>
            {allTechTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  sound.playClick();
                  setSelectedTag(selectedTag === tag ? null : tag);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-4 py-2 text-xs font-mono rounded-full transition-all font-semibold ${
                  selectedTag === tag
                    ? "bg-accent-blue text-white shadow-md"
                    : "bg-surface text-muted border border-black/10 hover:border-black/20 hover:text-text"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Heading */}
          <h2 className="text-xl font-display font-semibold text-text mb-8 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-accent-blue" />
            {query || selectedTag ? `Search Results (${filteredProjects.length})` : "Explore All Works"}
          </h2>

          {filteredProjects.length === 0 ? (
            <div className="py-24 text-center text-muted font-body">
              <Code className="w-12 h-12 mx-auto mb-4 text-accent-blue opacity-50" />
              <p className="text-lg">No matching projects found for &quot;{query}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProjects.map(p => {
                const backdropFrom = p.backdrop.from || "#FAFAFA";
                const backdropTo = p.backdrop.to || "#E0E0E0";
                
                return (
                  <motion.div
                    key={p.id}
                    layout
                    onClick={() => {
                      sound.playClick();
                      onSelectProject(p);
                      onClose();
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="group cursor-pointer rounded-3xl bg-surface border border-black/5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 glass-panel"
                  >
                    <div
                      className="h-40 relative flex items-center justify-center text-6xl"
                      style={{
                        background: `linear-gradient(135deg, ${backdropFrom}33, ${backdropTo}33)`,
                      }}
                    >
                      <span className="transform transition-transform duration-500 group-hover:scale-110 drop-shadow-sm">
                        {p.backdrop.emoji || "⚡"}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-semibold text-text text-lg group-hover:text-accent-blue transition-colors leading-tight mb-2">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted line-clamp-2 font-body mb-4">
                        {p.tagline}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.tech.slice(0, 3).map(t => (
                          <span key={t} className="px-2.5 py-1 text-[10px] rounded-full bg-black/5 text-muted font-mono font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
