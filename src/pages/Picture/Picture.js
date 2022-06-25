import { useLocation } from "react-router-dom";

// Styles
import styles from "./Picture.module.css";

export default function Picture() {
  const location = useLocation();
  const { state } = location;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img
          className={styles.image}
          src={state.image.secure_url}
          alt={state.title}
        />

        <div className={styles.informations}>
          <h2 className={styles.h2}>{state.title}</h2>
          <p>{state.location}</p>
          <p>{state.date}</p>
        </div>
      </div>
    </main>
  );
}
