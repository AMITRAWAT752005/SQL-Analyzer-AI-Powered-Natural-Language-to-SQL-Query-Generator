export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    statusCode?: number;
}
export declare const sendSuccess: <T>(data: T, message?: string, statusCode?: number) => ApiResponse<T>;
export declare const sendError: (message: string, statusCode?: number) => ApiResponse<never>;
