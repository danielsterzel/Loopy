import { MainPage } from "./components/MainPage";
import { ChangeSongsModal } from "./components/EditSongsModal";
function App() {

  // return <MainPage />;
  return <ChangeSongsModal show={true} fromSong={"Song A"} toSong={"Song B"} onCancel={() => {}} onSave={() => {}} />

}

export default App
