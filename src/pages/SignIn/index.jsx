import { useState, useContext } from "react";
import { toast } from "react-toastify";
import {Link } from "react-router-dom";
import styles from "./styles.module.css";
import {AuthContext} from "../../contexts/auth";
import logo from "../../assets/logo.png";

const SignIn = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const { signIn, loading } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      await signIn(email, password);
    } else {
      toast.warning("Preencha os campos email/senha");
    }
  };

  return (
    <div className={styles.container_center}>
      <div className={styles.login}>
        <div className={styles.login_area}>
          <img src={logo} alt="Logo da sistema" />
        </div>

        <form onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="Email@email.com"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          />

          <button type="submit">{loading ? "Entrando..." : "Entrar"}</button>
        </form>

        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
};

export default SignIn;
