/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext  } from "react";
import { FiX } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import styles from "./modal.module.css";
import { format } from "date-fns";
import { deleteProduct } from "../../services/Api";
import { toast } from "react-toastify";
import { AuthContext} from "../../contexts/auth";

const Modal = ({ conteudo, close }) => {
  const { user } = useContext(AuthContext);

  const excluirProduct = async (id, token) => {
    try {
      await deleteProduct(id, token);
      toast.success("Produto excluído com sucesso");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Falha ao excluír Produto");
    }
  }
  
  let data = format(conteudo.created_at, "MM/dd/yyyy");

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <button className={styles.close} onClick={close}>
          <FiX size={25} color="#fff" />
          Voltar
        </button>

        <main>
          <h2>Detalhes do Produto</h2>

          <div className={styles.row}>
            {conteudo.image ? (
              <span>
                <img
                  className={styles.img}
                  src={conteudo.image}
                  alt="imagem produto"
                />
              </span>
            ) : null}

            <span>
              Nome: <i>{conteudo.name}</i>
            </span>

            <span>
              Criado em: <i>{data}</i>
            </span>
          </div>

          <div className={styles.row}>
            <span>
              Preço: <i>{conteudo.price}$</i>
            </span>
          </div>

          <div className={styles.row}>
            <span>
              Quantidade: <i>{conteudo.quantity}</i>
            </span>
          </div>

          {conteudo.description !== "" && (
            <>
              <h3>Descrição</h3>
              <p>{conteudo.description}</p>
            </>
          )}

          <button
            onClick={() => excluirProduct(conteudo.id, user.token)}
            className={styles.action}
            style={{ backgroundColor: "#ed1935" }}
          >
            <MdOutlineDelete color="#fff" size={17} />
            Excluir
          </button>
        </main>
      </div>
    </div>
  );
};

export default Modal;
