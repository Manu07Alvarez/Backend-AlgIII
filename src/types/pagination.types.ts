export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginationResults<T> {
    data: T[];
    total: number;
    totalPages: number;
    currentPage: number;
}