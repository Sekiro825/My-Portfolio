"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@data/portfolio";
import type { Skill, SkillCategory } from "@/types/portfolio";
import { sound } from "@/lib/sound";
import {
  Zap,
  Code,
  Database,
  Sparkles,
  Orbit,
  LayoutGrid,
  Play,
  Pause,
  RotateCw,
  Activity,
} from "lucide-react";

const CATEGORIES: Record<
  SkillCategory,
  { label: string; icon: any; color: string }
> = {
  language: { label: "Core Languages", icon: Code, color: "#2979FF" },
  web: { label: "Frameworks & Systems", icon: Zap, color: "#00E5FF" },
  db: { label: "Databases & Storage", icon: Database, color: "#111111" },
  other: { label: "AI & Tools", icon: Sparkles, color: "#666666" },
};

type ViewMode = "orbits" | "ticker" | "grid";

export default function StatsPanel() {
  const [viewMode, setViewMode] = useState<ViewMode>("orbits");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(portfolio.skills[0] || null);

  const [isOrbitSpinning, setIsOrbitSpinning] = useState<boolean>(true);
  const [orbitSpeedMultiplier, setOrbitSpeedMultiplier] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const orbitalGroups = useMemo(() => {
    const skills = portfolio.skills;
    const inner = skills.filter((s) => s.category === "language");
    const middle = skills.filter((s) => s.category === "web");
    const outer = skills.filter((s) => s.category === "db" || s.category === "other");
    return { inner, middle, outer };
  }, []);

  useEffect(() => {
    const updateAngle = (time: number) => {
      if (lastTimeRef.current !== 0) {
        const delta = (time - lastTimeRef.current) / 1000;
        if (isOrbitSpinning && !hoveredSkill) {
          setRotationAngle((prev) => (prev + delta * 15 * orbitSpeedMultiplier) % 360);
        }
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(updateAngle);
    };

    animFrameRef.current = requestAnimationFrame(updateAngle);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isOrbitSpinning, orbitSpeedMultiplier, hoveredSkill]);

  const handleSelectSkill = (skill: Skill) => {
    setSelectedSkill(skill);
    sound.playClick();
  };

  const activeDisplaySkill = hoveredSkill || selectedSkill;

  return (
    <section id="skills" className="relative py-20 overflow-hidden bg-bg">
      {/* SECTION HEADER & CONTROL BAR */}
      <div className="text-center mb-16 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-xs font-semibold uppercase tracking-widest mb-4"
        >
          <Zap className="w-3.5 h-3.5" /> Technical Expertise
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text tracking-tight"
        >
          Skill Architectures
        </motion.h2>

        {/* VIEW MODE CONTROLS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
          <div className="flex items-center p-1.5 bg-surface border border-black/5 rounded-full shadow-sm">
            <button
              onClick={() => { setViewMode("orbits"); sound.playClick(); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                viewMode === "orbits" ? "bg-text text-white shadow-md" : "text-muted hover:text-text hover:bg-black/5"
              }`}
            >
              <Orbit className="w-4 h-4" /> Orbits
            </button>
            <button
              onClick={() => { setViewMode("ticker"); sound.playClick(); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                viewMode === "ticker" ? "bg-text text-white shadow-md" : "text-muted hover:text-text hover:bg-black/5"
              }`}
            >
              <Activity className="w-4 h-4" /> Ticker
            </button>
            <button
              onClick={() => { setViewMode("grid"); sound.playClick(); }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                viewMode === "grid" ? "bg-text text-white shadow-md" : "text-muted hover:text-text hover:bg-black/5"
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Grid
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* VIEW 1: CIRCULAR REVOLVING ORBITS */}
        {viewMode === "orbits" && (
          <div className="space-y-6">
            <div className="flex justify-end gap-3 px-4">
              <button
                onClick={() => { setIsOrbitSpinning(!isOrbitSpinning); sound.playClick(); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium border border-black/10 bg-surface hover:bg-black/5 transition-all text-text shadow-sm"
              >
                {isOrbitSpinning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isOrbitSpinning ? "Pause" : "Spin"}</span>
              </button>
              <button
                onClick={() => { setOrbitSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0.5 : 1)); sound.playClick(); }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium border border-black/10 bg-surface hover:bg-black/5 transition-all text-text shadow-sm"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Speed: {orbitSpeedMultiplier}x</span>
              </button>
            </div>

            <div className="relative min-h-[600px] flex items-center justify-center rounded-3xl glass-panel overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed border-muted" />
                <div className="absolute w-[400px] h-[400px] sm:w-[460px] sm:h-[460px] rounded-full border border-dashed border-muted" />
                <div className="absolute w-[560px] h-[560px] sm:w-[640px] sm:h-[640px] rounded-full border border-dashed border-muted" />
              </div>

              {/* CORE */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => sound.playLevelUp()}
                className="relative z-30 flex flex-col items-center justify-center w-32 h-32 rounded-full bg-text text-white shadow-xl cursor-pointer p-2 group border-4 border-white"
              >
                <div className="absolute inset-0 rounded-full bg-accent-blue/10 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
                <Sparkles className="w-6 h-6 text-accent-blue mb-1" />
                <span className="font-display font-bold text-sm uppercase tracking-wider">
                  Core
                </span>
              </motion.div>

              <div className="absolute inset-0 flex items-center justify-center">
                {/* Orbit 1 */}
                {orbitalGroups.inner.map((skill, idx) => {
                  const total = orbitalGroups.inner.length;
                  const baseAngle = (360 / total) * idx;
                  const currentAngle = (baseAngle + rotationAngle) % 360;
                  const rad = (currentAngle * Math.PI) / 180;
                  const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 120 : 140;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  const isSelected = activeDisplaySkill?.name === skill.name;
                  const catInfo = CATEGORIES[skill.category];

                  return (
                    <motion.div
                      key={skill.name}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      onMouseEnter={() => { setHoveredSkill(skill); sound.playHover(); }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => handleSelectSkill(skill)}
                      className={`absolute z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-sm ${
                        isSelected ? "bg-text text-white border-text scale-110 z-40" : "bg-white text-text border-black/10 hover:border-accent-blue hover:scale-105"
                      }`}
                    >
                      <catInfo.icon className="w-3.5 h-3.5" style={{ color: isSelected ? "#ffffff" : catInfo.color }} />
                      <span className="whitespace-nowrap">{skill.name}</span>
                    </motion.div>
                  );
                })}

                {/* Orbit 2 */}
                {orbitalGroups.middle.map((skill, idx) => {
                  const total = orbitalGroups.middle.length;
                  const baseAngle = (360 / total) * idx;
                  const currentAngle = (baseAngle - rotationAngle * 0.8) % 360;
                  const rad = (currentAngle * Math.PI) / 180;
                  const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 200 : 230;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  const isSelected = activeDisplaySkill?.name === skill.name;
                  const catInfo = CATEGORIES[skill.category];

                  return (
                    <motion.div
                      key={skill.name}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      onMouseEnter={() => { setHoveredSkill(skill); sound.playHover(); }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => handleSelectSkill(skill)}
                      className={`absolute z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-sm ${
                        isSelected ? "bg-text text-white border-text scale-110 z-40" : "bg-white text-text border-black/10 hover:border-accent-blue hover:scale-105"
                      }`}
                    >
                      <catInfo.icon className="w-3.5 h-3.5" style={{ color: isSelected ? "#ffffff" : catInfo.color }} />
                      <span className="whitespace-nowrap">{skill.name}</span>
                    </motion.div>
                  );
                })}

                {/* Orbit 3 */}
                {orbitalGroups.outer.map((skill, idx) => {
                  const total = orbitalGroups.outer.length;
                  const baseAngle = (360 / total) * idx;
                  const currentAngle = (baseAngle + rotationAngle * 0.6) % 360;
                  const rad = (currentAngle * Math.PI) / 180;
                  const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 280 : 320;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  const isSelected = activeDisplaySkill?.name === skill.name;
                  const catInfo = CATEGORIES[skill.category];

                  return (
                    <motion.div
                      key={skill.name}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      onMouseEnter={() => { setHoveredSkill(skill); sound.playHover(); }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => handleSelectSkill(skill)}
                      className={`absolute z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-sm ${
                        isSelected ? "bg-text text-white border-text scale-110 z-40" : "bg-white text-text border-black/10 hover:border-accent-blue hover:scale-105"
                      }`}
                    >
                      <catInfo.icon className="w-3.5 h-3.5" style={{ color: isSelected ? "#ffffff" : catInfo.color }} />
                      <span className="whitespace-nowrap">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* HUD DISPLAY */}
              <AnimatePresence mode="wait">
                {activeDisplaySkill && (
                  <motion.div
                    key={activeDisplaySkill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-6 left-6 sm:left-auto sm:right-6 z-40 min-w-[260px] p-6 rounded-3xl bg-surface border border-black/5 shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-display font-bold text-lg text-text">
                        {activeDisplaySkill.name}
                      </h4>
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold"
                        style={{
                          backgroundColor: `${CATEGORIES[activeDisplaySkill.category].color}20`,
                          color: CATEGORIES[activeDisplaySkill.category].color,
                        }}
                      >
                        {CATEGORIES[activeDisplaySkill.category].label}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-mono text-muted">
                        <span>Proficiency</span>
                        <span className="font-bold text-text">
                          {activeDisplaySkill.level} / 100
                        </span>
                      </div>

                      <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${activeDisplaySkill.level}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: CATEGORIES[activeDisplaySkill.category].color }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* VIEW 2: MULTI-ROW STICK MARQUEE WALL */}
        {viewMode === "ticker" && (
          <div className="glass-panel p-8 rounded-3xl space-y-8">
            <h3 className="font-display font-bold text-2xl text-text border-b border-black/5 pb-4">
              Skill Overview
            </h3>
            
            {Object.entries(CATEGORIES).map(([catKey, catInfo]) => {
              const skills = portfolio.skills.filter((s) => s.category === catKey);
              if (!skills.length) return null;

              return (
                <div key={catKey} className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-mono font-semibold text-text">
                    <catInfo.icon className="w-4 h-4" style={{ color: catInfo.color }} />
                    <span>{catInfo.label}</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-surface border border-black/5 text-sm font-body font-medium shadow-sm hover:shadow transition-shadow"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catInfo.color }} />
                        <span>{skill.name}</span>
                        <span className="text-xs font-mono text-muted ml-2">{skill.level}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW 3: GRID */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(CATEGORIES).map(([key, { label, icon: IconComponent, color }], catIdx) => {
              const skills = portfolio.skills.filter((s) => s.category === key);
              if (!skills.length) return null;

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.1 }}
                  className="glass-panel rounded-3xl p-8"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-2xl bg-accent-blue/10 text-accent-blue">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-text">
                      {label}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {skills.map((skill: Skill, idx: number) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between text-sm font-body font-medium text-text">
                          <span>{skill.name}</span>
                          <span className="text-muted">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}