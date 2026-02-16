import { useState, useEffect, useCallback } from 'react';
import StepIndicator from './StepIndicator';
import OptionCard from './OptionCard';
import TradeoffMatrix from './TradeoffMatrix';
import ApprovalChain from './ApprovalChain';
import ConfirmationStep from './ConfirmationStep';
import styles from './ActionPathModal.module.css';

const getOptionsForIndex = (index) => [
  {
    id: 'A',
    label: 'Rebalance Portfolio',
    description: `Incentivize alternative providers for next 3 migrations`,
    outcome: `Reduces concentration to ~55% within 2 quarters`,
    timeToImpact: '2 quarters',
    cost: 'high',
    costLabel: '$180K migration investment',
    riskDelta: 'lower',
    recommended: true,
  },
  {
    id: 'B',
    label: 'Accept & Monitor',
    description: 'Acknowledge risk, establish quarterly review checkpoint',
    outcome: 'No immediate change; formal risk acceptance',
    timeToImpact: 'Immediate',
    cost: 'low',
    costLabel: 'No direct cost',
    riskDelta: 'same',
    recommended: false,
  },
  {
    id: 'C',
    label: 'Renegotiate Terms',
    description: 'Leverage concentration for deeper discount',
    outcome: '15-20% cost reduction, increases strategic lock-in',
    timeToImpact: '1 quarter',
    cost: 'medium',
    costLabel: '$40K negotiation effort',
    riskDelta: 'higher',
    recommended: false,
  },
];

const getContextForIndex = (index) => ({
  trigger: `${index.name} entered ${index.state === 'watch' ? 'Watch' : index.state === 'risk' ? 'Risk' : 'Active'} state`,
  signal: index.signal || 'Signal data unavailable',
  impact: `${index.name} requires executive attention`,
  confidence: `${index.confidence} (${index.confidenceValue})`,
});

const ActionPathModal = ({ isOpen, onClose, index, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [rationale, setRationale] = useState('');
  const [timeBound, setTimeBound] = useState(null);
  const [notifyList, setNotifyList] = useState([]);

  const options = getOptionsForIndex(index);
  const context = getContextForIndex(index);
  const selectedOptionData = options.find((o) => o.id === selectedOption);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedOption(null);
      setRationale('');
      setTimeBound(null);
      setNotifyList([]);
    }
  }, [isOpen]);

  // Keyboard: Escape to close
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const canNext =
    step === 1 ? selectedOption !== null :
    step === 4 ? rationale.length >= 20 :
    true;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else if (step === 4 && rationale.length >= 20) {
      onSubmit?.({
        option: selectedOptionData,
        rationale,
        timeBound,
        notifyList,
        index,
      });
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Action Path for ${index.name}`}
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div>
              <div className={styles.title}>Action Path</div>
              <div className={styles.subtitle}>{index.name}</div>
            </div>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
          <StepIndicator currentStep={step} />
        </div>

        {/* Body */}
        <div className={styles.body}>
          {step === 1 && (
            <>
              <div className={styles.contextBanner}>
                <div className={styles.contextRow}>
                  <span className={styles.contextLabel}>Trigger</span>
                  <span className={styles.contextValue}>{context.trigger}</span>
                </div>
                <div className={styles.contextRow}>
                  <span className={styles.contextLabel}>Signal</span>
                  <span className={styles.contextValue}>{context.signal}</span>
                </div>
                <div className={styles.contextRow}>
                  <span className={styles.contextLabel}>Impact</span>
                  <span className={styles.contextValue}>{context.impact}</span>
                </div>
                <div className={styles.contextRow}>
                  <span className={styles.contextLabel}>Confidence</span>
                  <span className={styles.contextValue}>{context.confidence}</span>
                </div>
              </div>
              <div className={styles.sectionTitle}>Decision Options</div>
              <div className={styles.optionsGrid} role="radiogroup" aria-label="Select a decision option">
                {options.map((opt) => (
                  <OptionCard
                    key={opt.id}
                    option={opt}
                    isSelected={selectedOption === opt.id}
                    onSelect={setSelectedOption}
                  />
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className={styles.sectionTitle}>Trade-off Comparison</div>
              <TradeoffMatrix selectedOption={selectedOption} />
            </>
          )}

          {step === 3 && (
            <>
              <div className={styles.sectionTitle}>Approval Chain</div>
              <ApprovalChain />
            </>
          )}

          {step === 4 && (
            <>
              <div className={styles.sectionTitle}>Confirm Decision</div>
              <ConfirmationStep
                selectedOption={selectedOptionData}
                rationale={rationale}
                setRationale={setRationale}
                timeBound={timeBound}
                setTimeBound={setTimeBound}
                notifyList={notifyList}
                setNotifyList={setNotifyList}
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {step > 1 ? (
            <button className={styles.backButton} onClick={handleBack}>
              ← Back
            </button>
          ) : (
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          )}
          <div className={styles.footerRight}>
            {step > 1 && (
              <button className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
            )}
            <button
              className={styles.nextButton}
              disabled={!canNext}
              onClick={handleNext}
            >
              {step < 4 ? 'Continue →' : 'Submit for Approval'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPathModal;
