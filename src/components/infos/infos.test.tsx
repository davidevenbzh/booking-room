import { useStatus } from "../../hooks";
import { render, screen } from "../../test-utils";
import Infos from "./infos";

jest.mock("../../hooks");
describe("[Component] Infos", () => {
  const renderComponent = (currentMeetName: string, occupiedBy: string) => {
    render(<Infos />);
    return {
      progress: screen.queryByRole("progressbar"),
      meetName: screen.queryByText(
        `Nom de la réunion en cours: ${currentMeetName}`
      ),
      owner: screen.queryByText(`Organisateur: ${occupiedBy}`),
    };
  };

  beforeEach(() => {
    (useStatus as jest.Mock).mockReturnValue({
      isLoading: true,
      isAvailable: false,
      currentMeetName: undefined,
      occupiedBy: undefined,
    });
  });

  it("should render progress", () => {
    const { progress } = renderComponent("test", "test");
    expect(progress).toBeInTheDocument();
  });

  it("should render meet name and owner", () => {
    const meetNameText = "test";
    const ownerText = "toto";
    (useStatus as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: false,
      currentMeetName: meetNameText,
      occupiedBy: ownerText,
    });
    const { meetName, owner } = renderComponent(meetNameText, ownerText);
    expect(meetName).toBeInTheDocument();
    expect(owner).toBeInTheDocument();
  });
  it("should render meet name and owner", () => {
    const meetNameText = "test";
    const ownerText = "toto";
    (useStatus as jest.Mock).mockReturnValue({
      isLoading: false,
      isAvailable: true,
      currentMeetName: meetNameText,
      occupiedBy: ownerText,
    });
    const { meetName, owner, progress } = renderComponent(
      meetNameText,
      ownerText
    );
    expect(meetName).not.toBeInTheDocument();
    expect(progress).not.toBeInTheDocument();
    expect(owner).not.toBeInTheDocument();
  });
});
