import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import LoadingScreen from "@/components/LoadingScreen";

vi.mock("@/lib/motion", () => ({
  prefersReduced: () => false,
}));

describe("LoadingScreen", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not render if already seen in sessionStorage", () => {
    sessionStorage.setItem("portfolio-intro-seen", "true");
    const { queryByRole } = render(<LoadingScreen />);
    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders loading screen on first visit", () => {
    const { getByRole } = render(<LoadingScreen />);
    expect(getByRole("dialog", { name: /loading portfolio/i })).toBeInTheDocument();
  });

  it("shows logo, name, and tagline", () => {
    render(<LoadingScreen />);
    expect(screen.getByText("SAKET POKALE")).toBeInTheDocument();
    expect(screen.getByText("ENGINEER · BUILDER · QUIETLY SHIPPING")).toBeInTheDocument();
  });

  it("shows progress bar", () => {
    render(<LoadingScreen />);
    const progressBar = screen.getByRole("progressbar") || screen.getByTestId("progress-bar") || screen.queryByText(/press any key/i);
    // The progress bar is a div with width style - check for the container
    expect(screen.getByText("PRESS ANY KEY TO ENTER")).not.toBeInTheDocument(); // not yet at 100%
  });

  it("shows prompt at 100% progress and dismisses on key press", async () => {
    render(<LoadingScreen />);
    
    // Advance timers to complete progress (2 seconds at 60fps = ~120 frames)
    await act(async () => {
      vi.advanceTimersByTime(2100);
    });

    // Should show prompt
    await waitFor(() => {
      expect(screen.getByText("PRESS ANY KEY TO ENTER")).toBeInTheDocument();
    });

    // Press key to dismiss
    fireEvent.keyDown(window, { key: "Enter" });
    
    // Should be dismissed
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    // sessionStorage should be set
    expect(sessionStorage.getItem("portfolio-intro-seen")).toBe("true");
  });

  it("dismisses on click", async () => {
    render(<LoadingScreen />);
    
    await act(async () => {
      vi.advanceTimersByTime(2100);
    });

    await waitFor(() => {
      expect(screen.getByText("PRESS ANY KEY TO ENTER")).toBeInTheDocument();
    });

    fireEvent.click(document.body);
    
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("respects prefers-reduced-motion (dismisses quickly)", () => {
    vi.mock("@/lib/motion", () => ({
      prefersReduced: () => true,
    }));
    
    const { queryByRole } = render(<LoadingScreen />);
    
    // With reduced motion, it should dismiss after 300ms
    vi.advanceTimersByTime(400);
    
    expect(queryByRole("dialog")).not.toBeInTheDocument();
  });
});