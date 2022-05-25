import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "features";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export { store };
