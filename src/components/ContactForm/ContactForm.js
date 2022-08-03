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

      console.log("test");
      setIsSubmite(!isSubmite);
    } catch (error) {
      console.log(error);
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
        Send !
      </button>
    </form>
  );
}

// const ContactForm = () => {
//   const [status, setStatus] = useState("Submit");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("Sending...");
//     const { name, email, message } = e.target.elements;
//     let details = {
//       name: name.value,
//       email: email.value,
//       message: message.value,
//     };
//     let response = await fetch("http://localhost:4000/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(details),
//     });
//     setStatus("Submit");
//     let result = await response.json();
//     alert(result.status);
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input type="text" id="name" required />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" required />
//       </div>
//       <div>
//         <label htmlFor="message">Message:</label>
//         <textarea id="message" required />
//       </div>
//       <button type="submit">{status}</button>
//     </form>
//   );
// };

// export default ContactForm;
