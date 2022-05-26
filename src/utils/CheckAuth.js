import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function CheckAuth({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  const to = location.state?.from ?? "/tasks";
  return isLoggedIn ? <Navigate to={to} replace={true} /> : children;
}

export { CheckAuth };
