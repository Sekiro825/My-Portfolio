"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Sparkles } from "lucide-react";
import { portfolio } from "@data/portfolio";
import type { Certificate } from "@/types/portfolio";
import { sound } from "@/lib/sound";

export default function AchievementsGrid() {
  return (
    <section id="certificates" className="section-pad relative py-16">
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-10 manga-dots" />

      <div className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#e6a756]/15 border border-[#e6a756]/40 text-[#2c1a14] font-mono text-xs font-bold uppercase tracking-widest mb-3 shadow-sm"
        >
          <Trophy className="w-3.5 h-3.5 text-[#d98a5b]" /> QUEST MILESTONES
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#2c1a14]"
        >
          UNLOCKED TROPHIES & BADGES
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10 px-4">
        {portfolio.certificates.map((cert: Certificate, i: number) => (
          <motion.article
            key={`${cert.title}-${cert.year}`}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            onMouseEnter={() => sound.playHover()}
            className="cyber-panel rounded-3xl p-6 border border-[#e8dfd5] bg-white hover:border-[#d98a5b] shadow-[0_8px_25px_rgba(74,48,34,0.05)] hover:shadow-[0_12px_30px_rgba(217,138,91,0.15)] transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d98a5b] via-[#a66e4e] to-[#2c1a14] p-[1.5px] shadow-sm group-hover:scale-110 transition-transform">
                <div className="w-full h-full bg-[#faf6f0] rounded-[14px] flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#d98a5b]" />
                </div>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#faf6f0] border border-[#e8dfd5] text-[#2c1a14] font-bold">
                {cert.year}
              </span>
            </div>

            <h3 className="text-[#2c1a14] font-display font-bold text-lg mb-1.5 group-hover:text-[#d98a5b] transition-colors">
              {cert.title}
            </h3>
            <p className="text-xs font-mono text-[#6e584e] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d98a5b]" />
              {cert.issuer}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}