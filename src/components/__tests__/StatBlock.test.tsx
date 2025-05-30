import { render, screen } from "../../test-utils";
import { Sword } from "lucide-react";
import StatBlock from "../StatBlock";

describe("StatBlock", () => {
  it("renders stat name and value correctly", () => {
    render(
      <StatBlock
        name="Strength"
        value={15}
        modifier={2}
        icon={<Sword data-testid="sword-icon" />}
      />
    );

    expect(screen.getByText("Strength")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
    expect(screen.getByTestId("sword-icon")).toBeInTheDocument();
  });

  it("renders negative modifier correctly", () => {
    render(
      <StatBlock name="Dexterity" value={8} modifier={-1} icon={<Sword />} />
    );

    expect(screen.getByText("-1")).toBeInTheDocument();
  });
});
