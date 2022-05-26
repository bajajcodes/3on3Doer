import { createSlice } from "@reduxjs/toolkit";
import { postTask, getTasks, deleteTask } from "./thunks.tasksSlice";
import {
  initialState,
  thunkFulFilled,
  thunkRejected,
} from "./taskSlice.helpers";
import { thunkLoading } from "utils";

const name = "tasks";

const tasksSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [postTask.pending]: (state) => {
      thunkLoading(state);
    },
    [postTask.fulfilled]: (state, action) => {
      let tasks = [];
      if (state.tasks.find((task) => task._id === action.payload._id)) {
        tasks = state.tasks.map((task) => {
          if (task._id !== action.payload._id) {
            return task;
          } else {
            return action.payload;
          }
        });
      } else {
        tasks = state.tasks.concat(action.payload);
      }
      thunkFulFilled(state, "Task Added Successfully", action.payload, tasks);
    },
    [postTask.rejected]: (state, action) => {
      thunkRejected(state, action);
    },
    [getTasks.pending]: (state) => {
      thunkLoading(state);
    },
    [getTasks.fulfilled]: (state, action) => {
      const tasks = action.payload;
      thunkFulFilled(state, "Tasks Retrieved Successfully", {}, tasks);
    },
    [getTasks.rejected]: (state, action) => {
      thunkRejected(state, action, {}, []);
    },
    [deleteTask.pending]: (state) => {
      thunkLoading(state);
    },
    [deleteTask.fulfilled]: (state, action) => {
      const tasks = state.tasks.filter(
        (task) => task._id !== action.payload._id
      );
      thunkFulFilled(state, "Task Deleted Successfully", {}, tasks);
    },
    [deleteTask.rejected]: (state, action) => {
      thunkRejected(state, action);
    },
  },
});

const tasksReducer = tasksSlice.reducer;

export { tasksReducer, postTask, getTasks, deleteTask };
