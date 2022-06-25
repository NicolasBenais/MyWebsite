import { useEffect, useState } from "react";
import axios from "axios";

// Styles
import styles from "./Home.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  const [activeItem, setActiveItem] = useState(null);

  let limit = 12;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://nbns-my-website.herokuapp.com/pictures?limit=${limit}`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = (event) => {
    if (
      window.innerHeight + event.target.documentElement.scrollTop + 1 >=
      event.target.documentElement.scrollHeight
    ) {
      limit += 12;
      fetchData();
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchData();

    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    !isLoading && (
      <main className={styles.main}>
        {data.map((item, index) => {
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
