interface ApiResponse<T> {
  /**
   * True if request has succeed
   */
  success: boolean;
  /**
   * Data return by request
   */
  data?: T;
  /**
   * Message is provided if request has failed
   */
  message?: string;
}

export default ApiResponse;
