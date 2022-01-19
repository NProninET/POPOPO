import {
  TASKS_LOAD,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  TOGGLE_ALL_TASKS,
  DELETE_COMPLETED_TASKS,
  UPDATE_TASK,
} from "./types";

const initialState = {
  tasks: [],
  filter: 'All'
};

export const appReducer = (state = initialState, action) => {
  const allChecked = state.tasks.every((c) => c.completed);

  const { tasks } = state;
  const { id } = action;
  console.log("Tasks >>>", action);
  switch (action.type) {
    case TASKS_LOAD:
      return {
        tasks: action.tasks,
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...tasks, action.tasks],
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: tasks.filter((task) => id !== task._id),
      };

    case TOGGLE_TASK:
      const updatedTasks = tasks.map((task) => {
        if (id === task._id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      return {
        ...state,
        tasks: [...updatedTasks],
      };

    case UPDATE_TASK:
      const { data } = action;
      const editedTaskList = tasks.map((task) => {
        if (data.id === task._id) {
          return { ...task, title: data.title };
        }
        return task;
      });

      return {
        ...state,
        tasks: [...editedTaskList]
      };

    case TOGGLE_ALL_TASKS:
      const allChecked = tasks.every((c) => c.completed);
      const updatTasks = tasks.map((task) => {
        return { ...task, completed: !allChecked };
      })
      return {
          ...state,
          tasks: [...updatTasks]

      }

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
