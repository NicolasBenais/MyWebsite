import { Link } from "react-router-dom";

// Styles
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <a
        className={styles.logo}
        href="https://www.instagram.com/ninobns/"
        target="_blank"
        rel="noreferrer"
      >
        Nicolas B.
      </a>
      <div className={styles.nav_container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/about" className={styles.link}>
            About
          </Link>
          <Link to="/contact" className={styles.link}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
