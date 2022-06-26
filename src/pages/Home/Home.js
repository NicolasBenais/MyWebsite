import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Styles
import styles from "./Home.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  const [activeItem, setActiveItem] = useState(null);

  // Numbers of pictures to download
  let limit = 12;

  // Backend call
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

  // Executed function when the user scroll to the bottom of the page
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
                src={item.picture.secure_url}
                alt={item.title}
              />

              {/* Overlay on laptop design */}
              <Link to="/picture" state={item}>
                <div className={styles.picture_informations_laptop_overlay}>
                  <p>{item.title}</p>
                  <p>{item.location}</p>
                  <p>{item.date}</p>
                </div>
              </Link>

              {/* Overlay on mobile and tablet design */}
              {activeItem === item._id && (
                <div className={styles.picture_informations_mobile_overlay}>
                  <p className={styles.title}>{item.title}</p>
                  <div>
                    <p>{item.location}</p>
                    <p>{item.date}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </main>
    )
  );
}
