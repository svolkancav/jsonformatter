import type { ApiRequest, ApiResponse } from '../types';

const API_ENDPOINT = 'https://cn8n.forceget.com/webhook/json-processor';

export async function processJson(request: ApiRequest): Promise<ApiResponse> {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
