import { useState, useEffect, useCallback } from "react";

import { useAuth } from "../../auth/useAuth";
import { redirectToSpotify } from "../../common/RedirectToSpotify";
import { Loading } from "../UtilComponents/Loading";

import { SpotifyLogo } from "../UtilComponents/SpotifyLogo";
import { NoTextBlackSpotifyLogo } from "../UtilComponents/SpotifyLogo";

import { AudioWave } from "../UtilComponents/AudioWave";
import { ProgressingBar } from "../UtilComponents/ProgressingBar";

import SongCover1 from "../../assets/laura-vinck-Hyu76loQLdk-unsplash.jpg";
import SongCover2 from "../../assets/1millikarat-KQ_DwS1225o-unsplash.jpg";
import SongCover3 from "../../assets/emile-seguin-R9OueKOtGGU-unsplash.jpg";
import SongCover4 from "../../assets/jake-blucker-tMzCrBkM99Y-unsplash.jpg";

const TRANSITION = 1200;
const INTERVAL = 3000;

export function DashboardCard() {
  const { loading } = useAuth();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [nextDisplayIndex, setNextDisplayIndex] = useState(1);
  const images = [SongCover1, SongCover2, SongCover3, SongCover4];

  const [loopActive, setLoopActive] = useState(true);

  const toogleLoop = useCallback(() => {
    setLoopActive((prev) => !prev);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (displayIndex + 1) % images.length;
      setNextDisplayIndex(next);
      setIsTransitioning(true);

      setTimeout(() => {
        setDisplayIndex(next);
        setIsTransitioning(false);
      }, TRANSITION);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [displayIndex]);

  if (loading) return <Loading />;

  return (
    <div
      id="dashboard"
      className="relative grid grid-cols-1 lg:grid-cols-2 border-0 lg:border lg:border-borderSubtle 
            rounded-lg py-12 px32 mt-48 w-full max-w-6xl h-[80%] scroll-mt-24
            shadow-md shadow-white/10"
    >
      <div className="px-16">
        {/* <div className="absolute bottom-5 left-50 border-l border-t border-r border-borderSubtle">
                      Loopy
                    </div> */}
        <div
          className="flex items-center gap-2 border border-spotifyGreen 
                        bg-cardBackground w-fit rounded-lg px-6 py-4"
        >
          <em>Integrated with</em>
          <div>{<SpotifyLogo width={100} />}</div>
        </div>

        <div className="pt-16 font-semibold lg:text-5xl text-pretty leading-snug">
          Loop your{" "}
          <span className="text-spotifyGreen"> favorite moments </span>
          on Spotify
        </div>
        <div className="pt-4 text-xl text-mutedText">
          Set and replay your favorite parts from any song found on Spotify.
          Choose which interval you'd like to listen again and again and enjoy!
        </div>
        <div className="pt-6">
          <button
            onClick={redirectToSpotify}
            className="m-2 flex items-center justify-center gap-2
            lg:w-[400px] sm:w-[150px]
               bg-white text-black text-sm px-2 py-[4px] rounded-md sm:text-sm"
          >
            <NoTextBlackSpotifyLogo width={25} />
            Login with Spotify
          </button>
        </div>
        <div className="">

          <p className="mt-16 text-md text-mutedText">
            Loopy works in the background allowing you to enjoy listeninig to
            your song without any additional windows!
          </p>
        </div>
      </div>
      <div className="">
        <div
          className="
                    relative
                    border border-borderSubtle
                    rounded-xl p-6 w-full max-w-md mx-auto
                    flex flex-col justify-center items-center"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="mr-6 h-[200px] border border-r border-white" />
            <div
              className="relative w-[250px] h-[350px] rounded-md overflow-hidden
            hover:scale-[1.02] transition-all duration-200 border-2 border-white"
            >
              <img
                src={images[displayIndex]}
                className={`
                            absolute w-full h-full object-cover
                            ${isTransitioning ? "transition-all duration-[1200ms] ease-in-out" : ""}
                            ${isTransitioning ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
              />
              <img
                src={images[nextDisplayIndex]}
                className={`
                      absolute w-full h-full object-cover
                      ${isTransitioning ? "transition-all duration-[1200ms] ease-in-out" : ""}
                      ${isTransitioning ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
                    `}
              />
            </div>
            <div className="ml-6 h-[200px] border border-r border-white" />
          </div>
          <div className="mt-4">Somethin here idk</div>

          <div className="py-6">
            <AudioWave />
          </div>
          {/* refactor make it clickable to pause then the audio
           wave will stop and change icon to play */}
          <div className="flex gap-4 items-center">
            <i className="fa-solid fa-shuffle text-lg"></i>
            <i className="fa-solid fa-backward-step text-lg"></i>
            <i className="fa-solid fa-circle-pause text-4xl"></i>
            <i className="fa-solid fa-forward-step text-lg"></i>
            <i className="fa-solid fa-repeat text-lg"></i>
          </div>
          <div className="w-full mt-2">
            <div className="flex gap-2 justify-center items-center">
              {/* <VolumeBar /> */}
              <div className="w-full">
              <ProgressingBar beginning={20} end={60} duration={300_000} />
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-2 items-center">
              <div className="flex flex-col justify-center items-center gap-1">
                <div
                  tabIndex={0}
                  onClick={toogleLoop}
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                    e.key === "Enter" && toogleLoop()
                  }
                  style={{
                    cursor: "pointer",
                    animationPlayState: loopActive ? "running" : "paused",
                  }}
                  className={`animate-[spin_3s_linear_infinite] ${
                    loopActive ? "text-spotifyGreen" : "text-disabledText"
                  }`}
                >
                  <i className="fa-solid fa-rotate-right" />
                </div>
                <div
                  className={`
                          w-1 h-1 rounded-full
                          ${loopActive ? "bg-spotifyGreen" : "bg-disabledText"}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
