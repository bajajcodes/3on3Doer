import "./Header.styles.css";
import { Hero } from "../hero/Hero";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "features";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <Hero />
      {!isLoggedIn && (
        <div className="auth-cta" onClick={() => navigate("/login")}>
          <span className="material-icons-outlined">login</span>
          <p>Login</p>
        </div>
      )}
      {isLoggedIn && (
        <div className="auth-cta" onClick={() => dispatch(logout())}>
          <span className="material-icons-outlined">logout</span>
          <p>Logout</p>
        </div>
      )}
    </header>
  );
}

export { Header };
