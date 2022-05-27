import "./Task.styles.css";
import { useNavigate } from "react-router-dom";
import { postTask, deleteTask } from "features";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "utils";

function Task({ taskInfo, options }) {
  const { setShowModalState, taskInfoRef } = options;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  function navigateToPomodoroClock() {
    navigate(`/pomodoro/${taskInfo._id}`);
  }

  function showModal() {
    taskInfoRef.current = taskInfo;
    setShowModalState(true);
  }

  function toggleTaskStatus() {
    dispatch(
      postTask({
        prevTaskInfo: taskInfo,
        taskInfo: { ...taskInfo, IsDone: !taskInfo["IsDone"] },
        uid: auth.uid,
      })
    );
    if (!taskInfo["IsDone"]) {
      Toast.success("Task Finished");
    } else {
      Toast.info("Task Is Not Yet Finished");
    }
  }

  function deleteTaskAction() {
    dispatch(deleteTask({ taskInfo: taskInfo, uid: auth.uid }));
    Toast.warning("Task Deleted");
  }

  return (
    <div className="todo">
      <button
        className="todo-action todo-toggle-action"
        onClick={() => toggleTaskStatus()}
      >
        {!taskInfo.IsDone && (
          <span className="material-icons-outlined">add_task</span>
        )}
        {taskInfo.IsDone && (
          <span className="material-icons-outlined">remove_done</span>
        )}
      </button>
      <h3
        className={`todo-title ${taskInfo.IsDone ? "task-done" : ""}`}
        onClick={() => navigateToPomodoroClock()}
      >
        {taskInfo.Title}
      </h3>
      <button className="todo-action" onClick={() => showModal()}>
        <span className="material-icons-outlined">mode_edit</span>
      </button>
      <button
        className="todo-action todo-action-delete"
        type="button"
        onClick={() => deleteTaskAction()}
      >
        <span className="material-icons-outlined">delete_outline</span>
      </button>
    </div>
  );
}

export { Task };
