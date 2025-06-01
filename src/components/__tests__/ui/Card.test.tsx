import { render, screen } from "../../../test-utils";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";

describe("Card", () => {
  it("renders card with content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
        <CardContent>Test content</CardContent>
      </Card>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies card styling", () => {
    render(<Card data-testid="card">Card content</Card>);
    const card = screen.getByTestId("card");
    expect(card).toHaveClass(
      "rounded-lg",
      "border",
      "text-card-foreground",
      "shadow-sm",
      "bg-gradient-to-br",
      "from-slate-800/80",
      "to-slate-900/80",
      "border-brand-500/30",
      "backdrop-blur-sm"
    );
  });
});
