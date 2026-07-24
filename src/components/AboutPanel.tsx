"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Download, Volume2, Shield, Cpu, Terminal, Github, Linkedin } from "lucide-react";
import { portfolio } from "@data/portfolio";
import { useState, useEffect, useRef } from "react";
import { sound } from "@/lib/sound";

export default function AboutPanel() {
  const { bio, education } = portfolio;
  const edu = education[0];

  // Coffee Waveform state
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformBars, setWaveformBars] = useState(() => Array.from({ length: 32 }, () => Math.random() * 0.3 + 0.1));
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const animate = () => {
      setWaveformBars(prev => prev.map(() => Math.random() * 0.7 + 0.15));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    sound.playClick();
    setIsPlaying(!isPlaying);
  };

  const bioSummary = bio.summary || (bio.body ? bio.body[0] : "");
  const bioExtended = bio.extendedSummary || (bio.body ? bio.body.slice(1).join(" ") : "");
  const cgpaValue = edu?.cgpa || edu?.score || "N/A";

  return (
    <section id="about" className="section-pad relative overflow-hidden py-16">
      {/* Background Dots */}
      <div className="absolute inset-0 pointer-events-none opacity-10 manga-dots" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#d98a5b]/15 border border-[#d98a5b]/40 text-[#2c1a14] font-mono text-xs font-bold uppercase tracking-widest mb-3 shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-[#d98a5b]" /> DOSSIER FILE #825
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#2c1a14]"
          >
            {"CHARACTER DOSSIER // SAKET POKALE"}
          </motion.h2>
        </div>

        {/* Profile Card Header */}
        <div className="cyber-panel p-8 md:p-12 rounded-3xl border border-[#e8dfd5] shadow-[0_10px_35px_rgba(74,48,34,0.06)] mb-12 relative bg-white">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Avatar Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onMouseEnter={() => sound.playHover()}
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-[#f4ebe1] border-2 border-[#d98a5b] p-1 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md group cursor-pointer"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || "/My-Portfolio"}/saket_avatar_stylized.png`}
                alt="Saket Pokale Avatar"
                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute("src", `${process.env.NEXT_PUBLIC_BASE_PATH || "/My-Portfolio"}/Saket_Pokale.png`);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1a14]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                <span className="text-[10px] font-mono tracking-widest text-[#faf6f0] font-bold">LVL 99 ARCHITECT</span>
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#d98a5b]/15 border border-[#d98a5b]/40 text-[#2c1a14] font-mono font-bold text-xs">
                  CLASS: FULL-STACK ALCHEMIST
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-[#e6a756]/20 border border-[#e6a756]/40 text-[#2c1a14] font-mono font-bold text-xs">
                  RANK: S-CLASS
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-5xl font-black text-[#2c1a14] mb-2"
              >
                {bio.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#d98a5b] text-lg font-mono font-medium mb-3"
              >
                {bio.tagline}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center md:justify-start gap-2 text-[#6e584e] font-mono text-sm mb-6"
              >
                <MapPin className="w-4 h-4 text-[#a66e4e]" /> {bio.location}
              </motion.p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href={bio.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2c1a14] hover:bg-[#3d261d] text-[#faf6f0] font-mono font-bold text-xs transition-all duration-300 shadow-md"
                >
                  <Download className="w-4 h-4" /> RESUME DECK [PDF]
                </a>
                <a
                  href={`mailto:${bio.email}`}
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#e8dfd5] text-[#2c1a14] hover:bg-[#f4ebe1] font-mono font-bold text-xs transition-all shadow-sm"
                >
                  <Mail className="w-4 h-4 text-[#d98a5b]" /> TRANSMIT SIGNAL
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Narrative & Audio Synthesizer Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bio Text */}
          <div className="lg:col-span-2 space-y-6 text-[#6e584e] text-base leading-relaxed font-sans">
            <div className="cyber-panel p-6 rounded-2xl border border-[#e8dfd5] bg-white">
              <h3 className="font-mono text-sm font-bold text-[#2c1a14] tracking-widest uppercase mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#d98a5b]" /> BACKGROUND NARRATIVE
              </h3>
              <p className="mb-4">{bioSummary}</p>
              {bioExtended && <p>{bioExtended}</p>}
            </div>

            {/* Education Record */}
            {edu && (
              <div className="cyber-panel p-6 rounded-2xl border border-[#e8dfd5] bg-white">
                <h3 className="font-mono text-sm font-bold text-[#a66e4e] tracking-widest uppercase mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#a66e4e]" /> ACADEMIC MASTERY RECORD
                </h3>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#2c1a14] text-lg">{edu.degree}</h4>
                    <p className="text-[#d98a5b] font-mono text-sm">{edu.institution}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#e6a756]/20 text-[#2c1a14] font-mono font-bold text-xs border border-[#e6a756]/40">
                    SCORE: {cgpaValue}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Audio Waveform Widget */}
          <div className="space-y-6">
            <div className="cyber-panel p-6 rounded-2xl border border-[#e8dfd5] text-center bg-white">
              <h3 className="font-mono text-xs font-bold text-[#2c1a14] tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
                <Volume2 className="w-4 h-4 text-[#d98a5b]" /> AMBIENT AUDIO SYNTHESIZER
              </h3>
              
              {/* Waveform Bar Graphic */}
              <div className="h-16 flex items-end justify-center gap-1 my-4 px-4 bg-[#faf6f0] rounded-xl p-2 border border-[#e8dfd5]">
                {waveformBars.map((h, idx) => (
                  <div
                    key={idx}
                    className="w-1.5 rounded-full bg-gradient-to-t from-[#d98a5b] to-[#a66e4e] transition-all duration-150"
                    style={{ height: `${h * 100}%` }}
                  />
                ))}
              </div>

              <button
                onClick={togglePlay}
                onMouseEnter={() => sound.playHover()}
                className={`w-full py-2.5 rounded-xl font-mono font-bold text-xs transition-all ${
                  isPlaying
                    ? "bg-[#2c1a14] text-white shadow-md"
                    : "bg-[#d98a5b]/15 text-[#2c1a14] border border-[#d98a5b]/40 hover:bg-[#d98a5b]/25"
                }`}
              >
                {isPlaying ? "HALT AUDIO WAVEFORM" : "INITIALIZE AUDIO WAVEFORM"}
              </button>
            </div>

            {/* Direct Channels */}
            <div className="cyber-panel p-6 rounded-2xl border border-[#e8dfd5] space-y-3 bg-white">
              <h3 className="font-mono text-xs font-bold text-[#2c1a14] tracking-widest uppercase mb-2">
                DIRECT COMM CHANNELS
              </h3>
              <a
                href={bio.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center justify-between p-3 rounded-xl bg-[#faf6f0] hover:bg-[#f4ebe1] border border-[#e8dfd5] text-[#2c1a14] text-xs font-mono transition-all"
              >
                <span className="flex items-center gap-2"><Github className="w-4 h-4 text-[#d98a5b]" /> GITHUB MATRIX</span>
                <span className="text-[#d98a5b]">→</span>
              </a>
              <a
                href={bio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center justify-between p-3 rounded-xl bg-[#faf6f0] hover:bg-[#f4ebe1] border border-[#e8dfd5] text-[#2c1a14] text-xs font-mono transition-all"
              >
                <span className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-[#a66e4e]" /> LINKEDIN NETWORK</span>
                <span className="text-[#a66e4e]">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}