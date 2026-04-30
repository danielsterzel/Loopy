
import { PlayerProvider } from "../../../providers/PlayerProvider.tsx";
import { CreateLoop } from "./CreateLoop.tsx";

import { LiveLoopSection } from "./LiveLoopSection.tsx";


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
