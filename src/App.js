import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/backoffice" element={<Backoffice />} />
        <Route path="/backoffice/publish" element={<Publish />} />
        <Route path="/backoffice/publication" element={<Publication />} />
      </Routes>
    </Router>
  );
}

export default App;
