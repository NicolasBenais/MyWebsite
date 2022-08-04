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
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.input}
            id="password"
            type="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button className={styles.button} type="submit">
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
