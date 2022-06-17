import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./Publish.module.css";

export default function Publish() {
  const navigate = useNavigate();

  const [publishment, setPublishment] = useState(false);

  const [data, setData] = useState();

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [film, setFilm] = useState("");
  const [camera, setCamera] = useState("");
  const [lens, setLens] = useState("");
  const [tag, setTag] = useState("");
  const [picture, setPicture] = useState(null);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  const handlePublish = async (event) => {
    event.preventDefault();

    if (date && location && film && camera && lens && tags && picture) {
      setError(false);
      setPublishment(true);

      const formData = new FormData();
      formData.append("date", date);
      formData.append("location", location);
      formData.append("film", film);
      formData.append("camera", camera);
      formData.append("lens", lens);
      formData.append("tags", tags);
      formData.append("picture", picture);

      try {
        const response = await axios.post(
          "https://nbns-my-website.herokuapp.com/publish",
          formData
        );
        console.log(response);
        setData(response.data);
        setPublishment(false);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <main className={styles.backoffice_main}>
      <h2 className={styles.h2}>Add picture in data</h2>
      <form className={styles.form} onSubmit={handlePublish}>
        <label className={styles.add_picture_button} htmlFor="file_input">
          <i className="fa-solid fa-download"></i>
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
          placeholder="Date"
          type="text"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Film"
          type="text"
          value={film}
          onChange={(event) => setFilm(event.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Camera"
          type="text"
          value={camera}
          onChange={(event) => setCamera(event.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Lens"
          type="text"
          value={lens}
          onChange={(event) => setLens(event.target.value)}
        />
        <div className={styles.div_tag}>
          <input
            className={styles.input}
            placeholder="Tag"
            type="text"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          />
          <button
            className={styles.tag_button}
            type="button"
            onClick={() => {
              if (tag) {
                const newTags = [...tags];
                newTags.push(tag);
                setTags(newTags);
                setTag("");
              }
            }}
          >
            Add tag
          </button>

          {tags.map((item, index) => {
            return (
              <div key={index} className={styles.tag}>
                <button
                  className={styles.trash_button}
                  type="button"
                  onClick={() => {
                    const newTags = [...tags];
                    newTags.splice(index, 1);
                    setTags(newTags);
                  }}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
                {item}
              </div>
            );
          })}
        </div>

        <button className={styles.submite_button} type="submite">
          Save
        </button>

        {error && <div className={styles.message}>{error}</div>}

        {publishment ? (
          <div className={styles.message}>Loading...</div>
        ) : (
          data && navigate(`/backoffice/publication/${data.id}`)
        )}
      </form>
    </main>
  );
}
