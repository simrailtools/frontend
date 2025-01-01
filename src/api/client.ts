/**
 * The base url (http) for the sit api.
 */
export const SIT_BASE_URL = "https://apis.simrail.tools";

/**
 * Base request options that can be passed to all clients.
 */
export type BaseRequestOptions = {
  abortSignal?: AbortSignal;
};

/**
 * Specific request options for requests being sent by a client. This
 * should usually not be passed to a caller and only used inside an
 * api function to define it.
 */
export type RequestOptions = BaseRequestOptions & {
  url: string;
  method: string;
  body?: unknown;
  headers?: Record<string, string>;
  urlParams?: Record<string, string>;
};

/**
 * Sends a http request based on the given options to a server.
 * @param options the options to build the http request based on.
 */
export const request = (options: RequestOptions): Promise<Response> => {
  const { url, method, body, headers = {}, urlParams = {}, abortSignal } = options;

  const bodyData = JSON.stringify(body);
  const formattedUrl = url.replace(/{{(.*?)}}/g, (match, key) => urlParams[key] || match);

  // set content type to application/json if a body is provided
  // as the backend requires this in order to parse the body
  if (body) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(formattedUrl, {
    method,
    headers,
    body: bodyData,
    signal: abortSignal,
  });
};

/**
 * Requests json data from an url and parses the response content from json into an
 * object of type R.
 * @param options the options to build the http request based on.
 * @typeParam R the response object to parse from the response json.
 */
export const requestJson = async <R>(options: RequestOptions): Promise<R> => {
  const response = await request(options);
  if (!response.ok) {
    throw new Error(`Unable to request data from backend: ${response.statusText}`);
  }

  const responseContent = await response.json();
  return responseContent as R;
};

/**
 * Requests json data from an url and parses the response content from json into an
 * object of type R. Depending on the filter function and the server response this
 * method can also return null or throw an error. By default, the response is parsed
 * on 2XX response content and in all other cases an error is thrown.
 * @param options the options to build the http request based on.
 * @param filter the filter for responses received by the backend.
 * @typeParam R the response object to parse from the response json.
 */
export const requestConditionalJson = async <R>(
  options: RequestOptions,
  filter?: (response: Response) => "PARSE" | "NULL" | "ERROR",
): Promise<R | null> => {
  const response = await request(options);
  const responseFilter = filter || (response => (response.ok ? "PARSE" : "ERROR"));
  switch (responseFilter(response)) {
    case "PARSE": {
      const responseContent = await response.json();
      return responseContent as R;
    }
    case "NULL": {
      return null;
    }
    case "ERROR": {
      throw new Error(`Unable to request data from backend: ${response.statusText}`);
    }
  }
};
