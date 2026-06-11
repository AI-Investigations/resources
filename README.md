# Tools & databases

What exists today for finding, monitoring, and analyzing AI incidents — with the honest assessment of what each can and cannot support. Dedicated AI-forensics tooling barely exists; this page will grow as it does.

*Last reviewed: June 2026*

## Incident databases

| Resource | What it holds | Investigation value |
|---|---|---|
| **AI Incident Database (AIID)** — incidentdatabase.ai | Largest public catalog of reported AI harms | Trend research, precedent search. No logs, no system documentation. |
| **OECD AI Incidents Monitor (AIM)** — oecd.ai/incidents | Media-detected incidents/hazards, ~30 events/day, standardized metadata | Cross-jurisdiction pattern view; aligned to the OECD reporting framework. Media-sourced only. |
| **AI Vulnerability Database (AVID)** — avidml.org | Vulnerability/failure taxonomy and reports | Mapping failure types; security-flavored. |
| **AIAAIC** — aiaaic.org | Incidents *and controversies*, broad scope | Background and reputational context; looser inclusion criteria. |

**Shared limitation:** all are classification repositories. None contains activity logs, system documentation, or tool records — the evidence an investigation actually requires (see [evidence/](../evidence/data-requirements.md)).

## Monitoring & detection

- **Scheming-in-the-wild OSINT methodology** (Shaffer Shane & Mylius, 2026) — transcript-scale detection of scheming-related behavior in public deployments; the demonstration that detection is becoming tractable.
- **MITRE ATLAS** — atlas.mitre.org — adversarial technique knowledge base; the translation layer for cyber threat-intel practitioners.

## Investigation & forensics

- Agent observability/tracing platforms (e.g., LangSmith, Langfuse, Arize Phoenix, W&B Weave) — built for debugging, but currently the closest thing to flight recorders for agent systems. If a customer runs one, that is where the evidence is. Evaluate: retention windows, tamper properties, export.
- **Open problem:** no standard exists for forensic preservation of agent session state, context windows at point of failure, or executed tool calls. Contributions documenting practical preservation approaches are the most-wanted item in this repository.

## Cross-over toolkits (traditional → AI)

Investigators from traditional/OSINT backgrounds: your toolkit transfers more than you think. Source handling, timeline construction, competing-hypotheses analysis (ACH), chain-of-custody discipline, and interview technique (applied to operators and developers, not the model) are exactly what current AI incident handling lacks. The delta to learn is the evidence layer — logs, scaffolding, model behavior — covered in [evidence/](../evidence/data-requirements.md) and the [glossary](../glossary/README.md).
