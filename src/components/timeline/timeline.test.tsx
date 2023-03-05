import { addMinutes } from "date-fns";
import {
  useDeleteBookingMutation,
  useGetBookingsQuery,
  useGetMeQuery,
} from "../../store";
import { render, screen } from "../../test-utils";
import Timeline from "./timeline";

jest.mock("../../store");

describe("[Component] Timeline", () => {
  const deleteMock = jest.fn();
  const renderComponent = (bookingName: string) => {
    render(<Timeline />);
    return {
      progress: screen.queryByRole("progressbar"),
      name: screen.queryByText(bookingName),
      deleteButton: screen.queryByRole("button"),
    };
  };

  beforeEach(() => {
    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: {
        data: {
          id: "id",
          name: "Tony",
        },
      },
    });
    (useGetBookingsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    (useDeleteBookingMutation as jest.Mock).mockReturnValue([deleteMock]);
  });

  it("should render progress", () => {
    const { progress } = renderComponent("test");
    expect(progress).toBeInTheDocument();
  });

  it("should render some booking", () => {
    const booking = {
      id: "id-booking",
      start: addMinutes(new Date(), -10),
      end: addMinutes(new Date(), 10),
      name: "réunion",
      userId: "id",
    };
    (useGetBookingsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        data: [booking],
      },
    });
    const { name } = renderComponent(booking.name);
    expect(name).toBeInTheDocument();
  });

  it("should render button who can be clicked", () => {
    const booking = {
      id: "id-booking",
      start: addMinutes(new Date(), -10),
      end: addMinutes(new Date(), 10),
      name: "réunion",
      userId: "id",
    };
    (useGetBookingsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        data: [booking],
      },
    });
    const { deleteButton } = renderComponent(booking.name);
    expect(deleteButton).toBeInTheDocument();
    deleteButton?.click();
    expect(deleteMock).toHaveBeenCalled();
  });
});
