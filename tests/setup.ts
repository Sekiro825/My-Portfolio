import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => React.createElement("div", props, children),
    span: ({ children, ...props }: any) => React.createElement("span", props, children),
    h1: ({ children, ...props }: any) => React.createElement("h1", props, children),
    h2: ({ children, ...props }: any) => React.createElement("h2", props, children),
    p: ({ children, ...props }: any) => React.createElement("p", props, children),
    button: ({ children, ...props }: any) => React.createElement("button", props, children),
    article: ({ children, ...props }: any) => React.createElement("article", props, children),
    section: ({ children, ...props }: any) => React.createElement("section", props, children),
  },
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
}));

// Mock @/lib/motion with all needed exports
vi.mock("@/lib/motion", () => ({
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
  stagger: {
    hidden: { transition: { staggerChildren: 0.08 } },
    visible: { transition: { staggerChildren: 0.08 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  },
  cardHover: {
    whileHover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } },
  },
  prefersReduced: () => false,
}));

// Mock lucide-react icons
vi.mock("lucide-react", () => {
  const icons = [
    "ArrowRight", "Info", "ExternalLink", "Pause", "Play", "ChevronLeft", "ChevronRight",
    "X", "Menu", "Github", "Linkedin", "FileText", "Code", "Award", "User", "Home",
    "Download", "Mail", "MapPin", "Calendar", "Tag", "FolderOpen", "Heart", "Code2",
    "Sparkles", "Loader2"
  ];
  const mockComponents: Record<string, any> = {};
  icons.forEach((name) => {
    mockComponents[name] = ({ ...props }: any) => React.createElement("svg", { "data-testid": `icon-${name.toLowerCase()}`, ...props });
  });
  return mockComponents;
});

// Mock next/font
vi.mock("next/font/google", () => ({
  Bebas_Neue: ({ variable }: any) => ({
    className: "font-display",
    variable: "--font-display",
    style: { fontFamily: "Bebas Neue, Impact, system-ui, sans-serif" },
  }),
  Inter: ({ variable }: any) => ({
    className: "font-body",
    variable: "--font-body",
    style: { fontFamily: "Inter, system-ui, sans-serif" },
  }),
  JetBrains_Mono: ({ variable }: any) => ({
    className: "font-mono",
    variable: "--font-mono",
    style: { fontFamily: "JetBrains Mono, ui-monospace, monospace" },
  }),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Polyfill for matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Polyfill for scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "sessionStorage", { value: sessionStorageMock });

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));