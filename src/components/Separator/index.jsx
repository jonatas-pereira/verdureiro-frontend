/* eslint-disable react/prop-types */
import styles from "./saparator.module.css";

const Separator = ({img}) => {
  return (
    <span className={styles.separador}>
      <img src={img} alt="separador" />
    </span>
  )
}

export default Separator;
