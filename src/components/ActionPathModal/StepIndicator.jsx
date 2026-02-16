import styles from './ActionPathModal.module.css';

const steps = [
  { num: 1, label: 'Options' },
  { num: 2, label: 'Trade-offs' },
  { num: 3, label: 'Approvals' },
  { num: 4, label: 'Confirm' },
];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className={styles.stepIndicator} role="navigation" aria-label="Decision steps">
      {steps.map((s, i) => (
        <div key={s.num} className={styles.stepItem}>
          <div
            className={`${styles.stepCircle} ${
              currentStep === s.num
                ? styles.stepCircleActive
                : currentStep > s.num
                ? styles.stepCircleCompleted
                : styles.stepCirclePending
            }`}
            aria-current={currentStep === s.num ? 'step' : undefined}
          >
            {currentStep > s.num ? '✓' : s.num}
          </div>
          <span
            className={`${styles.stepLabel} ${
              currentStep >= s.num ? styles.stepLabelActive : ''
            }`}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`${styles.stepConnector} ${
                currentStep > s.num ? styles.stepConnectorCompleted : ''
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
