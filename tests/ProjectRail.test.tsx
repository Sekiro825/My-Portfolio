import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectRail from "@/components/ProjectRail";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";


const mockOnOpenModal = vi.fn();

describe("ProjectRail", () => {
  const trendingProjects = portfolio.projects.filter((p) =>
    p.categories.includes("Trending Builds")
  );

  it("renders rail title", () => {
    render(<ProjectRail title="Trending Builds" projects={trendingProjects} onOpenModal={mockOnOpenModal} />);
    expect(screen.getAllByText("Trending Builds").length).toBeGreaterThan(0);
  });

  it("renders all projects in the rail", () => {
    render(<ProjectRail title="Trending Builds" projects={trendingProjects} onOpenModal={mockOnOpenModal} />);
    trendingProjects.forEach((p) => {
      expect(screen.getByText(p.title)).toBeInTheDocument();
    });
  });

  it("shows category pills for each project", () => {
    render(<ProjectRail title="Trending Builds" projects={trendingProjects} onOpenModal={mockOnOpenModal} />);
    trendingProjects.forEach((p) => {
      p.categories.slice(0, 2).forEach((cat) => {
        expect(screen.getAllByText(cat).length).toBeGreaterThan(0);
      });
    });
  });

  it("calls onOpenModal when More Info clicked", async () => {
    render(<ProjectRail title="Trending Builds" projects={trendingProjects} onOpenModal={mockOnOpenModal} />);
    const btn = screen.getAllByRole("button", { name: /details/i })[0];
    fireEvent.click(btn);
    await waitFor(() => expect(mockOnOpenModal).toHaveBeenCalledWith(trendingProjects[0]));
  });

  it("renders repo link when project has repo", () => {
    render(<ProjectRail title="Trending Builds" projects={trendingProjects} onOpenModal={mockOnOpenModal} />);
    const links = screen.getAllByRole("link", { name: /code/i });
    expect(links.length).toBeGreaterThan(0);
    const repos = trendingProjects.filter(p => p.repo).map(p => p.repo);
    links.forEach(link => {
        expect(repos).toContain(link.getAttribute("href"));
    });
  });

  it("renders tech tags (up to 4)", () => {
    render(<ProjectRail title="Trending Builds" projects={trendingProjects} onOpenModal={mockOnOpenModal} />);
    trendingProjects.forEach((p) => {
      p.tech.slice(0, 4).forEach((t) => {
        expect(screen.getByText(t)).toBeInTheDocument();
      });
    });
  });
});