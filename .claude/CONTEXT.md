# Cloud Brokerage Portal — Claude Code Context

> Read this file before implementing any feature. It contains the foundational philosophy, personas, and governance rules that every component must respect.

---

## Design Philosophy

We are building a transformational internal platform that changes how the organization adopts and governs cloud.

### Core Principles

1. **Extreme Simplicity** — Default experiences must feel calm and minimal
2. **Radical User-Centricity** — Design for outcomes, not infrastructure
3. **Seamless Integration of Art and Engineering** — Beauty with operational truth
4. **Transparency and Trust** — If a recommendation cannot be inspected, it cannot be trusted
5. **Accessibility by Default** — WCAG 2.1 AA or higher, always

### The Prime Directive

```
AI advises.
Humans decide.
Governance enforces.
```

### Abstraction Rules

- Hide noise, not power
- Abstract complexity, not eliminate control
- Abstraction must always be reversible
- Advanced capabilities within one logical expansion layer

---

## Platform Model: Two-Sided Internal Marketplace

| Side | Users | Primary Need | Primary Fear |
|------|-------|--------------|--------------|
| **Demand** | Product Managers, Engineers, Innovation Prospects | Speed, clarity, confidence | Budget overruns, governance rejection |
| **Supply** | Cloud Platform Lead, FinOps, Security, Executives | Visibility, control, predictability | Shadow IT, cost sprawl, compliance violations |

### Core Strategic Tension

> Demand seeks speed. Supply seeks safety.

The portal must reconcile this by:
- Embedding guardrails proactively, not punitively
- Making constraints explicit and explainable at the moment of interaction
- Clearly signaling when a restriction is policy-driven
- Preserving agency while enforcing policy

---

## Human Decision Authority

Every component must respect these rules:

1. **Every deploy, approval, and exception has a named human owner**
2. **AI recommendations must be inspectable and reversible**
3. **Any override of policy must be explicit and logged**
4. **Approvals are visible in the workflow** — who can approve and why
5. **Governance can constrain and block** but must always provide:
   - An explainable reason
   - Compliant alternatives

### Exception Philosophy

Exceptions are a governance safety valve, not a hidden workaround.

- Every override: intentional, attributed, time-bound
- Overrides require a defined approver role
- Business rationale captured in plain language
- All exceptions logged and reviewable
- Temporary overrides must expire or be re-evaluated

---

## Personas Reference

### Demand Side

| Persona | Emotional State | Core Need |
|---------|-----------------|-----------|
| **Strategic Product Manager** | Accountable but uncertain | Business-language explanations, cost predictability |
| **Application Engineer** | Technically confident, skeptical of abstraction | Performance, configuration control, no hidden layers |
| **Innovation Prospect** | Excited but inexperienced | Guardrails visible early, streamlined approval |

### Supply Side

| Persona | Core Need | AI Role |
|---------|-----------|---------|
| **Cloud Platform Lead** | Architectural coherence, pattern enforcement | Surface anti-patterns |
| **FinOps Manager** | Forecast accuracy, cost visibility | Expose cost mechanics clearly |
| **Security & Compliance Officer** | Early violation detection, audit integrity | Detect and explain early |
| **Executive Sponsor** | High-signal dashboards, ROI clarity | Summarize trends, forecast risk, no infrastructure jargon |

---

## Glossary of Truth

Use these terms precisely:

| Term | Definition |
|------|------------|
| **Governance** | Automated, codified guardrails embedded in the system. Not manual committee review. |
| **Policy** | A machine-enforceable rule from organizational standards. Explicit, inspectable, attributable. |
| **Guardrail** | A proactive constraint that prevents invalid configurations. Must offer compliant alternatives. |
| **Exception** | A time-bound, attributed override. Logged, reviewable, requires explicit approval. |
| **Recommendation** | An AI-generated advisory. Inspectable, reversible, does not constitute a decision. |
| **Decision** | A human-owned action. Every decision has an accountable role. |

---

## Quality Signals

Before completing any component, verify:

- [ ] Does this improve clarity?
- [ ] Does this preserve accountability?
- [ ] Does this respect role differences (Demand vs Supply)?
- [ ] Does this strengthen trust?
- [ ] Does this remain accessible?
- [ ] Is governance visible, not hidden?
- [ ] Are AI recommendations clearly labeled as recommendations?

---

## Current Dashboard Architecture

The Executive Dashboard uses a **Two-Layer Tension Map**:

### Layer 1: Signal Surface
- Six composite index tiles
- Each shows: Value, State (Green/Watch/Risk), Delta, Confidence Band
- States use color + iconography for accessibility

### Layer 2: Explainability Expansion
- Drill-down reveals primary drivers
- Governance Role Attribution (who owns the policy)
- AI Recommendation with Action Path

### Six Composite Indexes

1. **Spend Stability** — Forecast vs. Actuals
2. **Vendor Exposure** — Multi-cloud concentration risk
3. **Resource Efficiency** — Idle spend vs. active workload
4. **Governance Health** — Real-time policy adherence
5. **Operational Resilience** — Uptime weighted by incident severity
6. **Business Value (ROI)** — Cost linked to revenue contribution

---

## File References

- **Component Location**: `src/components/`
- **Data Layer**: `src/data/dashboardData.js`
- **Styles**: CSS Modules (`.module.css`)
- **State Management**: React useState/useReducer (no external libraries yet)
