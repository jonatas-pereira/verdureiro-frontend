import styles from "./contact.module.css";
import Form from "../../components/Form/index";
import avatar from "../../assets/pessoa-contato.png";

const Contact = () => {
  return (
    <main id = "contato" className={styles.contactContainer}>
      <section className={styles.contact}>
        <div className={styles.ContactTitle}>
          <h3>Fale Conosco</h3>
        </div>
        <div className={styles.ContactBody}>
          <span>
            <img src={avatar} alt="avatar Genérico" />
          </span>

          <div>
            <Form />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
