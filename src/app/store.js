import { configureStore } from "@reduxjs/toolkit";
import { authReducer, tasksReducer } from "features";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

export { store };
