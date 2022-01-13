import React, { useState } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [title, setTitle] = useState(props.title);

  function handleChange(e) {
    setNewTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newTitle.trim() === "") {
      console.log("new title === ''");
      // setTitle(title);
      setEditing(false);
    } else {
      console.log("trimmed title", newTitle);
      props.editTask(props.id, newTitle.trim());
      setTitle(newTitle.trim());
      setEditing(false);
    }
  }

  function cancelChanges() {
    setNewTitle(title);
    setEditing(false);
  }

  const editingTemplate = (
    <form className="todo-edit" onSubmit={handleSubmit}>
      <div className="todo-item">
        <label className="todo-item-label" htmlFor={props.id}>
          <input
            id={props.id}
            type="checkbox"
            className="todo-item-checkbox"
            checked={props.completed}
            onChange={() => props.toggleCompletedTask(props.id)}
          />
          <span className="custom-checkbox"></span>
        </label>
        <label className="todo-label" htmlFor={props.id}></label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          onChange={handleChange}
          value={newTitle}
          onBlur={cancelChanges}
          autoFocus={true}
        />
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="todo-item" onDoubleClick={() => setEditing(true)}>
      <label className="todo-item-label" htmlFor={props.id}>
        <input
          id={props.id}
          type="checkbox"
          className="todo-item-checkbox"
          checked={props.completed}
          onChange={() => props.toggleCompletedTask(props.id, props.completed)}
        />
        <span className="custom-checkbox"></span>
        {props.title}
      </label>

      <input id={props.id} type="checkbox" className="danger-icon"></input>
      <label
        className="todo-danger"
        htmlFor={props.id}
        onClick={() => props.deleteTask(props.id)}
      ></label>
    </div>
  );

  return (
    <li
      className="todo-item-2"
      onDoubleClick={() => setEditing(true)}
      completed={props.completed ? "true" : "false"}
    >
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;
