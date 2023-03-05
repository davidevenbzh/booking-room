interface Booking {
  /**
   * Booking id
   */
  id: string;
  /**
   * Start date booking's
   */
  start: Date;
  /**
   * End date booking's
   */
  end: Date;
  /**
   * Booking name
   */
  name: string;
  /**
   * User id who create the booking
   */
  userId: string;
}

export default Booking;
