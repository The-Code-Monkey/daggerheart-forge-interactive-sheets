import { render, screen } from "../../test-utils";
import Dashboard from "../Dashboard";

// Mock useAuth hook
jest.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: {
      id: "1",
      email: "test@example.com",
      user_metadata: { username: "TestUser" },
    },
    loading: false,
    signOut: jest.fn(),
  }),
}));

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("Dashboard", () => {
  it("renders dashboard content", () => {
    render(<Dashboard />);
    expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
  });

  it("renders correctly", () => {
    const { container } = render(<Dashboard />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
