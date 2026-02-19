import type { Song } from "../types/Song";
import type { Playlist } from "../types/Playlist";
import type { SearchResult } from "../types/SearchResult";
import { BASE_URL } from "../common/APIBase";

const PLAYLIST_API = "/api/spotify/playlists";

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

export function getPlaylists(playlistId: string) {
  const playlistTracks = `${PLAYLIST_API}/${playlistId}/tracks`;
  return apiGet<Playlist[]>(playlistTracks);
}

export function searchTrack(query: string) {
  return apiGet<SearchResult>(
    `/api/spotify/search?q=${encodeURIComponent(query)}`,
  );
}
