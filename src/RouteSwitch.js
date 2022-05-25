import { Routes, Route } from "react-router-dom";
import { Home, NotFound } from "pages";

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export { RouteSwitch };
