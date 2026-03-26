import { useCallback, useState } from "react";
import { useEffect } from "react";

import { SpotifyLogo } from "../UtilComponents/SpotifyLogo";
import { NoTextBlackSpotifyLogo } from "../UtilComponents/SpotifyLogo";
import { AudioWave } from "../UtilComponents/AudioWave";
import { VerticalAudioWave } from "../UtilComponents/VerticalAudioWave";
import { ProgressingBar } from "../UtilComponents/ProgressingBar";

import SongCover1 from "../../assets/laura-vinck-Hyu76loQLdk-unsplash.jpg";
import SongCover2 from "../../assets/1millikarat-KQ_DwS1225o-unsplash.jpg";
import SongCover3 from "../../assets/emile-seguin-R9OueKOtGGU-unsplash.jpg";
import SongCover4 from "../../assets/jake-blucker-tMzCrBkM99Y-unsplash.jpg";
import SongCover5 from "../../assets/fabrice-villard-Jrl_UQcZqOc-unsplash.jpg";

const TRANSITION = 1200;
const INTERVAL = 3000;

export function MainPage() {
  const [loopActive, setLoopActive] = useState(true);
  const [showCardDots, setShowCardDots] = useState(false);
  const [currentImage, setCurrentImage] = useState(SongCover1);
  const [stickMenu, setStickMenu] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [nextDisplayIndex, setNextDisplayIndex] = useState(1);

  const Images = [SongCover1, SongCover2, SongCover3, SongCover4];

  const redirectToSpotify = useCallback(() => {
    window.location.href = "http://127.0.0.1:8080/oauth2/authorization/spotify";
  }, []);

  const useActiveSection = (ids: string[]) => {
    const [active, setActive] = useState<string | null>(null);

    // useEffect(() => {

    //   const handleScroll = () => {
    //     const el = document.getElementById
    //   };

    // });

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(entry.target.id);
            }
          });
        },
        {
          rootMargin: "-100px 0px -70% 0px",
          threshold: 0,
        },
      );

      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      return () => observer.disconnect();
    }, [ids]);

    return active;
  };

  const toogleCardDots = useCallback(() => {
    setShowCardDots((prev) => !prev);
  }, []);

  const toogleLoop = useCallback(() => {
    setLoopActive((prev) => !prev);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (displayIndex + 1) % Images.length;

      setNextDisplayIndex(next);
      setIsTransitioning(true);

      setTimeout(() => {
        setDisplayIndex(next);
        setIsTransitioning(false);
      }, TRANSITION);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [displayIndex]);

  const active = useActiveSection(["dashboard", "Loopy", "License", "Support"]);

  return (
    <div>
      <div
        className="flex flex-col justify-center items-center min-h-screen w-full bg-siteBackground px-4 sm:px-6 lg:px-8">
        <div className="top-5  left-0 box-border px-32 h-full w-full flex justify-center items-start gap-12">
          <div className="text-3xl font-semibold whitespace-nowrap">
            L<i className="fa-solid fa-infinity text-spotifyGreen"></i>py
          </div>
          <ul className="flex gap-12  px-2 py-2">
            <li>
              <a
                href="#dashboard"
                className={`
              ${active === "dashboard" ? "border borderborderSubtle rounded-xl px-2 py-2" : "0"}`}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a href="#Loopy">Loopy</a>
            </li>
            <li className="text-disabledText">Macro - [under construction]</li>
            <li>License</li>
            <li>Profile</li>
            <li>Author</li>
            <li>Support</li>
          </ul>
        </div>
        <div
          id="dashboard"
          className="grid grid-cols-1 lg:grid-cols-2 border-0 lg:border lg:border-borderSubtle 
            rounded-lg py-12 px32 mt-24 w-full max-w-6xl h-[80%] scroll-mt-24"
        >
          <div className="px-16">
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
            <div className="pt-4 text-mutedText">
              Set and replay your favorite parts from any song found on Spotify.
              Choose which interval you'd like to listen again and again and
              enjoy!
            </div>
            <div className="pt-6">
              <button
                onClick={redirectToSpotify}
                className="m-2 flex items-center justify-center gap-4 lg:w-[90%]
               bg-white text-black text-sm px-2 py-[4px] rounded-md
               sm:w-[150px] sm:text-sm"
              >
                <NoTextBlackSpotifyLogo width={25} />
                Login with Spotify
              </button>
            </div>
          </div>
          <div className="">
            <div
              className="
                    relative
                    border border-borderSubtle
                    rounded-xl p-6 w-full max-w-md mx-auto
                    flex flex-col justify-center items-center"
              onMouseEnter={toogleCardDots}
              onMouseLeave={toogleCardDots}
            >
              <div className="flex items-center justify-center gap-4">
                <div className="mr-6 h-[200px] border border-r border-white" />
                <div className="relative w-[250px] h-[350px] rounded-md overflow-hidden border-2 border-white">
                  <img
                    src={Images[displayIndex]}
                    className={`
                            absolute w-full h-full object-cover
                            ${isTransitioning ? "transition-all duration-[1200ms] ease-in-out" : ""}
                            ${isTransitioning ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
                  />
                  <img
                    src={Images[nextDisplayIndex]}
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
              <div className="mt-2">
                <ProgressingBar beginning={20} end={60} width={300}/>
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
        <div
          id="Loopy"
          className="flex flex-col items-center justify-center
         text-5xl mt-64 scroll-mt-24 gap-8"
        >
          <div>
            L<i className="fa-solid fa-infinity text-spotifyGreen"></i>py a
            loopback player for Spotify
          </div>
          {/* <i className="fa-solid fa-arrow-rotate-left text-spotifyGreen"></i> */}
          <p className="text-mutedText w-full max-w-[50%] text-lg text-center text-pretty">
            Have you ever wanted to replay a specific part of a song on Spotify?
            If you did then allow me to introduce to you Loopy. Just set the
            interval you want to relisten to and enjoy!
          </p>
          <i className="fa-solid fa-arrow-down"></i>

          <div className="grid grid-cols-2 mt-16 gap-8">
            <div
              className="flex flex-col items-center px-6 py-6 
          justify-center border rounded-lg border-4 border-borderSubtle text-lg
          hover:scale-[1.02] transition-all duration-300"
            >
              <p className="text-xl">Choose your song</p>
              <div className="mt-6 flex items-center gap-4">
                <div
                  className="flex flex-col justify-center items-center 
                gap-4 px-4 py-4 rounded-md border-2 border-borderSubtle"
                >
                  <img src={SongCover5} width="80" className="rounded-md"></img>
                  <div className="w-full max-w-[100px] border-b border-gray" />
                  <div className="w-full max-w-[120px]"></div>

                  <div className="bg-borderSubtle w-24 h-2 rounded-full relative">
                    <div
                      className="absolute left-[0%] w-[40%]
                                      h-full bg-spotifyGreen rounded-full"
                    />
                    <div className="absolute rounded-full left-[30%] -translate-y-[2px] h-3 w-3 bg-white" />
                  </div>
                  <div className="flex gap-4">
                    <i className="fa-solid fa-backward-step text-sm"></i>
                    <i className="fa-solid fa-circle-pause"></i>
                    <i className="fa-solid fa-forward-step text-sm"></i>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <p className="text-xl">My Favourite Song</p>
                  <p className="text-lg">By Artist</p>
                  <span className="text-xs text-mutedText">
                    Spotify library
                  </span>
                  <div className="m-4 h-[80px] p-4 w-full max-w-[100px]">
                    <VerticalAudioWave />
                  </div>
                  <p className="mt-1 text-sm text-spotifyGreen animate-pulse">
                    Playing
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col rounded-lg items-center px-6 py-6 
          justify-center border border-4 border-borderSubtle text-lg
          hover:scale-[1.02] transition-all duration-300"
            >
              <div className="bg-borderSubtle w-[180px] h-[130px] overflow-hidden rounded-md">
                <img src={SongCover5} className="w-full h-full object-cover object-bottom"></img>
              </div>
              <div className="w-full max-w-[250px] border border-bottom mt-6"></div>
              <div className="mt-6  flex gap-4 text-2xl items-center">
                <i className="fa-solid fa-backward-step"></i>
                <i className="fa-solid fa-circle-pause text-3xl"></i>
                <i className="fa-solid fa-forward-step"></i>
              </div>
              <ProgressingBar beginning={10} end={30} width={300} />
            </div>
          </div>
        </div>
      </div>

      <div className="py6 w-[40%]">
        <p className="bg-elevatedBackground px-2 py-1 rounded-lg text-xs">
          Loopy v-alpha1.0
        </p>
      </div>
    </div>
  );
}
