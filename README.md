# Executive Dashboard - Cloud Brokerage Portal

A strategic "Tension Map" dashboard for executive-level cloud portfolio visibility.

## Design Philosophy

This dashboard implements the Cloud Brokerage Design & Governance Philosophy:

- **Hide noise, not power** — Calm signal surface with depth one click away
- **Human Decision Authority** — AI recommends, humans decide
- **Governance Role Attribution** — Every index shows the policy owner
- **Accessibility** — States use color + iconography, high contrast throughout

## Architecture

### Two-Layer UI

1. **Layer 1 (Signal Surface)**: Six composite index tiles showing current state, delta, and confidence bands
2. **Layer 2 (Explainability Expansion)**: Drill-down revealing primary drivers, governance attribution, and AI recommendations

### Six Composite Indexes

| Index | Strategic Purpose |
|-------|-------------------|
| Spend Stability | Forecast accuracy vs. actuals |
| Vendor Exposure | Multi-cloud concentration risk |
| Resource Efficiency | Idle spend vs. active workload |
| Governance Health | Real-time policy adherence |
| Operational Resilience | System stability weighted by incident severity |
| Business Value (ROI) | Cost linked to revenue contribution |

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ExecutiveDashboard.jsx   # Main dashboard container
│   ├── Header.jsx               # Dashboard header with controls
│   ├── TensionAlert.jsx         # Cross-index tension notifications
│   ├── IndexTile.jsx            # Individual index tile (Layer 1)
│   ├── IndexExpansion.jsx       # Expanded details panel (Layer 2)
│   └── Footer.jsx               # Dashboard footer
├── data/
│   └── dashboardData.js         # Index configurations and helpers
├── App.jsx
├── main.jsx
└── index.css
```

## Customization

### Adding New Indexes

Edit `src/data/dashboardData.js` to add or modify indexes:

```javascript
{
  id: 'new-index',
  name: 'New Index Name',
  value: '95%',
  state: 'green', // 'green' | 'watch' | 'risk'
  delta: '+5%',
  deltaDirection: 'up', // 'up' | 'down' | 'stable'
  confidence: 'High',
  confidenceValue: '±2%',
  signal: 'Executive-friendly signal statement',
  drivers: [...],
  owner: 'Governance Role Owner',
  exceptions: 0,
  recommendation: 'AI recommendation text'
}
```

### Theming

Color tokens are defined in the `getStateColor` function in `dashboardData.js`:

- **Green (Stable)**: `#34C759`
- **Watch**: `#FF9500`
- **Risk**: `#FF3B30`
- **AI/Purple**: `#5856D6` → `#AF52DE`

## Persona Focus

Designed for the **Executive Sponsor** persona:

- Strategic, outcome-focused, time-constrained
- Low tolerance for ambiguity
- High sensitivity to risk headlines
- Needs high-signal narratives over infrastructure jargon

## License

Internal use only - Cloud Brokerage Portal
