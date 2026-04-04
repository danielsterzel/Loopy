import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { MainPage } from "./components/LoopComponents/MainPage";

import { MacroMainPage } from "./components/MacroComponents/MacroMainPage";
import { ChoosePlaylistPage } from "./components/MacroComponents/ChoosePlaylistPage";
import { Login } from "./components/AuthComponents/Login";
import { TrackListModal } from "./components/MacroComponents/TrackListModal";
import { LoopyPage } from "./components/LoopComponents/LoopyPage";
import { CreateMacroPage } from "./components/MacroComponents/CreateMacroPage";
import { TestLoop } from "./components/LoopComponents/TestLoop";
import { ProtectedRoute } from "./route/ProtectedRoute";

import { ProfilePage } from "./components/LoopComponents/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainPage />}/>
        <Route element={<ProtectedRoute />}>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/profile"} element={<ProfilePage />}/>
          <Route path={"/Loopy"} element={<LoopyPage />} />
          <Route path={"/test"} element={<TestLoop/>}/>
          <Route path={"/macros/create"} element={<CreateMacroPage />} />
          <Route path={"/macros"} element={<MacroMainPage />} />
          <Route path={"/macros/create/playlists"} element={<ChoosePlaylistPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
