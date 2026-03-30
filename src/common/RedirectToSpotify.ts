import { BASE_URL } from "./APIBase";

  export function redirectToSpotify()
  {
    window.location.href = `${BASE_URL}/oauth2/authorization/spotify`
  }