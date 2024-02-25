import { useState } from "react";
import styles from "./navBar.module.css";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={styles.header}>
      <a href="#inicio">
        <img className={styles.logo} src={logo} alt="logo do site" />
      </a>

      <nav
        className={`${styles.menuSanduich} ${showMenu ? styles.show : ""}`}
        onClick={toggleMenu}
      >
        <ul className={`${styles.navbar} ${showMenu && styles.show}`}>
          <a href="#inicio">Início</a>
          <a href="#sobre">Sobre Nós</a>
          <a href="#produtos">Produtos</a>
          <a href="#local">Onde Nos Encontrar</a>
          <a href="#contato" className={styles.btnContact}>
            Fale Conosco
          </a>
        </ul>
      </nav>
      <div
        className={`${styles.navToggle} ${showMenu && styles.open}`}
        onClick={toggleMenu}
      >
        <div className={styles.bar}></div>
      </div>
    </header>
  );
};

export default NavBar;
