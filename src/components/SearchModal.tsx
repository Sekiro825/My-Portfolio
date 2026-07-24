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
        className="fixed inset-0 z-[160] flex flex-col bg-[#faf6f0]/98 backdrop-blur-3xl overflow-y-auto"
      >
        {/* Header Search Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-16 py-6 bg-[#faf6f0] border-b border-[#e8dfd5] shadow-sm">
          <div className="flex items-center gap-4 flex-1 max-w-3xl">
            <Search className="w-6 h-6 text-[#d98a5b] flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="SEARCH PROJECT MATRIX / TECH STACK..."
              autoFocus
              className="w-full bg-transparent text-xl md:text-2xl text-[#2c1a14] placeholder:text-[#6e584e]/40 focus:outline-none font-mono tracking-wider"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-[#6e584e] hover:text-[#2c1a14] transition-colors"
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
            className="p-2.5 rounded-xl bg-white hover:bg-[#2c1a14] text-[#2c1a14] hover:text-white border border-[#e8dfd5] transition-all ml-4 shadow-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="max-w-7xl w-full mx-auto px-6 md:px-16 py-10">
          {/* Quick Tag Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-mono tracking-widest text-[#2c1a14] mr-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#d98a5b]" /> QUICK FILTER:
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedTag(null);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                selectedTag === null
                  ? "bg-[#2c1a14] text-[#faf6f0] font-bold shadow-sm"
                  : "bg-white hover:bg-[#f4ebe1] text-[#2c1a14] border border-[#e8dfd5]"
              }`}
            >
              ALL
            </button>
            {allTechTags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  sound.playClick();
                  setSelectedTag(selectedTag === tag ? null : tag);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  selectedTag === tag
                    ? "bg-[#d98a5b] text-white font-bold shadow-sm"
                    : "bg-white hover:bg-[#f4ebe1] text-[#2c1a14] border border-[#e8dfd5]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Heading */}
          <h2 className="text-lg font-mono font-bold text-[#2c1a14] mb-6 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#d98a5b]" />
            {query || selectedTag ? `QUERY MATCHES (${filteredProjects.length})` : "EXPLORE ALL DATABASE BUILDS"}
          </h2>

          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center text-[#6e584e] font-mono">
              <Code className="w-12 h-12 mx-auto mb-4 text-[#d98a5b]" />
              <p className="text-lg text-[#2c1a14]">No tactical records found for &quot;{query}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProjects.map(p => (
                <motion.div
                  key={p.id}
                  layout
                  onClick={() => {
                    sound.playClick();
                    onSelectProject(p);
                    onClose();
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className="group cursor-pointer rounded-2xl bg-white border border-[#e8dfd5] overflow-hidden transition-all duration-300 hover:scale-105 hover:border-[#d98a5b] shadow-sm hover:shadow-md"
                >
                  <div
                    className="h-36 relative flex items-center justify-center text-5xl"
                    style={{
                      background: `linear-gradient(135deg, #f4ebe1, #ebdcd0)`
                    }}
                  >
                    <span>{p.backdrop.emoji || "⚡"}</span>
                    {p.matchScore && (
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#2c1a14] text-white font-mono font-bold text-[10px]">
                        {p.matchScore}% POWER
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-[#2c1a14] text-base group-hover:text-[#d98a5b] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#6e584e] line-clamp-2 mt-1 font-sans">
                      {p.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tech.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-[#faf6f0] text-[#6e584e] font-mono border border-[#e8dfd5]">
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
