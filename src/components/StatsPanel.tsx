"use client";

import { motion } from "framer-motion";
import { portfolio } from "@data/portfolio";
import type { Skill } from "@/types/portfolio";
import { sound } from "@/lib/sound";
import { Zap, Code, Database, Sparkles } from "lucide-react";

const CATEGORIES: Record<string, { label: string; icon: any; color: string; border: string }> = {
  language: { label: "LANGUAGES & CORE", icon: Code, color: "#d98a5b", border: "border-[#d98a5b]/40" },
  web: { label: "FRAMEWORKS & SYSTEMS", icon: Zap, color: "#a66e4e", border: "border-[#a66e4e]/40" },
  db: { label: "DATABASES & STORAGE", icon: Database, color: "#e6a756", border: "border-[#e6a756]/40" },
  other: { label: "AI & INTELLIGENCE MATRIX", icon: Sparkles, color: "#6e584e", border: "border-[#6e584e]/40" },
};

export default function StatsPanel() {
  return (
    <section id="skills" className="section-pad relative py-16">
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-10 manga-dots" />

      <div className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#d98a5b]/15 border border-[#d98a5b]/40 text-[#2c1a14] font-mono text-xs font-bold uppercase tracking-widest mb-3 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5 text-[#d98a5b]" /> SKILL PROFICIENCY MATRIX
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-[#2c1a14]"
        >
          MASTERY & POWER METERS
        </motion.h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 px-4">
        {Object.entries(CATEGORIES).map(([key, { label, icon: IconComponent, color }], catIdx) => {
          const skills = portfolio.skills.filter(s => s.category === key);
          if (!skills.length) return null;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.08 }}
              onMouseEnter={() => sound.playHover()}
              className={`cyber-panel rounded-3xl p-6 md:p-8 border border-[#e8dfd5] bg-white shadow-[0_10px_30px_rgba(74,48,34,0.05)] hover:shadow-[0_15px_35px_rgba(74,48,34,0.1)] transition-all`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-[#faf6f0] border border-[#e8dfd5]" style={{ color }}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-mono text-base font-bold tracking-wider text-[#2c1a14] uppercase">{label}</h3>
              </div>

              <div className="space-y-4">
                {skills.map((skill: Skill, idx: number) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#2c1a14] font-bold">{skill.name}</span>
                      <span className="font-bold text-[#6e584e]">{skill.level} / 100</span>
                    </div>

                    <div className="h-2.5 bg-[#faf6f0] rounded-full overflow-hidden border border-[#e8dfd5] relative p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: catIdx * 0.08 + idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full relative"
                        style={{
                          background: `linear-gradient(90deg, ${color}cc, ${color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}