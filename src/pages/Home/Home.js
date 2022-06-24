import { useEffect, useState } from "react";
import axios from "axios";

// Styles
import styles from "./Home.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  const [activeItem, setActiveItem] = useState(null);

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
        {data.map((item) => {
          return (
            <div
              onClick={() => {
                if (activeItem === item._id) {
                  setActiveItem(null);
                } else {
                  setActiveItem(item._id);
                }
              }}
              key={item._id}
              className={styles.container}
            >
              <img
                className={styles.image}
                src={item.image.secure_url}
                alt=""
              />

              {/* Overlay on laptop design */}
              <div className={styles.picture_informations_laptop_overlay}>
                <p>{item.location}</p>
                <p>{item.date}</p>
              </div>

              {/* Overlay on mobile design */}
              {activeItem === item._id && (
                <div className={styles.picture_informations_mobile_overlay}>
                  <p>{item.location}</p>
                  <p>{item.date}</p>
                </div>
              )}
            </div>
          );
        })}
      </main>
    )
  );
}
