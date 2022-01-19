import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../reducers/actions";

function Form(props) {
  const [name, setName] = useState("");

  const dispatch = useDispatch()

  function handleChange(e) {
    const value = e.target.value;
    setName(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim().length) {
      dispatch(addTask(name.trim()));
      setName("");
    } else {
      setName("");
      alert("Не может быть пустым");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="juju">
        <label htmlFor="new-todo-input" className="label__lg"></label>
        <input
          type="text"
          id="new-todo-input"
          placeholder="What needs to be done?"
          className="input_form"
          name="text"
          value={name}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export default Form;
