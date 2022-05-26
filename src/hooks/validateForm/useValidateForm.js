import { signupUser, loginUser, postTask } from "features";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

function useValidateForm({ formErrorMessage, SetFormErrorMessage }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  function isFormEntryCorrect(value) {
    if (value.length === 0 || value.trim().length === 0) {
      return false;
    }
    return true;
  }

  function validate(event) {
    const body = {};
    if (formErrorMessage !== "") {
      SetFormErrorMessage("");
    }
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      for (let [k, v] of formData.entries()) {
        if (isFormEntryCorrect(v)) {
          body[k] = v;
        } else {
          throw new Error(`${k} value: ${v} is not correct`);
        }
      }
      return body;
    } catch (error) {
      SetFormErrorMessage(error.message);
    }
  }

  function validateSignup(event) {
    try {
      const body = validate(event);
      if (body["Password"] === body["Confirm Password"]) {
        dispatch(signupUser(body));
      } else {
        throw new Error("Passwords do not match");
      }
    } catch (error) {
      SetFormErrorMessage(error.message);
    }
  }

  function validateLogin(event) {
    try {
      const body = validate(event);
      dispatch(loginUser({ email: body["Email"], password: body["Password"] }));
    } catch (error) {
      SetFormErrorMessage(error.message);
    }
  }

  function validateModal(event, hideModal, prevTaskInfo) {
    try {
      const body = validate(event);
      hideModal();
      body["IsDone"] = prevTaskInfo["IsDone"] ? prevTaskInfo["IsDone"] : false;
      body["DateAdded"] = prevTaskInfo["DateAdded"]
        ? prevTaskInfo["DateAdded"]
        : new Date().toDateString();
      body["_id"] = prevTaskInfo["_id"] ? prevTaskInfo["_id"] : uuid();
      dispatch(postTask({ taskInfo: body, uid: auth.uid, prevTaskInfo }));
    } catch (error) {
      SetFormErrorMessage(error.message);
    }
  }

  return { validateSignup, validateLogin, validateModal };
}

export { useValidateForm };
