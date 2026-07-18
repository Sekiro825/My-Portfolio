"use client";

import { useState } from "react";
import HeroBillboard from "./HeroBillboard";
import ProjectRail from "./ProjectRail";
import StatsPanel from "./StatsPanel";
import AchievementsGrid from "./AchievementsGrid";
import AboutPanel from "./AboutPanel";
import Footer from "./Footer";
import ProjectModal from "./ProjectModal";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";

const RAIL_CATEGORIES = [
  "Trending Builds",
  "Web Apps",
  "Full-Stack",
  "AI & Vision",
  "Mobile",
  "Coming Soon",
] as const;

export default function PageContent() {
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <>
      <main className="min-h-screen">
        <HeroBillboard onOpenModal={setModalProject} />
        <div className="px-6 md:px-12 lg:px-20 py-16">
          {RAIL_CATEGORIES.map((cat: string) => {
            const projects = portfolio.projects.filter((p) =>
              p.categories.includes(cat)
            );
            if (!projects.length) return null;
            return (
              <ProjectRail
                key={cat}
                title={cat}
                projects={projects}
                onOpenModal={setModalProject}
              />
            );
          })}
          <StatsPanel />
          <AchievementsGrid />
          <AboutPanel />
        </div>
        <Footer />
      </main>
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </>
  );
}