// Styles
import styles from "./Contact.module.css";

// Components
import ContactForm from "../../components/ContactForm/ContactForm";

export default function Contact() {
  return (
    <main className={styles.main}>
      <p>
        If you are interested for a shooting, feel free to contact me on my
        <a
          className={styles.links}
          href="https://www.instagram.com/ninobns/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Instagram{" "}
        </a>
        or by e-mail
      </p>
      <ContactForm />
    </main>
  );
}
