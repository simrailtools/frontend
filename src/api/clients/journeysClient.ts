import { type BaseRequestOptions, SIT_BASE_URL, requestConditionalJson } from "@/api/client.ts";
import type { JourneyByIdRequestOptions, SitJourney } from "@/api/types/journeys.types.ts";
import { queryOptions } from "@tanstack/react-query";

/**
 * The base url for the journeys api client.
 */
const JOURNEYS_V1_BASE_URL = `${SIT_BASE_URL}/sit-journeys/v1`;

/**
 * Gets the details of a single journey by its id.
 * @param request the request options.
 */
export const journeyById = (request: BaseRequestOptions & JourneyByIdRequestOptions): Promise<SitJourney | null> => {
  const { id, abortSignal } = request;
  return requestConditionalJson<SitJourney>(
    {
      url: `${JOURNEYS_V1_BASE_URL}/by-id/{{id}}`,
      method: "GET",
      pathParams: {
        id,
      },
      abortSignal,
    },
    response => (response.ok ? "PARSE" : response.status === 404 ? "NULL" : "ERROR"),
  );
};

/**
 * Builds react-query options to get a journey by its id.
 * @param request the request options.
 */
export const journeyByIdQueryOptions = (request: JourneyByIdRequestOptions) =>
  queryOptions({
    queryKey: ["journeys", "by_id", request],
    queryFn: ({ signal }) =>
      journeyById({
        ...request,
        abortSignal: signal,
      }),
  });
