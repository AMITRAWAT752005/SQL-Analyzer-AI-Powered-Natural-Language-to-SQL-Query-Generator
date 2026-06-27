export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export const sendSuccess = <T>(data: T, message = 'Success', statusCode = 200): ApiResponse<T> => ({
  success: true,
  data,
  message,
  statusCode,
});

export const sendError = (message: string, statusCode = 500): ApiResponse<never> => ({
  success: false,
  error: message,
  statusCode,
});
