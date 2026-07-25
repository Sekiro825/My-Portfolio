"use client";

import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";

import { portfolio } from "@data/portfolio";
import type { Certificate } from "@/types/portfolio";
import { sound } from "@/lib/sound";

export default function AchievementsGrid() {
  return (
    <section id="certificates" className="relative py-24 bg-bg">
      <div className="text-center mb-16 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Trophy className="w-4 h-4" /> Certifications & Awards
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text tracking-tight"
        >
          Recognitions
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10 px-4">
        {portfolio.certificates.map((cert: Certificate, i: number) => (
          <motion.article
            key={`${cert.title}-${cert.year}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onMouseEnter={() => sound.playHover()}
            className="glass-panel rounded-3xl p-8 transition-all group cursor-pointer hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center group-hover:bg-accent-blue group-hover:text-white transition-colors duration-300">
                <Award className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-black/5 text-muted font-medium">
                {cert.year}
              </span>
            </div>

            <h3 className="text-text font-display font-semibold text-xl mb-2 group-hover:text-accent-blue transition-colors leading-snug">
              {cert.title}
            </h3>
            <p className="text-sm text-muted font-body font-medium uppercase tracking-wide">
              {cert.issuer}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}