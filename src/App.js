import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Backoffice from "./pages/Backoffice/Backoffice";
import Publish from "./pages/Publish/Publish";
import Publication from "./pages/Publication/Publication";

// Components
import Header from "./components/Header/Header";

function App() {
  const [isTokenPresent, setIsTokenPresent] = useState(
    Cookies.get("token") ? true : false
  );

  return (
    <Router>
      <Header />
      <Routes>
        {/* -------- User -------- */}
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* -------- Backoffice -------- */}
        <Route
          path="/backoffice"
          element={
            <Backoffice
              isTokenPresent={isTokenPresent}
              setIsTokenPresent={setIsTokenPresent}
            />
          }
        />

        <Route
          path="/backoffice/publish"
          element={<Publish isTokenPresent={isTokenPresent} />}
        />

        <Route
          path="/backoffice/publication/:id"
          element={<Publication isTokenPresent={isTokenPresent} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
