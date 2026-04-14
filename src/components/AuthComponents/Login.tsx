import { useAuth } from "../../auth/useAuth";
import { Navigate } from "react-router-dom";

import { NoTextBlackSpotifyLogo } from "../UtilComponents/SpotifyLogo";
import { redirectToSpotify } from "../../common/RedirectToSpotify";

export function Login() {
  const { user } = useAuth();
  if(user)
  {
    return <Navigate to="/" replace />
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-semibold">To continue you must login with spotify.</h1>
      <p className="text-mutedText max-w-[500px] text-center text-pretty">
        Note: that Loopy will require you to accept access to read your
        playlists, modify and read your player state as well as to read your
        profile
      </p>

      <button
        onClick={redirectToSpotify}
        className="w-max-[100px] h-max-[100px] 
        rounded-xl
        text-black bg-white
        flex items-center justify-center gap-2 p-4
        hover:bg-white/90 transition-color
        hover:scale-[1.02] transition-transform 
        duration-200
        text-2xl"
      >
        <NoTextBlackSpotifyLogo width={40} />
        <p>Login with Spotify</p>
      </button>
    </div>
  );
}
