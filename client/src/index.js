import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const DATA = [
  // { name: "Купить хлеб", completed: false},
  // { name: "Пропылесосить", completed: false},
  // { name: "Помыть посуду", completed: false}
]

ReactDOM.render(
  <App tasks={DATA} />,
  document.getElementById('root')
);

// fetch("http://localhost:8000/api/todo", {
//   method: 'POST',
//   headers: {
//     "Content-type": "application/json"
//   },
//   body: JSON.stringify({
//     title: "Купить молоко",
//     completed: false
//   })
// })
// .then(response => response.json())
// .then(data => JSON.stringify(data))