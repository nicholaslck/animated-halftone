import { Info } from "lucide-react";
import { HalftonerIDs, type HalftonerID } from "../algorithms";
import { algorithmId } from "../signals/data";

interface AlgorithmListProps {
  className?: string;
}

interface AlgorithmItemProps {
  id: HalftonerID;
  onSelect: (id: HalftonerID) => void;
}

function AlgorithmItem({ id, onSelect }: AlgorithmItemProps) {
  return (
    <li className="list-row px-2 py-4 items-center">
      {/*<p className="list-col-grow">Floyd-Steinberg Error Diffusion</p>*/}
      <p className="list-col-grow">{id}</p>
      <button className="btn btn-sm btn-outline border-none">
        <Info size={22} />
      </button>
      <button className="btn btn-sm" onClick={() => onSelect(id)}>
        Apply
      </button>
    </li>
  );
}

function AlgorithmList({ className: _className }: AlgorithmListProps) {
  const handleAlgorithmSelected = (id: HalftonerID) => {
    // TODO: algorithmId is not updating, investigate.
    algorithmId.value = id;
  };

  return (
    /* Sidebar content here */
    <ul className={"list " + _className}>
      {/* list item */}

      {HalftonerIDs.map((id) => (
        <AlgorithmItem key={id} id={id} onSelect={handleAlgorithmSelected} />
      ))}

      {/* list item */}
    </ul>
  );
}

export default AlgorithmList;
