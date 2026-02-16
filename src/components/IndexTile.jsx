import { getStateColor, getStateIcon, getStateLabel } from '../data/dashboardData';
import IndexExpansion from './IndexExpansion';
import styles from './IndexTile.module.css';

const IndexTile = ({ index, isExpanded, onToggle }) => {
  const colors = getStateColor(index.state);

  return (
    <div className={styles.tileWrapper}>
      {/* Main Tile */}
      <div
        onClick={onToggle}
        className={styles.tile}
        style={{
          background: isExpanded 
            ? `linear-gradient(135deg, ${colors.bg} 0%, rgba(255,255,255,0.02) 100%)`
            : 'rgba(255,255,255,0.02)',
          borderColor: isExpanded ? colors.border : 'rgba(255,255,255,0.06)',
        }}
      >
        {/* Critical Alert Badge */}
        {index.criticalAlert && (
          <div className={styles.criticalBadge}>CRITICAL</div>
        )}

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.indexName}>{index.name}</div>
          <div className={styles.stateIndicator} style={{ color: colors.text }}>
            <span>{getStateIcon(index.state)}</span>
            <span>{getStateLabel(index.state)}</span>
          </div>
        </div>

        {/* Value */}
        <div 
          className={styles.value}
          style={{ 
            color: colors.text,
            textShadow: `0 0 40px ${colors.glow}`
          }}
        >
          {index.value}
        </div>

        {/* Meta Row */}
        <div className={styles.metaRow}>
          <div className={styles.deltaInfo}>
            <span 
              className={styles.delta}
              style={{
                color: index.deltaDirection === 'up' ? '#34C759' : 
                       index.deltaDirection === 'down' ? '#FF3B30' : 
                       'rgba(255,255,255,0.4)'
              }}
            >
              {index.deltaDirection === 'up' ? '↑' : 
               index.deltaDirection === 'down' ? '↓' : '→'} {index.delta}
            </span>
            <span className={styles.deltaPeriod}>vs prior quarter</span>
          </div>
          <div className={styles.confidence}>{index.confidenceValue} conf.</div>
        </div>

        {/* Signal Statement */}
        <div className={styles.signal}>"{index.signal}"</div>

        {/* Expand Indicator */}
        <div className={styles.expandIndicator}>
          {isExpanded ? '▲ Collapse' : '▼ Expand for details'}
        </div>
      </div>

      {/* Expansion Panel */}
      {isExpanded && (
        <IndexExpansion index={index} colors={colors} />
      )}
    </div>
  );
};

export default IndexTile;
