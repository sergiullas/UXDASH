# Task: Action Path Modal

> **Priority**: High  
> **Complexity**: Medium-High  
> **Estimated Components**: 3-4 new files  

---

## Overview

Build the **Action Path Modal** — the decision workflow that appears when an Executive Sponsor clicks "View Action Path" from any AI recommendation in the dashboard.

This is where **recommendation becomes decision**. It must present options, show trade-offs, identify approvers, and capture accountability.

---

## Philosophy Reminder

```
AI advises. Humans decide. Governance enforces.
```

The Action Path must:
- Present options, not commands
- Show who decides and who approves
- Make trade-offs explicit
- Preserve full auditability

---

## User Flow

```
User clicks "View Action Path" on any index tile
                    ↓
┌─────────────────────────────────────┐
│         ACTION PATH MODAL           │
├─────────────────────────────────────┤
│  Step 1: Context + Options          │
│  Step 2: Trade-off Comparison       │
│  Step 3: Approval Chain             │
│  Step 4: Confirmation               │
└─────────────────────────────────────┘
```

---

## Component Structure

Create these files:

```
src/components/
├── ActionPathModal/
│   ├── ActionPathModal.jsx         # Main modal container
│   ├── ActionPathModal.module.css  # Modal styles
│   ├── StepIndicator.jsx           # Progress steps (1-4)
│   ├── OptionCard.jsx              # Individual decision option
│   ├── TradeoffMatrix.jsx          # Comparison table
│   ├── ApprovalChain.jsx           # Approver list with status
│   └── ConfirmationStep.jsx        # Final commit screen
```

---

## Step 1: Context + Options

### Context Banner

Display why this action path was triggered:

| Field | Example Value |
|-------|---------------|
| Trigger | "Vendor Exposure Index entered Watch state" |
| Signal | "AWS concentration at 65%, exceeding 60% threshold" |
| Impact | "Strategic vendor dependency risk increasing" |
| Confidence | "Medium (±5%)" |

### Decision Options

Present 2-3 distinct strategic paths:

```javascript
const options = [
  {
    id: 'A',
    label: 'Rebalance Portfolio',
    description: 'Incentivize GCP/Azure for next 3 Innovation migrations',
    outcome: 'Reduces concentration to ~55% within 2 quarters',
    timeToImpact: '2 quarters',
    cost: 'high',        // 'low' | 'medium' | 'high'
    costLabel: '$180K migration investment',
    riskDelta: 'lower',  // 'lower' | 'same' | 'higher'
    recommended: true    // AI recommended option
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
    recommended: false
  },
  {
    id: 'C',
    label: 'Renegotiate Terms',
    description: 'Leverage concentration for deeper AWS discount',
    outcome: '15-20% cost reduction, increases strategic lock-in',
    timeToImpact: '1 quarter',
    cost: 'medium',
    costLabel: '$40K negotiation effort',
    riskDelta: 'higher',
    recommended: false
  }
];
```

### Option Card Design

Each option card shows:
- Letter badge (A, B, C)
- Label + description
- Outcome statement
- Quick stats: Time | Cost | Risk Delta
- "AI Recommended" badge (if applicable)
- Radio/selection state

---

## Step 2: Trade-off Matrix

Visual comparison table across key dimensions:

| Dimension | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Concentration Risk | ↓ Lower (green) | → Same (yellow) | ↑ Higher (red) |
| Implementation Cost | $$$ | $ | $$ |
| Time to Impact | 2 quarters | Immediate | 1 quarter |
| Engineering Friction | Medium | None | Low |
| Strategic Flexibility | ↑ Higher | → Same | ↓ Lower |

### Visual Rules

- Use arrows (↑ ↓ →) with colors
- Highlight the selected option's column
- Show which dimensions favor which option

---

## Step 3: Approval Chain

Shows who must approve the selected option:

