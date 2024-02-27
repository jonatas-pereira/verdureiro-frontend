import styles from "./footer.module.css";
import logoFooter from "../../assets/logo-footer.png";
import footerSuperior from "../../assets/footer-detalhe-superior.png";
import Separator from "../Separator";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";


const Footer = () => {
  return (
    <main id = "local" className={styles.container}>
      <Separator img={footerSuperior} />
      <footer className={styles.containerfooter}>
        <div className={styles.footerLogo}>
          <img src={logoFooter} alt="Logo do footer" />
        </div>

        <section className={styles.footerInfo}>
          <div className={styles.footerProdLoja}>
            <p>Verduras</p>
            <p>Legumes</p>
          </div>
          <div className={styles.footerCttLoja}>
            <span className={styles.icons}>
              <a href="https://wa.me/5538998828927">
                <FaWhatsapp color="#3edd2d" size={50} />
              </a>
            </span>
            <span className={styles.icons}>
              <a to="ir para intagram">
                <FaInstagram color="#b31c5b" size={50} />
              </a>
            </span>
            <p>Fale Conosco:</p>
            <p>vendas@verdureirosaofelipe.com.br</p>
            <p>(38) 99882-8927</p>
          </div>
        </section>
        <div className={styles.footerAdress}>
          <p>
            Comércio e Distribuição de Alimentos Verdureiro São Felipe LTDA com
            sede em Rua Eupídio Francisco dos Santos, 10 - São Joao do Paraíso,
            estado de Minas Gerais. CEP 39540.000
          </p>
        </div>
      </footer>
    </main>
  );
}

export default Footer;
