
import { PlayerProvider } from "../../../providers/PlayerProvider";
import { CreateLoop } from "./CreateLoop";

import { LiveLoopSection } from "./LiveLoopSection";


export function LoopyPage() {

  return (
    <div className="min-h-screen flex flex-col items-center gap-12">
      <PlayerProvider>
        <LiveLoopSection />
        <CreateLoop />
      </PlayerProvider>


    </div>
  );
}
