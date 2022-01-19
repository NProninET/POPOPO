import axios from "axios";
import {
  TASKS_LOAD,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  TOGGLE_ALL_TASKS,
  DELETE_COMPLETED_TASKS,
  UPDATE_TASK,
} from "./types";

const apiURI = "http://localhost:8000/api/todo";

export function tasksLoad() {
  return async (dispatch) => {
    const response = await axios.get(apiURI);
    dispatch({
      type: TASKS_LOAD,
      tasks: response.data,
    });
  };
}

export function addTask(title) {
  return async (dispatch) => {
    await axios.post(`${apiURI}`, { title: title }).then((response) => {
      dispatch({
        type: ADD_TASK,
        tasks: response.data.data,
      });
    });
  };
}

export function deleteTask(id) {
  return async (dispatch) => {
    await axios.delete(`${apiURI}/${id}`).then((response) => {
      dispatch({
        type: DELETE_TASK,
        id,
      });
    });
  };
}

export function toggleTask(id, completed) {
  return async (dispatch) => {
    await axios
      .put(`${apiURI}/${id}`, { completed: !completed })
      .then((res) => {
        dispatch({
          type: TOGGLE_TASK,
          id,
          completed: !completed,
        });
      });
  };
}

export function deleteCompletedTasks() {
  return async (dispatch) => {
    await axios.delete(apiURI).then((res) => {
      dispatch({
        type: DELETE_COMPLETED_TASKS,
      });
    });
  };
}

export function updateTask(id, title) {
  return async (dispatch) => {
    await axios.put(`${apiURI}/${id}`, { title: title }).then(() => {
      dispatch({
        type: UPDATE_TASK,
        data: { id, title },
      });
    });
  };
}

export function toggleAllTasks(allChecked) {
  return async (dispatch) => {
    await axios.put(`${apiURI}`, { allChecked: !allChecked }).then((res) => {
      dispatch({
        type: TOGGLE_ALL_TASKS,
      });
    });
  };
}
