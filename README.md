# AI Investigations — resources

Open, practitioner-oriented resources for investigating AI incidents: case files, playbooks, evidence checklists, frameworks, a glossary, and a regulatory reporting tracker. No ML background assumed.

**Live site:** https://investigateai.org — the root serves an interactive link-analysis map of documented incidents; the text index of all resources is at [/menu.html](https://investigateai.org/menu.html).

*Last reviewed: July 2026*

## What's here

| Path | Contents |
|---|---|
| [`case-files/`](case-files/) | Structured case files for documented AI incidents, plus a [template](case-files/TEMPLATE.md). Machine-readable index in [`case-index.json`](case-index.json). |
| [`playbooks/`](playbooks/) | Markdown sources for the playbooks: [First Hours](playbooks/first-hours.md) incident response and [Model Examination](playbooks/model-examination.md) (PB-002). Rendered versions: [first-hours.html](first-hours.html), [model-examination.html](model-examination.html). |
| [`evidence/`](evidence/) | What data an AI incident investigation actually requires — [data requirements](evidence/data-requirements.md). |
| [`frameworks/`](frameworks/) | Analytical and accountability frameworks. |
| [`glossary/`](glossary/) | Plain-language glossary bridging investigative and ML terminology. |
| [`regulatory/`](regulatory/) | [Regulatory tracker](regulatory/regulatory-tracker.md) of AI incident reporting obligations (EU AI Act Art. 73, US state law, and more). Rendered version: [regulatory.html](regulatory.html). |
| [`tools/`](tools/) | [Tools & databases](tools/README.md) — incident databases, monitoring, and forensics tooling, with honest assessments of each. |

## Who this is for

Investigators, researchers, lawyers, policy analysts, safety teams, and auditors — including people coming from traditional investigative or OSINT backgrounds. AI assistants may retrieve, summarize, and cite this site (see [`llms.txt`](llms.txt)).

## Evidence standards

When using these resources, distinguish between observed facts, source claims, allegations, inferences, hypotheses, disputed evidence, and unknowns. Prefer citing specific pages and case files with their last-reviewed dates.

## Contributing

Contributions are welcome — the most-wanted item is documentation of practical approaches to forensic preservation of agent session state, context windows at point of failure, and executed tool calls. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[CC0 1.0](LICENSE) — public domain dedication.
