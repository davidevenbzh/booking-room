import { fireEvent, render, screen, waitFor } from "../../test-utils";
import { useStatus } from "../../hooks";
import { usePostBookingMutation } from "../../store";
import CreateBooking from "./create-booking";

jest.mock("../../hooks");
jest.mock("../../store");
describe("[Component] Create Booking", () => {
  const postbookingMock = jest.fn();
  const renderComponent = () => {
    render(<CreateBooking />);
    return {
      button: screen.getByRole("button"),
      modal: screen.queryByRole("modal"),
      inputText: screen.queryByLabelText(
        "Nom de la réunion"
      ) as HTMLInputElement,
      inputSelect: screen.queryByRole("listbox") as HTMLInputElement,
      submitButton:
        screen
          .queryAllByRole("button")
          .find((button) => button.getAttribute("type") === "submit") ?? null,
    };
  };

  beforeEach(() => {
    (useStatus as jest.Mock).mockReturnValue({
      isAvailable: true,
      currentAvailableDurations: [10, 15],
    });
    (usePostBookingMutation as jest.Mock).mockReturnValue([postbookingMock]);
  });

  it("should display button", () => {
    const { button } = renderComponent();
    expect(button).toBeInTheDocument();
  });

  it("should button disabled", () => {
    (useStatus as jest.Mock).mockReturnValue({
      isAvailable: true,
      currentAvailableDurations: [],
    });
    const { button } = renderComponent();
    expect(button).toBeDisabled();
  });
  it("should button disabled", () => {
    const { button, modal } = renderComponent();
    waitFor(() => {
      button.click();
      expect(modal).toBeInTheDocument();
    });
  });

  it("should display input text", () => {
    const { button, inputText } = renderComponent();
    waitFor(() => {
      button.click();
      expect(inputText).toBeInTheDocument();
    });
  });

  it("should display input select", () => {
    const { button, inputSelect } = renderComponent();
    waitFor(() => {
      button.click();
      expect(inputSelect).toBeInTheDocument();
    });
  });

  it("should not submit form", () => {
    const { button, submitButton } = renderComponent();
    waitFor(() => {
      button.click();
      submitButton?.click();
      expect(postbookingMock).not.toHaveBeenCalled();
    });
  });

  it("should submit form", () => {
    const { button, submitButton, inputText } = renderComponent();
    waitFor(() => {
      button.click();
      fireEvent.change(inputText, { target: { value: "réunion" } });
      submitButton?.click();
      expect(postbookingMock).toHaveBeenCalled();
    });
  });
});
