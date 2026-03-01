import { MainPage } from "./components/MainPage";
import { ChoosePlaylistPage } from "./components/ChoosePlaylistPage";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { CreateMacroPage } from "./components/CreateMacroPage";

function App() {
  // return <MainPage />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Navigate to="/mainpage" replace/>}/>
        <Route path={"/macros/create"} element={<CreateMacroPage />} />
        <Route path={"/mainpage"} element={<MainPage />} />
        <Route path={"/macros/create/playlists"} element={<ChoosePlaylistPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
