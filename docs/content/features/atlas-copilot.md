---
title: Atlas copilot
status: current
reviewed: 2026-10-05
---

# Atlas copilot

Atlas is the chat assistant in Overwatch Console. Ask it about what is on your screen or about your tenant's data; it hands data questions to the right agent, reads the rows that come back and explains them. Atlas reads and explains. It cannot approve, deny or run anything.

## Where to find it

- **Sidebar dock**: the Atlas box at the bottom of the sidebar. Type in "Ask about this view…" and send, or use the expand button ("Open Atlas (⌘J)"). The dock shows a preview of Atlas's latest answer. It is hidden when the sidebar is collapsed.
- **Keyboard**: **⌘J** (Mac) or **Ctrl+J** (Windows, Linux) opens or closes the Atlas drawer from any page.
- **Ask Atlas** buttons: in an incident's detail blade on the Incidents page, and on a selected node in the Relationships entity graph.
- Detection Library: asking for help refining a rule opens Atlas with a prepared question.
- Agents page: the Atlas card, or **Open copilot** in Atlas's workspace.
- Command palette: pick Atlas.

If an administrator renamed the agents, the buttons use that name.

## Who can use it

| Role | What you can do |
|------|-----------------|
| Viewer | Open the drawer. Sending a question is refused by the server; the dock shows "Atlas needs analyst access". |
| Analyst | Ask questions, run the KQL Atlas shows, pin answers to an incident's case notes. |
| Admin | Everything an analyst can, plus ask Atlas to file a request in Approvals. |

## What you see

The drawer opens on the right.

- **Header**: "Atlas" and a badge naming what Atlas is scoped to (the incident in view, or the page name). Buttons to clear the conversation and close the drawer.
- **Conversation**: your questions and Atlas's answers. When Atlas hands a question to an agent, a line above the answer shows who took it and what came back, for example "Dax · query · 12 rows · 1.4s", or "Orion · hunt history failed".
- **Code blocks**: KQL blocks have Copy and Execute buttons. Other code blocks have Copy.
- **Answer footer**: a generated-text tag, **Pin to #N notes** when an incident is in view, and a list of the on-screen records the answer names.
- **In view**: chips for the page and any incident or detection you have open. Remove a chip with its × to leave that record out of the next question.
- **Suggested questions**: change with what is in view (for example "Summarize #N", "Why was it escalated?", "What should I do next?" for an incident).
- **Input**: "Ask about what's on screen…". Enter sends; Shift+Enter adds a line.
- Footnote: "Atlas asks the platform's agents for read-only results and cites them. Changes go to Approvals; Atlas cannot approve or execute them."

## What Atlas can see and do

Atlas works only inside your tenant. It can:

- Read what you have in view: the page you are on and the incident or detection you have open. These fields come from your screen and are treated as data.
- Explain the page you are on, or any other page, from a built-in description of each console page.
- Ask an agent to run a read-only KQL query in your Sentinel workspace. Triage questions go to Dax or Demitry (whichever has recorded fewer actions in the last 15 minutes); hunting questions go to Orion. Up to 50 rows come back per query, over a window of up to 30 days. If an agent's query tool is revoked in its tool permissions, Atlas cannot route to it.
- List the newest Sentinel incidents (up to 25).
- Read Dax's recorded investigation and Demitry's latest QA decision for one incident.
- Search the Detection Library (Renzo), recent hunts (Orion), recent tuning (Marien) and sandbox jobs and reports (Caleb).
- Summarize recorded activity per agent over the last hours (up to 7 days).
- For admins only, when you explicitly ask for a change: file a request in [Approvals](approvals.md) on behalf of Maxwell, Marien, Dax or Renzo. Approving that request records the decision. It does not run the action.

## What you can do

- **Ask a question**: type and send. Analysts and admins.
- **Execute** on a KQL block: runs that query in your workspace over the last day and adds a result table with up to 20 rows. The query must be a single read-only expression in your workspace. Analysts and admins.
- **Copy**: copies a code block.
- **Pin to #N notes**: saves the answer to the incident's case notes as generated text. The incident itself is unchanged. Analysts and admins.
- **Clear conversation**: empties the drawer.
- Remove an **In view** chip.

None of these need approval. Atlas never changes an incident, a rule or an agent setting.

## Good to know

- Atlas's answers are generated. They cite the rows and records they rely on; check the cited evidence before acting.
- When a result was cut at the row limit, Atlas is instructed to say the list is partial.
- If an answer fails you see "Atlas could not complete this response. Check Agent Audit before retrying."
- Every question, its scope and its outcome is recorded under Atlas in [Agent Audit](agent-audit.md). Atlas's workspace on the Agents page lists completed and failed answers from the last 7 days.
- The conversation is not saved. Closing and reopening the drawer keeps it, but reloading the page, closing the browser tab or using **Clear conversation** removes it.
- Messages are limited to 20,000 characters (2,000 in the sidebar dock).

## Related

- [How to ask Atlas](../how-to/ask-atlas.md)
- [The agents](../concepts/the-agents.md)
- [Agents](agents.md)
- [Approvals](approvals.md)
- [Incidents](incidents.md)
