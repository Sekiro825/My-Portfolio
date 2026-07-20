"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, VolumeX, Menu, X, Github, Linkedin, FileText, Code, Award, User, Home, Bookmark } from "lucide-react";
import { portfolio } from "@data/portfolio";
import { PROFILES, ProfileId } from "@/types/profile";

interface Props {
  activeProfile: ProfileId;
  onOpenProfileSelector: () => void;
  onOpenSearch: () => void;
  myListCount: number;
  onOpenMyList?: () => void;
}

export default function Navbar({
  activeProfile,
  onOpenProfileSelector,
  onOpenSearch,
  myListCount,
  onOpenMyList
}: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [muted, setMuted] = useState(true);

  const currentProfile = PROFILES.find(p => p.id === activeProfile) || PROFILES[0] || {
    id: "explorer",
    name: "1st-Time Visitor",
    subtitle: "",
    avatarBg: "from-amber-500 to-red-600",
    avatarIcon: "🍿",
    accentColor: "#F5C542",
    badge: "POPULAR FEATURED SHOWCASE",
    heroTagline: "",
    primaryCategory: "Trending Builds"
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let found = "home";
      for (const s of ["projects", "skills", "about"]) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 120) found = s;
      }
      setActive(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback((href: string, download?: boolean) => {
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

  const playTudumSound = () => {
    setMuted(!muted);
    if (muted) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } catch {
        // audio context fallback
      }
    }
  };

  const NAV_ITEMS = [
    { id: "home", label: "Home", icon: Home, href: "#" },
    { id: "projects", label: "Movies & Builds", icon: Code, href: "#projects" },
    { id: "skills", label: "Top 10 Stack", icon: Award, href: "#skills" },
    { id: "about", label: "Profile & Bio", icon: User, href: "#about" },
    { id: "resume", label: "Resume", icon: FileText, href: portfolio.bio.resumePath, download: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#141414]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3"
          : "bg-gradient-to-b from-[#141414]/90 via-[#141414]/40 to-transparent py-4"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between" aria-label="Netflix Header">
        {/* Left Branding */}
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2 select-none cursor-pointer group"
            onClick={() => go("#")}
          >
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(229,9,20,0.8)] group-hover:scale-105 transition-transform">
              <span className="font-display text-2xl font-black text-white tracking-tighter">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-black tracking-[0.15em] text-red-600 group-hover:text-red-500 transition-colors leading-none">
                SAKET
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-white/50 uppercase leading-tight mt-0.5">
                ORIGINALS
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.href, item.download)}
                className={`relative text-xs tracking-wider transition-colors duration-200 ${
                  active === item.id
                    ? "text-white font-bold"
                    : "text-white/70 hover:text-white font-medium"
                }`}
              >
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="netflix-nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all text-xs font-medium border border-white/10"
            title="Search projects & tech"
          >
            <Search className="w-4 h-4 text-red-500" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {/* My List Bookmark Count */}
          {onOpenMyList && (
            <button
              onClick={onOpenMyList}
              className="relative p-2 text-white/80 hover:text-white transition-colors"
              title="My Bookmarked List"
            >
              <Bookmark className="w-5 h-5" />
              {myListCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {myListCount}
                </span>
              )}
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={playTudumSound}
            className="p-2 text-white/70 hover:text-white transition-colors"
            title={muted ? "Unmute Audio" : "Mute Audio"}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-red-500" />}
          </button>

          {/* Profile Selector Trigger */}
          <button
            onClick={onOpenProfileSelector}
            className="group flex items-center gap-2 pl-2 focus:outline-none"
            title="Switch Netflix Profile"
          >
            <div
              className={`w-9 h-9 rounded-lg bg-gradient-to-br ${currentProfile.avatarBg} flex items-center justify-center text-lg shadow-md border border-white/20 group-hover:scale-105 group-hover:ring-2 group-hover:ring-white transition-all`}
            >
              <span>{currentProfile.avatarIcon}</span>
            </div>
            <span className="hidden md:inline text-xs font-semibold text-white/90 group-hover:text-white">
              {currentProfile.name.split(" ")[0]}
            </span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white/80"
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
            className="lg:hidden bg-[#141414]/98 border-t border-white/10 px-6 py-4 space-y-2"
          >
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => go(item.href, item.download)}
                className="w-full flex items-center gap-3 py-2.5 text-sm text-white/80 hover:text-white transition-colors"
              >
                <item.icon className="w-4 h-4 text-red-500" />
                <span>{item.label}</span>
              </button>
            ))}
            <div className="flex gap-4 pt-4 border-t border-white/10">
              <a
                href={portfolio.bio.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/70 hover:text-white"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href={portfolio.bio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white/70 hover:text-white"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}