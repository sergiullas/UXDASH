import styles from './ActionPathModal.module.css';

const approvalChain = [
  {
    step: 1,
    role: 'Cloud Platform Lead',
    scope: 'Architecture',
    validation: 'Policy alignment with multi-cloud strategy',
    status: 'pending',
    sla: '48 hours',
    assignee: 'Sarah Chen',
  },
  {
    step: 2,
    role: 'FinOps Manager',
    scope: 'Budget Impact',
    validation: 'Migration cost approval',
    status: 'pending',
    sla: '24 hours',
    assignee: 'Michael Torres',
  },
  {
    step: 3,
    role: 'Executive Sponsor',
    scope: 'Strategic Sign-off',
    validation: 'Portfolio-level decision authority',
    status: 'pending',
    sla: '72 hours',
    assignee: 'You',
  },
];

const ApprovalChain = () => {
  return (
    <div className={styles.approvalTimeline} role="list" aria-label="Approval chain">
      {approvalChain.map((item, i) => {
        const isYou = item.assignee === 'You';
        return (
          <div key={item.step} className={styles.approvalStep} role="listitem">
            <div className={styles.approvalLine}>
              <div className={`${styles.approvalCircle} ${isYou ? styles.approvalCircleYou : ''}`}>
                {item.step}
              </div>
              {i < approvalChain.length - 1 && (
                <div className={styles.approvalConnector} />
              )}
            </div>
            <div className={styles.approvalContent}>
              <div className={`${styles.approvalRole} ${isYou ? styles.approvalRoleYou : ''}`}>
                {item.role}
              </div>
              <div className={styles.approvalMeta}>
                <span className={styles.scopeBadge}>{item.scope}</span>
                <span className={styles.slaBadge}>SLA: {item.sla}</span>
                <span className={styles.slaBadge}>
                  <span className={`${styles.statusDot} ${styles.statusPending}`} />
                  {item.status}
                </span>
              </div>
              <div className={styles.approvalValidation}>{item.validation}</div>
              <div className={`${styles.approvalAssignee} ${isYou ? styles.assigneeYou : ''}`}>
                {isYou ? '→ You (current user)' : item.assignee}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApprovalChain;
