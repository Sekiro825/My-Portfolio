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
    sessionStorage.getItem = vi.fn(() => "true");
    render(<LoadingScreen />);
    expect(screen.queryByText("SAKET POKALE")).not.toBeInTheDocument();
    sessionStorage.getItem = vi.fn();
  });

  it("renders loading screen on first visit", () => {
    const { getByRole } = render(<LoadingScreen />);
    expect(getByRole("dialog", { name: /loading portfolio/i })).toBeInTheDocument();
  });

  it("shows logo, name, and tagline", () => {
    render(<LoadingScreen />);
    expect(screen.getByText("SAKET POKALE")).toBeInTheDocument();
    expect(screen.getByText("GenAI • Cybersecurity • Full-Stack")).toBeInTheDocument();
  });

  it("shows progress bar", async () => {
    render(<LoadingScreen />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // not yet at 100%
    const prompt = screen.getByText("PRESS ANY KEY TO ENTER");
    expect(prompt).toBeInTheDocument();
  });

  it("shows prompt at 100% progress and dismisses on key press", () => {
    render(<LoadingScreen />);
    
    // Advance timers to complete progress
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Press key to dismiss
    act(() => {
        fireEvent.keyDown(window, { key: "Enter" });
    });
    
    // Complete dismissal animation
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Should be dismissed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // sessionStorage should be set
    expect(sessionStorage.setItem).toHaveBeenCalledWith("intro-seen", "true");
  });

  it("dismisses on click", () => {
    render(<LoadingScreen />);
    
    act(() => {
      vi.advanceTimersByTime(3000);
    });


    act(() => {
        fireEvent.click(document.body);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("respects prefers-reduced-motion (dismisses quickly)", async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    
    render(<LoadingScreen />);
    
    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    
    expect(screen.queryByText("SAKET POKALE")).not.toBeInTheDocument();
  });
});