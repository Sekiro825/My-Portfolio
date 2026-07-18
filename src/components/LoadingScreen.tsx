"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [promptReady, setPromptReady] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("intro-seen")) { setShow(false); return; }
    if (reducedRef.current) {
      if (typeof sessionStorage !== "undefined") sessionStorage.setItem("intro-seen", "true");
      setTimeout(() => setShow(false), 400);
      return;
    }
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setPromptReady(true); return 100; }
        return p + 1;
      });
    }, 25);
    const dismiss = () => { if (promptReady) { if (typeof sessionStorage !== "undefined") sessionStorage.setItem("intro-seen", "true"); setDismissed(true); } };
    const events = ["keydown", "click", "touchstart"] as const;
    events.forEach(e => window.addEventListener(e, dismiss));
    return () => { clearInterval(t); events.forEach(e => window.removeEventListener(e, dismiss)); };
  }, [promptReady]);

  // Exit animation starts AFTER dismiss animation finishes
  useEffect(() => {
    if (dismissed) { const t = setTimeout(() => setShow(false), 500); return () => clearTimeout(t); }
  }, [dismissed]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-900"
        role="dialog" aria-modal="true" aria-label="Loading portfolio"
      >
        {/* Animated "S" logo */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          className="mb-10"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-ink-800 border-2 border-accent-crimson flex items-center justify-center
                         shadow-[0_0_60px_rgba(229,9,20,0.4),0_0_120px_rgba(229,9,20,0.15)]">
            <span className="text-7xl md:text-9xl font-display font-bold text-accent-crimson text-glow select-none">S</span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider text-white text-glow"
        >
          SAKET POKALE
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-4 font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-accent-electric"
        >
          GenAI &bull; Cybersecurity &bull; Full-Stack
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-64 md:w-80 mt-12"
        >
          <div className="h-1 bg-ink-700 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <motion.div
              className="h-full bg-gradient-to-r from-accent-crimson to-accent-electric rounded-full shadow-[0_0_20px_var(--accent-crimson)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
        </motion.div>

        {/* Prompt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: promptReady ? 1 : 0 }}
          className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-ink-500 pointer-events-none select-none"
          style={{ animation: promptReady ? "blink 1.4s ease-in-out infinite" : "none" }}
        >
          PRESS ANY KEY TO ENTER
        </motion.p>

        <style jsx>{`
          @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
}