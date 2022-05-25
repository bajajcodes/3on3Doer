import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth as firebaseLocalAuth, db } from "firebaseLocal";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { LocalStorage } from "utils";

function getAuthInitialState() {
  const auth = LocalStorage.get("auth");
  if (auth === "NA") {
    return {
      uid: null,
      isLoggedIn: false,
    };
  }

  return {
    uid: auth.uid,
    isLoggedIn: auth.isLoggedIn,
  };
}

const initialStateAuthSlice = getAuthInitialState();

const initialState = {
  ...initialStateAuthSlice,
  hasError: false,
  status: "idle",
  message: "",
};

const name = "auth";

const signupUser = createAsyncThunk(
  "thunk/createUserWithEmailAndPassword",
  async (userInfo, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseLocalAuth,
        userInfo.Email,
        userInfo.Password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: userInfo.Email,
        name: userInfo["Full Name"],
        authProvider: "local",
        tasks: [],
        timestamp: serverTimestamp(),
        dateAdded: new Date().toDateString(),
      });
      return user.uid;
    } catch (error) {
      return rejectWithValue(error.message ?? "Error message NA");
    }
  }
);

const loginUser = createAsyncThunk(
  "thunk/signInWithEmailAndPassword",
  async (userInfo, { rejectWithValue }) => {
    try {
      const { email, password } = userInfo;
      const userCredential = await signInWithEmailAndPassword(
        firebaseLocalAuth,
        email,
        password
      );
      const user = userCredential.user;
      return user.uid;
    } catch (error) {
      return rejectWithValue(error.message ?? "Error message NA");
    }
  }
);

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    login: (state, payload) => {
      state.isLoggedIn = true;
      state.uid = payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.uid = null;
      state.hasError = false;
      state.status = "idle";
      state.message = "";
      LocalStorage.clear();
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.hasError = false;
      state.message = "Successful Signup";
      state.isLoggedIn = true;
      state.uid = action.payload;
      LocalStorage.set("auth", {
        isLoggedIn: state.isLoggedIn,
        uid: state.uid,
      });
    },
    [signupUser.rejected]: (state, action) => {
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
      });
    },
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.hasError = false;
      state.message = "Successful Login";
      state.isLoggedIn = true;
      state.uid = action.payload;
      LocalStorage.set("auth", {
        isLoggedIn: state.isLoggedIn,
        uid: state.uid,
      });
    },
    [loginUser.rejected]: (state, action) => {
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
      });
    },
  },
});

const { login, logout } = authSlice.actions;
const authReducer = authSlice.reducer;

export { authReducer, login, logout, signupUser, loginUser };
