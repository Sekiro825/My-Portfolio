import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatsPanel from "@/components/StatsPanel";

describe("StatsPanel", () => {
  it("renders section header and top interactive skill ticker", () => {
    render(<StatsPanel />);
    expect(screen.getByText(/INTERACTIVE SKILL TICKER/i)).toBeInTheDocument();
    expect(screen.getByText(/MASTERY & POWER METERS/i)).toBeInTheDocument();
  });

  it("renders view mode switcher buttons", () => {
    render(<StatsPanel />);
    expect(screen.getByRole("button", { name: /REVOLVING ORBITS/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /STICK MARQUEE/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /POWER BOARD/i })).toBeInTheDocument();
  });

  it("switches to STICK MARQUEE view when clicking the mode button", () => {
    render(<StatsPanel />);
    const tickerBtn = screen.getByRole("button", { name: /STICK MARQUEE/i });
    fireEvent.click(tickerBtn);
    expect(screen.getByText(/DYNAMIC INTERACTIVE STICK WALL/i)).toBeInTheDocument();
  });

  it("switches to POWER BOARD view when clicking the mode button", () => {
    render(<StatsPanel />);
    const gridBtn = screen.getByRole("button", { name: /POWER BOARD/i });
    fireEvent.click(gridBtn);
    expect(screen.getByText(/LANGUAGES & CORE/i)).toBeInTheDocument();
    expect(screen.getByText(/FRAMEWORKS & SYSTEMS/i)).toBeInTheDocument();
  });
});
