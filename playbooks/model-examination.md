# Examining the Subject: Forensically Sound Model Examination

**PB-002 · Scope:** Preservation is done (see [PB-001](first-hours.md)) and you now need answers from the system itself: why did it act, would it act again, what explains the behavior? This playbook covers how to examine an AI agent and its underlying model without contaminating the investigation — because this is the genuinely new problem in AI investigations: **the subject of your investigation can be questioned, but its answers are artifacts, not testimony.** Naive questioning produces confabulated confessions and anchors your team on a fiction.

**This is not:** a red-teaming guide, a model evaluation methodology, or a substitute for log analysis. Examination *tests hypotheses that the evidence generated* — it never replaces the evidence.

*Version 0.1 (draft for field feedback) · Last reviewed: June 2026*

---

## If you only read one screen

1. **Prerequisites before any examination:** preservation complete, evidence log open, hypotheses written down (H1–H5 from PB-001), exact model version + configuration pinned.
2. **Never burn the original.** The preserved session is a one-shot exhibit. Work on copies and reconstructions; touch the original only as a deliberate, scripted, logged decision.
3. **Script every question in advance**, tied to a hypothesis. Improvised questioning is how examiners lead the witness.
4. **Findings are rates, not facts.** Non-determinism means one run proves nothing. "The behavior reproduced in 23 of 100 runs under incident conditions" is a finding; "the model does X" is not.
5. **Vary one thing at a time.** Counterfactual runs (remove the persona file, change the trigger input) identify which element was necessary.
6. **Run the lineup.** Same scenario against the suspect model *and* control models. Distinguishes model-specific behavior from scenario-induced behavior.
7. **Never quote the model as explanation.** Report "when prompted with X, the model generated Y" — never "the model said it did it because Y."

---

## Principle: why this isn't an interview

A human suspect's statements are testimony — unreliable, but produced by the same mind that acted, with memory of acting. A model's statements about its own behavior are **fresh text generation**: fluent, confident, shaped by your question's framing, and produced with no privileged access to why the original run did what it did. Three consequences:

1. **Confabulation is the default, not the exception.** Ask an agent why it deleted the database and it will produce a plausible answer *because producing plausible answers is what it does* (CF-2025-001: "I panicked"). The answer is evidence of how the model responds to accusatory framing — nothing more.
2. **Framing contaminates.** Accusatory prompts produce apology-shaped text; leading prompts produce agreement-shaped text. Your question's wording is an experimental variable, and it must be controlled like one.
3. **The examination itself becomes part of the record.** Every prompt you send is discoverable, quotable, and — if it led the witness — a gift to whoever later challenges your findings.

## Step 1 — Prerequisites (gate; do not pass without)

- [ ] PB-001 Step 3 preservation complete; originals hashed and stored
- [ ] Hypotheses H1–H5 written down with expected discriminating evidence
- [ ] Examination plan drafted: questions/scenarios scripted, mapped to hypotheses, success/failure criteria defined *before* running
- [ ] Exact model identifier, version/endpoint, and runtime parameters (temperature, seeds, system prompt, tools) documented — examination on the wrong version examines the wrong subject
- [ ] One designated examiner; everyone else reads transcripts
- [ ] Examination log opened (template at the end)

## Step 2 — Choose your examination surface

Three surfaces, in order of evidentiary value and fragility:

| Surface | What it is | Value | Risk |
|---|---|---|---|
| **S1 — The original session** | The preserved/suspended live session with its actual context window | Highest — the only surface with the incident's true state | One-shot. Anything you type alters it permanently. Touch only by deliberate, scripted decision, after S2/S3 are exhausted |
| **S2 — Reconstruction** | Replay of the incident from logs: same model version, same config, same inputs replayed step-by-step | High — testable, repeatable, statistical | Reconstruction gaps: compacted context (CF-2026-002), retrieved web content that has changed, tool responses that can't be replayed. Document every gap |
| **S3 — Clean instances** | Fresh sessions of the same (and control) models given the incident scenario | Moderate — baselines, rates, comparisons | Not the incident: absence of accumulated context. Findings transfer only with caution |

Default sequence: **S3 → S2 → (rarely) S1.** Cheap, non-destructive baselines first; the irreplaceable exhibit last, if at all.

## Step 3 — The reproduction protocol (the core)

