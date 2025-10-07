export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationResults<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}
