import type { Macro } from "../types/Macro";
import { apiGet } from "./SpotifyApi";
import {BASE_URL} from "../common/APIBase";

export function getUserMacros()
{
    return apiGet<Macro[]>(`${BASE_URL}/api/macros`);
}