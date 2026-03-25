import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { MainPage } from "./components/LoopComponents/MainPage";

import { MacroMainPage } from "./components/MacroComponents/MacroMainPage";
import { ChoosePlaylistPage } from "./components/MacroComponents/ChoosePlaylistPage";

import { TrackListModal } from "./components/MacroComponents/TrackListModal";
import { CreateMacroPage } from "./components/MacroComponents/CreateMacroPage";
import { ProgressingBar } from "./components/UtilComponents/ProgressingBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainPage />}/>
        <Route path={"/macros/create"} element={<CreateMacroPage />} />
        <Route path={"/macros"} element={<MacroMainPage />} />
        <Route path={"/macros/create/playlists"} element={<ChoosePlaylistPage />}/>
      </Routes>
    </BrowserRouter>
    // <TrackListModal show={true} id={"2HjasDHXgoTEHYiB7nxL8C"} currentPlaylistNumberId={0} songType="fromSong"
    // onConfirmSong={() => {}}/>
  );
}

export default App;
