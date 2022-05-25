import "./styles/styles.all.css";
import { Header, Footer, Navigation, SideBar } from "components";
import { BrowserRouter } from "react-router-dom";
import { RouteSwitch } from "./RouteSwitch";

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
    </div>
  );
}

export { App };
