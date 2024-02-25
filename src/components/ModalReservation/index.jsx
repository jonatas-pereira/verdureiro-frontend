/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { FiX } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { deleteReservation } from "../../services/Api";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth";
import styles from "./modalreservation.module.css";
import { Link } from "react-router-dom";

const ModalReservation = ({ conteudo, close }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const excluirReserva = async (id, token) => {
    try {
      setLoading(true)
      await deleteReservation(id, token);
      toast.success("Reserva excluída com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Falha ao excluír Reserva");
    } finally {
      // Aguarda 10 segundos antes de recarregar a página
      setTimeout(() => {
        window.location.reload();
      }, 10000);
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <button className={styles.close} onClick={close}>
          <FiX size={25} color="#fff" />
          Voltar
        </button>

        <main>
          <h2>Detalhes da Reserva</h2>
          
          <div className={styles.row}>
            <span>
              Cliente: <i>{conteudo.name}</i>
            </span>

            <span>
              <Link to={`https://wa.me/${conteudo.contact}`}>
                <BsWhatsapp color="#45e42c" size={25} />
              </Link>
            </span>
          </div>

          <div className={styles.row}>
            <span>
              Criada em: <i>{conteudo.created_at}</i>
            </span>
          </div>
          <div className={styles.row}>
            <span>
              Produto: <i>{conteudo.produto}</i>
            </span>
          </div>

          <div className={styles.row}>
            <span>
              Quantidade Reservada: <i>{conteudo.quantityReservation}</i>
            </span>
            <span>
              Preço Total: <i>{conteudo.totalPrice}$</i>
            </span>
          </div>

          <div className={styles.row}>
            <span>
              Status da Reserva: <i>{conteudo.active}</i>
            </span>
          </div>
          <div className={styles.row}>
            <span>
              Endereço do Cliente: <i>{conteudo.address}</i>
            </span>
          </div>
          <button
            onClick={() => excluirReserva(conteudo.id, user.token)}
            className={styles.action}
            style={{ backgroundColor: "#ed1935" }}
          >
            <MdOutlineDelete color="#fff" size={25} />
            {loading ? "Excluindo" : "Excluir"}
          </button>
        </main>
      </div>
    </div>
  );
};

export default ModalReservation;
