import { type BaseRequestOptions, SIT_BASE_URL, requestJson } from "@/api/client.ts";
import type { PaginatedResponse } from "@/api/types/common.types.ts";
import type { ListPointsRequestOptions, SitPoint } from "@/api/types/points.types.ts";
import { queryOptions } from "@tanstack/react-query";

/**
 * The base url for the points api client.
 */
const POINTS_V1_BASE_URL = `${SIT_BASE_URL}/sit-points/v1`;

/**
 * Lists the points that are registered in the backend.
 * @param request the request options defining which and how many points to return.
 */
export const listPoints = (
  request: BaseRequestOptions & ListPointsRequestOptions,
): Promise<PaginatedResponse<SitPoint>> => {
  const { countries, page, limit, abortSignal } = request;
  return requestJson<PaginatedResponse<SitPoint>>({
    method: "GET",
    url: `${POINTS_V1_BASE_URL}/`,
    queryParams: {
      countries,
      page: page?.toString(),
      limit: limit?.toString(),
    },
    abortSignal,
  });
};

/**
 * Builds react-query options to request the points registered in the backend.
 * @param request the request defining which points to request.
 */
export const listPointsQueryOptions = (request: ListPointsRequestOptions) =>
  queryOptions({
    queryKey: ["points", request],
    queryFn: ({ signal }) =>
      listPoints({
        ...request,
        abortSignal: signal,
      }),
  });
