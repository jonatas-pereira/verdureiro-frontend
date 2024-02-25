import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import styles from "./styles.module.css";

import logo from "../../assets/logo.png";

const SignUp = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [name, SetName] = useState("");
  const [contact, SetContact] = useState("");

  const { signUp, loading } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "" && name !== "" && contact !== "") {
      await signUp(email, name, password, contact);
    } else {
      toast.warning("Preencha todos os campos");
    }
  }

  return (
    <div className={styles.container_center}>
      <div className={styles.signup}>
        <div className={styles.signup_area}>
          <img src={logo} alt="Logo da sistema" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastra-se</h1>
          <input
            type="text"
            placeholder="Email@email.com"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="João"
            value={name}
            onChange={(e) => SetName(e.target.value)}
          />

          <input
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="(- -) - - - - - - - - -"
            value={contact}
            onChange={(e) => SetContact(e.target.value)}
          />

          <button type="submit">
            {loading ? "Cadastrando..." : "Criar conta"}
          </button>
        </form>

        <Link to="/">Já possui uma conta? Faça Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
