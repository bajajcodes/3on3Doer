import "./Home.styles.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <main className="main">
        <section className="app-section">
          <img
            // eslint-disable-next-line no-undef
            src={process.env.PUBLIC_URL + "assets/logo/logo.svg"}
            alt="3on3 Doer representation symbol"
            className="hero-logo app-logo"
          />
          <h1 className="app-name">3on3 Doer</h1>
          <p className="app-description">
            A pomodoro app, which helps to finish tasks , not getting started
            with tasks.
          </p>
          <div className="home-cta">
            <button className="primary-cta" onClick={() => navigate("/tasks")}>
              Finish Tasks
            </button>
            <button
              className="secondary-cta"
              onClick={() => navigate("/pomodoro")}
            >
              Checkout Demo
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export { Home };
