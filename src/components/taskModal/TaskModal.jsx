import "./TaskModal.styles.css";
import { useState, useEffect } from "react";
import { useValidateForm } from "hooks";
import { initialTaskInfo } from "utils";
import { Toast } from "utils";

function TaskModal({ options }) {
  const { showModal, taskInfo, setShowModal } = options;
  const [modalTaskInfo, setModalTaskInfo] = useState(initialTaskInfo);
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const { validateModal } = useValidateForm({
    formErrorMessage,
    SetFormErrorMessage,
  });

  function onInputChangeHandler(event) {
    const name = event.target?.name;
    const value = event.target?.value;
    setModalTaskInfo((p) => Object.assign({}, p, { [name]: value }));
  }

  function hideModal() {
    setShowModal(false);
  }

  function postTaskAction(e) {
    validateModal(e, hideModal, taskInfo);
    Toast.success(` Task ${taskInfo.Title === "" ? "Added" : "Updated"}`);
  }

  useEffect(() => {
    setModalTaskInfo((p) => Object.assign({}, p, taskInfo));
    return () => setModalTaskInfo(initialTaskInfo);
  }, [taskInfo]);

  return (
    <>
      <section
        className="modalBackground"
        style={{ display: showModal ? "block" : "none" }}
      ></section>
      <form
        onSubmit={(e) => {
          postTaskAction(e);
        }}
        className="task-modal"
        style={{ display: showModal ? "grid" : "none" }}
      >
        <button
          className="modal-close"
          onClick={() => hideModal()}
          type="button"
        >
          <span className=" material-icons-outlined">close</span>
        </button>
        <input
          type="text"
          placeholder="Add Title"
          className="modal-title"
          required
          name="Title"
          width="20"
          minLength="5"
          maxLength="40"
          value={modalTaskInfo.Title}
          onChange={(e) => onInputChangeHandler(e)}
        />
        <select
          className="modal-tag"
          placeholder="Add Tag"
          required
          name="Tag"
          value={modalTaskInfo.Tag}
          onChange={(e) => onInputChangeHandler(e)}
        >
          <option disabled value="">
            {" "}
            -- select an tag --{" "}
          </option>
          <option value="Intelligence">Intelligence</option>
          <option value="Strength">Strength</option>
          <option value="Social Skills">Social Skills</option>
        </select>
        <textarea
          type="text"
          className="modal-description"
          placeholder="Add Description"
          required
          name="Description"
          minLength="5"
          value={modalTaskInfo.Description}
          onChange={(e) => onInputChangeHandler(e)}
        ></textarea>
        <input
          type="number"
          className="modal-time"
          placeholder="Add Time"
          min="15"
          max="60"
          step="5"
          required
          name="Time"
          value={modalTaskInfo.Time}
          onChange={(e) => onInputChangeHandler(e)}
        />
        <span className="modal-empty">{formErrorMessage}</span>
        <div className="modal-actions">
          <button
            className="modal-action-cancel"
            onClick={() => hideModal()}
            type="button"
          >
            Cancel
          </button>
          <span className="modal-action-empty"></span>
          <button className="modal-action-add" type="submit">
            {taskInfo.Title === "" ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </>
  );
}

export { TaskModal };
