import React, { useState, useEffect } from "react";
import axios from "axios"
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

export function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [checked, setChecked] = useState(false);
  // const [count, setCount] = useState(0)

  const getMyTasks = async () => {
    let response = await fetch("http://localhost:8000/api/todo")
    return await response.json()
  }
  // console.log(count)
  useEffect(() => {
    // fetch("http://localhost:8000/api/todo")
    //   .then(res => res.json())
    //   .then(result => setTasks(result))
    // async function go() {
    // let response = await 
    // axios.get("http://localhost:8000/api/todo").then(data => setTasks(data.data))
    // setTasks(response)
    // console.log(count)
    getMyTasks().then(res => setTasks(res))
    // go()
  }, []);

  // console.log(tasks)
  console.log(tasks.length)


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
        id={task._id}
        title={task.title}
        completed={task.completed}
        key={task._id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  function deleteTask(id) {
    // const remainingTasks = tasks.filter((task) => id !== task.id);
    // setTasks(remainingTasks);
    axios.delete(`http://localhost:8000/api/todo/${id}`)
  }

  function editTask(id, title) {
    // const editedTaskList = tasks.map((task) => {
    //   if (id === task.id) {
    //     return { ...task, title: newName };
    //   }
    //   return task;
    // });
    // setTasks(editedTaskList);
    axios.put(`http://localhost:8000/api/todo/${id}`, { title: title }).then(response => response)
  }

  const tasksNoun = taskList.length !== 1 ? "items" : "item";
  const headingText = `${tasks.filter((task) => task.completed === false).length
    } ${tasksNoun} left`;

  function addTask(title) {
    // const newTask = { id: Date.now(), title: title, completed: false };
    // setTasks([...tasks, newTask]);

    // fetch("http://localhost:8000/api/todo", {
    //   method: 'POST',
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     title: title,
    //     completed: false
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => JSON.stringify(data))

    axios.post("http://localhost:8000/api/todo", { title: title, completed: false }).then(response => response)
  }

  function doneTodos() {
    setTasks(tasks.filter((todoItem) => todoItem.completed === false));
  }

  function toggleTaskCompleted(id) {
    // const updatedTasks = tasks.map((task) => {
    //   if (id === task.id) {
    //     return { ...task, completed: !task.completed };
    //   }
    //   return task;
    // });

    // setTasks(updatedTasks);

    // const completedTasks = updatedTasks.every((c) => c.completed === true);
    // if (completedTasks) {
    //   setChecked(true);
    // } else {
    //   setChecked(false);
    // }
    axios.put(`http://localhost:8000/api/todo/${id}`, { completed: true }).then(response => response)
  }

  const black = (
    <label
      className="chevron-bottom black-chevron"
      htmlFor="icon-checkbox"
    ></label>
  );

  const gray = (
    <label
      className="chevron-bottom gray-chevron"
      htmlFor="icon-checkbox"
    ></label>
  );

  function checkAll() {
    const checked = tasks.some((c) => c.completed === true);
    const notChecked = tasks.every((c) => c.completed === false);
    const abcChecked = tasks.every((c) => c.completed === true);

    if (abcChecked) {
      setChecked(false);
      setTasks(
        tasks.map((d) => {
          return { ...d, completed: false };
        })
      );
    } else if (checked || notChecked) {
      setChecked(true);
      setTasks(
        tasks.map((d) => {
          return { ...d, completed: true };
        })
      );
    }
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
            <button className="clear-all" onClick={doneTodos}>
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
            {checked ? black : gray}
          </div>
        ) : (
          <div></div>
        )}
      </ul>
    </>
  );
}

export default App;
