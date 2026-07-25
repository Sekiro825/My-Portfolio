"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Download, Volume2, Shield, Cpu, Github, Linkedin } from "lucide-react";

import { portfolio } from "@data/portfolio";
import { useState, useEffect, useRef } from "react";
import { sound } from "@/lib/sound";

export default function AboutPanel() {
  const { bio, education } = portfolio;
  const edu = education[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformBars, setWaveformBars] = useState(() => Array.from({ length: 32 }, () => Math.random() * 0.4 + 0.1));
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const animate = () => {
      setWaveformBars(prev => prev.map(() => Math.random() * 0.8 + 0.15));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    sound.playWhoosh();
    setIsPlaying(!isPlaying);
  };

  const bioSummary = bio.summary || (bio.body ? bio.body[0] : "");
  const bioExtended = bio.extendedSummary || (bio.body ? bio.body.slice(1).join(" ") : "");
  const cgpaValue = edu?.cgpa || edu?.score || "N/A";

  return (
    <section id="about" className="relative overflow-hidden py-24 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent-blue/10 text-accent-blue font-mono text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Cpu className="w-4 h-4" /> About The Architect
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text"
          >
            Engineering Intelligence
          </motion.h2>
        </div>

        {/* Profile Card */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl mb-12 relative overflow-hidden transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center gap-10">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onMouseEnter={() => sound.playHover()}
              className="relative w-44 h-44 md:w-52 md:h-52 rounded-full p-1 flex items-center justify-center flex-shrink-0 group cursor-pointer bg-gradient-to-tr from-accent-blue to-accent-cyan shadow-xl"
            >
              <img
                src="/My-Portfolio/Saket_Pokale.png"
                alt="Saket Pokale"
                className="w-full h-full object-cover object-top rounded-full border-4 border-white group-hover:scale-[1.02] transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.includes("saket_avatar_stylized.png")) {
                    target.onerror = null;
                  } else {
                    target.src = "/My-Portfolio/saket_avatar_stylized.png";
                  }
                }}
              />
            </motion.div>

            <div className="text-center md:text-left flex-1">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-5xl font-bold text-text mb-2"
              >
                {bio.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-accent-blue text-lg font-mono font-medium mb-3"
              >
                {bio.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center md:justify-start gap-2 text-muted font-body text-sm mb-8"
              >
                <MapPin className="w-4 h-4" /> {bio.location}
              </motion.p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href={bio.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-text text-white font-body font-medium text-sm transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </a>
                <a
                  href={`mailto:${bio.email}`}
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-black/5 text-text hover:border-black/10 font-body font-medium text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  <Mail className="w-4 h-4" /> Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8 text-muted text-base leading-relaxed font-body">
            <div className="glass-panel p-8 rounded-3xl">
              <h3 className="font-mono text-sm font-semibold text-accent-blue uppercase mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Background
              </h3>
              <p className="mb-4">{bioSummary}</p>
              {bioExtended && <p>{bioExtended}</p>}
            </div>

            {edu && (
              <div className="glass-panel p-8 rounded-3xl">
                <h3 className="font-mono text-sm font-semibold text-accent-blue uppercase mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Education
                </h3>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-text text-lg">{edu.degree}</h4>
                    <p className="text-muted font-mono text-sm">{edu.institution}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue font-mono font-medium text-xs">
                    Score: {cgpaValue}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="glass-panel p-8 rounded-3xl text-center">
              <h3 className="font-mono text-xs font-semibold text-accent-blue uppercase mb-6 flex items-center justify-center gap-2">
                <Volume2 className="w-4 h-4" /> Ambient Sound
              </h3>
              
              <div className="h-16 flex items-end justify-center gap-1 my-6 px-4">
                {waveformBars.map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1.5 rounded-full bg-accent-blue transition-all duration-150"
                    style={{ height: `${h * 100}%`, opacity: isPlaying ? 1 : 0.2 }}
                  />
                ))}
              </div>

              <button
                onClick={togglePlay}
                onMouseEnter={() => sound.playHover()}
                className={`w-full py-3 rounded-full font-body font-medium text-sm transition-all shadow-sm ${
                  isPlaying
                    ? "bg-accent-blue text-white"
                    : "bg-surface text-text border border-black/5 hover:border-black/10"
                }`}
              >
                {isPlaying ? "Pause Ambient" : "Play Ambient"}
              </button>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <h3 className="font-mono text-xs font-semibold text-accent-blue uppercase mb-4 pl-2">
                Connect
              </h3>
              <a
                href={bio.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center justify-between p-4 rounded-2xl bg-surface hover:bg-black/5 border border-transparent text-text text-sm font-body transition-all"
              >
                <span className="flex items-center gap-3"><Github className="w-5 h-5 text-accent-blue" /> GitHub</span>
                <span className="text-accent-blue">→</span>
              </a>
              <a
                href={bio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center justify-between p-4 rounded-2xl bg-surface hover:bg-black/5 border border-transparent text-text text-sm font-body transition-all"
              >
                <span className="flex items-center gap-3"><Linkedin className="w-5 h-5 text-accent-blue" /> LinkedIn</span>
                <span className="text-accent-blue">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}