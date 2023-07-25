export interface ApiResponse {
    errorMessage: string;
    statusCode: number;
    isSuccessful: boolean;
}

export interface ApiResponsePaginated extends ApiResponse {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
}