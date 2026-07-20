"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "./Navbar";
import HeroBillboard from "./HeroBillboard";
import ProjectRail from "./ProjectRail";
import ProfileSelector from "./ProfileSelector";
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
  const [activeProfile, setActiveProfile] = useState<ProfileId>("explorer");
  const [isProfileSelectorOpen, setIsProfileSelectorOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [myList, setMyList] = useState<string[]>(["enterprise-genai"]);

  // Load saved profile or auto-prompt on first load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("netflix-profile") as ProfileId | null;
      if (saved && PROFILES.some(p => p.id === saved)) {
        setActiveProfile(saved);
      } else {
        setIsProfileSelectorOpen(true);
      }

      const savedList = localStorage.getItem("netflix-mylist");
      if (savedList) {
        try {
          setMyList(JSON.parse(savedList));
        } catch {
          // fallback
        }
      }
    }
  }, []);

  const handleSelectProfile = (id: ProfileId) => {
    setActiveProfile(id);
    if (typeof window !== "undefined") {
      localStorage.setItem("netflix-profile", id);
    }
  };

  const handleToggleMyList = (id: string) => {
    setMyList(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("netflix-mylist", JSON.stringify(next));
      }
      return next;
    });
  };

  const currentProfile = PROFILES.find(p => p.id === activeProfile) || PROFILES[0] || {
    id: "explorer",
    name: "1st-Time Visitor",
    subtitle: "",
    avatarBg: "from-amber-500 to-red-600",
    avatarIcon: "🍿",
    accentColor: "#F5C542",
    badge: "POPULAR FEATURED SHOWCASE",
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
      {/* Netflix Header Navigation */}
      <Navbar
        activeProfile={activeProfile}
        onOpenProfileSelector={() => setIsProfileSelectorOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        myListCount={myList.length}
        onOpenMyList={() => {
          const el = document.getElementById("my-list-rail");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <main className="min-h-screen bg-[#141414] text-white">
        {/* Netflix Hero Billboard */}
        <HeroBillboard
          activeProfile={activeProfile}
          onOpenModal={setModalProject}
          myList={myList}
          onToggleMyList={handleToggleMyList}
        />

        {/* Content Rails */}
        <div className="px-4 md:px-12 lg:px-16 py-8 relative z-20 space-y-4">
          {/* Top 10 Today Rail */}
          <ProjectRail
            title="Top 10 Builds Today in India"
            projects={top10Projects}
            onOpenModal={setModalProject}
            isTop10={true}
            myList={myList}
            onToggleMyList={handleToggleMyList}
          />

          {/* Persona Recommended Rail */}
          {recommendedProjects.length > 0 && (
            <ProjectRail
              title={`Top Recommendations for ${currentProfile.name.split(" ")[0]}`}
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
                title="My List"
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
                title={`${cat} Originals`}
                projects={projects}
                onOpenModal={setModalProject}
                myList={myList}
                onToggleMyList={handleToggleMyList}
              />
            );
          })}

          {/* Stats & Experience */}
          <div id="skills" className="pt-12">
            <StatsPanel />
          </div>

          <div className="pt-12">
            <AchievementsGrid />
          </div>

          <div id="about" className="pt-12">
            <AboutPanel />
          </div>
        </div>

        <Footer />
      </main>

      {/* Netflix Profile Selector Modal */}
      <ProfileSelector
        activeProfile={activeProfile}
        onSelectProfile={handleSelectProfile}
        isOpen={isProfileSelectorOpen}
        onClose={() => setIsProfileSelectorOpen(false)}
      />

      {/* Netflix Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProject={setModalProject}
      />

      {/* Netflix Project Detail Preview Modal */}
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