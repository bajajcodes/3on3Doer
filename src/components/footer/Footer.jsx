import "./Footer.styles.css";
import { Hero } from "../hero/Hero";

function Footer() {
  return (
    <footer className="footer">
      <Hero />
      <div></div>
      <section className="author-info">
        <h2 className="author-name">
          <span>Written ✍🏻 by</span>
          <span> Shubham Bajaj</span>
        </h2>
        <p className="author-words">
          3on3 Doer is an pomodoro which helps to finish tasks and to be 3/3 on
          Intelligence, Social Skills and Strength. It promotes finishing tasks,
          not getting started with tasks.
        </p>
      </section>
    </footer>
  );
}

export { Footer };
