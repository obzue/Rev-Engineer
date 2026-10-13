# Evidence handling

See the skill reference `skills/reverse-engineer-agent/references/evidence.md` for the full rules.

Minimal record fields:

- `evidence_id`
- `target` (absolute path)
- `digest` (sha256:...)
- `tool`
- `observation`
- `limitations`
- `unknowns`

The CLI `evidence` subcommand pretty-prints a JSON record. Agents should emit and retain these records so later steps can cite them without re-running analysis.
