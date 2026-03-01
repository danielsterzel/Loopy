import { MainPage } from "./components/MainPage";
import { PlaylistModal } from "./components/PlaylistModal";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
