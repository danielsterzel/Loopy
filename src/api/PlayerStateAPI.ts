import type {PlayerState} from "../types/PlayerState";
import { apiGet, apiPost } from "./spotifyApi";

import { BASE_URL } from "../common/APIBase";
import type { StartRepeatRequest } from "../types/StartRepeatRequest";

export function getPlayer()
{
    return apiGet<PlayerState>(`${BASE_URL}/api/player/currently/playing`);
}

export function StartRepeat(body : StartRepeatRequest)
{
    return apiPost<StartRepeatRequest>(`${BASE_URL}/api/player/repeat/start`, body);
}

export function StopRepeat()
{
    return apiPost<any>(`${BASE_URL}/api/player/repeat/end`, {});
}