interface Resource {
  name: string;
  minimumBookingDuration: number;
  maximumBookingDuration: number;
  bookingDurationStep: number;
}

export default Resource;
