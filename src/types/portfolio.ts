export type BackdropKind = "gradient" | "grid" | "circuit";

export interface BackdropSpec {
  kind: BackdropKind;
  from: string; // hex color, e.g. "#0c0e14"
  via?: string;
  to: string; // hex color
  accent: string; // accent hex color for highlights
  emoji?: string; // optional emoji rendered huge as fallback visual
}

export interface Project {
  id: string; // url-safe slug, e.g. "medico"
  title: string; // "MEDICO"
  tagline: string; // one-liner shown on rail card
  synopsis: string; // 2-3 sentences shown in hero billboard / modal
  categories: string[]; // rails to appear on, e.g. ["Trending Builds", "Web Apps", "Full-Stack"]
  tech: string[]; // tech tags
  year: number;
  status: "released" | "in-progress";
  repo?: string; // github url — use https://github.com/Sekiro825/<slug>
  externalUrl?: string; // live link if any
  featured?: boolean; // shows in hero rotation if true
  backdrop: BackdropSpec;
  // Netflix-style metadata
  matchScore?: number; // e.g. 99 (99% match)
  rating?: string; // e.g. "TV-MA • AI/ML", "PG-13 • React"
  duration?: string; // e.g. "1 Season", "Movie • Mobile App"
  top10Rank?: number; // 1, 2, 3, 4, 5 for Top 10 rail
  targetPersonas?: string[]; // ["employer", "explorer", "techlead", "critic"]
}

export type SkillCategory = "language" | "web" | "db" | "other";

export interface Skill {
  name: string;
  level: number; // 1-100
  category: SkillCategory;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: number;
}

export interface Education {
  degree: string;
  institution: string;
  startYear: number;
  endYear: number;
  score: string; // e.g. "CGPA 6.785"
}

export interface Bio {
  name: string;
  handle: string; // "Sekiro825"
  tagline: string; // big hero subtitle
  body: string[]; // 2-3 short paragraphs first-person bio
  location: string;
  github: string; // full URL
  linkedin: string; // full URL
  email: string;
  institutionEmail: string;
  resumePath: string; // "/My-Portfolio/resume.pdf" (with basePath)
}

export interface Portfolio {
  bio: Bio;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
}