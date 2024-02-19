interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}
    
export type PaginatedResult<T> = {
    content: T[],
    pageable: Pageable;
    sort: Sort;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}