import { render, screen } from "../../test-utils";
import HeroSection from "../HeroSection";

describe("HeroSection", () => {
  it("renders main heading", () => {
    render(<HeroSection />);
    expect(screen.getByText("Your Digital")).toBeInTheDocument();
    expect(screen.getByText("Adventure Hub")).toBeInTheDocument();
  });

  it("renders description text", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/Create characters, manage campaigns/)
    ).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HeroSection />);
    expect(screen.getByText("Start Building")).toBeInTheDocument();
  });

  it("renders stats section", () => {
    render(<HeroSection />);
    expect(screen.getByText("10K+")).toBeInTheDocument();
    expect(screen.getByText("Characters Created")).toBeInTheDocument();
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("Active Campaigns")).toBeInTheDocument();
  });
});
