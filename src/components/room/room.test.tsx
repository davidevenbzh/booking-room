import { useGetResourceQuery } from "../../store";
import { render, screen } from "../../test-utils";
import Room from "./room";

jest.mock("../../store");
jest.mock("../status");
jest.mock("../create-booking");
jest.mock("../infos");
jest.mock("../timeline");

describe("[Component] Room", () => {
  const renderComponent = (meetNameText: string) => {
    render(<Room />);
    return {
      progress: screen.queryByRole("progressbar"),
      meetName: screen.queryByText(meetNameText),
    };
  };

  beforeEach(() => {
    (useGetResourceQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });
  });

  it("should render progress", () => {
    const { progress } = renderComponent("text");
    expect(progress).toBeInTheDocument();
  });

  it("should render title", () => {
    const meetNameText = "text";
    (useGetResourceQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          name: meetNameText,
        },
      },
    });
    const { meetName } = renderComponent(meetNameText);
    expect(meetName).toBeInTheDocument();
  });
});
