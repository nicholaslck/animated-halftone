import "./App.css";
import ControlPanel from "./components/ControlPanel";
import ParticleCanvas from "./components/ParticleCanvas";

function App() {
  return (
    <>
      {/*Canvas*/}
      <div className="bg-white fixed w-full h-full">
        <ParticleCanvas />
      </div>

      <img className="fixed top-0 left-0" src="/halftone_demo.png" />

      {/*Control*/}
      <ControlPanel />
    </>
  );
}

export default App;
