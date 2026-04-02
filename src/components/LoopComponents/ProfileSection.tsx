import { Link } from "react-router-dom";

export function ProfileSection() {
  return (
    <div
      id="profile"
      className="flex scroll-mt-24 flex-col w-[80%] items-center justify-center gap-8 mt-32"
    >
      <div className="flex flex-col gap-4 items-center">
        <div
          className="w-fit border border-2 border-borderSubtle px-2 py-4
                rounded-lg hover:border-spotifyGreen transition-all duration-200"
        >
          <Link to="/profile">
            <i className="fa-solid fa-user text-6xl"></i>
          </Link>
        </div>
        <h1 className="text-5xl">Your profile page</h1>
      </div>

      <p className="text-2xl text-mutedText">
        Setup you profile, create your loops, view your stats and many more
      </p>
      <div className="grid grid-cols-3 gap-12">
        <div className="flex flex-col p-6 rounded-lg border-2 border-borderSubtle">
          <h2 className="text-2xl">Profile</h2>
          <div className=""></div>
        </div>
        <div className=" flex flex-col gap-4 p-6 rounded-lg border-2 border-borderSubtle">
          <h2 className="text-2xl">Loops</h2>
            <div>
                <ul className="flex flex-col gap-4">
                    <li><i className="fa-solid fa-music pr-2"></i>Best part of Fade</li>
                    <li><i className="fa-solid fa-music pr-2"></i>Absolute fire🔥</li>
                    <li><i className="fa-solid fa-music pr-2"></i>Solemn</li>
                </ul>
            </div>
        </div>
        <div className=" flex flex-col p-6 rounded-lg border-2 border-borderSubtle">
          <h2 className="text-2xl mb-2 underline">Statistics</h2>
            <div className="grid grid-cols-3 gap-4 justify-center items-center">
              <div className="aspect-square p-4 bg-bg3 text-center rounded-xl flex items-center justify-center">
                Total Loops
              </div>
              <div className="aspect-square p-4 bg-bg3 text-center rounded-xl flex items-center justify-center">
                Favourite genre
              </div>
              <div className="aspect-square p-4 text-center bg-bg3 rounded-xl flex items-center justify-center">
                Listening time
            </div>
          </div>
        </div>
      </div>
      {/* here will be a screenshot of a profile page how it looks etc at least I think so*/}
      <button
        className="bg-white mt-8 text-xl text-black p-4 rounded-lg hover:bg-white/95 
            transition-all duration-200"
      >
        <Link to="/profile">Go to your profile page</Link>
      </button>
    </div>
  );
}
