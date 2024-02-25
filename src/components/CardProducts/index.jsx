import { useState } from "react";
import styles from "./card.module.css";
import ModalCreateReservation from "../ModalCreateReservation";


// eslint-disable-next-line react/prop-types
const CardProduct = ({ id, image, title, description, price, quantity }) => {
  
    const [showCreateModal, setShowCreateModal] = useState(false);

    const toggleModal = () => {
      setShowCreateModal(!showCreateModal);
    };

  return (
    <div className={styles.cardContainer}>
      <span className={styles.cardImg}>
        <img src={image} alt="imagem do produto" />
      </span>
      <div className={styles.cardText}>
        <h1 className={styles.cardTitle}>{title}</h1>
        <span>Descriçao: {description}</span>
        <span>Preço: $ {price}</span>
        <span>Quantidade: {quantity} UN</span>
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
          quantity={quantity}
        />
      )}
    </div>
  );
}

export default CardProduct;
