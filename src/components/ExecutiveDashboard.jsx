import { useState } from 'react';
import { indexes, tensions } from '../data/dashboardData';
import Header from './Header';
import TensionAlert from './TensionAlert';
import IndexTile from './IndexTile';
import Footer from './Footer';
import styles from './ExecutiveDashboard.module.css';

const ExecutiveDashboard = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedTimeframe] = useState('Q4 2024');

  const handleToggle = (indexId) => {
    setExpandedIndex(expandedIndex === indexId ? null : indexId);
  };

  return (
    <div className={styles.dashboard}>
      <Header selectedTimeframe={selectedTimeframe} />

      {tensions.length > 0 && (
        <TensionAlert tension={tensions[0]} />
      )}

      <div className={styles.grid}>
        {indexes.map((index) => (
          <IndexTile
            key={index.id}
            index={index}
            isExpanded={expandedIndex === index.id}
            onToggle={() => handleToggle(index.id)}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default ExecutiveDashboard;
