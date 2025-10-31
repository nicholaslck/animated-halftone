interface AlgorithmListProps {
  className?: string;
}

function AlgorithmList({ className: _className }: AlgorithmListProps) {
  return (
    /* Sidebar content here */
    <ul className={_className}>
      {/* list item */}
      <li>
        <button
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Homepage"
        >
          <span className="is-drawer-close:hidden">Homepage</span>
        </button>
      </li>

      {/* list item */}
      <li>
        <button
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Settings"
        >
          <span className="is-drawer-close:hidden">Settings</span>
        </button>
      </li>
    </ul>
  );
}

export default AlgorithmList;
