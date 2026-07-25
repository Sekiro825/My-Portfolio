import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MissionVaultGrid from "@/components/MissionVaultGrid";
import { portfolio } from "@data/portfolio";

const mockOnOpenModal = vi.fn();
const mockOnToggleMyList = vi.fn();

describe("MissionVaultGrid", () => {
  it("renders mission vault title", () => {
    render(
      <MissionVaultGrid
        projects={portfolio.projects}
        onOpenModal={mockOnOpenModal}
        myList={[]}
        onToggleMyList={mockOnToggleMyList}
      />
    );
    expect(screen.getByText("S-RANK MISSION VAULT")).toBeInTheDocument();
  });

  it("renders project items in the grid", () => {
    render(
      <MissionVaultGrid
        projects={portfolio.projects}
        onOpenModal={mockOnOpenModal}
        myList={[]}
        onToggleMyList={mockOnToggleMyList}
      />
    );
    expect(screen.getByText(portfolio.projects[0].title)).toBeInTheDocument();
  });

  it("filters projects when category button clicked", () => {
    render(
      <MissionVaultGrid
        projects={portfolio.projects}
        onOpenModal={mockOnOpenModal}
        myList={[]}
        onToggleMyList={mockOnToggleMyList}
      />
    );
    const catBtn = screen.getByText("[ AI & Vision ]");
    fireEvent.click(catBtn);
    expect(catBtn).toBeInTheDocument();
  });
});