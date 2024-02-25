import { Link } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../assets/logo.png";
import "../../index.css";
import { FiSettings, FiBookOpen, FiBookmark } from "react-icons/fi";
import { MdOutlineCreate } from "react-icons/md";

const Header = () => {
  return (
    <div className={styles.sidebar}>
      <div>
        <img src={logo} alt="logo" />
      </div>

      <Link to="/dashboard">
        <FiBookOpen color="#fff" size={24} />
        Produtos
      </Link>

      <Link to="/criar">
        <MdOutlineCreate color="#fff" size={24} />
        Criar produto
      </Link>

      <Link to="/reservas">
        <FiBookmark color="#fff" size={24} />
        Reservas
      </Link>

      <Link to="/profile">
        <FiSettings color="#fff" size={24} />
        Perfil
      </Link>
    </div>
  );
};

export default Header;
