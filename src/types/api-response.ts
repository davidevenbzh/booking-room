interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export default ApiResponse;
