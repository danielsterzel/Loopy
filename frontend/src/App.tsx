import { BrowserRouter, Route, Routes} from "react-router-dom";

import { AuthProvider } from "./providers/AuthProvider.tsx";

import { MainPage } from "./components/LoopComponents/MainPage.tsx";

import { Login } from "./components/AuthComponents/Login.tsx";
import { LoopyPage } from "./components/LoopComponents/LoopyPageComponents/LoopyPage.tsx";
import { TestLoop } from "./components/LoopComponents/TestLoop.tsx";
import { ProtectedRoute } from "./route/ProtectedRoute.tsx";

import { ProfilePage } from "./components/LoopComponents/ProfilePage.tsx";
import { InternalRouter } from "./components/AuthComponents/InternalRouter.tsx";

function App() {
  return (
    <AuthProvider >
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MainPage />}/>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/callback"} element={<InternalRouter />} />
        <Route element={<ProtectedRoute />}>
          <Route path={"/profile"} element={<ProfilePage />}/>
          <Route path={"/Loopy"} element={<LoopyPage />} />
          <Route path={"/test"} element={<TestLoop/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
