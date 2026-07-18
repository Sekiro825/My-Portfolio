import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectRail from "@/components/ProjectRail";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";

vi.mock("@/lib/motion", () => ({
  fadeUp: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  stagger: { hidden: {}, visible: {} },
  prefersReduced: () => false,
}));

const mockOnOpenModal = vi.fn();

describe("ProjectRail", () => {
  const trendingProjects = portfolio.projects.filter((p) =>
    p.categories.includes("Trending Builds")
  );

  it("renders rail title", () => {
    render(<ProjectRail title="Trending Builds" projects={trendingProjects} onOpenModal={mockOnOpenModal} />);
    expect(screen.getByText("Trending Builds")).toBeInTheDocument();
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
        expect(screen.getByText(cat)).toBeInTheDocument();
      });
    });
  });

  it("calls onOpenModal when More Info clicked", async () => {
    render(<ProjectRail title="Trending Builds" projects={trendingProjects} onOpenModal={mockOnOpenModal} />);
    const btn = screen.getAllByRole("button", { name: /more info/i })[0];
    fireEvent.click(btn);
    await waitFor(() => expect(mockOnOpenModal).toHaveBeenCalledWith(trendingProjects[0]));
  });

  it("renders repo link when project has repo", () => {
    render(<ProjectRail title="Trending Builds" projects={trendingProjects} onOpenModal={mockOnOpenModal} />);
    trendingProjects.forEach((p) => {
      if (p.repo) {
        expect(screen.getByRole("link", { name: /code/i })).toHaveAttribute("href", p.repo);
      }
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