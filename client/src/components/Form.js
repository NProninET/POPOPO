import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value.trim());
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      props.addTask(name);
      setName("");
    }
  }
  return (
    <form onSubmit={handleSubmit} >
      <div className="juju">
        <label htmlFor="new-todo-input" className="label__lg"></label>
     <input
        type="text"
        id="new-todo-input"
        placeholder="What needs to be done?"
        className="input_form"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      </div>

    </form>
  );
}

export default Form;
