/**
 * A paginated response from the backend holding the items and if more pages are available.
 */
export type PaginatedResponse<T> = {
  items: Array<T>;
  morePages: boolean;
};
