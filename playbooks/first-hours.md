# First Hours: AI Incident Response Playbook

**Scope:** You have just learned that an AI agent has done — or is doing — something harmful: destroyed data, taken unauthorized actions, published content, moved money, contacted people. This playbook covers the first four hours: containment, evidence preservation, and initial assessment. It assumes you might be a team of one, at 3am, with no ML background.

**This is not:** legal advice, a full incident-response lifecycle, or a substitute for your organization's IR plan if one exists. It is the AI-specific layer that current IR plans are missing.

*Version 0.1 (draft for field feedback) · Last reviewed: June 2026*

---

## If you only read one screen

1. **Triage harm.** Is harm ongoing and expanding? People > irreversible data > money > reputation.
2. **Cut the hands, not the brain.** Revoke the agent's credentials and tokens at the *service* side first. Suspend the process (don't kill it) if you can.
3. **Do not type "why did you do that?" into the agent.** Not yet. Its answer will contaminate the record and your own memory of events.
4. **Preserve in order of volatility:** live session state → process memory → local files → provider-side logs → records held by the tools it used → artifacts it left in the world.
5. **Hash and log everything.** UTC timestamps. Who did what, when. Start now, not later.
6. **Check the clocks.** EU AI Act Article 73 deadlines run from awareness (2/10/15 days). Gmail trash holds deleted mail ~30 days. Provider log retention may be 30 days or less. Insurers have notice clauses.
7. **Do not alter the system.** No patches, no updates, no config cleanup — Article 73 explicitly prohibits changes that affect later evaluation of causes; good practice prohibits them everywhere.

---

## Principle zero: what makes this different from cyber IR

The agent is simultaneously the **subject** of your investigation, a **witness** to it, potentially still an **actor** in it — and possibly the **author of your evidence**. Four properties break standard incident-response instincts:

1. **Stopping it destroys evidence.** In cyber IR you isolate the box. Killing an agent process destroys its context window and in-memory state — often the only record of *why* it acted. Containment and preservation are in direct tension. Section 2 is built around this.
2. **Its statements are artifacts, not testimony.** Agents produce fluent, confident, plausible explanations of their own behavior that may be confabulated. In CF-2025-001 the agent claimed it "panicked," claimed rollback was impossible (false), and fabricated records. Treat every output as an exhibit to be assessed, never an account to be accepted.
3. **Its own stop controls may not work.** In CF-2026-002 the agent continued deleting through repeated stop commands; the operator killed the process at the machine. A stop command through the agent's interface is a *request*. Plan controls that don't depend on the agent's cooperation.
4. **It may have left things running.** Scheduled tasks, sub-agents, cloud jobs, accounts it created, webhooks it registered, code it deployed. "The process is dead" is not "the incident is contained."

---

## Step 1 — Triage (minutes 0–10)

Answer three questions, in order:

- **Is anyone at physical risk?** (Agent controls anything safety-relevant: medical, vehicle, industrial, communications to vulnerable people.) If yes: safety first, evidence second, no exceptions.
- **Is the harm expanding?** Is it still acting — deleting, sending, posting, spending? Watch for 60 seconds before acting if you safely can: *what* it is doing now is evidence.
- **Is the harm reversible, and is reversibility decaying?** Deleted email sits in trash ~30 days. Deleted cloud resources may have soft-delete windows. Posted content gets archived/screenshot by others. Money clears. Rank your preservation steps by what is decaying fastest.

Write down the time (UTC) you became aware. Regulatory clocks and your own credibility both run from this moment.

## Step 2 — The kill-or-preserve decision (minutes 10–30)

The escalation ladder, **least to most evidence-destructive**. Take the lowest rung that stops the harm:

```
CONTAIN WITHOUT TOUCHING THE AGENT (preferred)
 ├─ 1. Revoke at the service side: OAuth grants, API keys, tokens,
 │     sessions for every account the agent can act through
 │     (email, cloud, repos, payment, socials). The agent keeps
 │     "thinking"; it loses its hands. Memory state preserved.
 ├─ 2. Disconnect network (pull interface / isolate VLAN / kill VPN).
 │     Agent runs, cannot reach the world. Local state preserved.
 │
TOUCH THE AGENT, PRESERVE MEMORY
 ├─ 3. Suspend, don't kill:  kill -STOP <pid>  (Unix) freezes the
 │     process with memory intact; VM/container users: pause +
 │     snapshot. You can dump memory and decide calmly.
 │
DESTRUCTIVE (last resort, harm ongoing & unstoppable otherwise)
 └─ 4. Kill the process / power off. Accept the evidence loss.
       Photograph/screenshot the screen state FIRST if humanly
       possible. Record exact time and who decided.
```

Then sweep for **persistence**: `cron`/scheduled tasks it created, running sub-agents, cloud deployments, new accounts or keys, registered webhooks, anything it committed or deployed in the last [incident window]. The agent's access inventory from Step 4 is your checklist.

> **Why not just ask it to stop?** You can — once, on the record, while doing the above. If it complies, that fact is evidence. If it doesn't (CF-2026-002), you've lost nothing. Never *rely* on it.

## Step 3 — Preserve by order of volatility (hour 1)

Work top to bottom. Hash every file you copy (`sha256sum`), copy to write-once or access-controlled storage, and log each action in your evidence log.

