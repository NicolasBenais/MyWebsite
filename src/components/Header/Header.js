import { Link } from "react-router-dom";
import { useState } from "react";

// Styles
import styles from "./Header.module.css";

export default function Header() {
  const [shownMenu, setShownMenu] = useState(false);

  const handleShownMenu = () => {
    setShownMenu(!shownMenu);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>Nicolas B.</div>
      </Link>

      <nav className={shownMenu ? styles.shownMenu : styles.menu}>
        <Link
          to="/"
          className={styles.link}
          onClick={() => setShownMenu(false)}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={styles.link}
          onClick={() => setShownMenu(false)}
        >
          About
        </Link>
        <Link
          to="/contact"
          className={styles.link}
          onClick={() => setShownMenu(false)}
        >
          Contact
        </Link>
        <nav className={styles.social_mobile}>
          <a
            onClick={() => setShownMenu(false)}
            href="https://www.instagram.com/ninobns/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-instagram fa-xl"></i>
          </a>
          <a
            onClick={() => setShownMenu(false)}
            href="https://twitter.com/nino_bns"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-twitter fa-xl"></i>
          </a>
          <a
            onClick={() => setShownMenu(false)}
            href="https://github.com/NicolasBenais"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github fa-xl"></i>
          </a>
        </nav>
      </nav>

      <nav className={styles.social}>
        <a
          href="https://www.instagram.com/ninobns/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-instagram fa-xl"></i>
        </a>
        <a href="https://twitter.com/nino_bns" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-twitter fa-xl"></i>
        </a>
        <a
          href="https://github.com/NicolasBenais"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github fa-xl"></i>
        </a>
      </nav>
      <button
        className={shownMenu ? styles.opennedButton : styles.closedButton}
        onClick={handleShownMenu}
      >
        <span
          className={
            shownMenu ? styles.opennedButton_line : styles.closedButton_line
          }
        ></span>
      </button>
    </header>
  );
}
