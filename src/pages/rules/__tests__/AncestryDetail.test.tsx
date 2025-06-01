import { render, act } from "../../../test-utils";
import AncestryDetail from "../AncestryDetail";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ ancestryName: "human" }),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

// Mock supabase helpers
jest.mock("@/integrations/supabase/helpers", () => ({
  getSingleAncestryBySlug: jest.fn().mockResolvedValue({
    id: 1,
    name: "Human",
    slug: "human",
    description: "Versatile and adaptable",
    features: [
      {
        name: "Test Feature",
        description: "Test description",
      },
    ],
  }),
}));

describe("AncestryDetail Page", () => {
  it("renders correctly", async () => {
    const { container } = render(<AncestryDetail />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
