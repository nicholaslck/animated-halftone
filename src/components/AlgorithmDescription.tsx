import { currentAlgorithmDescription } from "../signals/data";
import "../katex-swap.min.css";

function AlgorithmDescription() {
  const description = currentAlgorithmDescription.value;

  if (!description) {
    return (
      <div className="p-4">
        No description for this algorithm yet. Will update soon!
      </div>
    );
  }

  return (
    <div
      className="prose overflow-y-auto text-wrap p-4"
      dangerouslySetInnerHTML={{ __html: description.content }}
    />
  );
}

export default AlgorithmDescription;
