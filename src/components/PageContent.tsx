"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";

import PremiumHeroStage from "./PremiumHeroStage";
import MissionVaultGrid from "./MissionVaultGrid";
import SearchModal from "./SearchModal";
import StatsPanel from "./StatsPanel";
import AchievementsGrid from "./AchievementsGrid";
import AboutPanel from "./AboutPanel";
import Footer from "./Footer";
import ProjectModal from "./ProjectModal";
import FluidCursor from "./canvas/FluidCursor";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";

export default function PageContent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [myList, setMyList] = useState<string[]>(["enterprise-genai"]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedList = localStorage.getItem("premium-mydeck");
      if (savedList) {
        try {
          setMyList(JSON.parse(savedList));
        } catch {
          // fallback
        }
      }
    }
  }, []);

  const handleToggleMyList = (id: string) => {
    setMyList(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("premium-mydeck", JSON.stringify(next));
      }
      return next;
    });
  };

  return (
    <>
      {/* High-performance fluid particle cursor overlay */}
      <FluidCursor />

      {/* Header Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        myListCount={myList.length}
        onOpenMyList={() => {
          const el = document.getElementById("projects");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="min-h-screen bg-bg text-text">
        {/* Minimalist Hero Stage */}
        <PremiumHeroStage onOpenModal={setModalProject} />

        {/* Selected Works Grid */}
        <MissionVaultGrid
          projects={portfolio.projects}
          onOpenModal={setModalProject}
          myList={myList}
          onToggleMyList={handleToggleMyList}
        />

        {/* Professional About Panel */}
        <AboutPanel />

        {/* Technical Mastery & Stats */}
        <div id="skills" className="py-12 bg-bg">
          <StatsPanel />
        </div>

        {/* Achievements Grid */}
        <div className="py-12 bg-bg">
          <AchievementsGrid />
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProject={setModalProject}
      />

      {/* Project Detail Preview Modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
        onSelectProject={setModalProject}
        inList={modalProject ? myList.includes(modalProject.id) : false}
        onToggleMyList={handleToggleMyList}
      />
    </>
  );
}