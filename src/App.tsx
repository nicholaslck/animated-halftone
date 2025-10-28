import "./App.css";
import { EventContextProvider } from "./assets/EventContextProvider";
import ControlPanel from "./components/ControlPanel";
import ParticleCanvas from "./components/ParticleCanvas";

function App() {
  return (
    <>
      <h1 className="fixed top-4 left-1/2 -translate-x-1/2 text-black z-10 text-lg">
        Floyd-Steinberg Dithering
      </h1>

      <EventContextProvider>
        {/*Canvas*/}
        <div className="bg-white fixed w-full h-full">
          <ParticleCanvas />
        </div>

        {/*Control*/}
        <ControlPanel />
      </EventContextProvider>
    </>
  );
}

export default App;
