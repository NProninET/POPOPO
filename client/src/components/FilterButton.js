import React from "react";
import { useDispatch } from "react-redux";
import { filterFilter } from "../reducers/actions";

function FilterButton(props) {
  let dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={() => dispatch(filterFilter(props.title))}
      className="filtered-buttons"
    >
      {props.title}
    </button>
  );
}

export default FilterButton;
