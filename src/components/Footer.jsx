import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.status}>
        Last updated: 2 minutes ago • Data confidence: High
      </div>
      <div className={styles.actions}>
        <button className={styles.action}>Export Report</button>
        <button className={styles.action}>Configure Alerts</button>
        <button className={styles.action}>View Audit Log</button>
      </div>
    </footer>
  );
};

export default Footer;
