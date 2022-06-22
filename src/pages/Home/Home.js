import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Styles
import styles from "./Home.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://nbns-my-website.herokuapp.com/pictures"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    !isLoading && (
      <main className={styles.main}>
        {data.map((item, index) => {
          return (
            <div key={index} className={styles.container}>
              <Link className={styles.link} to="/picture" state={item}>
                <img
                  className={styles.image}
                  src={item.image.secure_url}
                  alt=""
                />
              </Link>
              <div className={styles.picture_informations}>
                <span>{item.location}</span>
                <span>{item.date}</span>
              </div>
            </div>
          );
        })}
      </main>
    )
  );
}
