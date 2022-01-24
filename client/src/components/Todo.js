import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask, updateTask } from "../reducers/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicSelect from "./BasicSelect";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [title, setTitle] = useState(props.title);
  const [color, setColor] = useState(props.color);

  console.log(color)

  const handleChangeColor = (newColor) => {
    setColor(newColor)
    dispatch(updateTask(props.id, title, newColor));
  }



  const dispatch = useDispatch();

  function handleChange(e) {
    const toastId = "Edit";
    toast.warning("Editing...", {
      toastId,
      hideProgressBar: true,
      autoClose: false,
    });
    setNewTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newTitle.trim() === "") {
      setEditing(false);
    } else {
      setTitle(newTitle.trim());
      dispatch(updateTask(props.id, newTitle));

      setEditing(false);
      toast.info("Todo has been updated", { hideProgressBar: true });
    }
  }

  function cancelChanges() {
    setNewTitle(title);
    setEditing(false);
    toast.dismiss("Edit");
  }

  const editingTemplate = (
    <form className="todo-edit" onSubmit={handleSubmit}>
      <div className="todo-item" style={{backgroundColor: color, opacity: 0.5}}>
        <label className="todo-item-label" htmlFor={props.id}>
          <input id={props.id} type="checkbox" className="todo-item-checkbox" style={{backgroundColor: color}} />
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
          style={{backgroundColor: color}}
        />
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="todo-item" style={{backgroundColor: color, opacity: 0.5}} onDoubleClick={() => setEditing(true)}>
      <label className="todo-item-label" htmlFor={props.id}>
        <input
          id={props.id}
          type="checkbox"
          className="todo-item-checkbox"
          checked={props.completed}
          onChange={() => dispatch(toggleTask(props.id, props.completed))}
        />
        <span className="custom-checkbox"></span>
        {props.title}
      </label>

      <input id={props.id} type="checkbox" className="danger-icon"></input>
      <label
        className="todo-danger"
        htmlFor={props.id}
        onClick={() => dispatch(deleteTask(props.id))}
      ></label>
      <BasicSelect onChange={handleChangeColor}/>
    </div>
  );

  return (
    <li className="todo-item-2" completed={props.completed ? "true" : "false"}>
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
}

export default Todo;
