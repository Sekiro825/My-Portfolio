"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";
import Hero3DVisual from "./Hero3DVisual";
import { sound } from "@/lib/sound";

interface Props {
  onOpenModal: (p: Project) => void;
}

export default function PremiumHeroStage({ onOpenModal }: Props) {
  const featured = portfolio.projects.find(p => p.featured) || portfolio.projects[0];

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 pointer-events-none" />

      {/* Subtle light gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-50 to-transparent opacity-60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-50 to-transparent opacity-60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
        
        {/* Left Column: Minimalist Typography */}
        <div className="flex-1 text-center lg:text-left z-20">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full bg-white/40 border border-black/5 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-text uppercase">
              AI Engineer & Architect
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] font-bold text-text tracking-tight leading-[1.05] mb-6"
          >
            Building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan">
              Future of Web
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted font-body font-light mb-10 max-w-2xl leading-relaxed"
          >
            {portfolio.bio.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-5 justify-center lg:justify-start"
          >
            {featured && (
              <button
                onClick={() => {
                  sound.playWhoosh();
                  onOpenModal(featured);
                }}
                onMouseEnter={() => sound.playHover()}
                className="group flex items-center gap-3 px-8 py-4 bg-text text-white font-body font-medium rounded-full text-sm transition-all duration-300 hover:bg-black hover:shadow-xl hover:-translate-y-1"
              >
                <span>View Featured Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}

            <a
              href={portfolio.bio.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2 px-8 py-4 bg-white/50 hover:bg-white text-text font-body font-medium rounded-full text-sm transition-all duration-300 border border-black/5 hover:border-black/10 hover:shadow-lg backdrop-blur-sm hover:-translate-y-1"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: AI Brain WebGL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex justify-center lg:justify-end items-center relative w-full lg:h-[600px] z-10"
        >
          <div className="w-full h-[400px] sm:h-[500px] lg:h-full relative cursor-grab active:cursor-grabbing group">
             {/* The 3D component handles its own canvas */}
             <Hero3DVisual accent="#2979FF" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
