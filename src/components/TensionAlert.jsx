import styles from './TensionAlert.module.css';

const TensionAlert = ({ tension }) => {
  return (
    <div className={styles.alert}>
      <div className={styles.content}>
        <div className={styles.indicator} />
        <div className={styles.text}>
          <div className={styles.title}>{tension.title}</div>
          <div className={styles.description}>{tension.description}</div>
        </div>
      </div>
      <button className={styles.actionButton}>
        {tension.action} →
      </button>
    </div>
  );
};

export default TensionAlert;
