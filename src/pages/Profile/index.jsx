/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import Header from "../../components/Header/index";
import Title from "../../components/Title";
import styles from "./profile.module.css";
import { FiSettings } from "react-icons/fi";
import "../../index.css";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/auth";
import { atualizarUser } from "../../services/Api";
import { toast } from "react-toastify"

const Profile = () => {

  const { user, storageUser, setUser, logout, loading, setLoading } = useContext(AuthContext);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [contact, setContact] = useState(user && user.contact);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await atualizarUser(name, contact, user.token);
      let data = {
        ...user,
        name: name,
        contact: contact,
      };

      setUser(data);
      storageUser(data);
      toast.success("Perfil Atualizado com sucesso");
    } catch (error) {
      toast.error("Erro ao atualizar Perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Perfil">
          <FiSettings size={25} />
        </Title>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <form className={styles.form_profile} onSubmit={handleSubmit}>
            <label className={styles.label_avatar}>
              <label>
                <img src={logo} alt="logo" width={200} height={100} />
              </label>
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <label>Telefone</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />

            <button type="submit">{loading ? "Atualizando...": "Salvar"}</button>
          </form>
        </div>
        <div className={styles.container}>
          <button className={styles.logout_btn} onClick={() => logout()}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
