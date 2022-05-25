import "./NotFound.styles.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="main place-in-center">
      <section className="not-found">
        <h1>404 Page not found!!</h1>
        <h3>
          This is complete waste of time, click below and finish your tasks.
        </h3>
        <Link to="/tasks">
          <button className="primary-cta">Finish Tasks</button>
        </Link>
      </section>
    </main>
  );
}

export { NotFound };
