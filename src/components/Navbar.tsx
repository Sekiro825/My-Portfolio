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
    { id: "home", label: "01. HOME", icon: Home, href: "#" },
    { id: "projects", label: "02. BUILDS", icon: Code, href: "#projects" },
    { id: "skills", label: "03. SKILLS", icon: Award, href: "#skills" },
    { id: "about", label: "04. DOSSIER", icon: User, href: "#about" },
    { id: "resume", label: "05. RESUME", icon: FileText, href: portfolio.bio.resumePath, download: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#faf6f0]/95 backdrop-blur-xl border-b border-[#e8dfd5] shadow-[0_4px_20px_rgba(44,26,20,0.06)] py-3"
          : "bg-gradient-to-b from-[#faf6f0] via-[#faf6f0]/60 to-transparent py-4"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between" aria-label="Coffee Aesthetic Navigation">
        {/* Left Branding */}
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-3 select-none cursor-pointer group"
            onClick={() => go("#")}
            onMouseEnter={() => sound.playHover()}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d98a5b] via-[#a66e4e] to-[#2c1a14] p-[1.5px] shadow-[0_4px_15px_rgba(217,138,91,0.3)] group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#2c1a14] rounded-[10px] flex items-center justify-center">
                <span className="font-display text-lg font-black text-[#faf6f0] group-hover:text-[#d98a5b] transition-colors">
                  S
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg tracking-[0.18em] text-[#2c1a14] group-hover:text-[#d98a5b] transition-colors">
                  SAKET
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#d98a5b]/15 border border-[#d98a5b]/40 text-[#d98a5b] font-mono font-bold tracking-widest">
                  LVL 99
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#6e584e] uppercase leading-none mt-0.5">
                {"SYSTEM ARCHITECT"}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.href, item.download)}
                onMouseEnter={() => sound.playHover()}
                className={`relative text-xs font-mono tracking-widest transition-colors duration-200 uppercase px-2 py-1 ${
                  active === item.id
                    ? "text-[#d98a5b] font-bold"
                    : "text-[#6e584e] hover:text-[#2c1a14] font-medium"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="coffee-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d98a5b] via-[#a66e4e] to-[#e6a756] rounded-full shadow-[0_0_8px_rgba(217,138,91,0.4)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenSearch();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#f4ebe1] text-[#2c1a14] border border-[#e8dfd5] transition-all text-xs font-mono font-semibold shadow-sm"
            title="Search projects & stack"
          >
            <Search className="w-3.5 h-3.5 text-[#d98a5b]" />
            <span className="hidden sm:inline">SEARCH</span>
          </button>

          {/* My List Bookmark */}
          {onOpenMyList && (
            <button
              onClick={() => {
                sound.playClick();
                onOpenMyList();
              }}
              onMouseEnter={() => sound.playHover()}
              className="relative p-2 rounded-xl bg-white hover:bg-[#f4ebe1] text-[#2c1a14] border border-[#e8dfd5] transition-colors shadow-sm"
              title="My Bookmarked Deck"
            >
              <Bookmark className="w-4 h-4 text-[#a66e4e]" />
              {myListCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#d98a5b] text-white text-[10px] font-mono font-bold flex items-center justify-center shadow-sm">
                  {myListCount}
                </span>
              )}
            </button>
          )}

          {/* Sound Audio Toggle */}
          <button
            onClick={toggleAudioSFX}
            onMouseEnter={() => sound.playHover()}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
              isMuted
                ? "bg-white/50 border-[#e8dfd5] text-[#a66e4e]/50 hover:text-[#2c1a14]"
                : "bg-[#e6a756]/15 border-[#e6a756]/40 text-[#2c1a14] shadow-sm"
            }`}
            title={isMuted ? "Unmute Coffee Audio SFX" : "Mute Coffee Audio SFX"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#d98a5b]" />}
            <span className="hidden md:inline">{isMuted ? "SFX OFF" : "SFX ON"}</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => {
              sound.playClick();
              setOpen(!open);
            }}
            className="lg:hidden p-2 text-[#2c1a14]"
            aria-label="Toggle menu"
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
            className="lg:hidden bg-[#faf6f0] border-t border-[#e8dfd5] px-6 py-4 space-y-3 shadow-lg"
          >
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.href, item.download)}
                className="w-full flex items-center gap-3 py-2 text-xs font-mono tracking-widest text-[#2c1a14] hover:text-[#d98a5b] transition-colors"
              >
                <item.icon className="w-4 h-4 text-[#a66e4e]" />
                <span>{item.label}</span>
              </button>
            ))}
            <div className="flex gap-4 pt-3 border-t border-[#e8dfd5]">
              <a
                href={portfolio.bio.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-[#2c1a14] hover:text-[#d98a5b]"
              >
                <Github className="w-4 h-4" /> GITHUB
              </a>
              <a
                href={portfolio.bio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-[#a66e4e] hover:text-[#2c1a14]"
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