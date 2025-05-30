import { render } from "../../test-utils";
import Campaigns from "../Campaigns";

describe("Campaigns Page", () => {
  it("renders correctly", () => {
    const { container } = render(<Campaigns />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
