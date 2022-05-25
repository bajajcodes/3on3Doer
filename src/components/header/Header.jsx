import "./Header.styles.css";
import { Hero } from "../hero/Hero";

function Header() {
  return (
    <header className="header">
      <Hero />

      <div className="auth-cta">
        <span className="material-icons-outlined">login</span>
        <p>Login</p>
      </div>
      {/* on merge of auth logic code, condition will be changed */}
      {false && (
        <div className="auth-cta">
          <span className="material-icons-outlined">logout</span>
          <p>Logout</p>
        </div>
      )}
    </header>
  );
}

export { Header };
