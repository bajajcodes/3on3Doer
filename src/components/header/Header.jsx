import "./Header.styles.css";
import { Hero } from "../hero/Hero";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "features";
import { toast } from "react-toastify";


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
        <div className="auth-cta" onClick={() => {
          toast.info("Logged Out", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
          });
          dispatch(logout());
        }}>
          <span className="material-icons-outlined">logout</span>
          <p>Logout</p>
        </div>
      )}
    </header>
  );
}

export { Header };
