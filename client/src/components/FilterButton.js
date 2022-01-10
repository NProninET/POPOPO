import React from "react";

function FilterButton(props) {
  return (
    <button
      type="button"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
      className="filtered-buttons"
    >
      {props.name}
    </button>
  );
}

export default FilterButton;