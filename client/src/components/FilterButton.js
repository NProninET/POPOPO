import React from "react";

function FilterButton(props) {
  return (
    <button
      type="button"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.title)}
      className="filtered-buttons"
    >
      {props.title}
    </button>
  );
}

export default FilterButton;