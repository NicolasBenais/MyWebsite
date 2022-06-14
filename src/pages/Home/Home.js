import { useEffect, useState } from "react";
import axios from "axios";

// Styles
import styles from "./Home.module.css";

export default function Home() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get();
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return <main>Home</main>;
}
