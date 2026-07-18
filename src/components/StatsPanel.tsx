"use client";

import { motion } from "framer-motion";
import { portfolio } from "@data/portfolio";
import { prefersReduced } from "@/lib/motion";
import type { Skill } from "@/types/portfolio";

const CATEGORIES: Record<string, { label: string; icon: string }> = {
  language: { label: "Languages", icon: "</>" },
  web: { label: "Frameworks & Platforms", icon: "⚡" },
  db: { label: "Databases & Storage", icon: "🗄" },
  other: { label: "AI, Tools & Domains", icon: "🧠" },
};

export default function StatsPanel() {
  const reduced = prefersReduced();

  return (
    <section id="skills" className="section-pad">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl tracking-[0.05em] text-white mb-2 text-center"
      >
        TECHNICAL STATS
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-ink-400 text-sm text-center mb-12 max-w-md mx-auto"
      >
        Skills matrix — proficiency levels measured against project experience.
      </motion.p>

      <div className="max-w-3xl mx-auto space-y-12">
        {Object.entries(CATEGORIES).map(([key, { label, icon }], catIdx) => {
          const skills = portfolio.skills.filter(s => s.category === key);
          if (!skills.length) return null;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{icon}</span>
                <h3 className="font-display text-lg tracking-[0.12em] text-accent-electric uppercase">{label}</h3>
              </div>

              <div className="space-y-3">
                {skills.map((skill: Skill, idx: number) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + idx * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-36 md:w-40 text-sm font-mono text-ink-400 text-right">{skill.name}</span>

                    <div className="flex-1 h-5 bg-ink-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: reduced ? 0.01 : 1.0, delay: catIdx * 0.1 + idx * 0.08 }}
                        className={`h-full rounded-full ${
                          skill.level >= 85 ? "bg-gradient-to-r from-accent-crimson to-accent-electric" :
                          skill.level >= 70 ? "bg-gradient-to-r from-accent-electric to-accent-gold" :
                          "bg-gradient-to-r from-accent-gold to-ink-500"
                        }`}
                      />
                    </div>

                    <span className="w-10 text-right font-mono text-sm font-bold"
                          style={{ color: skill.level >= 85 ? "var(--accent-crimson)" : skill.level >= 70 ? "var(--accent-electric)" : "var(--accent-gold)" }}>
                      {skill.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}