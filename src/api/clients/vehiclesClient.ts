import { type BaseRequestOptions, SIT_BASE_URL, requestConditionalJson } from "@/api/client.ts";
import type { JourneyVehicleCompositionRequestOptions, SitJourneyComposition } from "@/api/types/vehicles.types.ts";
import { queryOptions } from "@tanstack/react-query";

/**
 * The base url for the vehicles api client.
 */
const VEHICLES_V1_BASE_URL = `${SIT_BASE_URL}/sit-vehicles/v1`;

/**
 * Get the vehicle composition of a single journey by its id.
 * @param request the request options.
 */
export const vehicleCompositionByJourneyId = (
  request: BaseRequestOptions & JourneyVehicleCompositionRequestOptions,
): Promise<SitJourneyComposition | null> => {
  const { journeyId, abortSignal } = request;
  return requestConditionalJson<SitJourneyComposition>(
    {
      method: "GET",
      url: `${VEHICLES_V1_BASE_URL}/by-journey/{{journeyId}}`,
      pathParams: {
        journeyId,
      },
      abortSignal,
    },
    response => (response.ok ? "PARSE" : response.status === 404 ? "NULL" : "ERROR"),
  );
};

/**
 * Builds react-query options to get a journey vehicle composition by the journey id.
 * @param request the request options.
 */
export const vehicleCompositionByJourneyIdQueryOptions = (request: JourneyVehicleCompositionRequestOptions) =>
  queryOptions({
    queryKey: ["journey_vehicles", "by_jid", request],
    queryFn: ({ signal }) =>
      vehicleCompositionByJourneyId({
        ...request,
        abortSignal: signal,
      }),
  });
