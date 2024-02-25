import Separator from "../../components/Separator";
import styles from "./about.module.css";
import separadorSuperior from "../../assets/detalhe-superior.png";
import separadorInferior from "../../assets/detalhe-inferior.png";
import canteiroHorganico from "../../assets/canteiro.png";
import hortalicas from "../../assets/hortalicas.png";
import legumes from "../../assets/legumes_d.png";


const About = () => {
  return (
    <main id="sobre"className={styles.aboutContainer}>
      <Separator img={separadorSuperior} />
      <h3>Nossos Diferenciais</h3>
      <section className={styles.aboutContainer}>
        <div className={styles.aboutContainerInfo}>
          <p>
            Canteiros de horta orgânico que busca promover a saúde das plantas,
            a biodiversidade, a sustentabilidade ambiental e a produção de
            alimentos saudáveis e livres de substâncias químicas prejudiciais.
          </p>
          <span>
            <img
              src={canteiroHorganico}
              alt="imagem de um canteiro Horganico"
            />
          </span>
        </div>
        <div className={styles.aboutContainerInfo}>
          <span>
            <img src={hortalicas} alt="imagem de hortaliças" />
          </span>
          <p>
            Hortaliças fresquinhas colhidos em seu ponto ideal de maturação,
            oferecendo sabor, textura e valor nutricional excepcionais. As
            hortaliças possuem aspecto vibrante, aroma atraente e crocância ao
            serem consumidas.
          </p>
        </div>
        <div className={styles.aboutContainerInfo}>
          <p>
            Legumes perfeitos, com uma aparência visualmente atraente. Com cores
            vibrantes e intensas, livres de manchas, rugas ou sinais de
            deterioração. Em seu melhor estado de frescor e textura
            incomparável.
          </p>
          <span>
            <img src={legumes} alt="imagem de um canteiro Horganico" />
          </span>
        </div>
      </section>
      <Separator img={separadorInferior} />
    </main>
  );
};

export default About;
