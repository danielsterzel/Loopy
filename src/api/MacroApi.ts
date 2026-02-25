import type { Macro } from "../types/Macro";
import { apiGet, apiPost } from "./SpotifyApi";
import { BASE_URL } from "../common/APIBase";

const MACRO_API_ENDPOINT_BASE_URL = BASE_URL + "/api/macros";

type MacroCreationProps = {
  name: string;
  fromSong: string;
  toSong: string;
  crossfadeDuration: number;
};

type MacroRenameProps = {
  id: number;
  name: string;
};

export async function getUserMacros() {
  return apiGet<Macro[]>(`${MACRO_API_ENDPOINT_BASE_URL}`);
}

export async function postMacro({
  name,
  fromSong,
  toSong,
  crossfadeDuration,
}: MacroCreationProps) {
  return apiPost<Macro>(`${MACRO_API_ENDPOINT_BASE_URL}/create`, {
    name,
    fromSong,
    toSong,
    crossfadeDuration,
  });
}

export async function postMacroNameChange({id, name}: MacroRenameProps)
{
  return apiPost<Macro>(`${MACRO_API_ENDPOINT_BASE_URL}/rename`, {id, name});
}

export async function postMacroReconfiguration(macro: Macro)
{
  return apiPost<Macro>(`${MACRO_API_ENDPOINT_BASE_URL}/save/configuration`, macro);
}