import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";

// Styles
import styles from "./Publication.module.css";

export default function Publication({ isTokenPresent }) {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://nbns-my-website.herokuapp.com/publication/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);

  return !isTokenPresent ? (
    <Navigate to="/backoffice" />
  ) : (
    !isLoading && (
      <main className={styles.main}>
        <div className={styles.container}>
          <img
            className={styles.img}
            src={data.image.secure_url}
            alt={data.title}
          />

          <div className={styles.informations}>
            <div className={styles.input_informations}>
              <p>{data.title}</p>
            </div>

            <div className={styles.input_informations}>
              <p>{data.location}</p>
              <p>{data.date}</p>
            </div>

            <div className={styles.input_informations}>
              <p>Format: {data.format}</p>
            </div>
          </div>

          <div className={styles.bottom_container}>
            <Link to="/backoffice/publish">
              <button className={styles.button} type="button">
                Add an other picture
              </button>
            </Link>
          </div>
        </div>
      </main>
    )
  );
}
