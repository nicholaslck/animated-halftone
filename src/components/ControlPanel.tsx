import { RefreshCw } from "lucide-react";
import { file } from "../signals/data";
import { useRef } from "react";

function ControlPanel() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    file.value = e.target.files ? e.target.files.item(0) : null;
  };

  const handleClearButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.files = null;
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10">
      <div className="shadow-md rounded-2xl bg-gray-50 text-gray-900 px-8 py-4 flex items-center gap-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-gray-900">
            Select a file
          </legend>
          <input
            ref={inputRef}
            type="file"
            className="file-input bg-gray-50 -mt-1.5"
            accept=".jpg,.png,.webp"
            onChange={handleFileChange}
          />
          <label className="label">
            Max size 2MB, Accept .JPG, .PNG, .WEBP only.
          </label>
        </fieldset>

        <button className="btn" onClick={handleClearButtonClick}>
          <RefreshCw size={16} />
          Clear
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
