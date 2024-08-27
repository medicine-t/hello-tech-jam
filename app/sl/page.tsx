import styles from "./styles/Train.module.css";

const Train = () => {
  return (
    <div className={styles.railway}>
      <div className={styles.train}>
        <div className={styles.engine}>🚂</div>
        <div className={styles.car}>🚃</div>
        <div className={styles.car}>🚃</div>
        <div className={styles.car}>🚃</div>
      </div>
    </div>
  );
};

export default Train;
