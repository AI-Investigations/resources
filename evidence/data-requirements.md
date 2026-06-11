# Evidence & data requirements

What an AI incident investigation needs, organized as a working checklist. Categories adapted from Ezell, Roberts-Gaal & Chan (2025) and the European Commission's draft Article 73 guidance (2025); investigative framing added. The brutal current reality is at the bottom.

*Last reviewed: June 2026*

## 1. Activity logs

The record of the agent's inputs and outputs across **all** components — the underlying model and the scaffolding around it (filters, parsing code, orchestration).

**Collect / request:**
- [ ] Original user prompt and system prompt
- [ ] Model reasoning traces (chain-of-thought logs) where they exist — these record how the agent planned and selected actions; an OpenAI evaluation caught an agent's strategy to cheat by skipping unit tests *in its chain of thought* (Baker et al., 2025)
- [ ] All prompts provided to the model at each step
- [ ] External information supplied to the model (retrieved web content, file contents, API responses)
- [ ] The model's outputs at each step
- [ ] Executed tool calls and code; classifier and guardrail outputs
- [ ] Metadata: timestamps, session identifiers, model/component identifiers and versions

**Investigative cautions:**
- The agent's statements about its own behavior are **artifacts, not testimony**. Assess them; do not adopt them.
- Establish whether the agent could have written to its own record (see CF-2025-001 — fabricated records contaminating the evidence base).
- Context-window compaction can silently destroy the instruction history that explains the incident (see CF-2026-002). Ask specifically what was summarized away and when.

## 2. System documentation & access

The context needed to interpret the logs and reconstruct the episode.

- [ ] Model and system cards: architecture, training approach, evaluation, mitigations
- [ ] **Exact** model and system version at incident time
- [ ] Runtime details enabling reconstruction: temperature, seeds, configuration
- [ ] Change logs across versions: training data, feedback mechanisms, scaffolding changes
- [ ] Persona / configuration files (e.g., OpenClaw's "SOUL.md") — a candidate goal source (see CF-2026-003)
- [ ] Where obtainable: scaffolding code and grey/white-box model access under the incident's version and runtime environment

## 3. Tool-related records

Agent–tool interactions are often where the harm happened.

- [ ] Each tool used: identity, version, what it grants access to
- [ ] Tool instructions and access requirements
- [ ] Data the tool collects or shares with third parties
- [ ] Every action the agent took or attempted via the tool: API calls, apparent objective, how access was gained, errors encountered

## The current reality

Open incident databases (AIID, AVID, OECD AIM) contain **none of the above** — they hold publicly reported, high-level information that supports trend classification, not investigation. There is no secure infrastructure for sharing sensitive incident data (e.g., chain-of-thought logs) across organizations, and no institutional arrangement comparable to what aviation or cybersecurity built over decades. In practice: the evidence an investigation needs either was never captured, sits unreachable inside one company, or exists only in whatever the operator happened to retain. Plan every investigation around that constraint — and document it as a finding when you hit it.
