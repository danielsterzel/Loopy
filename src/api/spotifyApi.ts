import type { SearchResult } from "../types/SearchResult";

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T | null> {
  const res = await fetch(path, {
    credentials: "include", // send cookies with request
    headers: {
      "Content-Type": "application/json",
      ...options?.headers, // if some additional headers add them
    },
    ...options,
  });
  if (res.status === 204) return null;

  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export async function apiGet<T>(path: string): Promise<T | null> {
  return apiFetch<T>(path);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T | null> {
  return apiFetch<T>(path, {
    method: "POST",
    body: JSON.stringify(body)  
  })
}
export async function apiDelete<T>(path: string) {
  return apiFetch<T>(path, {method: "DELETE"});
}

export function searchTrack(query: string) {
  return apiGet<SearchResult>(
    `/api/spotify/search?q=${encodeURIComponent(query)}`,
  );
}
