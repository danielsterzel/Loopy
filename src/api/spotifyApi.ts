import type { Song } from "../types/Song";
import type { Playlist } from "../types/Playlist";
import type { SearchResult } from "../types/SearchResult";

const PLAYLIST_API = "/api/spotify/playlists"



export async function apiGet<T>(path: string): Promise<T | null>
{
    const res = await fetch(path);
    if (res.status === 204) return null;
    if(!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
}

export function getPlaylists(playlistId: string)
{
    const playlistTracks = `${PLAYLIST_API}/${playlistId}/tracks`;
    return apiGet<Playlist[]>(playlistTracks);
}

export function searchTrack(query: string)
{
    return apiGet<SearchResult>(`/api/spotify/search?q=${encodeURIComponent(query)}`);
}