import { Link } from "react-router-dom";

// Components
// import HamburgerMenu from "../Menus/HamburgerMenu/HamburgerMenu";
import Menu from "../Menus/Menu/Menu";

// Styles
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>Nicolas B.</div>
      </Link>
      <div className={styles.menu}>
        <Menu />
      </div>
      {/* <div className={styles.hamburger_menu}>
        <HamburgerMenu />
      </div> */}

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
    </header>
  );
}
