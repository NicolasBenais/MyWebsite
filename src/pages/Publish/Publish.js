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
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  const [film, setFilm] = useState("");

  const handlePublish = async (event) => {
    event.preventDefault();

    if (picture && date && location && camera && lens && film) {
      if (Error) {
        setError(false);
      }
      setPublishment(true);

      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("date", date);
      formData.append("location", location);
      formData.append("camera", camera);
      formData.append("lens", lens);
      formData.append("film", film);

      try {
        const response = await axios.post(
          "https://nbns-my-website.herokuapp.com/publish",
          formData
        );

        navigate(`/backoffice/publication/${response.data.id}`);
      } catch (error) {
        console.log(error.message);
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
          placeholder="Camera: Canon AE-1"
          type="text"
          value={camera}
          onChange={(event) => setCamera(event.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Lens: Canon FD 50mm f/1.8"
          type="text"
          value={lens}
          onChange={(event) => setLens(event.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Film: Kodak Portra 400"
          type="text"
          value={film}
          onChange={(event) => setFilm(event.target.value)}
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
