# Regulatory tracker — AI incident reporting obligations

This tracker summarizes in a simplified format who must report what, to whom, by when. **Please note this page is a tracker, not legal advice.**

*Last reviewed: 9 July 2026*

## European Union

### The EU AI Act - Article 73: Reporting of Serious Incidents

- **Who:** Providers of high-risk AI systems; deployers have identification/escalation duties.
- **What:** "Serious incidents" per Art. 3(49): death or serious harm to health, serious and irreversible disruption of critical infrastructure, infringement of fundamental-rights obligations, serious harm to property or environment.
- **When:**
  * Report immediately upon establishing a causal link (or reasonable likelihood of such link), and no later than **15 days** after becoming aware of the serious incident;
  * **≤2 days** for widespread infringement or critical-infrastructure incidents; **≤10 days** in case of death.
  * Initial incomplete reports allowed, followed by complete report.
- **Investigation duty:** Following reporting, providers shall perform the necessary investigations, including performing a risk assessment of the incident and corrective action. It shall cooperate with the authorities and shall **not** alter the system in any way that affects later evaluation of causes before informing authorities. *Note: the Act does not currently include guidance on an investigative methodology.*
- **Status:** **Deferred.** Originally applicable from 2 August 2026; the **Digital Omnibus on AI** (adopted: Parliament 16 June 2026, Council 29 June 2026) postpones Annex III high-risk obligations - Art. 73 included - to **2 December 2027** at the latest (earlier only if the Commission confirms standards readiness, with a six-month transition; Annex I embedded systems: 2 August 2028). In force on the third day after Official Journal publication, expected late July 2026; until publication the original date formally remains the law. Deadlines and duties unchanged - only the applicability date moved. Draft guidance + reporting template published 26 September 2025 (consultation closed 7 November 2025); final guidance expected before applicability.
- **Source:** Regulation (EU) 2024/1689, Art. 73; EC draft guidance via digital-strategy.ec.europa.eu.

### GPAI Code of Practice (systemic-risk models)

- **Who:** Signatory providers of general-purpose AI models with systemic risk (obligations under Art. 55 applied from 2 August 2025).
- **What:** Serious-incident reporting to the AI Office, including the chain of events and root-cause analysis of causal factors.
- **Source:** EC, General-Purpose AI Code of Practice (July 2025).


### Digital Omnibus on AI (June 2026) - what moved, what didn't
- **Moved:** Annex III high-risk obligations (incl. Art. 73 reporting/investigation duties) → **2 December 2027** backstop (earlier only on a Commission standards-readiness decision + six-month transition). Annex I embedded high-risk systems → **2 August 2028**. Art. 50(2) watermarking for systems already on the market at 2 Aug 2026 → **2 December 2026**. Member-state regulatory sandboxes → 2 August 2027.
- **Did not move:** GPAI obligations (Arts. 53/55) - applicable since 2 August 2025, Commission enforcement powers from 2 August 2026. Art. 50 transparency (disclosing AI interaction) - 2 August 2026. The 2/10/15-day reporting clocks and the investigation/non-alteration duties in Art. 73 itself - unchanged in substance.
- **Status:** Adopted (Parliament 16 June 2026; Council 29 June 2026); enters into force on the third day after publication in the Official Journal, expected late July 2026.
- **Source:** Digital Omnibus on AI, Council doc 9247/26 (compromise text); Council and Parliament press releases, May–June 2026.

## United States

### Federal

- **NIST AI RMF** - voluntary risk-management framework with no direct reporting mandate. It is increasingly used as a reference point in procurement, governance programs, and emerging standards of care.
- **FDA (AI/ML-enabled medical devices)** - AI/ML-enabled medical devices remain subject to existing medical-device obligations, including adverse-event reporting under the Medical Device Reporting regime, 21 CFR Part 803. FDA guidance on AI/ML software lifecycle management continues to evolve.
- *(Track: incident-reporting provisions in agency-specific rules; federal legislative proposals.)*

### State (selected, verify current status before relying)

- **Colorado AI Act (SB 26-189, replacing SB 24-205)** - disclosure, transparency, and record-keeping duties for developers/deployers of automated decision-making technology (ADMT) in consequential decisions, enforced by the AG with a sixty-day cure period (sunsets 1 January 2030); effective **1 January 2027**. SB 24-205 never took effect: delayed from February to 30 June 2026, enforcement stayed by federal court (27 April 2026, xAI litigation), then repealed and replaced by SB 26-189 (signed 14 May 2026), which removed the duty of care, impact assessments, and risk-management presumption.
- **Texas (TRAIGA)** - responsible AI governance act, effective **1 January 2026**.
- *(Track: California enacted-law cluster incl. frontier-model transparency (SB 53); NY; Illinois; Utah disclosure laws.)*

## International / other

- **OECD** - common reporting framework (AI Papers No. 34, 2025; 29 criteria) and the AI Incidents Monitor (AIM). Voluntary benchmark; explicitly the interoperability layer other regimes align to.
- **G7 Hiroshima AI Process** - reporting framework launched February 2025; voluntary transparency reporting for advanced AI developers.
- *(Track: UK, Canada (AIDA successor efforts), China algorithm/incident filing rules, sectoral financial regulators.)*

## How to use this page in an investigation

- Identify every jurisdiction the incident touches (deployment location, affected persons, provider establishment).
- Map the incident against each definition above; "serious incident" thresholds differ.
- Diary the deadlines **from the moment of awareness/causal-link establishment**, not from harm.
- Preserve evidence before corrective action wherever Art. 73-style non-alteration duties apply.
- Record the reporting decision (report / no report / why); that decision is itself reviewable later.
