export const indexes = [
  {
    id: 'spend',
    name: 'Spend Stability',
    value: '92%',
    state: 'green',
    delta: '+2%',
    deltaDirection: 'up',
    confidence: 'High',
    confidenceValue: '±3%',
    signal: 'Cloud economics are predictable',
    drivers: [
      { label: 'Product Line A', value: '+$420K', type: 'over', note: 'New migration - unplanned' },
      { label: 'Product Line B', value: '+$180K', type: 'over', note: 'Scaling event - approved' },
      { label: 'Product Line C', value: '-$210K', type: 'under', note: 'Delayed launch' },
    ],
    owner: 'FinOps Manager',
    exceptions: 4,
    recommendation: 'Three product lines are driving 78% of variance. View reforecast scenario with adjusted guardrails?'
  },
  {
    id: 'vendor',
    name: 'Vendor Exposure',
    value: '68',
    state: 'watch',
    delta: '+12%',
    deltaDirection: 'up',
    confidence: 'Medium',
    confidenceValue: '±5%',
    signal: 'Concentration risk increasing',
    distribution: [
      { vendor: 'AWS', percentage: 65, color: '#FF9500' },
      { vendor: 'GCP', percentage: 25, color: '#34C759' },
      { vendor: 'Azure', percentage: 10, color: '#007AFF' },
    ],
    drivers: [
      { label: 'Concentration Risk', note: '80% of Innovation workloads defaulting to AWS-native DBs' },
      { label: 'Portability Gap', note: '42% of services are high lock-in (proprietary APIs)' },
      { label: 'Economic Tension', note: 'AWS bulk discount expires in 2 quarters' },
    ],
    owner: 'Cloud Platform Lead',
    exceptions: 12,
    recommendation: 'Incentivize GCP for next 3 Innovation migrations to rebalance portfolio. View financial impact?'
  },
  {
    id: 'utilization',
    name: 'Resource Efficiency',
    value: '71%',
    state: 'watch',
    delta: '-4%',
    deltaDirection: 'down',
    confidence: 'High',
    confidenceValue: '±2%',
    signal: 'Idle spend detected',
    breakdown: [
      { category: 'Orphaned Resources', value: '$480K', percentage: 40 },
      { category: 'Over-Provisioned', value: '$360K', percentage: 30 },
      { category: 'Unused Reserved', value: '$240K', percentage: 20 },
      { category: 'Dev/Test Running', value: '$120K', percentage: 10 },
    ],
    owner: 'FinOps Manager',
    exceptions: 0,
    recommendation: 'Rightsizing 12 compute clusters would recover $180K/quarter. View recommendations?'
  },
  {
    id: 'compliance',
    name: 'Governance Health',
    value: '84%',
    state: 'risk',
    delta: '-10%',
    deltaDirection: 'down',
    confidence: 'High',
    confidenceValue: '±2%',
    signal: 'Policy adherence degrading',
    criticalAlert: true,
    frictionMap: [
      { persona: 'Application Engineers', violations: 47, trend: 'up' },
      { persona: 'Innovation Prospects', violations: 12, trend: 'stable' },
      { persona: 'Product Managers', violations: 3, trend: 'down' },
    ],
    drivers: [
      { label: 'Policy Drift', note: '30% of violations stem from new Data Privacy rule' },
      { label: 'Friction Point', note: 'Approval workflow averaging 4 days → 15% more emergency overrides' },
    ],
    owner: 'Security & Compliance Officer',
    exceptions: 8,
    recommendation: 'Review Data Privacy policy friction. 30% of violations stem from recent update.'
  },
  {
    id: 'resilience',
    name: 'Operational Resilience',
    value: '99.7%',
    state: 'green',
    delta: '0%',
    deltaDirection: 'stable',
    confidence: 'High',
    confidenceValue: '±1%',
    signal: 'Platform stability is strong',
    incidents: [
      { cause: 'Demand-Side (App Code)', count: 3, severity: 'P2' },
      { cause: 'Supply-Side (Infra)', count: 2, severity: 'P3' },
      { cause: 'Vendor (AWS)', count: 1, severity: 'P2' },
    ],
    owner: 'Cloud Platform Lead',
    exceptions: 0,
    recommendation: 'Adding multi-AZ failover to Product Line B would reduce P1 risk by 40%.'
  },
  {
    id: 'roi',
    name: 'Business Value (ROI)',
    value: '1.4x',
    state: 'watch',
    delta: '-0.2x',
    deltaDirection: 'down',
    confidence: 'Low',
    confidenceValue: '±15%',
    signal: 'Value realization is flat',
    portfolio: [
      { line: 'Product Line A', roi: 2.1, state: 'green' },
      { line: 'Product Line B', roi: 1.3, state: 'watch' },
      { line: 'Product Line C', roi: 0.8, state: 'risk' },
    ],
    owner: 'Executive Sponsor',
    exceptions: 0,
    recommendation: 'Product Line C shows declining ROI. View optimization options or escalate to portfolio review?'
  }
];

export const tensions = [
  {
    id: 1,
    title: 'Speed vs. Safety Tension',
    description: 'Compliance violations ↑15% while ROI stayed flat. Demand-side friction may not be delivering value.',
    action: 'Review exception patterns',
    severity: 'watch'
  }
];

export const getStateColor = (state) => {
  switch(state) {
    case 'green': 
      return { 
        bg: 'rgba(52, 199, 89, 0.12)', 
        border: '#34C759', 
        text: '#34C759', 
        glow: 'rgba(52, 199, 89, 0.3)' 
      };
    case 'watch': 
      return { 
        bg: 'rgba(255, 149, 0, 0.12)', 
        border: '#FF9500', 
        text: '#FF9500', 
        glow: 'rgba(255, 149, 0, 0.3)' 
      };
    case 'risk': 
      return { 
        bg: 'rgba(255, 59, 48, 0.12)', 
        border: '#FF3B30', 
        text: '#FF3B30', 
        glow: 'rgba(255, 59, 48, 0.3)' 
      };
    default: 
      return { 
        bg: 'rgba(142, 142, 147, 0.12)', 
        border: '#8E8E93', 
        text: '#8E8E93', 
        glow: 'rgba(142, 142, 147, 0.3)' 
      };
  }
};

export const getStateIcon = (state) => {
  switch(state) {
    case 'green': return '●';
    case 'watch': return '◐';
    case 'risk': return '○';
    default: return '○';
  }
};

export const getStateLabel = (state) => {
  switch(state) {
    case 'green': return 'Stable';
    case 'watch': return 'Watch';
    case 'risk': return 'Risk';
    default: return 'Unknown';
  }
};
