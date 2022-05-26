import "./styles/styles.all.css";
import "react-toastify/dist/ReactToastify.css";
import { Header, Footer, Navigation, SideBar } from "components";
import { BrowserRouter } from "react-router-dom";
import { RouteSwitch } from "utils";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Navigation />
        <RouteSwitch />
        <SideBar />
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export { App };
