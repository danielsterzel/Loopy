import type { Macro } from "../types/Macro";
import { apiGet, apiPost } from "./SpotifyApi";
import { BASE_URL } from "../common/APIBase";

type MacroCreationProps = {
  name: string;
  fromSong: string;
  toSong: string;
  crossfadeDuration: number;
};

export async function getUserMacros() {
  return apiGet<Macro[]>(`${BASE_URL}/api/macros`);
}

export async function postMacro({
  name,
  fromSong,
  toSong,
  crossfadeDuration,
}: MacroCreationProps) {
  return apiPost<Macro>(`${BASE_URL}/api/macros/create`, {
    name,
    fromSong,
    toSong,
    crossfadeDuration,
  });
}
