import type { Portfolio } from "@/types/portfolio";

export const portfolio: Portfolio = {
  bio: {
    name: "Saket Sanjay Pokale",
    handle: "Sekiro825",
    tagline: "Product Engineer • GenAI × Cybersecurity • Full-Stack Builder",
    body: [
      "Motivated Product Engineer trainee with a strong bias for action, passionate about building foundational systems at the intersection of Generative AI and Cybersecurity.",
      "Hands-on experience developing real-world full-stack applications and deploying secure AI/ML solutions from scratch — from RAG pipelines with ChromaDB to PII filters for enterprise LLMs.",
      "Currently prototyping and refining Generative AI and traditional ML modalities for production-level enterprise applications at CMT Private Limited."
    ],
    location: "Mumbai, India",
    github: "https://github.com/Sekiro825",
    linkedin: "https://www.linkedin.com/in/saket-pokale-2778471b0/",
    email: "saket82005@gmail.com",
    institutionEmail: "9851@crce.edu.in",
    resumePath: "/My-Portfolio/resume.pdf"
  },
  education: [
    {
      degree: "BE Electronics & Computer Science (Honors in Cyber Security & Ethical Hacking)",
      institution: "Fr. Conceicao Rodrigues College of Engineering, Mumbai",
      startYear: 2022,
      endYear: 2026,
      score: "CGPA 7.5"
    }
  ],
  skills: [
    { name: "Python", level: 90, category: "language" },
    { name: "TypeScript", level: 85, category: "language" },
    { name: "JavaScript", level: 85, category: "language" },
    { name: "Node.js", level: 80, category: "language" },
    { name: "C/C++", level: 70, category: "language" },
    { name: "React", level: 85, category: "web" },
    { name: "React Native", level: 80, category: "web" },
    { name: "Next.js", level: 80, category: "web" },
    { name: "Express", level: 75, category: "web" },
    { name: "TensorFlow", level: 75, category: "other" },
    { name: "PyTorch", level: 75, category: "other" },
    { name: "OpenCV", level: 75, category: "other" },
    { name: "Scikit-learn", level: 80, category: "other" },
    { name: "NumPy", level: 85, category: "other" },
    { name: "MongoDB", level: 75, category: "db" },
    { name: "PostgreSQL", level: 75, category: "db" },
    { name: "Firebase", level: 75, category: "db" },
    { name: "Supabase", level: 75, category: "db" },
    { name: "ChromaDB", level: 70, category: "db" },
    { name: "REST APIs", level: 85, category: "web" },
    { name: "GCP", level: 70, category: "other" },
    { name: "Leaflet.js", level: 70, category: "web" },
    { name: "Power BI", level: 70, category: "other" },
    { name: "AI Agents", level: 70, category: "other" }
  ],
  projects: [
    {
      id: "enterprise-genai",
      title: "Enterprise GenAI System & Persona-Aware Bot",
      tagline: "RAG pipeline + PII filter + semantic caching for enterprise LLMs",
      synopsis: "Built an enterprise-grade AI assistant using Python with Retrieval-Augmented Generation (RAG) architecture and ChromaDB. Engineered a secure data interface to parse, extract, and format text from unstructured knowledge bases for LLM ingestion. Implemented semantic caching and a rigorous PII filter to detect and secure business-sensitive data before AI processing. Designed an intelligent persona engine delivering context-aware, role-based interactions over real-time communication platforms.",
      categories: ["Trending Builds", "AI & Vision", "Full-Stack"],
      tech: ["Python", "ChromaDB", "RAG", "LLMs", "PII Detection", "Semantic Caching", "TypeScript"],
      year: 2025,
      status: "released",
      repo: "https://github.com/Sekiro825/enterprise-genai",
      featured: true,
      backdrop: {
        kind: "circuit",
        from: "#0d1b2a",
        via: "#1b2a4a",
        to: "#08090d",
        accent: "#00d4aa",
        emoji: "🤖"
      }
    },
    {
      id: "medico",
      title: "MEDICO",
      tagline: "Cloud-based medical report management platform",
      synopsis: "Developed a cloud-based full-stack healthcare application for medical report management. Built responsive UI with React.js and Firebase Auth for secure access. Integrated Firebase for secure storage and efficient data management, enabling patients and providers instant, secure access to medical records.",
      categories: ["Trending Builds", "Web Apps", "Full-Stack"],
      tech: ["React", "Firebase", "Firebase Auth", "JavaScript", "HTML", "CSS"],
      year: 2024,
      status: "released",
      repo: "https://github.com/Sekiro825/medico",
      featured: true,
      backdrop: {
        kind: "gradient",
        from: "#0b1a2e",
        via: "#1a3a5e",
        to: "#0c0e14",
        accent: "#00b3ff",
        emoji: "🩺"
      }
    },
    {
      id: "glowup-ai",
      title: "GlowUp AI – Personalized Habit Tracker",
      tagline: "React Native + GenAI wellness coach with real-time social leaderboards",
      synopsis: "Developed a mobile habit tracker using React Native (Expo) and Supabase with PostgreSQL Realtime. Integrated Generative AI to deliver personalized micro-habits and multi-step wellness plans. Implemented scalable streak tracking, points system, and real-time social leaderboards for community engagement.",
      categories: ["Trending Builds", "AI & Vision", "Mobile"],
      tech: ["React Native", "Expo", "Supabase", "PostgreSQL", "Generative AI", "TypeScript"],
      year: 2025,
      status: "released",
      repo: "https://github.com/Sekiro825/glowup-ai",
      featured: true,
      backdrop: {
        kind: "gradient",
        from: "#1a0d2e",
        via: "#2d1b4e",
        to: "#0c0e14",
        accent: "#d4a5ff",
        emoji: "✨"
      }
    },
    {
      id: "pawparazzi",
      title: "PAWPAZI",
      tagline: "Full-stack pet care platform with location-based social features",
      synopsis: "Built a full-stack pet care platform with social media features to boost engagement. Developed using React.js, Node.js (Express), and MongoDB. Integrated Leaflet Maps for location-based services (vet clinics, pet parks, sitters). Designed a multi-stream revenue model: service commissions, premium listings, and vendor subscriptions.",
      categories: ["Web Apps", "Full-Stack"],
      tech: ["React", "Node.js", "Express", "MongoDB", "Leaflet.js", "JavaScript"],
      year: 2024,
      status: "released",
      repo: "https://github.com/Sekiro825/pawparazzi",
      featured: false,
      backdrop: {
        kind: "grid",
        from: "#0c0e14",
        via: "#1a1f2e",
        to: "#08090d",
        accent: "#ffb347",
        emoji: "🐾"
      }
    },
    {
      id: "subsystem-alpha",
      title: "Subsystem Alpha",
      tagline: "Stealth project — more soon",
      synopsis: "An experimental build under active development. Details will be revealed once shipped. Until then, consider it an unopened loot crate.",
      categories: ["Coming Soon"],
      tech: ["TypeScript", "Next.js"],
      year: 2026,
      status: "in-progress",
      repo: "https://github.com/Sekiro825/subsystem-alpha",
      featured: false,
      backdrop: {
        kind: "grid",
        from: "#0c0e14",
        via: "#11131c",
        to: "#08090d",
        accent: "#f5c542",
        emoji: "🔒"
      }
    }
  ],
  certificates: [
    { title: "Generative AI, AI, ML & Deep Learning", issuer: "Industry Certification", year: 2024 },
    { title: "Computer Vision Specialization", issuer: "Industry Certification", year: 2023 },
    { title: "Computer Vision Specialization", issuer: "Industry Certification", year: 2024 },
    { title: "Full Stack Web Development", issuer: "Industry Certification", year: 2023 },
    { title: "Full Stack Web Development", issuer: "Industry Certification", year: 2024 },
    { title: "Data Science, Power BI, and Prompt Engineering", issuer: "Industry Certification", year: 2024 },
    { title: "Cybersecurity and Ethical Hacking", issuer: "IDEMI", year: 2024 }
  ]
};

export default portfolio;