import { FormInput, FormButton } from "components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useValidateForm } from "hooks";
import {
  togglePasswordInputInfo,
  passwordInputInfo,
  authStatusAction,
  fillGuestLoginCredentials,
} from "utils";

function Login() {
  const [passwordInfo, setPasswordInfo] = useState(passwordInputInfo);

  const [formErrorMessage, SetFormErrorMessage] = useState("");

  const [primaryFormButtonText, SetPrimaryFormButtonText] = useState("Login");

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { validateLogin } = useValidateForm({
    formErrorMessage,
    SetFormErrorMessage,
  });

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    authStatusAction(
      auth.status,
      auth.message,
      "Login",
      SetPrimaryFormButtonText,
      SetFormErrorMessage
    );
  }, [auth.status]);

  function togglePasswordInfo() {
    togglePasswordInputInfo(passwordInfo, setPasswordInfo);
  }


  return (
    <main className="main">
      <section className="auth-container">
        <form onSubmit={(e) => validateLogin(e)} className="auth-form">
          <FormInput
            info={{
              labelText: "Email",
              type: "text",
              minLength: "8",
              placeholder: "Enter email",
              name: "Email",
              value: userInfo.email,
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
              value: userInfo.password,
            }}
          />
          <span className="form-message">{formErrorMessage}</span>
          <FormButton
            info={{
              text: primaryFormButtonText,
              className: "primary-cta",
              name: "Login",
            }}
          />
        </form>
        <section className="auth-guest-wrapper">
          <button
            className="secondary-cta"
            onClick={() => fillGuestLoginCredentials(setUserInfo)}
          >
            Fill Test Credentials
          </button>
          <div className="alternative-auth-help">
            <span>New to 3on3 Doer?</span>
            <Link to="/signup">Signup Now</Link>
          </div>
        </section>
      </section>
    </main>
  );
}

export { Login };
