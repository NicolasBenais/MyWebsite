import { useEffect, useState } from "react";
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
              <img
                className={styles.image}
                src={item.image.secure_url}
                alt=""
              />
              <div className={styles.img_overlay}>
                <div className={styles.picture_informations_overlay}>
                  <div className={styles.camera_informations_overlay}>
                    <div>{item.camera}</div>
                    <div>{item.lens}</div>
                    <div>{item.film}</div>
                  </div>
                  <div>{item.location}</div>
                  <div>{item.date}</div>
                </div>
              </div>
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
