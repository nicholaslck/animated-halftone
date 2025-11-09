import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import AlgorithmList from "./AlgorithmList";

type AlgorithmPanelProps = React.PropsWithChildren;

function AlgorithmSidebarContent() {
  return <AlgorithmList className="px-4 w-80 grow is-drawer-close:hidden" />;
}

function AlgorithmSidebarButton() {
  return (
    <div className="m-4 tooltip tooltip-right" data-tip="Close">
      <label
        htmlFor="my-drawer-4"
        className="btn btn-outline btn-circle drawer-button"
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

function AlgorithmPanel({ children }: AlgorithmPanelProps) {
  return (
    <div className="drawer drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      {/* page content */}
      <div className="drawer-content fixed top-0 left-0 w-dvw">{children}</div>

      <div className="drawer-side is-drawer-open:shadow-2xl">
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
      </div>
    </div>
  );
}

export default AlgorithmPanel;
