import NavBar from "../../components/NavBar";
import Home from "../Home";
import Product from "../Product";
import styles from "./homePage.module.css";
import About from "../About";
import Contact from "../Contacts";
import Footer from "../../components/Footer";

const HomePage = () => {
  return (
    <div className={styles.page}>
      <NavBar />
      <Home />
      <Product />
      <About />
      <Contact />
      <Footer/>
    </div>
  );
}

export default HomePage;
