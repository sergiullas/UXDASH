# Cloud Brokerage Portal — Component Patterns

> This file defines the code conventions, component patterns, and visual standards for the portal. Read alongside CONTEXT.md before implementing.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| Styling | CSS Modules |
| State | React hooks (useState, useReducer) |
| Fonts | Inter (Google Fonts) |
| Icons | Unicode symbols + custom SVG |

---

## Color System

### State Colors

```javascript
const stateColors = {
  green: {
    bg: 'rgba(52, 199, 89, 0.12)',
    border: '#34C759',
    text: '#34C759',
    glow: 'rgba(52, 199, 89, 0.3)'
  },
  watch: {
    bg: 'rgba(255, 149, 0, 0.12)',
    border: '#FF9500',
    text: '#FF9500',
    glow: 'rgba(255, 149, 0, 0.3)'
  },
  risk: {
    bg: 'rgba(255, 59, 48, 0.12)',
    border: '#FF3B30',
    text: '#FF3B30',
    glow: 'rgba(255, 59, 48, 0.3)'
  }
};
```

### UI Colors

```css
/* Backgrounds */
--bg-primary: #0a0a0f;
--bg-secondary: #12121a;
--bg-card: rgba(255, 255, 255, 0.02);
--bg-card-hover: rgba(255, 255, 255, 0.04);

/* Borders */
--border-subtle: rgba(255, 255, 255, 0.06);
--border-medium: rgba(255, 255, 255, 0.12);

/* Text */
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
--text-tertiary: rgba(255, 255, 255, 0.4);
--text-muted: rgba(255, 255, 255, 0.3);

/* AI/Accent */
--ai-gradient: linear-gradient(135deg, #5856D6, #AF52DE);
--ai-primary: #5856D6;
--ai-secondary: #AF52DE;
```

---

## Typography Scale

```css
/* Headers */
--text-xl: 32px;    /* Page titles */
--text-lg: 24px;    /* Section headers */
--text-md: 18px;    /* Card titles */

/* Body */
--text-base: 14px;  /* Default body */
--text-sm: 13px;    /* Secondary text */
--text-xs: 12px;    /* Captions, metadata */
--text-xxs: 11px;   /* Labels, badges */
--text-micro: 10px; /* Tiny labels */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## Component Architecture

### File Structure

Each component should have:

```
src/components/
├── ComponentName/
│   ├── ComponentName.jsx       # Main component
│   ├── ComponentName.module.css # Styles
│   └── index.js                # Export (optional)
```

Or flat structure (current):

```
src/components/
├── ComponentName.jsx
└── ComponentName.module.css
```

### Component Template

```jsx
import styles from './ComponentName.module.css';

const ComponentName = ({ prop1, prop2, onAction }) => {
  // State
  const [localState, setLocalState] = useState(null);

  // Handlers
  const handleAction = () => {
    onAction?.(localState);
  };

  // Render
  return (
    <div className={styles.container}>
      {/* Content */}
    </div>
  );
};

export default ComponentName;
```

---

## Common UI Patterns

### Cards

```css
.card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### Section Headers

```css
.sectionTitle {
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
}
```

### Buttons

```css
/* Primary Action */
.buttonPrimary {
  background: linear-gradient(135deg, #5856D6, #AF52DE);
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Secondary Action */
.buttonSecondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

/* Ghost/Text Button */
.buttonGhost {
  background: none;
  border: none;
  padding: 8px 12px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  cursor: pointer;
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
}

.badgeWarning {
  background: rgba(255, 149, 0, 0.15);
  border: 1px solid rgba(255, 149, 0, 0.3);
  color: #FF9500;
}

.badgeSuccess {
  background: rgba(52, 199, 89, 0.15);
  border: 1px solid rgba(52, 199, 89, 0.3);
  color: #34C759;
}

.badgeRisk {
  background: rgba(255, 59, 48, 0.15);
  border: 1px solid rgba(255, 59, 48, 0.3);
  color: #FF3B30;
}
```

---

## Modal Pattern

Modals should follow this structure:

```jsx
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
```

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.modal {
  background: linear-gradient(145deg, #12121a 0%, #0d0d14 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  width: 90%;
  max-width: 720px;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## AI Recommendation Block

All AI recommendations must use this visual pattern:

```jsx
<div className={styles.aiRecommendation}>
  <div className={styles.aiHeader}>
    <div className={styles.aiIcon}>AI</div>
    <span className={styles.aiLabel}>Recommendation</span>
  </div>
  <div className={styles.aiContent}>
    {recommendation}
  </div>
  <button className={styles.actionButton}>
    View Action Path →
  </button>
</div>
```

This ensures AI outputs are:
- Clearly labeled as AI-generated
- Visually distinct (purple gradient theme)
- Always paired with a human action path

---

## Accessibility Requirements

Every component must:

1. **Use semantic HTML** — buttons are `<button>`, not `<div>`
2. **Support keyboard navigation** — all interactive elements focusable
3. **Include ARIA labels** where needed
4. **Never rely on color alone** — use icons/text alongside color states
5. **Maintain contrast ratios** — 4.5:1 minimum for text

### State Indicators

Always pair color with symbol:

| State | Color | Icon |
|-------|-------|------|
| Green/Stable | `#34C759` | `●` or `✓` |
| Watch | `#FF9500` | `◐` or `⚠` |
| Risk | `#FF3B30` | `○` or `✕` |

---

## Animation Guidelines

- **Duration**: 200-300ms for micro-interactions, 300-500ms for modals/panels
- **Easing**: `ease` or `ease-out` for most animations
- **Transform over position**: Use `transform` instead of `top/left` for performance
- **Respect reduced motion**: Wrap animations in `prefers-reduced-motion` media query

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Data Layer Conventions

### Adding New Data

Data configurations live in `src/data/`. When adding new features:

```javascript
// src/data/featureData.js
export const featureConfig = {
  // Configuration object
};

export const helperFunction = (param) => {
  // Reusable logic
};
```

### State Colors Helper

Always use the shared helper:

```javascript
import { getStateColor, getStateIcon, getStateLabel } from '../data/dashboardData';

const colors = getStateColor('watch'); // Returns { bg, border, text, glow }
```

---

## Testing Checklist

Before completing a component:

- [ ] Works with keyboard only (Tab, Enter, Escape)
- [ ] Screen reader announces key information
- [ ] States visible without color (icons present)
- [ ] Responsive at 768px and 1200px breakpoints
- [ ] No console errors
- [ ] Hover/focus states defined
- [ ] Loading states handled (if async)
