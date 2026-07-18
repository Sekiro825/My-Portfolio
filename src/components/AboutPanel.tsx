"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Download, User } from "lucide-react";
import { portfolio } from "@data/portfolio";

export default function AboutPanel() {
  const { bio, education } = portfolio;
  const edu = education[0];

  return (
    <section id="about" className="section-pad">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl tracking-[0.05em] text-white mb-2 text-center"
      >
        PLAYER PROFILE
      </motion.h2>

      <div className="max-w-5xl mx-auto mt-12">
        {/* Avatar + name + tagline */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          {/* Placeholder avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-ink-800 border-2 border-accent-crimson/30 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-[0_0_40px_rgba(229,9,20,0.2)]"
          >
            <User className="w-16 h-16 text-ink-500" />
          </motion.div>

          <div className="text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white"
            >
              {bio.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-accent-electric text-lg md:text-xl mt-2"
            >
              {bio.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-1.5 text-ink-400 mt-2 justify-center md:justify-start"
            >
              <MapPin className="w-4 h-4" /> {bio.location}
            </motion.p>
          </div>
        </div>

        {/* Bio paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-4 mb-12"
        >
          {bio.body.map((p, i) => (
            <p key={i} className="text-base md:text-lg text-ink-300 leading-relaxed">{p}</p>
          ))}
        </motion.div>

        {/* Education card */}
        {edu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-6 rounded-2xl bg-ink-800/30 border border-white/5 mb-12"
          >
            <h3 className="font-display text-lg tracking-[0.1em] text-accent-electric uppercase mb-2">Education</h3>
            <p className="text-white font-semibold">{edu.degree}</p>
            <p className="text-ink-400 text-sm mb-1">{edu.institution}</p>
            <p className="text-ink-400 text-sm">
              {edu.startYear} – {edu.endYear} &middot; {edu.score}
            </p>
          </motion.div>
        )}

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <a href={bio.github} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white/80 font-medium transition-all">
            <Github className="w-5 h-5" /> GitHub
          </a>
          <a href={bio.linkedin} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white/80 font-medium transition-all">
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
          <a href={`mailto:${bio.email}`}
             className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white/80 font-medium transition-all">
            <Mail className="w-5 h-5" /> Email
          </a>
          <a href={bio.resumePath} download
             className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-crimson hover:bg-accent-crimson/80 text-white font-medium transition-all">
            <Download className="w-5 h-5" /> Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}