export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: string[];
}