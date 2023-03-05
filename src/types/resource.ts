interface Resource {
  /**
   * Room name
   */
  name: string;
  /**
   * Minimum time (in minutes) of a booking in the room
   */
  minimumBookingDuration: number;
  /**
   * Maximum time (in minutes) of a booking in the room
   */
  maximumBookingDuration: number;
  /**
   * Interval time (in minutes) of a booking in the room
   */
  bookingDurationStep: number;
}

export default Resource;
