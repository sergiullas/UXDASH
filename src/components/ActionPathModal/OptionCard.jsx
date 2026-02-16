import styles from './ActionPathModal.module.css';

const riskLabels = { lower: '↓ Lower', same: '→ Same', higher: '↑ Higher' };
const riskStyles = { lower: styles.riskLower, same: styles.riskSame, higher: styles.riskHigher };
const costStyles = { low: styles.costLow, medium: styles.costMedium, high: styles.costHigh };

const OptionCard = ({ option, isSelected, onSelect }) => {
  return (
    <div
      className={`${styles.optionCard} ${isSelected ? styles.optionCardSelected : ''}`}
      onClick={() => onSelect(option.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(option.id); } }}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
    >
      <div className={styles.optionHeader}>
        <div className={`${styles.optionBadge} ${isSelected ? styles.optionBadgeSelected : ''}`}>
          {option.id}
        </div>
        <span className={styles.optionLabel}>{option.label}</span>
        {option.recommended && (
          <span className={styles.recommendedBadge}>AI Recommended</span>
        )}
      </div>
      <div className={styles.optionDescription}>{option.description}</div>
      <div className={styles.optionOutcome}>{option.outcome}</div>
      <div className={styles.optionStats}>
        <div className={styles.stat}>
          Time: <span className={styles.statValue}>{option.timeToImpact}</span>
        </div>
        <div className={styles.stat}>
          Cost: <span className={`${styles.statValue} ${costStyles[option.cost]}`}>{option.costLabel}</span>
        </div>
        <div className={styles.stat}>
          Risk: <span className={`${styles.statValue} ${riskStyles[option.riskDelta]}`}>{riskLabels[option.riskDelta]}</span>
        </div>
      </div>
    </div>
  );
};

export default OptionCard;
