import styles from './Header.module.css';

const Header = ({ selectedTimeframe }) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <div className={styles.breadcrumb}>Cloud Brokerage Portal</div>
        <h1 className={styles.title}>Executive Tension Map</h1>
        <p className={styles.subtitle}>
          Strategic signals across your multi-cloud portfolio
        </p>
      </div>
      
      <div className={styles.controls}>
        <div className={styles.periodSelector}>
          <span className={styles.periodLabel}>Period:</span>
          <span className={styles.periodValue}>{selectedTimeframe}</span>
          <span className={styles.dropdown}>▼</span>
        </div>
        <div className={styles.avatar}>ES</div>
      </div>
    </header>
  );
};

export default Header;
