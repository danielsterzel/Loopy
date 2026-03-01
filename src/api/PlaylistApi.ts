import { apiGet } from "./SpotifyApi";

import type { Playlist } from "../types/Playlist";

import { BASE_URL } from "../common/APIBase";

const PLAYLIST_BASE_URL = `${BASE_URL}/user/spotify`;

export async function getPlaylists()
{
    return apiGet<Playlist[]>(`${PLAYLIST_BASE_URL}/playlists`);
}

