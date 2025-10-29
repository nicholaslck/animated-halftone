import { Download, Focus, RefreshCw } from "lucide-react";
import { file, halftoneImage } from "../signals/data";
import { useContext, useRef } from "react";
import { EventContext } from "../contexts/EventContext";
import { imageData2PNG } from "../utils/image";

function ControlPanel() {
  const { dispatch } = useContext(EventContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    file.value = e.target.files ? e.target.files.item(0) : null;
  };

  const handleClearButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.files = null;
      file.value = null;
    }
  };

  const handleDownloadButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!halftoneImage.value) return;

    const link = document.createElement("a");
    link.href = imageData2PNG(halftoneImage.value);
    link.download = file.value!.name.replace(/\.[^/.]+$/, "") + "-halftone.png";
    link.click();
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10">
      <div className="shadow-md rounded-2xl bg-gray-50 text-gray-900 px-8 py-4 flex items-center gap-4 flex-wrap lg:flex-nowrap">
        <fieldset className="fieldset block">
          <legend className="fieldset-legend text-gray-900">
            Select a color image and see what it will be!
          </legend>
          <input
            ref={inputRef}
            type="file"
            className="file-input bg-gray-50 -mt-1.5"
            accept=".jpg,.png,.webp"
            onChange={handleFileChange}
            multiple={false}
          />
          <label className="label">
            Recommend image resolution around 512x512,
            <br />
            Accept .JPG, .PNG, .WEBP only.
          </label>
        </fieldset>

        <div className="pr-4 flex gap-2 flex-nowrap w-fit">
          <button className="btn btn-outline" onClick={handleClearButtonClick}>
            <RefreshCw size={16} />
            <span className="hidden md:inline">Clear</span>
          </button>

          <button
            className="btn btn-outline"
            onClick={() => dispatch("reset-camera")}
          >
            <Focus size={16} />
            <span className="hidden md:inline">Re-center</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={handleDownloadButtonClick}
            disabled={!halftoneImage.value}
          >
            <Download size={16} />
            <span className="hidden md:inline">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
