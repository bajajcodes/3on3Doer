import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth as firebaseLocalAuth, db } from "firebaseLocal";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

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
      return { uid: user.uid, name: userInfo["Full Name"] };
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
      return { uid: user.uid, name: userInfo["Full Name"] };
    } catch (error) {
      return rejectWithValue(error.message ?? "Error message NA");
    }
  }
);

export { signupUser, loginUser };
