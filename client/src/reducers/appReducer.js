import {
  LOAD_TASKS,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  TOGGLE_ALL_TASKS,
  DELETE_COMPLETED_TASKS,
  UPDATE_TASK,
} from "./types";

const initialState = {
  tasks: [],
  filter: "All",
  allChecked: false,
};

export const appReducer = (state = initialState, action) => {
  const { tasks } = state;
  const { type, ...payload } = action;

  switch (type) {
    case LOAD_TASKS:
      return { ...state, ...payload };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...tasks, payload.task],
        allChecked: false,
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: tasks.filter((task) => payload.id !== task._id),
      };

    case TOGGLE_TASK:
      const updatedTasks = tasks.map((task) => {
        return {
          ...task,
          completed: payload.id === task._id ? !task.completed : task.completed,
        };
      });

      return {
        ...state,
        tasks: [...updatedTasks],
        allChecked: updatedTasks.every((c) => c.completed),
      };

    case UPDATE_TASK:
      const {
        data: { id, title },
      } = payload;
      const editedTaskList = tasks.map((task) => {
        if (id === task._id) {
          return { ...task, title };
        }
        return task;
      });

      return {
        ...state,
        tasks: [...editedTaskList],
      };

    case TOGGLE_ALL_TASKS:
      let allChecked = tasks.every((c) => c.completed);

      console.log(allChecked);
      const updatTasks = tasks.map((task) => {
        return { ...task, completed: !allChecked };
      });
      return {
        ...state,
        tasks: [...updatTasks],
        allChecked: !allChecked,
      };

    case DELETE_COMPLETED_TASKS:
      const deletedTasks = tasks.filter((todoItem) => !todoItem.completed);
      return {
        ...state,
        tasks: [...deletedTasks],
      };

    default:
      return state;
  }
};
