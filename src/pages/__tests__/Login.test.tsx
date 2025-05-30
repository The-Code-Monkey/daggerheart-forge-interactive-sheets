import { render } from "../../test-utils";
import Login from "../Login";

// Mock useAuth hook
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
  }),
}));

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Login Page", () => {
  it("renders correctly", () => {
    const { container } = render(<Login />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
