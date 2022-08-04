import { useState } from "react";

// Styles
import styles from "./Contact.module.css";

export default function Contact() {
  const [status, setStatus] = useState("Submit");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = event.target.elements;

    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    let response = await fetch(
      "https://nbns-my-website-contact.herokuapp.com/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      }
    );

    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };

  return (
    <main className={styles.main}>
      <p className={styles.text}>
        Interested for a shooting ?<br></br>Contact me 🤓 📷
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              placeholder="Your name"
              required
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="Your email"
              required
            />
          </div>
        </div>

        <div className={styles.input_container}>
          <label className={styles.label} htmlFor="message">
            Message:
          </label>
          <textarea
            className={styles.input}
            id="message"
            placeholder="Tell me about your project"
            cols="30"
            rows="10"
            required
          />
        </div>

        <button className={styles.button} type="submit">
          {status}
        </button>
      </form>
    </main>
  );
}
