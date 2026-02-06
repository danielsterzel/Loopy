import type {PlayerState} from "../types/PlayerState";
import { apiGet } from "./SpotifyApi";

export function rawJson(path: string)
{
    return apiGet<any>(path);
}

export function getPlayer(path: string)
{
    return apiGet<PlayerState>(path);
}