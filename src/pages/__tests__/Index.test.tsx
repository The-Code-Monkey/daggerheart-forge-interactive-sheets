import { render } from "../../test-utils";
import Index from "../Index";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("Index Page", () => {
  it("renders correctly", () => {
    const { container } = render(<Index />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
