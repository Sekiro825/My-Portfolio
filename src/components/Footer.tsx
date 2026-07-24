"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Heart } from "lucide-react";
import { portfolio } from "@data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.footer
      ref={ref}
      className="relative border-t border-[#e8dfd5] py-16 px-6 bg-[#faf6f0]"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8 text-center">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <p className="font-display text-xl md:text-2xl font-black tracking-[0.12em] text-[#2c1a14]">
            SAKET ORIGINALS
          </p>
          <p className="text-sm font-mono text-[#6e584e]">
            &copy; {year} {portfolio.bio.name} &mdash; All rights reserved.
          </p>
        </motion.div>

        {/* Tech Stack Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 text-sm font-mono text-[#6e584e]"
        >
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#d98a5b]" aria-hidden="true" />
            Next.js 14
          </span>
          <span className="w-px h-4 bg-[#e8dfd5]" />
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#d98a5b]" aria-hidden="true" />
            Tailwind CSS
          </span>
          <span className="w-px h-4 bg-[#e8dfd5]" />
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#d98a5b]" aria-hidden="true" />
            Framer Motion
          </span>
          <span className="w-px h-4 bg-[#e8dfd5]" />
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#d98a5b]" aria-hidden="true" />
            Three.js
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
            className="flex items-center gap-2 text-[#2c1a14] hover:text-[#d98a5b] transition-colors text-sm font-mono font-bold"
          >
            <Github className="w-4 h-4" />
            <span>VIEW ON GITHUB MATRIX</span>
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
}