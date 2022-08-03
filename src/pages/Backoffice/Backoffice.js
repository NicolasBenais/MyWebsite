import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Navigate } from "react-router-dom";

// Styles
import styles from "./Backoffice.module.css";

export default function Backoffice({ isTokenPresent, setIsTokenPresent }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://nbns-my-website.herokuapp.com/login",
        // "http://localhost:4000/login",
        {
          email,
          password,
        }
      );
      Cookies.set("token", response.data.token);
      setIsTokenPresent(true);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <main className={styles.main}>
      {isTokenPresent ? (
        <Navigate to="/backoffice/publish" />
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.form_input}
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <input
            className={styles.form_input}
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button className={styles.form_button} type="submit">
            Login
          </button>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
        </form>
      )}
    </main>
  );
}
