"use client";

import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";
import { portfolio } from "@data/portfolio";
import type { Certificate } from "@/types/portfolio";

export default function AchievementsGrid() {
  return (
    <section id="certificates" className="section-pad">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl tracking-[0.05em] text-white mb-2 text-center"
      >
        ACHIEVEMENTS UNLOCKED
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-ink-400 text-sm text-center mb-12 max-w-md mx-auto"
      >
        Certifications and learning milestones.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {portfolio.certificates.map((cert: Certificate, i: number) => (
          <motion.article
            key={`${cert.title}-${cert.year}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02, borderColor: "var(--accent-gold)" }}
            className="p-5 rounded-xl bg-ink-800/40 border border-white/5 hover:bg-ink-800/60 group transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-accent-gold" />
              </div>
              <span className="px-2 py-0.5 text-xs rounded-full bg-ink-700/50 border border-white/5 text-ink-400 font-mono">
                {cert.year}
              </span>
            </div>

            <h3 className="text-white font-semibold mb-1.5 group-hover:text-accent-gold transition-colors">{cert.title}</h3>
            <p className="text-sm text-ink-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {cert.issuer}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}