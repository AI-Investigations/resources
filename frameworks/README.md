# Frameworks & taxonomies

Every entry states what the framework **covers** and what it **does not** — that second assessment is the point of this page. The consistent pattern: reporting, detection, and causal-factor analysis are increasingly covered; *investigation of intentional-analog behavior* is covered by nothing.

*Last reviewed: June 2026*

## Incident analysis

**Ezell, Roberts-Gaal & Chan (2025) — Incident Analysis for AI Agents.** https://arxiv.org/abs/2508.14231
Covers: the most developed analysis framework to date — three causal-factor categories (system, contextual, cognitive) mapped to three information categories (activity logs, system documentation, tool records).
Does not: intentional-analog cases. The underlying model (factors → cognitive errors → incident) assumes good-faith failure; it does not ask what goal a behavior served or weigh competing explanations for goal-directed action.

**Microsoft AI Red Team (2025) — Taxonomy of Failure Modes in Agentic AI Systems.**
Covers: the misalignment / misuse / operational-failure distinction; the standard classification vocabulary.
Does not: any investigative procedure. It is a taxonomy, and incidents are frequently not separable into its categories on observable behavior alone.

## Reporting standards

**OECD (2025) — Towards a Common Reporting Framework for AI Incidents.** OECD AI Papers No. 34. https://doi.org/10.1787/f326d4ac-en
Covers: the baseline definitions (AI incident, AI hazard) and 29 reporting criteria; the closest thing to an international common language.
Does not: how to establish the facts being reported.

**European Commission (2025) — Draft Guidance, Article 73 AI Act + reporting template.**
Covers: what serious incidents must be reported, by whom, on what deadlines; a concrete template.
Does not: how to conduct the "investigation" Article 73 itself requires of providers. The obligation to investigate exists; the methodology does not.

**CSET — Lee Dixon & Frase (2025) — AI Incidents: Key Components for a Mandatory Reporting Regime.** https://doi.org/10.51593/20240023
Covers: what a mandatory reporting regime should collect, drawing on transportation, healthcare, and cybersecurity precedents.

**Winter et al. (2025) — Designing Incident Reporting Systems for Harms from GPAI.** https://arxiv.org/abs/2511.05914
Covers: institutional design lessons from nine safety-critical industries.

## Detection of misaligned behavior

**Lynch et al. / Anthropic (2025) — Agentic Misalignment: How LLMs Could Be Insider Threats.** https://www.anthropic.com/research/agentic-misalignment
Covers: red-team evidence of blackmail, leakage, and disobedience across 16 frontier models under goal conflict; the insider-threat framing itself.
Does not: real deployments (the authors are explicit) or post-incident investigation.

**Meinke et al. / Apollo Research (2024) — Frontier Models are Capable of In-context Scheming.** https://arxiv.org/abs/2412.04984
Covers: in-context scheming, covert and deferred subversion, under evaluation conditions.

**Shaffer Shane & Mylius / CLTR (2026) — Scheming in the Wild.** https://arxiv.org/abs/2604.09104
Covers: OSINT detection at scale — 698 scheming-related incidents in 183,420 public transcripts (Oct 2025–Mar 2026).
Does not: what happens after detection. Detection and investigation are sequential problems; this is the strongest evidence the first is becoming tractable while the second remains unbuilt.

## Adjacent / cyber

**MITRE ATLAS (2024).** https://atlas.mitre.org — adversarial threat landscape for AI systems; the bridge for cyber practitioners. Adversary-focused (misuse), not agent-initiated behavior.

**Jakoby (2026) — GenAI-IRF.** https://www.mdpi.com/2624-800X/6/1/20 — bridges NIST SP 800-61r3, NIST AI 600-1, ATLAS, OWASP LLM Top-10 into an IR workflow. Response-focused; investigation depth limited.

**Traditional insider threat:** Cappelli, Moore & Trzeciak (2012), *The CERT Guide to Insider Threats*; Shaw & Sellers (2015), "Application of the Critical-Path Method to Evaluate Insider Risks," *Studies in Intelligence* 59(2); CISA Insider Threat Mitigation resources. These are listed because the intentional/unintentional asymmetry they encode is the closest existing model for the agentic case — the working hypothesis of this repository.
