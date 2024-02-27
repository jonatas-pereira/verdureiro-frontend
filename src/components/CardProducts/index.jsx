import { useState } from "react";
import styles from "./card.module.css";
import ModalCreateReservation from "../ModalCreateReservation";


// eslint-disable-next-line react/prop-types
const CardProduct = ({ id, image, title, description, category, price, quantity }) => {
  
    const [showCreateModal, setShowCreateModal] = useState(false);

    const toggleModal = () => {
      setShowCreateModal(!showCreateModal);
    };

    let formatQuantity, unidade;

    if(category == "verdura") {
      if(quantity <= 1) {
        formatQuantity = "unidades";
      } else {
        formatQuantity = "unidades";
      }
    } else {
      formatQuantity = "kg ";
    }

    return (
      <div className={styles.cardContainer}>
        <span className={styles.cardImg}>
          <img src={image} alt="imagem do produto" />
        </span>
        <div className={styles.cardText}>
          <h1 className={styles.cardTitle}>{title}</h1>
          <span><strong>Descrição:</strong> {description}</span>
          <span><strong>Preço {formatQuantity.slice(0, -1)}</strong>: R${price}</span>
          <span><strong>Quantidade:</strong> {quantity} {formatQuantity}</span>
        </div>
        <span className={styles.btnReservar}>
          <button
            onClick={() => toggleModal()}
            className={styles.btnReservarProd}
          >
            Reservar
          </button>
        </span>
        {showCreateModal && (
          <ModalCreateReservation
            close={() => setShowCreateModal(!showCreateModal)}
            id={id}
            nameProduct={title}
            category={category}
            quantity={quantity}
          />
        )}
      </div>
    );
}

export default CardProduct;
