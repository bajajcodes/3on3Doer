import { FormInput, FormButton } from "components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useValidateAuthForm } from "hooks";
import {
  togglePasswordInputInfo,
  passwordInputInfo,
  authStatusAction,
} from "utils";

function Signup() {
  const [passwordInfo, setPasswordInfo] = useState(passwordInputInfo);

  const [confirmPasswordInfo, setConfirmPasswordInfo] =
    useState(passwordInputInfo);

  const [formErrorMessage, SetFormErrorMessage] = useState("");

  const [primaryFormButtonText, SetPrimaryFormButtonText] = useState("Signup");

  const { validateSignup } = useValidateAuthForm({
    formErrorMessage,
    SetFormErrorMessage,
  });

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    authStatusAction(
      auth.status,
      auth.message,
      "Signup",
      SetPrimaryFormButtonText,
      SetFormErrorMessage
    );
  }, [auth.status]);

  function togglePasswordInfo() {
    togglePasswordInputInfo(passwordInfo, setPasswordInfo);
  }

  function toggleConfirmPasswordInfo() {
    togglePasswordInputInfo(confirmPasswordInfo, setConfirmPasswordInfo);
  }

  return (
    <main className="main">
      <form
        onSubmit={(e) => validateSignup(e)}
        className="auth-form auth-form-wo-container"
      >
        <FormInput
          info={{
            labelText: "Full Name",
            type: "text",
            minLength: "3",
            placeholder: "Enter full name",
            name: "Full Name",
          }}
        />
        <FormInput
          info={{
            labelText: "Email",
            type: "text",
            minLength: "8",
            placeholder: "Enter email",
            name: "Email",
          }}
        />
        <FormInput
          info={{
            labelText: "Password",
            type: passwordInfo.type,
            minLength: "8",
            icon: passwordInfo.icon,
            onIconClick: togglePasswordInfo,
            placeholder: "Enter password",
            name: "Password",
          }}
        />
        <FormInput
          info={{
            labelText: "Confirm Password",
            type: confirmPasswordInfo.type,
            minLength: "8",
            icon: confirmPasswordInfo.icon,
            onIconClick: toggleConfirmPasswordInfo,
            placeholder: "Enter password again",
            name: "Confirm Password",
          }}
        />
        <span className="form-message">{formErrorMessage}</span>
        <FormButton
          info={{ text: primaryFormButtonText, className: "primary-cta" }}
        />
        <div className="alternative-auth-help">
          <span>Already buddy to 3on3 Doer?</span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </main>
  );
}

export { Signup };
