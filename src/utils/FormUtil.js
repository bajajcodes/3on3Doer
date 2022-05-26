import { toast } from "react-toastify";

const passwordInputInfo = {
  icon: "visibility",
  type: "password",
};

function authStatusAction(
  status,
  message,
  type,
  setFormButtonTextState,
  setFormErrorMessageState
) {
  if (status === "loading") {
    setFormButtonTextState("Loading...");
  }
  if (status === "failed") {
    setFormButtonTextState(type);
    setFormErrorMessageState(message);
  }
  if (status === "success") {
    setFormButtonTextState(type);
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
}

function togglePasswordInputInfo(state, setState) {
  if (state.icon === "visibility") {
    setState((p) => ({ ...p, icon: "visibility_off", type: "text" }));
  } else {
    setState((p) => ({ ...p, icon: "visibility", type: "password" }));
  }
}

function fillGuestLoginCredentials(setState) {
  setState((p) => ({
    ...p,
    email: "guestemail@login.com",
    password: "12345678",
  }));
}

export {
  togglePasswordInputInfo,
  passwordInputInfo,
  authStatusAction,
  fillGuestLoginCredentials,
};
