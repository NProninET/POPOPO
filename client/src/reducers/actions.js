import axios from "axios";
import {
  LOAD_TASKS,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  TOGGLE_ALL_TASKS,
  DELETE_COMPLETED_TASKS,
  UPDATE_TASK,
} from "./types";

const apiURI = "http://localhost:8000/api/todo";

export const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

export const FILTER_NAMES = Object.keys(FILTER_MAP);

export function loadTasks() {
  return async (dispatch) => {
    const response = await axios.get(apiURI);
    const allChecked = response.data.every((task) => task.completed);
    try {
      dispatch({
        type: LOAD_TASKS,
        tasks: response.data,
        allChecked,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterFilter(filter) {
  return async (dispatch) => {
    const response = await axios.get(apiURI);
    try {
      dispatch({
        type: LOAD_TASKS,
        tasks: response.data,
        filter,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function addTask(title) {
  return async (dispatch) => {
    axios.post(`${apiURI}`, { title }).then((response) => {
      try {
        dispatch({
          type: ADD_TASK,
          task: response.data.data,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
}

export function deleteTask(id) {
  return async (dispatch) => {
    axios.delete(`${apiURI}/${id}`).then(() => {
      try {
        dispatch({
          type: DELETE_TASK,
          id,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
}

export function toggleTask(id, completed) {
  return async (dispatch) => {
    axios.put(`${apiURI}/${id}`, { completed: !completed }).then(() => {
      try {
        dispatch({
          type: TOGGLE_TASK,
          id,
          completed: !completed,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
}

export function deleteCompletedTasks() {
  return async (dispatch) => {
    axios.delete(apiURI).then(() => {
      try {
        dispatch({
          type: DELETE_COMPLETED_TASKS,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
}

export function updateTask(id, title) {
  return async (dispatch) => {
    axios.put(`${apiURI}/${id}`, { title }).then(() => {
      try {
        dispatch({
          type: UPDATE_TASK,
          data: { id, title },
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
}

export function toggleAllTasks(allChecked) {
  return async (dispatch) => {
    axios.put(`${apiURI}`, { allChecked: !allChecked }).then(() => {
      try {
        dispatch({
          type: TOGGLE_ALL_TASKS,
        });
      } catch (error) {
        console.log(error);
      }
    });
  };
}
