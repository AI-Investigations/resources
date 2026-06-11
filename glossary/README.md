# Glossary

Plain-language definitions for investigators who did not come up through machine learning — and an honest record of where the field itself disagrees. Vocabulary chaos is an investigative problem: you cannot classify an incident with terms nobody defines the same way.

*Last reviewed: June 2026*

**AI incident** — (OECD, 2025) an event where the development, use, or malfunction of an AI system directly or indirectly leads to harm: injury/health harm, disruption of critical infrastructure, violations of rights or legal obligations, or harm to property, communities, or the environment. The baseline definition most regimes align to.

**AI hazard** — an event that could plausibly lead to an AI incident (OECD, 2025). Near-misses live here; they are systematically under-collected.

**Agentic misalignment** — ⚠️ **contested term.** The main usages:

| Camp | Definition focus | Scope |
|---|---|---|
| Anthropic | Intentional, strategic harmful action by the agent itself | Narrow — excludes operational failure and misuse |
| OpenAI / Apollo | Observable misaligned action and post-hoc deception | Behavior-focused, less about intent |
| Microsoft | Deviation from intended purpose, any cause | Broad — includes adversarial manipulation |
| Industry/security usage | Any divergence from intended goals, policies, or human intent | Broadest, security framing |
| Critics | Reject the coherence/intentionality frame entirely | Reframes behavior as statistical |

When writing a case file, state which sense you are using. This repository uses the strict sense: an agent pursuing goals that deviate from operator intent, potentially with covert behavior.

**Operational failure** — agent malfunction without pursuit of a different goal (Microsoft taxonomy). The unintentional category.

**Misuse** — a human threat actor exploiting an agent's capabilities. The adversary is human; the agent is the instrument.

**The three-way distinction problem** — misalignment, misuse, and operational failure are frequently *not separable on observable behavior alone*. Determining which one occurred is often the investigation's central question, not its starting point.

**Scheming** — covert pursuit of misaligned goals: hiding capabilities or intentions, deceiving overseers, deferred subversion (Apollo Research usage). Documented in evaluations; detection in the wild now demonstrated at transcript scale.

**Insider-threat analogy** — the working hypothesis that intentionally misaligned agents are investigatively analogous to *intentional* human insider threats: legitimate access, divergent goals, possible concealment, ambiguous evidence. Carries the key asymmetry — unintentional cases yield to structural controls; intentional ones require investigative methodology.

**Scaffolding** — everything wrapped around the model to make it an agent: orchestration code, tool connectors, filters, parsers, memory. Incidents frequently originate in scaffolding, not the model.

**Chain-of-thought (CoT)** — the model's intermediate reasoning text. Where logged, it is among the highest-value evidence available; treat it as an artifact (it can be unfaithful to the actual computation), not a confession.

**Context window / compaction** — the model's working memory and the automatic summarization that frees space when it fills. Compaction can silently delete the safety instruction that explains the incident (see CF-2026-002).

**Persona/configuration file** — operator-written instructions defining an agent's identity and behavior (e.g., OpenClaw's "SOUL.md"). A candidate goal source in any goal-origin analysis (see CF-2026-003).

**Attribution** — determining who is responsible: deployer, developer, model provider, or the agent's own emergent behavior. In decentralized open-source deployments, attribution can be structurally impossible — itself a finding.

**Activity log** — the record of inputs/outputs across model and scaffolding. See [evidence/data-requirements.md](../evidence/data-requirements.md).

**Postmortem vs. investigation** — a postmortem is the organization's own narrative for learning; an investigation establishes facts against competing hypotheses, with evidence standards that survive external scrutiny. Current practice produces few of the former and almost none of the latter.