```javascript
const approvalChain = [
  {
    step: 1,
    role: 'Cloud Platform Lead',
    scope: 'Architecture',
    validation: 'Policy alignment with multi-cloud strategy',
    status: 'pending',  // 'pending' | 'approved' | 'delegated'
    sla: '48 hours',
    assignee: 'Sarah Chen'
  },
  {
    step: 2,
    role: 'FinOps Manager',
    scope: 'Budget Impact',
    validation: 'Migration cost approval',
    status: 'pending',
    sla: '24 hours',
    assignee: 'Michael Torres'
  },
  {
    step: 3,
    role: 'Executive Sponsor',
    scope: 'Strategic Sign-off',
    validation: 'Portfolio-level decision authority',
    status: 'pending',
    sla: '72 hours',
    assignee: 'You'
  }
];
```

### Visual Design

- Vertical timeline with numbered steps
- Each step shows: Role, Scope badge, Validation text, Assignee, SLA
- Status indicator (pending dot, checkmark, delegated icon)
- "You" highlighted differently when current user is an approver

---

## Step 4: Confirmation

Final commit screen with attribution capture:

### Required Fields

| Field | Type | Purpose |
|-------|------|---------|
| Decision Owner | Auto-populated | Who is committing |
| Business Rationale | Textarea (required) | Plain-language justification |
| Time Bound | Date picker (optional) | Expiration for exceptions |
| Notify | Multi-select | Who gets informed |

### Confirmation Statement

Display before final submit:

> "I am initiating **[Option A: Rebalance Portfolio]** as **Executive Sponsor**. This decision will be logged and routed to the approval chain. Approvers will be notified within 15 minutes."

### Actions

- **Cancel** — Close modal, no changes
- **Submit for Approval** — Primary action, triggers workflow

---

## Integration Points

### Opening the Modal

In `IndexExpansion.jsx`, the "View Action Path →" button should:

```jsx
const [isActionPathOpen, setIsActionPathOpen] = useState(false);

<button onClick={() => setIsActionPathOpen(true)}>
  View Action Path →
</button>

<ActionPathModal
  isOpen={isActionPathOpen}
  onClose={() => setIsActionPathOpen(false)}
  index={index}  // Pass the current index data
/>
```

### Data Flow

The modal receives:
- `index` — The triggering index (vendor exposure, compliance, etc.)
- `onClose` — Callback to close modal
- `onSubmit` — Callback when decision is confirmed (for future backend integration)

---

## State Management

```javascript
const [step, setStep] = useState(1);           // Current step (1-4)
const [selectedOption, setSelectedOption] = useState(null);  // 'A' | 'B' | 'C'
const [rationale, setRationale] = useState('');
const [timeBound, setTimeBound] = useState(null);
const [notifyList, setNotifyList] = useState([]);
```

### Navigation Rules

- **Step 1 → 2**: Requires option selection
- **Step 2 → 3**: Always allowed (informational)
- **Step 3 → 4**: Always allowed
- **Step 4 Submit**: Requires rationale (min 20 characters)
- **Back**: Always allowed

---

## Acceptance Criteria

- [ ] Modal opens from "View Action Path" button
- [ ] 4-step wizard with progress indicator
- [ ] Options selectable with visual feedback
- [ ] Trade-off matrix highlights selected option
- [ ] Approval chain shows correct roles and SLAs
- [ ] Rationale field required before submit
- [ ] Keyboard navigable (Tab, Enter, Escape to close)
- [ ] Accessible (ARIA labels, focus management)
- [ ] Responsive (works at 768px width)
- [ ] Follows design patterns from PATTERNS.md

---

## Sample Data for Testing

Use Vendor Exposure as the default test case:

```javascript
const vendorExposureContext = {
  indexId: 'vendor',
  indexName: 'Vendor Exposure',
  trigger: 'Vendor Exposure Index entered Watch state',
  signal: 'AWS concentration at 65%, exceeding 60% threshold',
  impact: 'Strategic vendor dependency risk increasing',
  confidence: 'Medium (±5%)',
  currentValue: '68',
  currentState: 'watch'
};
```

---

## Out of Scope (Future)

- Backend API integration
- Real approval workflow
- Email/Slack notifications
- Audit log persistence

For now, the modal is a **functional prototype** that demonstrates the UX flow.
