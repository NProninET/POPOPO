import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiURI = "http://localhost:8000/api/todo";

export const loadTasks = createAsyncThunk("tasks/loadTasks", async () => {
  const response = await axios.get(apiURI);
  const data = response.data;
  return data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (title) => {
  const response = await axios.post(`${apiURI}`, { title });
  return response.data.data;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  const response = await axios.delete(`${apiURI}/${id}`);

  return response.data.data;
});

export const toggleTask = createAsyncThunk(
  "tasks/toggleTask",
  async ({ id, completed }) => {
    const response = await axios.put(`${apiURI}/${id}`, {
      completed: !completed,
    });
    return response.data.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, title, color }) => {
    await axios.put(`${apiURI}/${id}`, { title, color });
    const data = { id, title, color };
    return data;
  }
);

export const toggleAllTasks = createAsyncThunk(
  "tasks/toggleAllTasks",
  async (allChecked) => {
    await axios.put(`${apiURI}`, { allChecked: !allChecked });
    const data = !allChecked;
    return data;
  }
);

export const deleteCompletedTasks = createAsyncThunk(
  "tasks/deleteCompletedTasks",
  async () => {
    await axios.delete(apiURI);
  }
);

export const filterTasks = createAsyncThunk(
  "tasks/filterTasks",
  async (filter) => {
    return filter;
  }
);

export const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

export const FILTER_NAMES = Object.keys(FILTER_MAP);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    filter: "All",
    allChecked: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.allChecked = state.tasks.every((c) => c.completed);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.allChecked = state.tasks.every((c) => c.completed);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload._id
        );
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const updatedTasks = state.tasks.map((task) => {
          return {
            ...task,
            completed:
              action.payload._id === task._id
                ? !task.completed
                : task.completed,
          };
        });
        state.tasks = updatedTasks;
        state.allChecked = state.tasks.every((c) => c.completed);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, ...data } = action.payload;
        const editedTaskList = state.tasks.map((task) => {
          if (action.payload.id === task._id) {
            return { ...task, ...data };
          }
          return task;
        });
        state.tasks = editedTaskList;
      })
      .addCase(toggleAllTasks.fulfilled, (state, action) => {
        const updatedTasks = state.tasks.map((task) => {
          return { ...task, completed: action.payload };
        });
        state.tasks = updatedTasks;
        state.allChecked = action.payload;
      })
      .addCase(deleteCompletedTasks.fulfilled, (state) => {
        const deletedTasks = state.tasks.filter((task) => !task.completed);
        state.tasks = deletedTasks;
      })
      .addCase(filterTasks.fulfilled, (state, action) => {
        state.filter = action.payload;
      });
  },
});

export default taskSlice.reducer;
