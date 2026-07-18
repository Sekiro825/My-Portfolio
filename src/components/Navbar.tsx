"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, FileText, Code, Award, User, Home } from "lucide-react";
import { portfolio } from "@data/portfolio";

const NAV = [
  { id: "home", label: "HOME", icon: Home, href: "#" },
  { id: "projects", label: "PROJECTS", icon: Code, href: "#projects" },
  { id: "skills", label: "STATS", icon: Award, href: "#skills" },
  { id: "about", label: "PROFILE", icon: User, href: "#about" },
  { id: "resume", label: "RESUME", icon: FileText, href: portfolio.bio.resumePath, download: true },
];

const SOCIALS = [
  { icon: Github, href: portfolio.bio.github, label: "GitHub" },
  { icon: Linkedin, href: portfolio.bio.linkedin, label: "LinkedIn" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      let found = "home";
      for (const s of ["projects","skills","about"]) {
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
      a.href = href; a.download = "Saket_Pokale_Resume.pdf"; a.target = "_blank"; a.rel = "noopener";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } else if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setOpen(false);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink-900/85 backdrop-blur-xl border-b border-white/5 shadow-[0_2px_30px_rgba(0,0,0,0.5)]" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 flex h-16 items-center justify-between" aria-label="Main">
        {/* Logo */}
        <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => go("#")}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-crimson to-accent-cyan flex items-center justify-center shadow-[0_0_15px_var(--accent-crimson)]">
            <span className="font-display text-lg text-white font-bold">S</span>
          </div>
          <span className="font-display text-lg tracking-[0.08em] text-white hidden sm:block">SEKIRO825</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => go(item.href, item.download)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-display text-xs tracking-[0.12em] transition-all duration-200 ${
                active === item.id
                  ? "text-white bg-white/5"
                  : "text-ink-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {active === item.id && (
                <motion.span layoutId="nav-underline" className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent-crimson rounded-full" />
              )}
              <item.icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Socials desktop */}
        <div className="hidden md:flex items-center gap-1">
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
               className="p-2 rounded-lg text-ink-400 hover:text-white hover:bg-white/5 transition-colors" aria-label={s.label}>
              <s.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-ink-300"
                aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-ink-900/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV.map(item => (
                <button key={item.id} onClick={() => go(item.href, item.download)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-display text-sm tracking-[0.1em] transition-colors ${
                    active === item.id ? "text-white bg-white/5" : "text-ink-400 hover:text-white hover:bg-white/5"
                  }`}>
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              <div className="flex gap-2 pt-4 mt-2 border-t border-white/5">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                     className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-ink-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-display tracking-[0.1em]">
                    <s.icon className="w-5 h-5" /> {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}