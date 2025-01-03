import { queryOptions } from "@tanstack/react-query";
import { type BaseRequestOptions, requestConditionalJson, requestJson, SIT_BASE_URL } from "../client.ts";
import type {
  GetServerByCodeRequestOptions,
  GetServerByIdRequestOptions,
  ListServersRequestOptions,
  SitServer,
} from "../types/servers.types.ts";

/**
 * The base url for the servers api client.
 */
const SERVERS_V1_BASE_URL = `${SIT_BASE_URL}/sit-servers/v1`;

/**
 * List the servers that are registered in the backend.
 * @param request the request defining which servers to return.
 */
export const listServers = (request: BaseRequestOptions & ListServersRequestOptions): Promise<Array<SitServer>> => {
  const { includeOffline, includeDeleted, abortSignal } = request;
  return requestJson<Array<SitServer>>({
    method: "GET",
    url: `${SERVERS_V1_BASE_URL}/`,
    queryParams: {
      includeOffline: includeOffline?.toString(),
      includeDeleted: includeDeleted?.toString(),
    },
    abortSignal,
  });
};

/**
 * Builds react-query options to request the servers registered in the backend.
 * @param request the request defining which servers to request.
 */
export const listServersQueryOptions = (request: ListServersRequestOptions) =>
  queryOptions({
    queryKey: ["servers", request],
    queryFn: ({ signal }) =>
      listServers({
        ...request,
        abortSignal: signal,
      }),
  });

/**
 * Get information about a single server from the backend by its id.
 * @param request the request defining which server to fetch.
 */
export const serverById = (request: BaseRequestOptions & GetServerByIdRequestOptions): Promise<SitServer | null> => {
  const { serverId, abortSignal } = request;
  return requestConditionalJson<SitServer>(
    {
      method: "GET",
      url: `${SERVERS_V1_BASE_URL}/by-id/{{serverId}}`,
      pathParams: {
        serverId,
      },
      abortSignal,
    },
    response => {
      return response.ok ? "PARSE" : response.status === 404 ? "NULL" : "ERROR";
    },
  );
};

/**
 * Builds react-query options to fetch a single server from the backend by its id.
 * @param request the request defining which server to fetch.
 */
export const serverByIdQueryOptions = (request: GetServerByIdRequestOptions) =>
  queryOptions({
    queryKey: ["servers", "by_id", request],
    queryFn: ({ signal }) =>
      serverById({
        ...request,
        abortSignal: signal,
      }),
  });

/**
 * Get information about a single server from the backend by its code.
 * @param request the request defining which server to fetch.
 */
export const serverByCode = (
  request: BaseRequestOptions & GetServerByCodeRequestOptions,
): Promise<SitServer | null> => {
  const { serverCode, abortSignal } = request;
  return requestConditionalJson<SitServer>(
    {
      method: "GET",
      url: `${SERVERS_V1_BASE_URL}/by-code/{{serverCode}}`,
      pathParams: {
        serverCode,
      },
      abortSignal,
    },
    response => {
      return response.ok ? "PARSE" : response.status === 404 ? "NULL" : "ERROR";
    },
  );
};

/**
 * Builds react-query options to fetch a single server from the backend by its code.
 * @param request the request defining which server to fetch.
 */
export const serverByCodeRequestOptions = (request: GetServerByCodeRequestOptions) =>
  queryOptions({
    queryKey: ["servers", "by_code", request],
    queryFn: ({ signal }) =>
      serverByCode({
        ...request,
        abortSignal: signal,
      }),
  });
