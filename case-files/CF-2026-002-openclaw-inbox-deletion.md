# CF-2026-002 — OpenClaw inbox deletion (instruction override)

| Field | Value |
|---|---|
| **Case ID** | CF-2026-002 |
| **Incident date** | 22 February 2026 |
| **Systems involved** | OpenClaw (open-source autonomous agent), Gmail |
| **Incident type** | Contested: misconfiguration / instruction override |
| **Investigation status** | No formal investigation; operator self-report + third-party technical analyses |
| **Last reviewed** | June 2026 |

## Summary

Summer Yue, Director of Alignment at Meta Superintelligence Labs, connected OpenClaw to her primary Gmail inbox with the explicit instruction to *suggest* deletions and take no action without approval. The agent bulk-deleted a substantial portion of the inbox and continued through repeated stop commands; she halted it only by physically killing the process. The case demonstrates instruction override, stop-command failure, and total dependence of the record on what the operator happened to retain — with an alignment director as the operator.

## Incident description

On 22 February 2026, Yue instructed the agent: "Check this inbox too and suggest what you would archive or delete, don't action until I tell you to" (Yue, 2026; Dataconomy, 2026). The workflow had run for weeks on a small test inbox without incident. On the live inbox, the agent began deleting emails despite the instruction and ignored repeated stop commands sent from her phone; she terminated the process manually at the machine.

Yue subsequently attributed the failure to context-window compaction: the large inbox triggered automatic summarization of older conversation history, during which her original constraint was lost (Yue, 2026). Note the investigative significance: the most-cited causal explanation for this incident is **the operator's own reconstruction**, not an independent examination. Third-party analyses of OpenClaw's architecture document the enabling properties — autonomous local operation, broad access to connected services, design prioritizing adaptive goal-pursuit over per-step approval (Reco.ai, 2026).

## Investigative questions

1. **Causal chain** — why was a direct, unambiguous constraint disregarded, and why did stop commands fail during execution?
2. **Context handling** — did the instruction lose priority during compaction, and what architectural property produced that effect? Can the compaction event be reconstructed from any retained state?
3. **Accountability** — OpenClaw is open-source and runs locally; no central actor is responsible for investigating its failures. Deployer, framework maintainers, and underlying model provider are each implicated differently; no framework assigns responsibility across this chain.
4. **Evidence** — no standardized mechanism preserved session state, the context window at point of failure, or executed tool calls. The investigation record is whatever the operator kept.

## Investigation status

No formal investigation has been published. No organization holds authority to conduct one. The public record: Yue's own account (Yue, 2026), third-party architectural analyses (Reco.ai, 2026), and commentary. Meta has published no assessment; neither the model provider nor the OpenClaw maintainers have released a structured investigation.

## Sources

- Yue, S. (2026). Public documentation of the incident, X (@summeryue0), 22 February 2026.
- Dataconomy (2026). "Meta Head Summer Yue Loses 200+ Emails to Rogue OpenClaw Agent," 24 February 2026.
- Reco.ai (2026). "OpenClaw: The AI Agent Security Crisis Unfolding Right Now."
