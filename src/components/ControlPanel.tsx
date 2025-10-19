import { RefreshCw } from "lucide-react";
import { useState } from "react";

function ControlPanel() {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files.item(0));
      console.debug(e.target.files.item(0));
    }
  };

  const handleConvertButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
      <div className="shadow-md rounded-2xl bg-gray-50 text-gray-900 px-8 py-4 flex items-center gap-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-gray-900">Pick a file</legend>
          <input
            type="file"
            className="file-input bg-gray-50 -mt-1.5"
            accept=".jpg,.png,.webp"
            onChange={handleFileChange}
          />
          <label className="label">
            Max size 2MB, Accept .JPG, .PNG, .WEBP only.
          </label>
        </fieldset>

        <button className="btn" onClick={handleConvertButtonClick}>
          <RefreshCw size={16} />
          Convert
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
