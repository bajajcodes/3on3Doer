import "./Hero.styles.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero" onClick={() => navigate("/")}>
      <img
        // eslint-disable-next-line no-undef
        src={process.env.PUBLIC_URL + "assets/logo/logo.svg"}
        alt="3on3 Doer representation symbol"
        className="hero-logo"
      />
      <h1 className="hero-text">3on3 Doer</h1>
    </div>
  );
}

export { Hero };
