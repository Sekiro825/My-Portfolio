import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HeroBillboard from "@/components/HeroBillboard";
import { portfolio } from "@data/portfolio";
import type { Project } from "@/types/portfolio";

vi.mock("@/lib/motion", () => ({
  fadeUp: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  stagger: { hidden: {}, visible: {} },
  prefersReduced: () => false,
}));

vi.mock("@/components/Hero3DVisual", () => {
    return {
        default: () => <div>3D Visual</div>
    }
})

const mockOnOpenModal = vi.fn();

describe("HeroBillboard", () => {
  const featuredProjects = portfolio.projects.filter((p) => p.featured);

  it("renders without crashing", () => {
    render(<HeroBillboard onOpenModal={mockOnOpenModal} />);
    expect(screen.getByText("Featured Project")).toBeInTheDocument();
  });

  it("shows first featured project title", () => {
    render(<HeroBillboard onOpenModal={mockOnOpenModal} />);
    expect(screen.getByText(featuredProjects[0].title)).toBeInTheDocument();
  });

  it("shows project tagline", () => {
    render(<HeroBillboard onOpenModal={mockOnOpenModal} />);
    expect(screen.getByText(featuredProjects[0].tagline)).toBeInTheDocument();
  });

  it("calls onOpenModal when View Project clicked", async () => {
    render(<HeroBillboard onOpenModal={mockOnOpenModal} />);
    const btn = screen.getByRole("button", { name: /view project/i });
    fireEvent.click(btn);
    await waitFor(() => expect(mockOnOpenModal).toHaveBeenCalledWith(featuredProjects[0]));
  });

  it("calls onOpenModal when More Info clicked", async () => {
    render(<HeroBillboard onOpenModal={mockOnOpenModal} />);
    const btn = screen.getByRole("button", { name: /more info/i });
    fireEvent.click(btn);
    await waitFor(() => expect(mockOnOpenModal).toHaveBeenCalledWith(featuredProjects[0]));
  });

  it("renders tech tags for the project", () => {
    render(<HeroBillboard onOpenModal={mockOnOpenModal} />);
    featuredProjects[0].tech.slice(0, 6).forEach((t) => {
      expect(screen.getByText(t)).toBeInTheDocument();
    });
  });

  it("shows pause/play indicator", () => {
    render(<HeroBillboard onOpenModal={mockOnOpenModal} />);
    expect(screen.getByRole("button", { name: /auto/i })).toBeInTheDocument();
  });
});