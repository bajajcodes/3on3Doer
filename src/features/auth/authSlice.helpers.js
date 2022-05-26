import { LocalStorage } from "utils";

function getAuthInitialState() {
  const auth = LocalStorage.get("auth");
  if (auth === "NA") {
    return {
      uid: null,
      isLoggedIn: false,
      name: null,
    };
  }

  return {
    uid: auth.uid,
    isLoggedIn: auth.isLoggedIn,
    name: auth.name,
  };
}

function thunkFulFilled(state, action, message) {
  state.status = "success";
  state.hasError = false;
  state.message = message;
  state.isLoggedIn = true;
  state.uid = action.payload.uid;
  LocalStorage.set("auth", {
    isLoggedIn: state.isLoggedIn,
    uid: state.uid,
    name: action.payload.name,
  });
}

function thunkRejected(state, action) {
  state.status = "failed";
  state.hasError = true;
  if (action.payload) {
    state.message = action.payload;
  } else {
    state.message = action.error.message;
  }
  state.isLoggedIn = false;
  state.uid = null;
  LocalStorage.set("auth", {
    isLoggedIn: state.isLoggedIn,
    uid: state.uid,
    name: null,
  });
}

function logoutReducer(state) {
  state.isLoggedIn = false;
  state.uid = null;
  state.hasError = false;
  state.status = "idle";
  state.message = "";
  state.name = null;
  LocalStorage.clear();
}

export { getAuthInitialState, thunkFulFilled, thunkRejected, logoutReducer };
