export type ProfileId = "employer" | "explorer" | "techlead" | "critic";

export interface UserProfile {
  id: ProfileId;
  name: string;
  subtitle: string;
  avatarBg: string;
  avatarIcon: string;
  accentColor: string;
  badge: string;
  heroTagline: string;
  primaryCategory: string;
}

export const PROFILES: UserProfile[] = [
  {
    id: "employer",
    name: "Employer / Recruiter",
    subtitle: "Hiring, Resume & Key Achievements",
    avatarBg: "from-red-600 to-rose-900",
    avatarIcon: "💼",
    accentColor: "#E50914",
    badge: "HIRING MANAGER MODE",
    heroTagline: "High-Impact Product Engineer • Enterprise GenAI & Full-Stack Security",
    primaryCategory: "Trending Builds"
  },
  {
    id: "explorer",
    name: "1st-Time Visitor",
    subtitle: "Interactive Tour, Top Builds & Demos",
    avatarBg: "from-amber-500 to-red-600",
    avatarIcon: "🍿",
    accentColor: "#F5C542",
    badge: "POPULAR FEATURED SHOWCASE",
    heroTagline: "Welcome! Explore Saket's Top-Rated Projects & Interactive Builds",
    primaryCategory: "Trending Builds"
  },
  {
    id: "techlead",
    name: "Senior Tech Lead",
    subtitle: "Architecture, RAG Pipeline & Code Quality",
    avatarBg: "from-blue-600 to-indigo-900",
    avatarIcon: "⚡",
    accentColor: "#00B3FF",
    badge: "DEEP-DIVE ARCHITECTURE",
    heroTagline: "RAG Architecture • ChromaDB • PII Filters • Scalable React & Node.js",
    primaryCategory: "AI & Vision"
  },
  {
    id: "critic",
    name: "UI / UX Critic",
    subtitle: "Visual Aesthetics, 3D & Micro-Animations",
    avatarBg: "from-purple-600 to-pink-900",
    avatarIcon: "🎨",
    accentColor: "#D4A5FF",
    badge: "HIGH-FIDELITY DESIGN",
    heroTagline: "Cinematic Dark Mode • Smooth Framer Motion • Interactive Web Canvas",
    primaryCategory: "Web Apps"
  }
];
