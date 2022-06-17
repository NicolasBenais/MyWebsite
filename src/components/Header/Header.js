import { Link } from "react-router-dom";

// Components
import HamburgerMenu from "../Menus/HamburgerMenu/HamburgerMenu";
import Menu from "../Menus/Menu/Menu";

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
      <div className={styles.menu}>
        <Menu />
      </div>
      {/* <div className={styles.hamburger_menu}>
        <HamburgerMenu />
      </div> */}
    </header>
  );
}
