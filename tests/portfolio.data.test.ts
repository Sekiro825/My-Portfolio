import { describe, it, expect } from "vitest";
import { portfolio } from "@data/portfolio";
import type { Portfolio, Project, Skill, Certificate, Education, Bio } from "@/types/portfolio";

describe("Portfolio data shape", () => {
  it("exports a valid Portfolio object", () => {
    expect(portfolio).toBeDefined();
    expect(typeof portfolio).toBe("object");
  });

  it("has required top-level keys", () => {
    const requiredKeys: (keyof Portfolio)[] = ["bio", "education", "skills", "projects", "certificates"];
    requiredKeys.forEach((k) => expect(portfolio).toHaveProperty(k));
  });

  it("bio has all required fields", () => {
    const bio = portfolio.bio as Bio;
    expect(bio.name).toBe("Saket Pokale");
    expect(bio.handle).toBe("Sekiro825");
    expect(typeof bio.tagline).toBe("string");
    expect(Array.isArray(bio.body)).toBe(true);
    expect(bio.body.length).toBeGreaterThanOrEqual(2);
    expect(bio.github).toContain("github.com/Sekiro825");
    expect(bio.linkedin).toContain("linkedin.com");
    expect(bio.email).toContain("@");
    expect(bio.resumePath).toBe("/My-Portfolio/resume.pdf");
  });

  it("education array has at least one entry with correct shape", () => {
    const edu = portfolio.education[0] as Education;
    expect(edu.degree).toContain("Electronics");
    expect(edu.institution).toContain("Conceicao");
    expect(typeof edu.startYear).toBe("number");
    expect(typeof edu.endYear).toBe("number");
    expect(edu.score).toContain("CGPA");
  });

  it("skills array populated with levels and categories", () => {
    expect(portfolio.skills.length).toBeGreaterThan(5);
    portfolio.skills.forEach((s: Skill) => {
      expect(typeof s.name).toBe("string");
      expect(typeof s.level).toBe("number");
      expect(s.level).toBeGreaterThanOrEqual(1);
      expect(s.level).toBeLessThanOrEqual(100);
      expect(["language", "web", "db", "other"]).toContain(s.category);
    });
  });

  it("projects array has featured projects with backdrops", () => {
    expect(portfolio.projects.length).toBeGreaterThanOrEqual(2);
    const featured = portfolio.projects.filter((p: Project) => p.featured);
    expect(featured.length).toBeGreaterThanOrEqual(2);
    featured.forEach((p: Project) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.synopsis).toBeTruthy();
      expect(Array.isArray(p.categories)).toBe(true);
      expect(Array.isArray(p.tech)).toBe(true);
      expect(typeof p.year).toBe("number");
      expect(["released", "in-progress"]).toContain(p.status);
      expect(p.backdrop).toBeDefined();
      expect(p.backdrop.kind).toMatch(/gradient|circuit|grid/);
      expect(p.backdrop.from).toMatch(/^#[0-9a-f]{6}$/i);
      expect(p.backdrop.to).toMatch(/^#[0-9a-f]{6}$/i);
      expect(p.backdrop.accent).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  it("certificates array has correct shape", () => {
    expect(portfolio.certificates.length).toBe(5);
    portfolio.certificates.forEach((c: Certificate) => {
      expect(typeof c.title).toBe("string");
      expect(typeof c.issuer).toBe("string");
      expect(typeof c.year).toBe("number");
      expect(c.year).toBeGreaterThanOrEqual(2020);
    });
  });

  it("has expected project IDs", () => {
    const ids = portfolio.projects.map((p: Project) => p.id);
    expect(ids).toContain("medico");
    expect(ids).toContain("rescuesight");
    expect(ids).toContain("subsystem-alpha");
  });

  it("every project category matches a defined rail category", () => {
    const railCategories = [
      "Trending Builds",
      "Web Apps",
      "Full-Stack",
      "AI & Vision",
      "Coming Soon",
    ];
    portfolio.projects.forEach((p: Project) => {
      p.categories.forEach((cat) => {
        expect(railCategories).toContain(cat);
      });
    });
  });
});