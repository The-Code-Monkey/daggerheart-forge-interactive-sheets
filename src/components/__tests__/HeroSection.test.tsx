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
});
