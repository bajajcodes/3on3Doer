import { Routes, Route } from "react-router-dom";
import { Home, NotFound, Login, Signup, Tasks, Pomodoro } from "pages";
import { CheckAuth } from "./CheckAuth";
import { RequiresAuth } from "./RequiresAuth";

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <CheckAuth>
            <Login />
          </CheckAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <CheckAuth>
            <Signup />
          </CheckAuth>
        }
      />
      <Route
        path="/tasks"
        element={
          <RequiresAuth>
            <Tasks />
          </RequiresAuth>
        }
      />
      <Route
        path="/pomodoro/:taskId"
        element={
          <RequiresAuth>
            <Pomodoro />
          </RequiresAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { RouteSwitch };
