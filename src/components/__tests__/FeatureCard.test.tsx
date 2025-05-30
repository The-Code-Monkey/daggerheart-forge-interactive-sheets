
import { render, screen } from "../../test-utils";
import { Sword } from "lucide-react";
import FeatureCard from "../FeatureCard";

describe("FeatureCard", () => {
  it("renders title and description correctly", () => {
    render(
      <FeatureCard
        icon={Sword}
        title="Character Creation"
        description="Create detailed characters for your adventures"
      />
    );

    expect(screen.getByText("Character Creation")).toBeInTheDocument();
    expect(
      screen.getByText("Create detailed characters for your adventures")
    ).toBeInTheDocument();
  });

  it("renders with hover effects", () => {
    render(
      <FeatureCard
        icon={Sword}
        title="Test Feature"
        description="Test description"
      />
    );

    const card = screen
      .getByText("Test Feature")
      .closest('.group, [class*="hover:"]')?.parentElement;
    expect(card).toHaveClass("hover:scale-105");
  });
});
