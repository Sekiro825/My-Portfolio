"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [promptReady, setPromptReady] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("intro-seen")) {
      setShow(false);
      return;
    }
    if (reducedRef.current) {
      if (typeof sessionStorage !== "undefined") sessionStorage.setItem("intro-seen", "true");
      setTimeout(() => setShow(false), 300);
      return;
    }

    const t1 = setTimeout(() => setLogoVisible(true), 200);
    const t2 = setTimeout(() => setTitleVisible(true), 600);

    const t3 = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(t3);
          setPromptReady(true);
          sound.playLevelUp();
          return 100;
        }
        return p + 2;
      });
    }, 18);

    const dismiss = () => {
      if (promptReady) {
        if (typeof sessionStorage !== "undefined") sessionStorage.setItem("intro-seen", "true");
        sound.playClick();
        setDismissed(true);
      }
    };

    const events = ["keydown", "click", "touchstart"] as const;
    events.forEach(e => window.addEventListener(e, dismiss));
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(t3);
      events.forEach(e => window.removeEventListener(e, dismiss));
    };
  }, [promptReady]);

  useEffect(() => {
    if (dismissed) {
      const t = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(t);
    }
  }, [dismissed]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#faf6f0]"
        role="dialog"
        aria-modal="true"
        aria-label="Loading portfolio"
      >
        <div className="absolute inset-0 pointer-events-none manga-dots opacity-20" />

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Coffee Logo Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: logoVisible ? 0 : 0.2 }}
            className="relative"
          >
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl bg-gradient-to-br from-[#d98a5b] via-[#a66e4e] to-[#2c1a14] p-[2px] shadow-[0_10px_35px_rgba(217,138,91,0.3)]">
              <div className="w-full h-full bg-[#2c1a14] rounded-[22px] flex items-center justify-center flex-col">
                <span className="font-display text-5xl font-black text-[#faf6f0]">S</span>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#d98a5b] mt-1">SAKET</span>
              </div>
            </div>
          </motion.div>

          {/* System Title */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: titleVisible ? 0.2 : 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="font-mono text-xl font-black text-[#2c1a14] tracking-widest">{"SAKET ARCHITECT"}</span>
            </div>
            <p className="text-xs font-mono tracking-[0.25em] text-[#6e584e] uppercase">{"INITIALIZING SYSTEM INTERFACE"}</p>
          </motion.div>

          {/* Coffee Progress Meter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="w-full max-w-sm px-4"
          >
            <div className="flex items-center justify-between gap-3 mb-2 font-mono text-xs">
              <span className="text-[#d98a5b] font-bold tracking-widest">CHARGING CORE...</span>
              <span className="text-[#2c1a14] font-bold">{progress}%</span>
            </div>
            <div className="h-2.5 bg-white rounded-full overflow-hidden border border-[#e8dfd5] p-0.5 shadow-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#d98a5b] via-[#a66e4e] to-[#e6a756] rounded-full"
              />
            </div>
          </motion.div>

          {/* Click / Press Key to Enter */}
          <AnimatePresence mode="wait">
            {promptReady && !dismissed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-2 cursor-pointer mt-2"
                onClick={() => {
                  sound.playClick();
                  setDismissed(true);
                }}
              >
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="font-mono text-xs tracking-[0.25em] text-[#d98a5b] uppercase font-bold"
                >
                  [ CLICK / PRESS ANY KEY TO INITIALIZE ]
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}