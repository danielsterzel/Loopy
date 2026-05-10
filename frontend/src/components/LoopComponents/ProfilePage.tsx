import { useAuth } from "../../auth/useAuth";
import { Loading } from "../UtilComponents/Loading";
import { useNavigate } from "react-router-dom";
import { ProgressingBar } from "../UtilComponents/SliderBarView";
import { HorizontalDottedLine } from "../UtilComponents/HorizontalDottedLine";
import { VerticalDottedLine } from "../UtilComponents/VerticalDottedLine";

import type { User } from "../../types/User";
import { useState } from "react";

const BIG_IMG_INDEX = 0;
const SMALL_IMG_INDEX = 1;

export function ProfilePage() {
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [loopCount, setLoopCount] = useState(0);

  if (loading) return <Loading />;

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="flex flex-col w-screen h-screen py-8 px-12">
      <button className="self-start mb-4" onClick={goBack}><i className="text-4xl fa-solid fa-arrow-left"></i></button>
      <div className="border border-border rounded-lg bg-cardBackground p-8">
        <div className="grid grid-cols-2 gap-32">
          {/* Col 1 */}
          <div className="flex flex-col py-8 px-6 rounded-xl bg-bg3 border border-border">
            {/* imgwrapper */}
            <div className="flex justify-center h-auto bg-gradient-to-r from-emerald to-emeraldDark rounded-xl px-4 py-2">
              <img
                className="rounded-full w-64"
                src={user?.images.at(BIG_IMG_INDEX)?.url}
              ></img>
            </div>
            {/* User info */}
            <div className="flex flex-col gap-12 mt-6 p-14 text-3xl">
            <p className="">Username: {user?.display_name}</p>
            <p>Account created at 01.01.1970</p>
            </div>
          </div>
          {/* Col 2 */}
          <div className="grid grid-rows-2 rounded-xl py-8 px-6 gap-32">
            {/* Row1 */}
            <div className="bg-bg3 p-12 rounded-lg border border-border">
              <p className="text-3xl my-6 underline">My Loops:</p>
              <ul className="flex flex-col gap-6 pl-4 text-2xl">
                <li className="">
                  <div className="grid grid-cols-2 gap-2 items-center">
                    One Step Closer
                  </div>
                </li>
                <li>
                  <div className="grid grid-cols-2 gap-2 items-center">
                    Espresso
                  </div>
                </li>
                <li>
                  <div className="grid grid-cols-2 gap-2 items-center">
                    Beat It
                  </div>
                </li>
                <li>
                  <div className="grid grid-cols-2 gap-2 items-center">
                    Unbreakable heart
                  </div>
                </li>
                <li>
                  <div className="grid grid-cols-2 gap-2 items-center">
                    FortySix & Two
                  </div>
                </li>
                <li>
                  <div className="grid grid-cols-2 gap-2 items-center">
                    Rosetta stoned
                  </div>
                </li>
              </ul>
            </div>
            {/* Row2 */}
            <div className="flex flex-col justify-center bg-bg3 rounded-lg p-12 border border-border">
              <h1 className="text-3xl">Statistics:</h1>
              <div className="grid grid-cols-3 h-full gap-10 justify-center items-center">
                <div className="bg-cardBackground aspect-square w-full rounded-xl text-2xl border border-border flex items-center justify-center">
                  Total Loops
                </div>
                {
                  // on hover show number indicate that this is hoverable
                }
                <div className="bg-cardBackground aspect-square w-full rounded-xl text-2xl border border-border flex items-center justify-center">
                  {" "}
                  Favourite genere
                </div>
                <div className="bg-cardBackground aspect-square w-full rounded-xl text-2xl border border-border flex items-center justify-center">
                  Listening time
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
