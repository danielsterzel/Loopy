import type {PlayerState} from "../types/PlayerState";
import { apiGet } from "./spotifyApi";

import { BASE_URL } from "../common/APIBase";

export function getPlayer()
{
    return apiGet<PlayerState>(`${BASE_URL}/api/player/currently/playing`);
}