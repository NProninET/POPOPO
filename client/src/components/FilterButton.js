import React from "react";
import { useDispatch } from "react-redux";
import { filterTasks } from "../store/taskSlice";

function FilterButton(props) {
  let dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={() => dispatch(filterTasks(props.title))}
      className="filtered-buttons"
    >
      {props.title}
    </button>
  );
}

export default FilterButton;
