/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReservationSchema } from "../../validation/ReservationValidation";
import { createReservation, ApiUrl } from "../../services/Api";
import { useState } from "react";
import styles from "./modalCreateReservation.module.css";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const ModalCreateReservation = ({ close, id, nameProduct, quantity }) => {
  const idProduct = id;
  const [loading, setLoading] = useState(false);
  const [inputQuantity, setInputQuantity] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(ReservationSchema),
  });

  const ReservationCreate = async (data) => {
    setLoading(true);
    try {
      const { name, email,address, quantityReservation, contact } = data;
      if (quantityReservation > quantity) {
        toast.warning("Quantidade indisponível");
        setLoading(false);
        return;
      }
      const response = await createReservation(
        idProduct,
        name,
        email,
        address,
        quantityReservation,
        contact
      );
      toast.success("Reserva criada com sucesso!");
      setLoading(false);
      createWhatsAppMessage();
    } catch (error) {
      toast.error("Erro ao criar reserva");
      setLoading(false);
    }
  };

  const createWhatsAppMessage = () => {
    const formData = getValues();
    const message = `Olá, gostaria de fazer uma reserva do produto ${nameProduct}.
    Nome: ${formData.name}
    Email: ${formData.email}
    Quantidade: ${formData.quantityReservation}
    Contato: ${formData.contact}
    Endereço: ${formData.address}`;
    const whatsappLink = `https://wa.me/553898002882?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className={styles.containerModalCreate}>
      <div className={styles.containerModal}>
        <button className={styles.close} onClick={close}>
          <FiX size={25} color="#fff" />
          Voltar
        </button>
        <div className={styles.infoProduct}>
          <span>{nameProduct}</span>
          <span>{quantity}Un Disponíveis</span>
        </div>
        <main className={styles.formReservation}>
          <form onSubmit={handleSubmit(ReservationCreate)}>
            <div className={styles.input}>
              <input
                id="name"
                type="text"
                placeholder="Nome"
                name="name"
                {...register("name")}
              />
              <div className={styles.messageError}>{errors.name?.message}</div>
            </div>
            <div className={styles.input}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                {...register("email")}
              />
              <div className={styles.messageError}>{errors.email?.message}</div>
            </div>
            <div className={styles.input}>
              <input
                id="address"
                type="text"
                placeholder="Endereço"
                name="address"
                {...register("address")}
              />
              <div className={styles.messageError}>{errors.address?.message}</div>
            </div>
            <div className={styles.inputQtd}>
              <input
                id="quantityReservation"
                type="number"
                placeholder="Quantidade"
                name="quantityReservation"
                {...register("quantityReservation")}
              />
              <div className={styles.messageError}>
                {errors.quantityReservation?.message}
              </div>
            </div>
            <div className={styles.inputQtd}>
              <input
                id="contact"
                type="text"
                placeholder="DD - - - - - - - - -"
                name="contact"
                {...register("contact")}
              />
              <div className={styles.messageError}>
                {errors.contact?.message}
              </div>
            </div>
            <div className={styles.btn}>
              <button type="submit" className={styles.btnReserva}>
                <span>{loading ? "Reservando" : "Reservar"}</span>
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ModalCreateReservation;
