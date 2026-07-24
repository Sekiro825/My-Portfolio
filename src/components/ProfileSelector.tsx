"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { PROFILES, ProfileId } from "@/types/profile";

interface Props {
  activeProfile: ProfileId;
  onSelectProfile: (id: ProfileId) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileSelector({
  activeProfile,
  onSelectProfile,
  isOpen,
  onClose
}: Props) {
  if (!isOpen) return null;

  const profiles = PROFILES.map(p => ({
    ...p,
    gradient: p.id === "employer" ? "from-red-600 via-red-700 to-red-900"
      : p.id === "explorer" ? "from-amber-500 via-orange-500 to-red-600"
      : p.id === "techlead" ? "from-blue-500 via-cyan-500 to-blue-700"
      : "from-purple-500 via-violet-500 to-purple-700",
    spotlight: p.id === "employer" ? "radial-gradient(ellipse at center, rgba(229,9,20,0.28) 0%, transparent 70%)"
      : p.id === "explorer" ? "radial-gradient(ellipse at center, rgba(245,197,66,0.28) 0%, transparent 70%)"
      : p.id === "techlead" ? "radial-gradient(ellipse at center, rgba(0,179,255,0.28) 0%, transparent 70%)"
      : "radial-gradient(ellipse at center, rgba(168,85,247,0.28) 0%, transparent 70%)"
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-ink-900"
        role="dialog"
        aria-modal="true"
        aria-label="Select Netflix profile"
      >
        {/* Scanlines overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-15" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 3px)'
        }} />

        {/* Background spotlights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {profiles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.55 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{
                top: '50%',
                left: `${12 + i * 23}%`,
                transform: 'translate(-50%, -50%)',
                width: '360px',
                height: '360px',
                background: p.spotlight,
                borderRadius: '9999px',
                filter: 'blur(140px)'
              }}
            />
          ))}
        </div>

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-900/85 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl px-6 py-12">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black text-center text-white mb-3 tracking-tight"
            style={{ textShadow: '0 0 40px rgba(229,9,20,0.6), 0 0 80px rgba(229,9,20,0.3)' }}
          >
            Who&rsquo;s Watching?
          </motion.h1>

          {/* Profile Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-8 md:gap-10"
          >
            {profiles.map((profile, i) => (
              <motion.button
                key={profile.id}
                onClick={() => {
                  onSelectProfile(profile.id);
                  onClose();
                }}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.025, y: -6 }}
                whileTap={{ scale: 0.97 }}
                className={`relative group w-52 h-64 md:w-56 md:h-68 flex-shrink-0 rounded-2xl overflow-hidden flex flex-col items-center justify-between p-6 text-center transition-all duration-300 ${
                  activeProfile === profile.id
                    ? "ring-4 ring-red-600 shadow-[0_0_0_4px_rgba(229,9,20,1),_0_0_30px_rgba(229,9,20,0.5)]"
                    : "ring-2 ring-white/5 hover:ring-white/15"
                }`}
                style={{ background: profile.gradient }}
              >
                {/* Hover shine */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: [0, 4, -4, 4, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-5xl md:text-6xl filter drop-shadow-[0_10px_28px_rgba(0,0,0,0.6)]"
                >
                  <span>{profile.avatarIcon}</span>
                </motion.div>

                {/* Name & Badge */}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <motion.span className="font-display text-xl md:text-2xl font-black text-white">
                    {profile.name}
                  </motion.span>
                  <span className="text-[10px] font-mono tracking-[0.15em] text-white/70 uppercase">
                    {profile.badge}
                  </span>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.07 }}
                  className="text-xs text-white/60 px-3 leading-relaxed"
                >
                  {profile.subtitle}
                </motion.p>

                {/* Selection indicator */}
                <AnimatePresence>
                  {activeProfile === profile.id && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-red-500 font-bold text-[10px]"
                    >
                      <Check className="w-4 h-4" />
                      <span className="font-mono tracking-wider">Active Profile</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </motion.div>

          {/* Manage Profiles */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ textDecoration: 'underline' }}
            className="mt-10 text-sm font-mono tracking-[0.15em] text-white/40 hover:text-white/70 transition-colors"
          >
            Manage Profiles
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}