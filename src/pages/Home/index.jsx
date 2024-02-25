import styles from "./home.module.css"
import desperdicio from "../../assets/desperdicio.png";
import higiene from "../../assets/higiene.png";
import sacola from "../../assets/sacola.png";

const Home = () => {
  return (
    <main id="inicio" className={styles.container}>
      <div className={styles.containerHeader}>
        <section className={styles.ctaText}>
          <span className={styles.title}>
            Da <i>colheita</i> à <i>pratelheira</i> em até 24h
          </span>
          <div className={styles.description}>
            <span>
              Verduras e legumes frescos, saborosos e de alta durabilidade.
            </span>
            <a href="#produtos">Descobrir produtos</a>
          </div>
          <div className={styles.iconsContainer}>
            <img src={desperdicio} alt="Desperdício" className={styles.icons} />
            <img src={higiene} alt="Higiene" className={styles.icons} />
          </div>
        </section>
      </div>
      <div className={styles.containerSacola}>
        <img src={sacola} alt="Imagem da sacola" className={styles.sacola} />
      </div>
    </main>
  );
};

export default Home;
