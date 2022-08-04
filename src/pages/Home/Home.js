import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Styles
import styles from "./Home.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);

  // Numbers of pictures to download
  let limit = 6; //Six pictures for mobile and tablet design
  if (window.innerWidth > 1023) {
    limit = 9; //Nine pictures for the laptop design
  }

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
      if (window.innerWidth < 1024) {
        limit += 6; //Plus six pictures for mobile and tablet design
      } else {
        limit += 9; //Plus nine pictures for laptop design
      }
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
            <div key={item._id} className={styles.container}>
              <img
                className={styles.image}
                src={item.thumbnail.secure_url}
                alt={item.title}
              />

              {/* Overlay on laptop design */}
              <Link to="/picture" state={item}>
                <div className={styles.picture_informations_laptop_overlay}>
                  <p>{item.location}</p>
                  <p>{item.date}</p>
                </div>
              </Link>

              {/* Overlay on mobile and tablet design */}
              <div className={styles.picture_informations_mobile_overlay}>
                <div>
                  <p>{item.location}</p>
                  <p>{item.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </main>
    )
  );
}
