# Skill installation notes

Copy or symlink the `skills/reverse-engineer-agent` directory into the agent's skill root (for example `.grok/skills/` or the equivalent location for the host agent).

Restart the agent after installation so the new skill metadata is discovered.

The skill itself does not register MCP servers or install analysis engines. It routes to whatever local tools and supporting skills are already present.
