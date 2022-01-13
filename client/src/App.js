import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

export function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const apiURI = "http://localhost:8000/api/todo";

  async function getMyTasks() {
    const response = await axios.get(apiURI);
    setTasks(response.data);
  }

  useEffect(() => {
    getMyTasks();
  }, []);

  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const filterList = FILTER_NAMES.map((title) => (
    <FilterButton
      key={title}
      title={title}
      isPressed={title === filter}
      setFilter={setFilter}
    />
  ));

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        key={task._id}
        id={task._id}
        title={task.title}
        completed={task.completed}
        toggleCompletedTask={toggleCompletedTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  async function deleteTask(id) {
    await axios.delete(`${apiURI}/${id}`).then((response) => {
      const del = tasks.filter((task) => id !== task._id);
      setTasks(del);
    });
  }

  async function editTask(id, newName) {
    await axios.put(`${apiURI}/${id}`, { title: newName }).then(() => {
      const editedTaskList = tasks.map((task) => {
        if (id === task._id) {
          return { ...task, title: newName.trim() };
        }
        return task;
      });
      setTasks(editedTaskList);
    });
  }

  async function addTask(title) {
    await axios.post(`${apiURI}`, { title: title }).then((response) => {
      const newTask = response.data.data;
      setTasks([...tasks, newTask]);
    });
  }

  async function deleteCompletedTasks() {
    await axios.delete(apiURI);
    setTasks(tasks.filter((todoItem) => !todoItem.completed));
  }

  async function toggleCompletedTask(id, completed) {
    await axios
      .put(`${apiURI}/${id}`, { completed: !completed })
      .then((res) => {
        const updatedTasks = tasks.map((task) => {
          if (id === task._id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        setTasks(updatedTasks);
      });
  }

  const tasksNoun = taskList.length !== 1 ? "items" : "item";
  const headingText = `${
    tasks.filter((task) => !task.completed).length
  } ${tasksNoun} left`;

  // const black = (
  //   <label
  //     className="chevron-bottom black-chevron"
  //     htmlFor="icon-checkbox"
  //   ></label>
  // );

  // const gray = (
  //   <label
  //     className="chevron-bottom gray-chevron"
  //     htmlFor="icon-checkbox"
  //   ></label>
  // );

  const allChecked = tasks.every((c) => c.completed);

  async function checkAll() {
    await axios.put(`${apiURI}`, { allChecked: !allChecked }).then((res) => {
      setTasks(
        tasks.map((d) => {
          return { ...d, completed: !allChecked };
        })
      );
    });
  }

  return (
    <>
      <h1 className="todosHeader">todos </h1>
      <ul role="list" className="todo-list" aria-labelledby="list-heading">
        <Form addTask={addTask} />
        {taskList}
        {tasks.length ? (
          <div className="main-buttons">
            <div className="heading-text">{headingText}</div>
            <div className="filter-buttons">{filterList}</div>
            <button className="clear-all" onClick={deleteCompletedTasks}>
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
              onClick={checkAll}
            ></input>
            <label
              className={
                allChecked
                  ? "chevron-bottom black-chevron"
                  : "chevron-bottom gray-chevron"
              }
              htmlFor="icon-checkbox"
            ></label>
            {/* {allChecked ? black : gray} */}
          </div>
        ) : (
          <div></div>
        )}
      </ul>
    </>
  );
}

export default App;
