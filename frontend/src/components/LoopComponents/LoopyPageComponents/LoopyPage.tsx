
import { PlayerProvider } from "../../../providers/PlayerProvider";
import { CreateLoop } from "./CreateLoop";
import { LoopyPageNavbar } from "./LoopyPageNavbar";
import { LiveLoopSection } from "./LiveLoopSection";

import { Introduction } from "./Introduction";

export function LoopyPage() {
  return (
    <div className="flex flex-col items-center">
      

      <LoopyPageNavbar />


      <div className="w-full max-w-[1200px] flex flex-col items-center">


        <div className="w-full mt-16">
          <Introduction />
        </div>

        <div className="w-full mt-24 flex justify-center">
          <PlayerProvider>
            <LiveLoopSection />
          </PlayerProvider>
        </div>

      </div>
    </div>
  );
}