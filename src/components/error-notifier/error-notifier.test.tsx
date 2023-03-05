import { clearError } from "../../store";
import { render, screen, waitFor } from "../../test-utils";
import { type ErrorNotification } from "../../types";
import ErrorNotifier from "./error-notifier";

jest.mock("../../store");

describe("[Component] Error Notifier", () => {
  const renderComponent = (args: ErrorNotification) => {
    render(<ErrorNotifier />, {
      preloadedState: { errorNotification: args },
    });
    return {
      snack: screen.queryByRole("alert"),
    };
  };

  it("should display snackbar", () => {
    const { snack } = renderComponent({ message: "test", display: false });
    expect(snack).not.toBeInTheDocument();
  });

  it("should display snackbar", () => {
    const { snack } = renderComponent({ message: "test", display: true });
    expect(snack).toBeInTheDocument();
    waitFor(() => {
      expect(clearError).toHaveBeenCalled();
      expect(snack).not.toBeInTheDocument();
    });
  });
});
