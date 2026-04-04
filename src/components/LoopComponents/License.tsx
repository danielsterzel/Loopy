import { SpotifyLogo } from "../UtilComponents/SpotifyLogo";

export function License() {
  return (
    <div id="license" className="py-64 mb-64 w-full scroll-mt-12">
      <div className="flex flex-col items-center  p-8 rounded-lg">
        <div className="flex gap-2 text-4xl justify-center items-center">
          {<SpotifyLogo width={200} />}
          <p className="underline ">Integration</p>
        </div>

        <div className="my-4 w-[60%] text-center text-pretty text-mutedText">
          Every app functionality was developed in accordance to Spotify's terms
          of service and according to Spotify's guidelines for developing user
          applications using Spotify Web API
        </div>
      </div>
    </div>
  );
}
