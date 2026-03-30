import { apiGet } from "./spotifyApi";

import type { Playlist } from "../types/Playlist";

import { BASE_URL } from "../common/APIBase";
import type { Track } from "../types/Track";

const PLAYLIST_BASE_URL = `${BASE_URL}/user/spotify`;

export async function getPlaylists()
{
    return apiGet<Playlist[]>(`${PLAYLIST_BASE_URL}/playlists`);
}

export async function getTracksForPlaylistId(id : string)
{
    console.log("PLAYLIST ID:", id);
    return apiGet<Track[]>(`${PLAYLIST_BASE_URL}/playlists/${id}/items`);
}