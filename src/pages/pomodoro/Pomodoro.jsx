import "./Pomodoro.styles.css";
import { PomodoroClock, Loader } from "components";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "utils";
import { getTask, postTask } from "features";

function Pomodoro() {
  const navigate = useNavigate();
  const location = useLocation();
  const [taskInfo, setTaskInfo] = useState(null);
  const [pomodoroInfo, setPomodoroInfo] = useState({
    start: false,
    pause: false,
    restart: false,
    done: false,
  });
  const uid = useSelector((state) => state.auth.uid);
  const { task, status, message } = useSelector((state) => state.tasks);
  const timerIdRef = useRef(null);
  const dispatch = useDispatch();

  function setTaskIsDone() {
    setPomodoroInfo((p) =>
      Object.assign({}, p, {
        start: false,
        pause: false,
        restart: false,
        done: true,
      })
    );
  }

  useEffect(() => {
    dispatch(getTask({ uid, taskId: location.pathname.split("/")[2] }));
  }, []);

  useEffect(() => {
    if (status === "failed") {
      Toast.warning(message);
    }
    if (status === "success" && task?.Title) {
      setTaskInfo((p) => Object.assign({}, p, task));
    }
  }, [status]);

  useEffect(() => {
    if (pomodoroInfo.done) {
      dispatch(
        postTask({
          prevTaskInfo: taskInfo,
          taskInfo: { ...taskInfo, IsDone: true },
          uid,
        })
      );
      Toast.success(`Task: ${taskInfo.Title} is Finished`);
    }
    // * Reset task status to not done
    else if (!pomodoroInfo.done && pomodoroInfo.restart) {
      dispatch(
        postTask({
          prevTaskInfo: taskInfo,
          taskInfo: { ...taskInfo, IsDone: false },
          uid,
        })
      );
      Toast.warning(`Task: ${taskInfo.Title} is Restarted`);
    }
  }, [pomodoroInfo]);

  return (
    <main className="main pomodoro-main">
      {taskInfo && (
        <section className="pomodoro-header">
          <button className="return-cta" onClick={() => navigate("/tasks")}>
            <span className="material-icons-outlined return-cta-icon">
              arrow_back
            </span>
            <span className="return-cta-text">Return To Tasks</span>
          </button>
        </section>
      )}
      {taskInfo && (
        <section className="pomodoro-body">
          <section className="pomodoro-actions">
            <PomodoroClock
              time={taskInfo.Time}
              info={pomodoroInfo}
              setTaskIsDone={setTaskIsDone}
              timerIdRef={timerIdRef}
            />
            <div className="pomodoro-actions-cta">
              <button
                className="cta-start"
                onClick={() =>
                  setPomodoroInfo((p) => ({
                    ...p,
                    start: true,
                    pause: false,
                    restart: false,
                  }))
                }
                disabled={
                  pomodoroInfo.done ||
                  pomodoroInfo.restart ||
                  pomodoroInfo.start
                }
              >
                <span className="material-icons-outlined">play_arrow</span>
                <span>{pomodoroInfo.pause ? "Resume" : "Start"}</span>
              </button>
              <button
                className="cta-pause"
                onClick={() => {
                  if (timerIdRef.current) {
                    setPomodoroInfo((p) => ({
                      ...p,
                      pause: true,
                      start: false,
                      restart: false,
                    }));
                  }
                }}
                disabled={pomodoroInfo.done || pomodoroInfo.pause}
              >
                <span className="material-icons-outlined">pause</span>
                <span>Pause</span>
              </button>
              <button
                className="cta-restart"
                onClick={() =>
                  setPomodoroInfo((p) => ({
                    ...p,
                    start: false,
                    pause: false,
                    restart: true,
                    done: false,
                  }))
                }
              >
                <span className="material-icons-outlined">restart_alt</span>
                <span>Restart</span>
              </button>
            </div>
          </section>
          <section className="pomodoro-description">
            <h1 className="pomodoro-title">{taskInfo.Title}</h1>
            <p className="pomodoro-description-text">{taskInfo.Description}</p>
            <div className="pomodoro-tags">
              <span>Tag :</span>
              <div className="tasks-tags">
                <span className="tag">{taskInfo.Tag}</span>
              </div>
            </div>
            <span>Date Added: {taskInfo.DateAdded}</span>
          </section>
        </section>
      )}
      {status === "loading" && !taskInfo && <Loader message={"Loading..."} />}
    </main>
  );
}

export { Pomodoro };
