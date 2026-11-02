---
title: Atlas copilot
status: current
reviewed: 2026-11-02
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
| Viewer | Open the drawer and read it. The question box, the dock and the suggested questions are disabled and read "Atlas needs analyst access"; the server also refuses viewers' questions. |
| Analyst | Ask questions, run the KQL Atlas shows, pin answers to an incident's case notes. |
| Admin | Everything an analyst can, plus ask Atlas to file a request in Approvals. |

## What you see

The drawer opens on the right.

- **Header**: "Atlas" and a badge naming what Atlas is scoped to (the incident in view, or the page name). Buttons to widen the drawer (**Widen Atlas**, then **Narrow Atlas**; your browser remembers the choice), clear the conversation and close the drawer.
- **Conversation**: your questions and Atlas's answers. When Atlas hands a question to an agent, a line above the answer shows who took it and what came back, for example "Dax · query · 12 rows · 1.4s", or "Orion · hunt history failed".
- **Answers**: a short, plain answer first, then a few bullets. Record and hunt IDs, timestamps, long lists and the KQL Atlas ran are under **Details**, closed until you open it.
- **Code blocks**: folded under their label, for example "KQL · 14 lines"; open one to read it. KQL blocks have Copy and Execute buttons. Other code blocks have Copy.
- **Answer footer**: a generated-text tag, **Pin to #N notes** when an incident is in view, and a list of the on-screen records the answer names.
- **In view**: chips for the page and any incident or detection you have open. Remove a chip with its × to leave that record out of the next question.
- **Suggested questions**: change with what is in view (for example "Summarize #N", "Why was it escalated?", "What should I do next?" for an incident).
- **Input**: "Ask about what's on screen…". Enter sends; Shift+Enter adds a line.
- Footnote: "Atlas asks the platform's agents for read-only results and cites them. Changes go to Approvals; Atlas cannot approve or execute them."

## What Atlas can see and do

Atlas works only inside your tenant. It can:

- Read what you have in view: the page you are on and the incident or detection you have open. These fields come from your screen and are treated as data.
- Explain the page you are on, or any other page, from a built-in description of each console page.
- Ask an agent to run a read-only KQL query in your Sentinel workspace. Triage questions go to Dax or Demitry (whichever has recorded fewer actions in the last 15 minutes); hunting questions go to Orion. Up to 50 rows come back per query. The window defaults to one day and widens to cover the lookback written in the query (for example `ago(7d)`), up to 30 days; a query that looks back further only searches the last 30 days, and Atlas says so. If an agent's query tool is revoked in its tool permissions, Atlas cannot route to it.
- List the newest Sentinel incidents (up to 25). When more incidents match, Atlas is told the list is only the newest ones and is instructed not to present its length as a total.
- Read Dax's recorded investigation and Demitry's latest QA decision for one incident.
- Search the Detection Library (Renzo), recent hunts (Orion), recent tuning (Marien) and sandbox jobs and reports (Caleb).
- Check a file hash (MD5, SHA-1 or SHA-256) with Caleb: his earlier lookup for the incident, or a live VirusTotal lookup with your workspace's own key (Settings > Threat Intel). Atlas needs the hash, not a file name, so it may look the hash up with a query first. Without the Email & Malware pack or a VirusTotal key it says plainly that it cannot check the hash. It is instructed never to call a file clean because no engine flagged it.
- If your organization monitors several Sentinel workspaces, run queries, list incidents and look up log sources across all of them, or in the one you name. Results say which workspace each row, incident or connector came from.
- Look up what your workspace ingests, from the same summary the [Data connectors](data-connectors.md) page shows: each connector with its health and tables, and the sources you marked as kept elsewhere. Atlas uses it to tell you whether a table is connected, and whether zero rows may mean the data is missing rather than nothing happened.
- Ask Renzo for your workspace's detection coverage against MITRE ATT&CK or MITRE ATLAS, the same map as **Workspace coverage** in the [Detection Library](detection-library.md): the covered share overall and per tactic, the top gaps (optionally for one tactic), connectors that would make more visible, enabled rules whose tables have no data, or one technique's status, covering rules and how it is detected. Atlas is instructed to call a technique covered only when an enabled rule reads live data for it, and to say that percentages are of the techniques your workspace can observe.
- Summarize recorded activity per agent over the last hours (up to 7 days).
- Answer questions about using Overwatch Console from these guides: Atlas searches the Help library, reads the best guide and names it so you can open it in Help. It also reads your workspace's plan, price, packs and measured size from the same record as [Billing and plans](billing.md). When the guides do not cover a question, or you ask for a person, Atlas gives the support address.
- For admins only, when you explicitly ask for a change: file a request in [Approvals](approvals.md) on behalf of Maxwell, Marien, Dax or Renzo. Approving that request records the decision. It does not run the action. If filing requests from Atlas is turned off in production, Atlas tells you where in the console to make the change instead.

## What you can do

- **Ask a question**: type and send. Analysts and admins.
- **Execute** on a KQL block: runs that query in your workspace and adds a result table with up to 20 rows. The window is the last day, widened to cover the query's own lookback up to 30 days. The table heading says how many rows came back and from which window, for example "12 rows from the last 24 hours", or "first 20 rows …; more may match" when the limit cut it short. The query must be a single read-only expression in your workspace. With several monitored workspaces, **Execute** runs in the one marked First workspace under Data connectors; ask Atlas to run it when you need another workspace or all of them. Analysts and admins.
- **Copy**: copies a code block.
- **Pin to #N notes**: saves the answer to the incident's case notes as generated text. The incident itself is unchanged. Analysts and admins.
- **Clear conversation**: empties the drawer.
- Remove an **In view** chip.

None of these need approval. Atlas never changes an incident, a rule or an agent setting.

## Good to know

- Atlas's answers are generated. They cite the rows and records they rely on; check the cited evidence before acting.
- When a result was cut at the row limit, Atlas is instructed to say the list is partial, to give totals only from a count, and to state the query window when it gives numbers.
- Atlas has a limited number of steps per answer. Its last step always writes the answer from what it found; if it ran out, it is instructed to say what is still unknown.
- If an answer fails you see "Atlas could not complete this response. Check Agent Audit before retrying." The Atlas record in Agent Audit notes how it failed.
- Every question, its scope and its outcome is recorded under Atlas in [Agent Audit](agent-audit.md). Atlas's workspace on the Agents page lists completed and failed answers from the last 7 days.
- The conversation is not saved. Closing and reopening the drawer keeps it, but reloading the page, closing the browser tab or using **Clear conversation** removes it.
- Messages are limited to 20,000 characters (2,000 in the sidebar dock).

## Related

- [How to ask Atlas](../how-to/ask-atlas.md)
- [The agents](../concepts/the-agents.md)
- [Agents](agents.md)
- [Approvals](approvals.md)
- [Incidents](incidents.md)
