
import { render } from "../../test-utils";
import NotFound from "../NotFound";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/nonexistent",
  }),
}));

describe("NotFound Page", () => {
  it("renders correctly", () => {
    const { container } = render(<NotFound />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
