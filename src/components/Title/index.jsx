import styles from "./title.module.css";

// eslint-disable-next-line react/prop-types
const Title = ({children, name}) => {
  return (
    <div className={styles.title}>
      {children}
      <span>{ name }</span>
    </div>
  )
}

export default Title;
