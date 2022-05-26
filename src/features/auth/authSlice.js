import { createSlice } from "@reduxjs/toolkit";
import {
  getAuthInitialState,
  thunkFulFilled,
  thunkRejected,
  logoutReducer,
} from "./authSlice.helpers";
import { thunkLoading } from "utils";
import { signupUser, loginUser } from "./thunks.authSlice";

const initialStateAuthSlice = getAuthInitialState();

const initialState = {
  ...initialStateAuthSlice,
  hasError: false,
  status: "idle",
  message: "",
};

const name = "auth";

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    login: (state, payload) => {
      state.isLoggedIn = true;
      state.uid = payload;
    },
    logout: (state) => {
      logoutReducer(state);
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      thunkLoading(state);
    },
    [signupUser.fulfilled]: (state, action) => {
      thunkFulFilled(state, action, "Successful Signup");
    },
    [signupUser.rejected]: (state, action) => {
      thunkRejected(state, action);
    },
    [loginUser.pending]: (state) => {
      thunkLoading(state);
    },
    [loginUser.fulfilled]: (state, action) => {
      thunkFulFilled(state, action, "Successful Login");
    },
    [loginUser.rejected]: (state, action) => {
      thunkRejected(state, action);
    },
  },
});

const { login, logout } = authSlice.actions;
const authReducer = authSlice.reducer;

export { authReducer, login, logout, signupUser, loginUser };
