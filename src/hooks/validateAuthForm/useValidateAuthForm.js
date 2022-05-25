import { signupUser, loginUser } from "features";
import { useDispatch } from "react-redux";

function useValidateAuthForm({ formErrorMessage, SetFormErrorMessage }) {
  const dispatch = useDispatch();

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

  return { validateSignup, validateLogin };
}

export { useValidateAuthForm };
