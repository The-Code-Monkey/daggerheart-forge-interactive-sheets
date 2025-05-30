
import { render } from "../../test-utils";
import Auth from "../Auth";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Mock supabase
jest.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
    },
  },
}));

describe("Auth Page", () => {
  it("renders correctly", () => {
    const { container } = render(<Auth />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
