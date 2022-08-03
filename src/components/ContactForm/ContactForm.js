import axios from "axios";
import { useState } from "react";

// Styles
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [isSubmite, setIsSubmite] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmite(!isSubmite);
    try {
      const response = await axios.post("http://localhost:4000/contact", {
        name,
        email,
        subject,
        message,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        className={styles.input}
        type="email"
        placeholder="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="subject"
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
      />
      <textarea
        className={styles.textarea}
        placeholder="your message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        cols="30"
        rows="10"
      ></textarea>
      <button className={styles.button} type="submite">
        send !
      </button>
    </form>
  );
}
