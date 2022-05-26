import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function RequiresAuth({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  return !isLoggedIn ? (
    <Navigate to={"/login"} state={{ from: location.pathname }} replace />
  ) : (
    children
  );
}

export { RequiresAuth };
