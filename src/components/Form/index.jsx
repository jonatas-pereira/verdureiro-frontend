import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchema } from "../../validation/FormValidation";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

import { useState } from "react";

const Form = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const sendmail = async (data) => {
    try {
      setLoading(true);
      const { fullname, address, email ,contact, message } = data;
      const templateParans = {
        from_name: fullname,
        address: address,
        email: email,
        contact: contact,
        message: message,
      };
      const response = await emailjs.send(
        "service_2n8r3nt",
        "template_2dbucn6",
        templateParans,
        "RZKu05eVTCljv7pKX"
      );
      toast.success("Email enviado com sucesso, Retornaremos")
      console.log("email enviado", response.status, response.text);
      reset();
    } catch (error) {
      toast.error("Erro ao enviar o email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(sendmail)}>
      <div className={styles.input}>
        <input
          id="fullname"
          type="text"
          placeholder="Nome"
          name="name"
          {...register("fullname")}
        />
        <div className={styles.messageError}>{errors.fullname?.message}</div>
      </div>
      <div className={styles.input}>
        <input
          id="adsress"
          type="text"
          placeholder="Endereço"
          name="address"
          {...register("address")}
        />
        <div className={styles.messageError}>{errors.address?.message}</div>
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
          id="contact"
          type="text"
          placeholder="Contato"
          name="contact"
          {...register("contact")}
        />
        <div className={styles.messageError}>{errors.contact?.message}</div>
      </div>
      <div className={styles.input}>
        <textarea
          type="text"
          id="message"
          rows={5}
          name="message"
          placeholder="messagem..."
          {...register("message")}
        />
        <div className={styles.messageError}>{errors.message?.message}</div>
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.submitButton}>
          <span>{loading ? "Enviando" : "Enviar"}</span>
        </button>
      </div>
    </form>
  );
};

export default Form;
