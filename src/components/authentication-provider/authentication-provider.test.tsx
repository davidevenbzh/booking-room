import { render, screen, waitFor } from "@testing-library/react";
import { addSeconds } from "date-fns";
import AuthenticationProvider from "./authentication-provider";
import { useAuthentication } from "../../hooks";

jest.mock("../../hooks");
describe("[Component] Authentication Provider", () => {
  const dummyText = "dummy text";
  const renderComponent = () => {
    render(
      <AuthenticationProvider>
        <p>{dummyText}</p>
      </AuthenticationProvider>
    );
    return {
      child: screen.queryByText(dummyText),
      errorText: screen.queryByText("Non connecté"),
      progress: screen.queryByRole("progressbar"),
      modal: screen.queryByRole("modal"),
      reloadButton: screen.queryByRole("button"),
    };
  };

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { reload: jest.fn() },
    });
  });

  beforeEach(() => {
    (useAuthentication as jest.Mock).mockReturnValue({
      isLoading: false,
      expirationDate: undefined,
      error: undefined,
    });
  });

  it("should display children", () => {
    const { child } = renderComponent();
    expect(child).toBeInTheDocument();
  });

  it("should display progress", () => {
    (useAuthentication as jest.Mock).mockReturnValue({
      isLoading: true,
      expirationDate: undefined,
      error: undefined,
    });
    const { progress } = renderComponent();
    expect(progress).toBeInTheDocument();
  });

  it("should display error", () => {
    (useAuthentication as jest.Mock).mockReturnValue({
      isLoading: false,
      expirationDate: undefined,
      error: {},
    });
    const { errorText } = renderComponent();
    expect(errorText).toBeInTheDocument();
  });

  it("should display modal when expirationDate - 60 sec is reach and a button can be clicked", () => {
    const currentDate = new Date();
    (useAuthentication as jest.Mock).mockReturnValue({
      isLoading: false,
      expirationDate: addSeconds(currentDate, 65),
      error: undefined,
    });

    const { modal, reloadButton } = renderComponent();
    waitFor(
      () => {
        expect(modal).toBeInTheDocument();
        expect(reloadButton).toBeInTheDocument();
        reloadButton?.click();
        expect(window.location.reload).toHaveBeenCalled();
      },
      { timeout: 10000 }
    );
  });
});
