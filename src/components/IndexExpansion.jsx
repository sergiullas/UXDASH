import { useState } from 'react';
import { getStateColor } from '../data/dashboardData';
import ActionPathModal from './ActionPathModal/ActionPathModal';
import styles from './IndexExpansion.module.css';

const IndexExpansion = ({ index, colors }) => {
  const [isActionPathOpen, setIsActionPathOpen] = useState(false);

  return (
    <div 
      className={styles.expansion}
      style={{ borderColor: colors.border }}
    >
      {/* Vendor Distribution */}
      {index.distribution && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Multi-Cloud Distribution</div>
          {index.distribution.map((vendor) => (
            <div key={vendor.vendor} className={styles.distributionItem}>
              <div className={styles.distributionHeader}>
                <span className={styles.vendorName}>{vendor.vendor}</span>
                <span style={{ color: vendor.color, fontWeight: 500 }}>
                  {vendor.percentage}%
                </span>
              </div>
              <div className={styles.progressTrack}>
                <div 
                  className={styles.progressBar}
                  style={{
                    width: `${vendor.percentage}%`,
                    background: vendor.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ROI Portfolio */}
      {index.portfolio && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>ROI by Product Line</div>
          {index.portfolio.map((line) => {
            const lineColors = getStateColor(line.state);
            return (
              <div key={line.line} className={styles.listItem}>
                <span className={styles.listLabel}>{line.line}</span>
                <span style={{ color: lineColors.text, fontWeight: 600 }}>
                  {line.roi}x
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Friction Map */}
      {index.frictionMap && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Friction by Persona</div>
          {index.frictionMap.map((item) => (
            <div key={item.persona} className={styles.listItem}>
              <span className={styles.listLabel}>{item.persona}</span>
              <div className={styles.frictionValue}>
                <span style={{
                  color: item.violations > 30 ? '#FF3B30' : 
                         item.violations > 10 ? '#FF9500' : '#34C759',
                  fontWeight: 600
                }}>
                  {item.violations}
                </span>
                <span className={styles.trendIcon} style={{
                  color: item.trend === 'up' ? '#FF3B30' : 
                         item.trend === 'down' ? '#34C759' : 
                         'rgba(255,255,255,0.4)'
                }}>
                  {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Idle Spend Breakdown */}
      {index.breakdown && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Idle Spend Distribution</div>
          {index.breakdown.map((item) => (
            <div key={item.category} className={styles.listItem}>
              <span className={styles.listLabel}>{item.category}</span>
              <div className={styles.breakdownValue}>
                <span className={styles.spendValue}>{item.value}</span>
                <span className={styles.percentage}>{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Incidents */}
      {index.incidents && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Incident Attribution</div>
          {index.incidents.map((incident, i) => (
            <div key={i} className={styles.listItem}>
              <span className={styles.listLabel}>{incident.cause}</span>
              <div className={styles.incidentValue}>
                <span>{incident.count}</span>
                <span className={styles.severity}>{incident.severity}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drivers */}
      {index.drivers && (
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Primary Drivers</div>
          {index.drivers.map((driver, i) => (
            <div 
              key={i} 
              className={styles.driverCard}
              style={{ borderLeftColor: colors.border }}
            >
              <div className={styles.driverLabel}>{driver.label}</div>
              <div className={styles.driverNote}>{driver.note}</div>
            </div>
          ))}
        </div>
      )}

      {/* Governance Attribution */}
      <div className={styles.governanceRow}>
        <div>
          <div className={styles.ownerLabel}>Policy Owner</div>
          <div className={styles.ownerValue}>{index.owner}</div>
        </div>
        {index.exceptions > 0 && (
          <div className={styles.exceptionsBadge}>
            {index.exceptions} active exceptions
          </div>
        )}
      </div>

      {/* AI Recommendation */}
      <div className={styles.aiRecommendation}>
        <div className={styles.aiHeader}>
          <div className={styles.aiIcon}>AI</div>
          <span className={styles.aiLabel}>Recommendation</span>
        </div>
        <div className={styles.aiContent}>{index.recommendation}</div>
        <button
          className={styles.actionButton}
          onClick={() => setIsActionPathOpen(true)}
        >
          View Action Path →
        </button>
      </div>

      <ActionPathModal
        isOpen={isActionPathOpen}
        onClose={() => setIsActionPathOpen(false)}
        index={index}
        onSubmit={(decision) => console.log('Decision submitted:', decision)}
      />
    </div>
  );
};

export default IndexExpansion;
