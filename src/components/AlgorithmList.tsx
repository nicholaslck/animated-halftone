import { CheckCircle, Info } from "lucide-react";
import { HalftonerIDs, type HalftonerID } from "../algorithms";
import { algorithmId, currentAlgorithmIdForDescription } from "../signals/data";
import { isAlgorithmDescriptionSidebarOpen } from "../signals/ui";

interface AlgorithmListProps {
  className?: string;
}

interface AlgorithmItemProps {
  id: HalftonerID;
  onSelect: (id: HalftonerID) => void;
  onDescriptionSelect: (id: HalftonerID) => void;
}

function AlgorithmItem({
  id,
  onSelect,
  onDescriptionSelect,
}: AlgorithmItemProps) {
  return (
    <li className="list-row px-2 py-4 items-center">
      {/*<p className="list-col-grow">Floyd-Steinberg Error Diffusion</p>*/}
      <p className="list-col-grow">{id}</p>
      <button
        className="btn btn-sm btn-outline border-none"
        onClick={() => onDescriptionSelect(id)}
      >
        <Info size={22} />
      </button>

      {algorithmId.value === id ? (
        <button className="btn btn-sm btn-outline border-none bg-success text-success-content">
          <CheckCircle size={22} />
        </button>
      ) : (
        <button className="btn btn-sm btn-outline" onClick={() => onSelect(id)}>
          Apply
        </button>
      )}
    </li>
  );
}

function AlgorithmList({ className: _className }: AlgorithmListProps) {
  const handleAlgorithmSelected = (id: HalftonerID) => {
    algorithmId.value = id;
  };

  const handlerAlgorithmDescriptionSelected = (id: HalftonerID) => {
    currentAlgorithmIdForDescription.value = id;
    isAlgorithmDescriptionSidebarOpen.value = true;
  };

  return (
    /* Sidebar content here */
    <ul className={"list " + _className}>
      {/* list item */}

      {HalftonerIDs.map((id) => (
        <AlgorithmItem
          key={id}
          id={id}
          onSelect={handleAlgorithmSelected}
          onDescriptionSelect={handlerAlgorithmDescriptionSelected}
        />
      ))}

      {/* list item */}
    </ul>
  );
}

export default AlgorithmList;
