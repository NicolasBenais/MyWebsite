import { Link } from "react-router-dom";
import { useState } from "react";

// Styles
import styles from "./Contact.module.css";

export default function Contact() {
  const [status, setStatus] = useState("Submit");
  const [isSent, setIsSent] = useState(false);

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
    if (result.status === "Message sent") {
      setIsSent(true);
    }
  };

  return (
    <main className={styles.main}>
      <p className={styles.text}>
        Interested in a photo shoot ?<br></br>Contact me 🤓 📷
      </p>

      {!isSent ? (
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

          <div className={styles.textarea_container}>
            <label className={styles.label} htmlFor="message">
              Message:
            </label>
            <textarea
              className={styles.textarea}
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
      ) : (
        <div className={styles.message_sent_container}>
          <p className={styles.message_sent_text}>
            Your message has been sent !<br></br>I will contact you as soon as
            possible. Thank you 🤓
          </p>
          <Link className={styles.link} to="/">
            Back to home
          </Link>
        </div>
      )}
    </main>
  );
}
