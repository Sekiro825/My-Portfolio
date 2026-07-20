"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PROFILES, ProfileId } from "@/types/profile";
import { X, Check } from "lucide-react";

interface Props {
  activeProfile: ProfileId;
  onSelectProfile: (id: ProfileId) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileSelector({ activeProfile, onSelectProfile, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] flex items-center justify-center bg-[#141414]/95 backdrop-blur-2xl p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
          aria-label="Close profile selector"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="max-w-5xl w-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-semibold text-white tracking-tight mb-2"
          >
            Who&apos;s watching?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-sm md:text-base mb-12"
          >
            Select your persona to customize your Netflix portfolio experience.
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-center">
            {PROFILES.map((profile, index) => {
              const isSelected = activeProfile === profile.id;
              return (
                <motion.button
                  key={profile.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    onSelectProfile(profile.id);
                    onClose();
                  }}
                  className="group flex flex-col items-center focus:outline-none"
                >
                  <div
                    className={`relative w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br ${profile.avatarBg} flex items-center justify-center text-5xl md:text-6xl shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:ring-4 group-hover:ring-white ${
                      isSelected ? "ring-4 ring-red-600 scale-105" : ""
                    }`}
                  >
                    <span>{profile.avatarIcon}</span>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-600 border-2 border-[#141414] flex items-center justify-center text-white">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className="mt-4 text-base md:text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                    {profile.name}
                  </span>
                  <span className="mt-1 text-xs text-white/40 max-w-[140px] text-center leading-tight">
                    {profile.subtitle}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <button
              onClick={onClose}
              className="px-8 py-2.5 border border-white/40 hover:border-white text-white/70 hover:text-white text-sm font-semibold tracking-widest uppercase transition-all hover:bg-white/10"
            >
              Done Managing
            </button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
