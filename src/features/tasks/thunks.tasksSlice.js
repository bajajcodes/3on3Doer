import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebaseLocal";
import {
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { checkUID, checkTaskID } from "./taskSlice.helpers";

const postTask = createAsyncThunk(
  "thunk/postTask",
  async ({ prevTaskInfo, taskInfo, uid }, { rejectWithValue }) => {
    try {
      checkUID(uid);
      checkTaskID(taskInfo);
      const usersRef = doc(db, "users", uid);
      await updateDoc(usersRef, {
        tasks: arrayRemove(prevTaskInfo),
      });
      await updateDoc(usersRef, {
        tasks: arrayUnion(taskInfo),
      });
      return taskInfo;
    } catch (error) {
      return rejectWithValue(error.message ?? "Error message NA");
    }
  }
);

const getTasks = createAsyncThunk(
  "thunk/getTasks",
  async (uid, { rejectWithValue }) => {
    try {
      checkUID(uid);
      const usersRef = doc(db, "users", uid);
      const querySnapshot = await getDoc(usersRef);
      return querySnapshot.data().tasks;
    } catch (error) {
      return rejectWithValue(error.message ?? "Error message NA");
    }
  }
);

const deleteTask = createAsyncThunk(
  "thunk/deleteTask",
  async ({ taskInfo, uid }, { rejectWithValue }) => {
    try {
      checkUID(uid);
      checkTaskID(taskInfo);
      const usersRef = doc(db, "users", uid);
      await updateDoc(usersRef, {
        tasks: arrayRemove(taskInfo),
      });
      return taskInfo;
    } catch (error) {
      return rejectWithValue(error.message ?? "Error message NA");
    }
  }
);

const getTask = createAsyncThunk(
  "thunk/getTask",
  async ({ uid, taskId }, { rejectWithValue }) => {
    try {
      checkUID(uid);
      const usersRef = doc(db, "users", uid);
      const querySnapshot = await getDoc(usersRef);
      const task = querySnapshot
        .data()
        .tasks.find((task) => task._id === taskId);
      if (!task) {
        throw new Error("Task Does Not Exists for Id:" + taskId);
      }
      return task;
    } catch (error) {
      return rejectWithValue(error.message ?? "Error message NA");
    }
  }
);

export { postTask, getTasks, getTask, deleteTask };
