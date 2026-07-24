"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "./Navbar";
import HeroBillboard from "./HeroBillboard";
import ProjectRail from "./ProjectRail";
import SearchModal from "./SearchModal";
import StatsPanel from "./StatsPanel";
import AchievementsGrid from "./AchievementsGrid";
import AboutPanel from "./AboutPanel";
import Footer from "./Footer";
import ProjectModal from "./ProjectModal";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";
import { PROFILES, ProfileId } from "@/types/profile";

export default function PageContent() {
  const [activeProfile] = useState<ProfileId>("explorer");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [myList, setMyList] = useState<string[]>(["enterprise-genai"]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedList = localStorage.getItem("anime-mydeck");
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
        localStorage.setItem("anime-mydeck", JSON.stringify(next));
      }
      return next;
    });
  };

  const currentProfile = PROFILES.find(p => p.id === activeProfile) || PROFILES[0] || {
    id: "explorer",
    name: "Coffee Explorer",
    subtitle: "",
    avatarBg: "from-amber-500 to-amber-800",
    avatarIcon: "☕",
    accentColor: "#D98A5B",
    badge: "S-RANK SHOWCASE",
    heroTagline: "",
    primaryCategory: "Trending Builds"
  };

  // Top 10 sorted projects
  const top10Projects = useMemo(() => {
    return [...portfolio.projects]
      .sort((a, b) => (a.top10Rank || 99) - (b.top10Rank || 99))
      .slice(0, 5);
  }, []);

  // Profile-personalized recommendation projects
  const recommendedProjects = useMemo(() => {
    return portfolio.projects.filter(p =>
      p.targetPersonas?.includes(activeProfile) || p.categories.includes(currentProfile.primaryCategory)
    );
  }, [activeProfile, currentProfile.primaryCategory]);

  // My List projects
  const myListProjects = useMemo(() => {
    return portfolio.projects.filter(p => myList.includes(p.id));
  }, [myList]);

  // Other standard rails
  const categories = ["AI & Vision", "Full-Stack", "Web Apps", "Mobile", "Coming Soon"] as const;

  return (
    <>
      {/* Header Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        myListCount={myList.length}
        onOpenMyList={() => {
          const el = document.getElementById("my-list-rail");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="min-h-screen bg-[#faf6f0] text-[#2c1a14]">
        {/* Hero Billboard */}
        <HeroBillboard
          activeProfile={activeProfile}
          onOpenModal={setModalProject}
          myList={myList}
          onToggleMyList={handleToggleMyList}
        />

        {/* Content Rails */}
        <div id="projects" className="px-4 md:px-12 lg:px-16 py-8 relative z-20 space-y-8 bg-[#faf6f0]">
          {/* Top 10 Today Rail */}
          <ProjectRail
            title="S-Rank Builds Matrix"
            projects={top10Projects}
            onOpenModal={setModalProject}
            isTop10={true}
            myList={myList}
            onToggleMyList={handleToggleMyList}
          />

          {/* Persona Recommended Rail */}
          {recommendedProjects.length > 0 && (
            <ProjectRail
              title={`Tactical Recommendations for ${currentProfile.name.split(" ")[0]}`}
              projects={recommendedProjects}
              onOpenModal={setModalProject}
              myList={myList}
              onToggleMyList={handleToggleMyList}
            />
          )}

          {/* My List Rail */}
          {myListProjects.length > 0 && (
            <div id="my-list-rail">
              <ProjectRail
                title="Bookmarked Deck"
                projects={myListProjects}
                onOpenModal={setModalProject}
                myList={myList}
                onToggleMyList={handleToggleMyList}
              />
            </div>
          )}

          {/* Category Rails */}
          {categories.map(cat => {
            const projects = portfolio.projects.filter(p => p.categories.includes(cat));
            if (!projects.length) return null;
            return (
              <ProjectRail
                key={cat}
                title={`${cat} Chronicles`}
                projects={projects}
                onOpenModal={setModalProject}
                myList={myList}
                onToggleMyList={handleToggleMyList}
              />
            );
          })}

          {/* Stats & Experience */}
          <div className="pt-8">
            <StatsPanel />
          </div>

          <div className="pt-8">
            <AchievementsGrid />
          </div>

          <div className="pt-8">
            <AboutPanel />
          </div>
        </div>

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