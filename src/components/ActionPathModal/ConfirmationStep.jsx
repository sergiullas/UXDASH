import styles from './ActionPathModal.module.css';

const notifyOptions = [
  'Cloud Platform Lead',
  'FinOps Manager',
  'Security & Compliance',
  'Engineering Leads',
];

const ConfirmationStep = ({
  selectedOption,
  rationale,
  setRationale,
  timeBound,
  setTimeBound,
  notifyList,
  setNotifyList,
}) => {
  const toggleNotify = (name) => {
    setNotifyList((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className={styles.confirmFields}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Decision Owner</label>
        <div className={styles.fieldStatic}>Executive Sponsor (You)</div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="rationale">
          Business Rationale *
        </label>
        <textarea
          id="rationale"
          className={styles.textarea}
          placeholder="Explain the business reason for this decision (min 20 characters)..."
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
          aria-required="true"
        />
        <div className={`${styles.charCount} ${rationale.length >= 20 ? styles.charCountValid : ''}`}>
          {rationale.length}/20 min
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="timeBound">
          Time Bound (optional)
        </label>
        <input
          id="timeBound"
          type="date"
          className={styles.dateInput}
          value={timeBound || ''}
          onChange={(e) => setTimeBound(e.target.value || null)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.fieldLabel}>Notify</div>
        <div className={styles.notifyGrid} role="group" aria-label="Select who to notify">
          {notifyOptions.map((name) => (
            <button
              key={name}
              type="button"
              className={`${styles.notifyChip} ${notifyList.includes(name) ? styles.notifyChipSelected : ''}`}
              onClick={() => toggleNotify(name)}
              aria-pressed={notifyList.includes(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {selectedOption && (
        <div className={styles.confirmStatement}>
          I am initiating{' '}
          <span className={styles.confirmHighlight}>
            Option {selectedOption.id}: {selectedOption.label}
          </span>{' '}
          as <span className={styles.confirmHighlight}>Executive Sponsor</span>. This decision
          will be logged and routed to the approval chain. Approvers will be notified within 15
          minutes.
        </div>
      )}
    </div>
  );
};

export default ConfirmationStep;