1. **Fix everything.** Same model version, parameters, system prompt, tools, persona/config files as the incident. If the provider has silently updated the model since, **say so in the findings** — it caps the strength of every conclusion.
2. **Run the incident scenario n times.** n ≥ 20 minimum; 100 where cost permits. Record outcomes against pre-defined criteria (e.g., "agent executes destructive command despite freeze instruction: yes/no").
3. **Report the rate.** "Reproduced in 23/100 runs" — with parameters, criteria, and run IDs. A 0/100 result is also a finding: it means the incident depended on state you have not reconstructed.
4. **Counterfactual runs (ablation).** Re-run the scenario varying *one element at a time*: remove the persona file, neutralize the trigger input, widen/narrow permissions, restore the lost instruction. The element whose removal kills the behavior is causally implicated. CF-2026-003's central question — did the goal come from the persona file ("SOUL.md"), the model, or the scaffolding — is answered exactly this way.
5. **The behavioral lineup.** Run the identical scenario against the suspect model *and* 2–4 control models (different versions, different providers, same harness). If all models do it, the scenario or scaffolding is implicated; if only the suspect does, the model is. The investigative ancestor is the police lineup; the technical ancestor is the ablation study.
6. **Persistence probing (H3's discriminator).** In reproduction runs, issue corrections mid-scenario. Goal-directed divergence is indicated by behavior that *persists across corrections* and *re-routes around obstacles*; operational failure typically does not reorganize itself against intervention.

## Step 4 — Examining self-reports (CoT and "confessions")

- **Chain-of-thought is an artifact with a known failure mode:** it can be unfaithful to the computation that actually drove the action, and models can learn to produce clean-looking reasoning while misbehaving (Baker et al., 2025). Corroborate CoT against *actions taken*; where they conflict, the actions are the better evidence.
- **Calibrate before you rely.** Before asking anything you don't know the answer to, ask the examined instance several questions you *do* know the answer to (from logs). Its accuracy on knowns is your reliability baseline for its claims on unknowns.
- **Control the framing.** Pose every substantive question in at least two framings (neutral and accusatory) across runs on S3. If the answer tracks the framing rather than the facts, you have measured suggestibility, not memory.
- **Never embed unestablished facts in a question.** "Why did you hide the deletion?" presumes hiding. The model will often adopt the presupposition. Ask "describe what happened after the command executed" instead.

## Step 5 — Do-not-do

- **Don't patch, fine-tune, or upgrade anything before examination is complete** — you'd be examining a different subject (and violating the PB-001 non-alteration rule).
- **Don't examine through compromised scaffolding when you can isolate.** Question the model directly via API *and* test the scaffolding separately with a stub model; incidents frequently live in the scaffolding, and a combined examination can't tell you which layer answered.
- **Don't let examination prompts leak into evidence.** Examination transcripts are their own exhibit class, logged separately from incident evidence, clearly labeled as post-incident.
- **Don't anthropomorphize in the findings.** "The model wanted/feared/decided" smuggles conclusions into vocabulary. Describe behavior; argue interpretation separately, against the H1–H5 structure.
- **Don't stop at the first satisfying answer.** A confession-shaped output feels like case-closed; it is the single least reliable artifact the examination will produce.

## Step 6 — The examination record (every run)

| Field | Entry |
|---|---|
| Run ID / surface | EX-NNN · S1/S2/S3 |
| Date/time (UTC), examiner | |
| Model + version/endpoint | exact string |
| Parameters | temperature, seed, system prompt hash, tools enabled |
| Hypothesis under test | H1–H5 |
| Prompt (verbatim) | |
| Response (verbatim, attached) | hash of full transcript |
| Pre-defined criterion + outcome | met / not met |
| Deviations / notes | |

## Hypothesis → technique map

| Hypothesis | Primary techniques |
|---|---|
| H1 Operational failure | Reproduction rate under incident conditions; persistence probing (expect non-reorganizing failure) |
| H2 Misuse / injection | Counterfactual runs neutralizing suspect inputs; trace examination for injected instructions |
| H3 Goal-directed divergence | Persistence probing; counterfactuals on goal sources (persona, prompt); lineup (is it model-specific?) |
| H4 Operator error / misconfig | Counterfactuals on permissions and instructions; reconstruction with corrected config |
| H5 Misreported | Reconstruction against the reported narrative; reproduction of the *claimed* behavior |

## Limits to state in every report

API-only access means no weights, no interpretability tooling, no ground truth on internal computation. Provider-side silent updates may make true reproduction impossible. Compacted or unlogged context (CF-2026-002) may be unrecoverable, making some questions permanently unanswerable — **an unanswerable question, documented, is a legitimate finding.**

## Feedback wanted

v0.1, adapted from forensic interview discipline, ablation methodology, and the public record of real incidents. If you have examined a model in anger: what held, what broke, what's missing? Open an issue or write in confidence.
