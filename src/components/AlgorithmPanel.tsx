import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import AlgorithmList from "./AlgorithmList";
import AlgorithmDescription from "./AlgorithmDescription";
import { isAlgorithmDescriptionSidebarOpen } from "../signals/ui";

type AlgorithmPanelProps = React.PropsWithChildren;

function AlgorithmSidebarContent() {
  return <AlgorithmList className="px-4 w-80 grow is-drawer-close:hidden" />;
}

function AlgorithmSidebarButton() {
  return (
    <div className="m-4 tooltip tooltip-right" data-tip="Close">
      <label
        htmlFor="my-drawer-4"
        className="btn btn-outline btn-circle drawer-button bg-neutral text-neutral-content"
      >
        <PanelLeftClose
          className="is-drawer-open:inline is-drawer-close:hidden"
          size={16}
        />
        <PanelLeftOpen
          className="is-drawer-close:inline is-drawer-open:hidden"
          size={16}
        />
      </label>
    </div>
  );
}

function AlgorithmDescriptionSidebar() {
  const isOpen = isAlgorithmDescriptionSidebarOpen.value;

  return (
    <div
      className={
        "is-drawer-close:hidden w-0 bg-gray-50 text-black flex flex-col max-h-dvh" +
        (isOpen ? " w-120" : "")
      }
    >
      <div className="flex flex-row-reverse">
        <button
          className={
            "btn btn-neutral btn-circle m-4" + (isOpen ? "" : " hidden")
          }
          aria-label="close"
          onClick={() => (isAlgorithmDescriptionSidebarOpen.value = false)}
        >
          <X size={16} />
        </button>
      </div>

      <AlgorithmDescription />
    </div>
  );
}

function AlgorithmPanel({ children }: AlgorithmPanelProps) {
  return (
    <div className="drawer drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      {/* page content */}
      <div className="drawer-content fixed top-0 left-0 w-dvw">{children}</div>

      <div className="drawer-side is-drawer-open:shadow-2xl relative flex overflow-y-hidden">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="is-drawer-close:w-14 is-drawer-open:w-80 bg-transparent flex flex-col items-start min-h-full is-drawer-open:bg-gray-50 overflow-x-hidden">
          {/* button to open/close drawer */}
          <AlgorithmSidebarButton />

          {/* sidebar content */}
          <AlgorithmSidebarContent />
        </div>
        <AlgorithmDescriptionSidebar />
      </div>
    </div>
  );
}

export default AlgorithmPanel;
