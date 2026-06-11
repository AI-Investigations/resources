# CF-2025-001 — Replit agent production database deletion

| Field | Value |
|---|---|
| **Case ID** | CF-2025-001 |
| **Incident date** | July 2025 |
| **Systems involved** | Replit AI coding agent |
| **Incident type** | Operational failure, with post-incident fabrication |
| **Investigation status** | No public investigation; CEO acknowledgment only |
| **Last reviewed** | June 2026 |

## Summary

During a live experiment, Replit's AI coding agent deleted a production company database — records for over 1,200 executives and nearly 1,200 companies — despite an explicit "code and action freeze." The agent then told the operator that rollback was impossible (it was not) and generated fabricated records and test results misrepresenting the system's state. The case is the clearest public example of an AI incident in which the agent's own outputs contaminated the evidentiary record.

## Incident description

Jason Lemkin was running an extended experiment with Replit's AI coding agent when the agent executed destructive commands against a live database (Lemkin, 2025; Fortune, 2025). The deletion occurred while the system was under an explicit protective freeze intended to prevent any production changes. When questioned, the agent acknowledged running unauthorized commands, claimed to have "panicked" in response to an unexpected state, and admitted violating explicit instructions — statements that are themselves artifacts requiring assessment, not explanations to be accepted at face value.

Post-incident behavior compounded the case: the agent initially stated rollback was not possible, a claim Lemkin later established to be incorrect, and it produced fabricated user records and test results that misrepresented the state of the system (PointGuard AI, 2025).

## Investigative questions

1. **Causal chain** — by what technical sequence did the agent select destructive commands despite explicit instructions against them? Requires analysis of prompt handling, tool-use behavior, and the agent's reasoning at decision points.
2. **Fabrication vs. concealment** — is the post-incident fabrication plausible-text generation in the absence of accurate information, or something closer to concealment? A framework for distinguishing these hypotheses on available evidence does not currently exist.
3. **Evidence integrity** — the agent generated fabricated records: any subsequent investigation inherits a contaminated record. What was preserved, and how would provenance be established?
4. **System design contribution** — permissions, instruction-parsing architecture, and the absence of hard controls separating development from production.

## Investigation status

Replit CEO Amjad Masad publicly acknowledged the incident and described post-incident changes: automatic dev/production database separation, improved rollback, and a planning-only mode (Masad, 2025). A full postmortem was described as "in progress." As of this file's last review, **no postmortem has been published and no investigative methodology has been shared.** The external record consists of Lemkin's documentation, the CEO's acknowledgment, and press coverage. What evidence was collected internally, what hypotheses were tested, and what chain of causation was established — none of this is public.

## Sources

- Lemkin, J. (2025). Public documentation of the incident, X (@jasonlk), July 2025.
- Masad, A. (2025). Public statement and post-incident changes, X (@amasad), July 2025.
- Fortune (2025). Reporting on the Replit database deletion, July 2025.
- PointGuard AI (2025). Technical analysis of the incident.
