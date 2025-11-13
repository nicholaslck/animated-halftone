import "./App.css";
import { EventContextProvider } from "./assets/EventContextProvider";
import AlgorithmPanel from "./components/AlgorithmPanel";
import ControlPanel from "./components/ControlPanel";
import ParticleCanvas from "./components/ParticleCanvas";
import { algorithm } from "./signals/data";

function Title() {
  return (
    <h1 className="fixed top-4 right-4 z-10 text-lg text-nowrap bg-neutral text-neutral-50 py-2 px-4 rounded-full">
      {algorithm.value.name}
    </h1>
  );
}

function App() {
  return (
    <>
      <Title />

      <EventContextProvider>
        <AlgorithmPanel>
          {/*Canvas*/}
          <div className="bg-white fixed w-full h-full">
            <ParticleCanvas />
          </div>

          {/*Control*/}
          <ControlPanel />
        </AlgorithmPanel>
      </EventContextProvider>
    </>
  );
}

export default App;
