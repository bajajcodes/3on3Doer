import "./Tasks.styles.css";
import { Task, TaskModal } from "components";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "features";
import { initialTaskInfo } from "utils";
import { filterTags, getTasksCountMessage } from "./tasks.helpers";
import { Toast } from "utils";

function Tasks() {
  const [taskInfo, setTaskInfo] = useState(initialTaskInfo);
  const taskInfoRef = useRef(initialTaskInfo);
  const [showModalState, setShowModalState] = useState(false);
  const { tasks, status, message } = useSelector((state) => state.tasks);
  const [filterTag, setFilterTag] = useState("All");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function displayModal() {
    const tag = filterTag === "All" ? "" : filterTag;
    setTaskInfo({ ...initialTaskInfo, Tag: tag });
    setShowModalState(true);
  }

  function updateFilterTag(event) {
    const filterTag = event.target.textContent;
    setFilterTag(filterTag);
  }

  function filterTasks() {
    let filteredTasks = null;
    if (filterTag !== "All") {
      filteredTasks = tasks.filter((task) => task.Tag === filterTag);
    } else {
      filteredTasks = tasks;
    }
    return filteredTasks;
  }

  const filteredTasks = filterTasks();

  useEffect(() => {
    dispatch(getTasks(auth.uid));
  }, []);

  useEffect(() => {
    if (status === "failed") {
      Toast.error(message);
    }
  }, [status]);

  // * NOTE: this useEffect using taskInfoRef is used to do synchronous asynchronous taskInfo update
  useEffect(() => {
    setTaskInfo((p) => Object.assign({}, p, taskInfoRef.current));
  }, [taskInfoRef.current]);

  return (
    <main className="main tasks-main">
      <section className="tasks-header">
        <h1>Welcome, {auth.name}!</h1>
        <span className="text-lg">{getTasksCountMessage(tasks.length)}</span>
      </section>
      <section className="tasks-body">
        <div className="tasks-cta-header">
          <h3>To-Do List</h3>
          <button className="cta-action" onClick={() => displayModal()}>
            <span className="material-icons">add_circle</span>
          </button>
        </div>
        <div className="tasks-tags" onClick={(e) => updateFilterTag(e)}>
          {filterTags.map((tag, index) => (
            <span
              className={`tag ${filterTag === tag ? "active-tag" : ""}`}
              key={index}
            >
              {tag}
            </span>
          ))}
        </div>
        <section className="tasks-todo">
          {status === "success" &&
            filteredTasks.map((task) => (
              <Task
                key={task._id}
                taskInfo={task}
                options={{
                  setShowModalState,
                  taskInfoRef,
                }}
              />
            ))}
          {status === "loading" && tasks.length === 0 && <h1>{message}</h1>}
          {status === "success" && filteredTasks.length === 0 && (
            <h1>No Tasks Found</h1>
          )}
          {status === "loading" && tasks.length !== 0 && <h1>Loading</h1>}
        </section>
      </section>
      <TaskModal
        options={{
          showModal: showModalState,
          setShowModal: setShowModalState,
          taskInfo: taskInfo,
        }}
      />
    </main>
  );
}

export { Tasks };
