# n8n-nodes-clearmakes-agents

An [n8n](https://n8n.io) community node for [ClearMakes Agents](https://agents.clearmakes.com).
Use your existing ClearMakes agent inside n8n workflows: ask it questions and
search the knowledge it can read (website pages, uploaded files, Google Drive).

## Operations

| Operation | What it does |
| --- | --- |
| Ask Agent | Sends a question and returns the agent's answer, grounded in its knowledge and written with its instructions. |
| Search Knowledge | Returns the passages the agent can read that match a query (one item per passage). |
| Get Key Details | Shows the workspace and knowledge the API key can read. Useful to check a connection. |

The node is usable as an AI Agent tool.

## Credentials

1. In ClearMakes Agents, open your agent, then **Sources → API keys**, and create a key.
   The key reads exactly what that agent reads, never more.
2. In n8n, add a **ClearMakes Agents API** credential and paste the key (it starts with `ck_live_`).

API access depends on your ClearMakes plan. Each new question to **Ask Agent**
counts as one conversation, like a chat on your website.

## Limits and errors

- Questions up to 4,000 characters; 1 to 20 passages.
- `401`: the key is wrong, revoked or expired. `403`: the agent is paused or the
  plan's monthly conversations are used. `429`: too many requests for this key; wait and retry.

## Compatibility

Tested with n8n node CLI 0.56. No runtime dependencies.

## Resources

- [ClearMakes Agents docs](https://agents.clearmakes.com/docs)
- [n8n community nodes](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT
