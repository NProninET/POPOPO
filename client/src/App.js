import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { FILTER_MAP, FILTER_NAMES } from "./store/taskSlice";

import {
  loadTasks,
  toggleAllTasks,
  deleteCompletedTasks,
} from "./store/taskSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  const state = useSelector((state) => state.tasks);
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const allChecked = useSelector((state) => state.tasks.allChecked);
 
  const dispatch = useDispatch();

  toast.configure();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const filterList = FILTER_NAMES.map((filter) => (
    <FilterButton key={filter} title={filter} />
  ));

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        key={task._id}
        id={task._id}
        color={task.color}
        title={task.title}
        completed={task.completed}
      />
    ));

  const tasksNoun = taskList.length !== 1 ? "items" : "item";
  const headingText = `${
    tasks.filter((task) => !task.completed).length
  } ${tasksNoun} left`;

  return (
    <>
      <h1 className="todosHeader">todos </h1>
      <ul role="list" className="todo-list" aria-labelledby="list-heading">
        <Form />
        {taskList}
        {tasks.length ? (
          <div className="main-buttons">
            <div className="heading-text">{headingText}</div>
            <div className="filter-buttons">{filterList}</div>
            <button
              onClick={() => dispatch(deleteCompletedTasks())}
              className="clear-all"
            >
              Clear completed
            </button>
          </div>
        ) : (
          <div></div>
        )}
        {tasks.length ? (
          <div>
            <input
              type="checkbox"
              id="icon-checkbox"
              className="allToggler"
              onClick={() => dispatch(toggleAllTasks(allChecked))}
            ></input>
            <label
              className={
                allChecked
                  ? "chevron-bottom black-chevron"
                  : "chevron-bottom gray-chevron"
              }
              htmlFor="icon-checkbox"
            ></label>
          </div>
        ) : (
          <div></div>
        )}
      </ul>
    </>
  );
}

export default App;
