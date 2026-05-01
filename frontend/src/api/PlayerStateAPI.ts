import type {PlayerState} from "../types/PlayerState.ts";
import { apiGet } from "./spotifyApi.ts";

import { BASE_URL } from "../common/APIBase.ts";

export function getPlayer()
{
    return apiGet<PlayerState>(`${BASE_URL}/api/player/currently/playing`);
}