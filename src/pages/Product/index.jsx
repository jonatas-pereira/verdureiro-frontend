import { Link } from "react-router-dom";
import styles from "./product.module.css";
import folha from "../../assets/folha.png";
import verdura from "../../assets/verdura.png";
import legume from "../../assets/legumes.png";
import review from "../../assets/review.jpg";


const Product = () => {
  return (
    <main id="produtos"className={styles.productContainer}>
      <div className={styles.productContainerHeader}>
        <section className={styles.headerTitle}>
          <span className={styles.headerImg}>
            <img src={folha} alt="Imagem folha" />
          </span>
          <h3>Nossos produtos</h3>
        </section>
      </div>

      <div className={styles.bodyInfo}>
        <section className={styles.Info}>
          <div className={styles.InfoProdutos}>
            <span className={styles.InfoVerdurasTitle}>Verduras</span>
            <span className={styles.infoImg}>
              <img src={verdura} alt=" verduras" />
            </span>

            <Link to="/verduras">Ver Produtos</Link>
          </div>
          <div className={styles.InfoProdutos}>
            <span className={styles.InfoLegumesTitle}>Legumes</span>
            <span className={styles.infoImg}>
              <img src={legume} alt=" legume" />
            </span>

            <Link to="/legumes">Ver Produtos</Link>
          </div>
        </section>
      </div>
      <div className={styles.review}>
        <img src={review} alt="" />
      </div>
    </main>
  );
}

export default Product;
