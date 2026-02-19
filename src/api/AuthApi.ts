import { BASE_URL } from "../common/APIBase";

export function loginWithSpotify() : void
{
    window.location.href = `${BASE_URL}/oauth2/authorization/spotify`;
}

export function logout() : void 
{
    window.location.href = `${BASE_URL}/logout`;
}