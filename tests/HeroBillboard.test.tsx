import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AnimeHeroStage from "@/components/AnimeHeroStage";
import { portfolio } from "@data/portfolio";

vi.mock("@/lib/motion", () => ({
  fadeUp: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  stagger: { hidden: {}, visible: {} },
  prefersReduced: () => false,
}));

vi.mock("@/components/Hero3DVisual", () => {
  return {
    default: () => <div>3D Visual</div>
  };
});

const mockOnOpenModal = vi.fn();

describe("AnimeHeroStage", () => {
  const featured = portfolio.projects.find((p) => p.featured) || portfolio.projects[0];

  it("renders without crashing", () => {
    render(<AnimeHeroStage onOpenModal={mockOnOpenModal} />);
    expect(screen.getByText(/SHADOW/i)).toBeInTheDocument();
    expect(screen.getByText(/ARCHITECT/i)).toBeInTheDocument();
  });

  it("shows developer tagline", () => {
    render(<AnimeHeroStage onOpenModal={mockOnOpenModal} />);
    expect(screen.getByText(portfolio.bio.tagline)).toBeInTheDocument();
  });

  it("calls onOpenModal when Launch Featured Build clicked", async () => {
    render(<AnimeHeroStage onOpenModal={mockOnOpenModal} />);
    const btn = screen.getByRole("button", { name: /LAUNCH FEATURED BUILD/i });
    fireEvent.click(btn);
    await waitFor(() => expect(mockOnOpenModal).toHaveBeenCalledWith(featured));
  });

  it("renders explore arsenal link", () => {
    render(<AnimeHeroStage onOpenModal={mockOnOpenModal} />);
    expect(screen.getByText(/EXPLORE ARSENAL/i)).toBeInTheDocument();
  });
});