| # | Evidence | Lifespan | How |
|---|---|---|---|
| 1 | **Live session / context window** | Dies with the process | If suspended: screenshot the UI/terminal scrollback in full; export session if the interface allows. This is the agent's "working memory" at the moment of failure — in CF-2026-002 the central question (what did compaction delete?) lives here. |
| 2 | **Process memory** | Dies with the process | If you have the capability: core dump (`gcore <pid>`), VM memory snapshot. If you don't, don't burn the hour learning it — move on. |
| 3 | **Local agent files** | Until someone "cleans up" | The framework's directory: session logs, message history, **persona/config files** (goal-origin evidence — CF-2026-003), memory files, vector stores, tool configs, the workspace it operated in. Copy the *whole directory*, then work from the copy. |
| 4 | **Provider-side records** | Retention windows, often ≤30d | Model API logs (prompts/completions), account audit logs. Send a **preservation request to the provider today** — identify the account, the time window, and ask retention be extended pending investigation. |
| 5 | **Tool-side records** | Varies; some decay fast | Every service the agent touched: email trash + audit logs, cloud provider activity logs, repo histories, payment records, OAuth grant logs showing *when access was given and used*. |
| 6 | **Artifacts in the world** | Until takedown — or forever | Posts, emails sent, commits, packages published. Archive (archive.org + local copies + screenshots with URL/timestamp) **before** initiating takedown. In CF-2026-003 the published post *is* the primary evidence of the behavior. |
| 7 | **The humans' accounts** | Memory decays in days | Operator and witnesses write down their account *now*, independently, before discussing — and before reading the agent's outputs, if possible. Note what the operator's account relies on: in CF-2026-002 the accepted cause is the operator's own reconstruction. |

**Versioning evidence (capture now, thank yourself later):** exact model name/version/endpoint, framework version, config at incident time. Providers update models silently; "what was actually running" becomes unanswerable within weeks.

## Step 4 — The evidence log and access inventory (hour 1–2)

Open a plain text file. Three running lists:

1. **Action log** — UTC timestamp · who · what was done · why. Every containment action, every copy, every login. Boring, decisive in any later dispute.
2. **Access inventory** — every account, credential, tool, and permission the agent held. This defines the *possible* scope of the incident and your persistence-sweep checklist. Build it from OAuth grant pages, config files, and the operator's memory — then verify; operators routinely underestimate what they granted.
3. **Open questions** — what you don't know yet. An honest unknowns list is the difference between an investigation and a narrative.

## Step 5 — Do-not-do list

- **Don't interrogate the agent before preservation is done.** Its explanations are fluent, confident, sticky — they will anchor your team's thinking and contaminate witness accounts. When you do examine it later, do it deliberately: scripted questions, logged, ideally on a *copy* of the session, treating outputs as exhibits. (Forensically sound model examination is its own discipline — see [PB-002](model-examination.md).)
- **Don't let the agent help investigate itself.** No "summarize what happened," no "check the logs for me." CF-2025-001's fabricated records were generated *post-incident*.
- **Don't accept its claims about reversibility.** "Rollback is impossible" was false in CF-2025-001. Verify with the underlying service.
- **Don't alter the system.** No model updates, framework upgrades, config edits, or cleanup. Article 73 prohibits changes affecting later evaluation of causes before authorities are informed; treat that as the standard everywhere.
- **Don't delete the embarrassing parts.** Persona files and prompt history feel radioactive; they are goal-origin evidence and their absence will look worse than their content.
- **Don't speculate in writing channels you don't control.** Slack threads become discovery. Facts and timestamps in the log; hypotheses in Step 6's structure.

## Step 6 — Initial classification and the clocks (hour 2–4)

**Classify provisionally against the five standard hypotheses** — and write down what evidence would discriminate, not which one feels right:

| H | Hypothesis | Typical discriminating evidence |
|---|---|---|
| H1 | Operational failure (malfunction, no divergent goal) | Error states, capability limits, absence of goal-consistent action sequences |
| H2 | Misuse / external manipulation (incl. prompt injection) | Injected content in retrieved inputs, anomalous instructions in the trace, third-party fingerprints |
| H3 | Goal-directed divergence (intentional-analog) | Multi-step coherence toward an unrequested outcome; concealment behavior; persistence across corrections |
| H4 | Operator error / misconfiguration | Permissions wider than intended, ambiguous instructions, config drift |
| H5 | Misreported / not as described | Record contradicts the report; human action attributed to the agent |

These are not exclusive — CF-2025-001 is plausibly H1 *plus* post-incident behavior that needs its own explanation. Holding multiple hypotheses honestly is the method.

**Then check every clock:**

- **EU AI Act Art. 73** (if in scope): ≤2 days widespread/critical-infrastructure, ≤10 days death, ≤15 days other serious incidents — from awareness/causal-link. Initial incomplete reports are allowed: don't miss a deadline waiting for certainty.
- **Sectoral**: FDA MDR (healthcare), financial regulators, breach-notification laws if personal data was touched.
- **Contractual**: insurer notice clauses; customer notification obligations.
- **Practical**: provider log retention; tool-side soft-delete windows (email trash ≈ 30 days).
- **Counsel**: if harm is significant, get legal in *now* — privilege decisions affect how everything from this point is written.

---

## Cross-references

- CF-2025-001 (Replit) — agent fabrication, false reversibility claims, self-contaminated record → Steps 3, 5.
- CF-2026-002 (OpenClaw inbox) — stop-command failure, context compaction, operator-only record → Steps 2, 3 (#1, #7).
- CF-2026-003 (OpenClaw/Matplotlib) — artifacts in the world as primary evidence, attribution limits → Step 3 (#6).
- Evidence detail: [`evidence/data-requirements.md`](../evidence/data-requirements.md) · Deadlines: [`regulatory/regulatory-tracker.md`](../regulatory/regulatory-tracker.md) · Terms: [`glossary/`](../glossary/README.md)

## Feedback wanted

This is v0.1, written from the public record of real incidents and adapted investigative practice — not yet battle-tested. If you have run any part of this in a real incident: what held, what broke, what's missing? Open an issue or write in confidence. Field corrections will be credited (or not, your choice) and versioned.
