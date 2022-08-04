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
  const [thumbnail, setThumbnail] = useState(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handlePublish = async (event) => {
    event.preventDefault();

    if (picture && thumbnail && title && date && location) {
      if (error) {
        setError(false);
      }
      setPublishment(true);

      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("date", date);
      formData.append("location", location);

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

        <label className={styles.button_label} htmlFor="picture_input">
          <i
            className={picture ? "fa-solid fa-check" : "fa-solid fa-download"}
          ></i>
          <span>{picture ? "Picture added" : "Add picture"}</span>
        </label>
        <input
          className={styles.add_picture_input}
          id="picture_input"
          type="file"
          onChange={(event) => setPicture(event.target.files[0])}
        />

        <label htmlFor="thumbnail_input" className={styles.button_label}>
          <i
            className={thumbnail ? "fa-solid fa-check" : "fa-solid fa-download"}
          ></i>
          <span>{thumbnail ? "Thumbnail added" : "Add thumbnail"}</span>
        </label>
        <input
          className={styles.add_picture_input}
          id="thumbnail_input"
          type="file"
          onChange={(event) => setThumbnail(event.target.files[0])}
        />

        <label className={styles.label} htmlFor="title">
          Title:
        </label>
        <input
          className={styles.input}
          id="title"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label className={styles.label} htmlFor="date">
          Date:
        </label>
        <input
          className={styles.input}
          id="date"
          placeholder="May 2022"
          type="text"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <label className={styles.label} htmlFor="location">
          Location:
        </label>
        <input
          className={styles.input}
          id="location"
          placeholder="Brussels, Belgium"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        {!publishment ? (
          <button className={styles.button} type="submite">
            Save
          </button>
        ) : (
          <button className={styles.button} disabled={true}>
            Loading...
          </button>
        )}

        {error && <div className={styles.message}>{error}</div>}
      </form>
    </main>
  );
}
