import { Link } from "react-router-dom";

// Styles
import styles from "./Menu.module.css";

export default function Menu() {
  return (
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
  );
}
