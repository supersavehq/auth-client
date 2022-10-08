import type { HttpResponse, Requester } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function post<T, D = any>(
  url: string,
  data: D
): Promise<HttpResponse<T>> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return {
    statusCode: response.status,
    data: json.data,
  };
}

export const fetchRequester: Requester = {
  post,
};
