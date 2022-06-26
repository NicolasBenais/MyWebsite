import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

// Styles
import styles from "./Publish.module.css";

export default function Publish({ isTokenPresent }) {
  const navigate = useNavigate();

  const [publishment, setPublishment] = useState(false);
  const [error, setError] = useState("");

  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [format, setFormat] = useState("");

  const handlePublish = async (event) => {
    event.preventDefault();

    if (picture && title && date && location && format) {
      if (error) {
        setError(false);
      }
      setPublishment(true);

      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("date", date);
      formData.append("location", location);
      formData.append("format", format.toLocaleLowerCase());

      try {
        const response = await axios.post(
          "https://nbns-my-website.herokuapp.com/publish",
          // "http://localhost:4000/publish",
          formData
        );

        navigate(`/backoffice/publication/${response.data.id}`);
      } catch (error) {
        console.log(error);
        setPublishment(false);
      }
    } else {
      setError("Please fill all fields");
    }
  };

  return !isTokenPresent ? (
    <Navigate to="/backoffice" />
  ) : (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handlePublish}>
        <h2 className={styles.h2}>Add picture in data</h2>

        <label className={styles.add_picture_button} htmlFor="file_input">
          <i
            className={picture ? "fa-solid fa-check" : "fa-solid fa-download"}
          ></i>
          <span>{picture ? "Picture added" : "Add picture"}</span>
        </label>
        <input
          className={styles.add_picture_input}
          id="file_input"
          type="file"
          onChange={(event) => setPicture(event.target.files[0])}
        />

        <input
          className={styles.input}
          placeholder="Title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Date: May 2022"
          type="text"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Location: Brussels, Belgium"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Format: Landscape or portrait"
          type="text"
          value={format}
          onChange={(event) => setFormat(event.target.value)}
        />

        {!publishment ? (
          <button className={styles.submite_button} type="submite">
            Save
          </button>
        ) : (
          <button className={styles.submite_button} disabled={true}>
            Loading...
          </button>
        )}

        {error && <div className={styles.message}>{error}</div>}
      </form>
    </main>
  );
}
