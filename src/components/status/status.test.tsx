import { useStatus } from "../../hooks";
import { render, screen } from "../../test-utils";
import Status from "./status";

jest.mock("../../hooks");

describe("[Component] Status", () => {
  const renderComponent = () => {
    render(<Status />);
    return {
      progress: screen.queryByRole("progressbar"),
      availableIcon: screen.queryByLabelText("La salle est disponible"),
      unavailableIcon: screen.queryByLabelText("La salle est occupé"),
    };
  };

  beforeEach(() => {
    (useStatus as jest.Mock).mockReturnValue({
      isLoading: true,
    });
  });

  it("should render progress", () => {
    const { progress } = renderComponent();
    expect(progress).toBeInTheDocument();
  });

  it("should render available", () => {
    (useStatus as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: true,
    });
    const { availableIcon } = renderComponent();
    expect(availableIcon).toBeInTheDocument();
  });

  it("should render unavailable", () => {
    (useStatus as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: false,
    });
    const { unavailableIcon } = renderComponent();
    expect(unavailableIcon).toBeInTheDocument();
  });
});
