import image from "../../../assets/meric-dagli-7NBO76G5JsE-unsplash.jpg";
import { usePlayer } from "../../../hooks/usePlayer";

import { ProgressingBar } from "../../UtilComponents/ProgressingBar";

export function CreateLoop() {

  const {playerState} = usePlayer();

  let duration = playerState?.item.durationMs ?? 0;


  return (
    <div className="w-full flex flex-col gap-8 justify-center items-center">
      {/* image placeholder */}
        <div className="flex flex-col gap-6">
          <div
            className="relative flex items-center justify-center w-80 h-80 
                bg-white/5 border border-white rounded-full">
            <div className="absolute inset-0 rounded-full"
            style={{background: "conic-gradient(#3b82f6 25%, transparent 0%)"}}>

            </div>
                <img
                className="w-64 h-64 rounded-full object-cover"
                src={image}>
                </img>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-xl border-b p-2 border-white">Loop name</label>
            <input type="text" className="focus:outline-none"></input>
          </div>

        </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <ProgressingBar beginning={0} end={100} duration={duration}/>
          </div>

      </div>
  );
}
