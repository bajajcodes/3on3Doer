const initialState = {
  hasError: false,
  status: "idle",
  message: "",
  tasks: [],
  task: {},
};

function checkTaskID(taskInfo) {
  if (!taskInfo._id) {
    throw new Error("Task id is not present");
  }
}
function checkUID(uid) {
  if (!uid) {
    throw new Error("User is not logged in or UID is undefined");
  }
}

function thunkFulFilled(state, message, task, tasks) {
  state.status = "success";
  state.hasError = false;
  state.message = message;
  state.task = task;
  state.tasks = tasks;
}

function thunkRejected(state, action, task = null, tasks = null) {
  state.status = "failed";
  state.hasError = true;
  if (action.payload) {
    state.message = action.payload;
  } else {
    state.message = action.error.message;
  }
  if (task !== null) {
    state.task = task;
  }
  if (tasks !== null) {
    state.tasks = tasks;
  }
}

export { initialState, checkTaskID, checkUID, thunkFulFilled, thunkRejected };
