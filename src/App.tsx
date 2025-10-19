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

      {/*Control*/}
      <ControlPanel />
    </>
  );
}

export default App;
