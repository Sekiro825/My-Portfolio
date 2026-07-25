"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Sparkles } from "lucide-react";

import { portfolio } from "@data/portfolio";
import { sound } from "@/lib/sound";

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.footer
      ref={ref}
      className="relative border-t border-black/5 py-24 px-6 bg-bg text-text"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-10 text-center">
        
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <p className="font-display text-2xl md:text-3xl font-bold tracking-widest text-text uppercase">
            SAKET POKALE <span className="text-muted font-light px-2">|</span> AI ARCHITECT
          </p>
          <p className="text-sm font-body text-muted font-medium">
            &copy; {year} {portfolio.bio.name} &mdash; Engineering the Future.
          </p>
        </motion.div>

        {/* Tech Stack Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted font-medium"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-blue" /> Next.js
          </span>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-blue" /> Tailwind CSS
          </span>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-blue" /> WebGL Fluid
          </span>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <span className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent-blue" /> Framer Motion
          </span>
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href={portfolio.bio.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-surface hover:bg-black/5 text-text border border-black/10 transition-all text-xs font-body font-semibold uppercase tracking-wider shadow-sm hover:shadow"
          >
            <Github className="w-4 h-4 text-accent-blue" />
            <span>View Source on GitHub</span>
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
}