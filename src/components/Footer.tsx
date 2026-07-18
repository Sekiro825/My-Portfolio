import { portfolio } from "@data/portfolio";
import { Github, Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-2">
          <p className="font-display text-lg tracking-[0.08em] text-white">SEKIRO825</p>
          <p className="text-sm text-ink-500">&copy; {year} {portfolio.bio.name} — All rights reserved.</p>
        </div>

        <div className="flex items-center gap-6">
          <p className="flex items-center gap-1.5 text-sm text-ink-500">
            <Heart className="w-4 h-4 text-accent-crimson" /> Crafted with Next.js, Tailwind, Framer Motion
          </p>
          <a href={portfolio.bio.github} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 text-ink-400 hover:text-white transition-colors text-sm">
            <Github className="w-4 h-4" /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}