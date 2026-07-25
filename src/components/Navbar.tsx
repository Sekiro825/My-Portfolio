"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, VolumeX, Menu, X, Github, Linkedin, FileText, Code, Award, User, Home, Bookmark } from "lucide-react";

import { portfolio } from "@data/portfolio";
import { sound } from "@/lib/sound";

interface Props {
  onOpenSearch: () => void;
  myListCount: number;
  onOpenMyList?: () => void;
}

export default function Navbar({
  onOpenSearch,
  myListCount,
  onOpenMyList
}: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let found = "home";
      for (const s of ["projects", "skills", "about"]) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 140) found = s;
      }
      setActive(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback((href: string, download?: boolean) => {
    sound.playClick();
    if (download) {
      const a = document.createElement("a");
      a.href = href;
      a.download = "Saket_Pokale_Resume.pdf";
      a.target = "_blank";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false);
  }, []);

  const toggleAudioSFX = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sound.playLevelUp();
    }
  };

  const NAV_ITEMS = [
    { id: "home", label: "01. Home", icon: Home, href: "#" },
    { id: "projects", label: "02. Works", icon: Code, href: "#projects" },
    { id: "skills", label: "03. Skills", icon: Award, href: "#skills" },
    { id: "about", label: "04. About", icon: User, href: "#about" },
    { id: "resume", label: "05. Resume", icon: FileText, href: portfolio.bio.resumePath, download: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-2xl border-b border-black/5 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-3 select-none cursor-pointer group"
            onClick={() => go("#")}
            onMouseEnter={() => sound.playHover()}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-blue to-accent-cyan p-[2px] shadow-sm group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-surface rounded-full flex items-center justify-center">
                <span className="font-display text-lg font-bold text-text group-hover:text-accent-blue transition-colors">
                  S
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-widest text-text group-hover:text-accent-blue transition-colors uppercase">
                  SAKET
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 text-muted font-mono font-medium tracking-wide">
                  INTEL
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase mt-0.5 font-medium">
                AI Architect
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.href, item.download)}
                onMouseEnter={() => sound.playHover()}
                className={`relative text-xs font-mono tracking-wider transition-colors duration-200 uppercase px-3 py-1.5 rounded-full ${
                  active === item.id
                    ? "text-accent-blue font-semibold bg-accent-blue/10"
                    : "text-muted hover:text-text font-medium hover:bg-black/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          
          <button
            onClick={() => {
              sound.playClick();
              onOpenSearch();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface hover:bg-black/5 text-text border border-black/10 transition-all text-xs font-body font-medium shadow-sm hover:shadow"
          >
            <Search className="w-4 h-4 text-muted" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {onOpenMyList && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenMyList();
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative p-2.5 rounded-full bg-surface hover:bg-black/5 text-text border border-black/10 transition-colors shadow-sm hover:shadow"
              title="Saved Works"
            >
              <Bookmark className="w-4 h-4 text-muted" />
              {myListCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-blue text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-md">
                  {myListCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={toggleAudioSFX}
            onMouseEnter={() => sound.playHover()}
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all ${
              isMuted
                ? "bg-surface border-black/10 text-muted hover:text-text hover:bg-black/5"
                : "bg-accent-blue/10 border-accent-blue/20 text-accent-blue shadow-sm"
            }`}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setOpen(!open);
            }}
            className="lg:hidden p-2 text-text"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface/95 backdrop-blur-xl border-t border-black/5 px-6 py-4 space-y-2 shadow-xl"
          >
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.href, item.download)}
                className="w-full flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-mono tracking-wider text-muted hover:text-accent-blue hover:bg-black/5 transition-all uppercase font-medium"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
            <div className="flex gap-4 pt-4 px-4 border-t border-black/5">
              <a
                href={portfolio.bio.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent-blue transition-colors"
              >
                <Github className="w-4 h-4" /> GITHUB
              </a>
              <a
                href={portfolio.bio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent-blue transition-colors"
              >
                <Linkedin className="w-4 h-4" /> LINKEDIN
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}