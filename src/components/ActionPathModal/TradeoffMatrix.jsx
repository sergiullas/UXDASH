import styles from './ActionPathModal.module.css';

const dimensions = [
  {
    label: 'Concentration Risk',
    values: { A: { text: '↓ Lower', color: '#34C759' }, B: { text: '→ Same', color: '#FF9500' }, C: { text: '↑ Higher', color: '#FF3B30' } }
  },
  {
    label: 'Implementation Cost',
    values: { A: { text: '$$$', color: '#FF3B30' }, B: { text: '$', color: '#34C759' }, C: { text: '$$', color: '#FF9500' } }
  },
  {
    label: 'Time to Impact',
    values: { A: { text: '2 quarters', color: 'rgba(255,255,255,0.7)' }, B: { text: 'Immediate', color: '#34C759' }, C: { text: '1 quarter', color: 'rgba(255,255,255,0.7)' } }
  },
  {
    label: 'Engineering Friction',
    values: { A: { text: 'Medium', color: '#FF9500' }, B: { text: 'None', color: '#34C759' }, C: { text: 'Low', color: '#34C759' } }
  },
  {
    label: 'Strategic Flexibility',
    values: { A: { text: '↑ Higher', color: '#34C759' }, B: { text: '→ Same', color: '#FF9500' }, C: { text: '↓ Lower', color: '#FF3B30' } }
  },
];

const optionIds = ['A', 'B', 'C'];

const TradeoffMatrix = ({ selectedOption }) => {
  return (
    <div className={styles.matrixWrapper}>
      <table className={styles.matrix} role="table" aria-label="Trade-off comparison">
        <thead>
          <tr>
            <th>Dimension</th>
            {optionIds.map((id) => (
              <th key={id} className={selectedOption === id ? styles.matrixColSelected : ''}>
                Option {id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dimensions.map((dim) => (
            <tr key={dim.label}>
              <td className={styles.matrixDimension}>{dim.label}</td>
              {optionIds.map((id) => (
                <td
                  key={id}
                  className={selectedOption === id ? styles.matrixColSelected : ''}
                  style={{ color: dim.values[id].color }}
                >
                  {dim.values[id].text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeoffMatrix;
