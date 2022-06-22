import { useLocation } from "react-router-dom";

// Styles
import styles from "./Picture.module.css";

export default function Picture() {
  const location = useLocation();
  const { state } = location;
  return (
    <main className={styles.main}>
      <img className={styles.image} src={state.image.secure_url} alt="" />
    </main>
  );
}
