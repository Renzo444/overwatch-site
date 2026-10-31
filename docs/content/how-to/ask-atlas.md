---
title: How to ask Atlas
status: current
reviewed: 2026-10-27
---

# How to ask Atlas

Ask Atlas, the copilot, a question about what you are looking at or about your tenant's data.

## Before you start

- You need the **Analyst** or **Admin** role. Viewers can open the drawer, but the question box is disabled and reads "Atlas needs analyst access".
- Data questions run read-only queries in your Sentinel workspace, so the tenant's Sentinel connection must be set up.

## Steps

1. Open the page or record you want to ask about, for example an incident on the Incidents page.
2. Open Atlas: press **⌘J** (Mac) or **Ctrl+J**, click **Ask Atlas** in the incident blade, or type in the Atlas box at the bottom of the sidebar ("Ask about this view…").
3. Check the **In view** chips. Remove any record you do not want Atlas to consider by clicking its ×.
4. Type your question in "Ask about what's on screen…" and press **Enter**, or click a suggested question.
5. Watch the lines above the answer to see which agent took the request and how many rows came back.
6. Read the answer. Open **Details** under it for IDs, timestamps and the KQL Atlas ran. For a long answer, **Widen Atlas** in the header.
7. Optional: click **Execute** on a KQL block to run it yourself (up to 20 rows; the last day, or longer when the query itself looks back further, up to 30 days), or **Copy** it.
8. Optional: click **Pin to #N notes** to save the answer to the incident's case notes.

Good questions:

- "Summarize #2184" or "Why was it escalated?" with an incident in view.
- "Show me failed logins in the last 24 hours".
- "What have the agents been doing today?"
- "What does this page do?"
- "Which log sources do we have?" or "Why can't Orion see firewall traffic?"
- "What is our ATT&CK coverage?", "Where are our gaps in Credential Access?", "Are we covered for T1003?" or "What should we connect?"

## What happens next

- Atlas hands data questions to Dax, Demitry or Orion, who run a read-only query (up to 50 rows, over a window that covers the query's own lookback up to 30 days). It reads library, hunt, tuning and sandbox records, and Renzo's coverage map, from the agent that owns them.
- If more rows or incidents matched than came back, Atlas is instructed to say the result is partial rather than give its length as a total. Ask for a count if you need one.
- Each question is recorded under Atlas in [Agent Audit](../features/agent-audit.md).
- A pinned answer is stored in case notes as generated text. The incident itself is not changed.
- If you are an admin and explicitly ask for a change (for example "recall rule X"), Atlas files a request in [Approvals](../features/approvals.md). Approving that request records the decision; it does not run the action. Atlas never changes anything itself.

## If something goes wrong

- **The question box or the dock says "Atlas needs analyst access"**: your role is Viewer.
- **"Atlas could not complete this response. Check Agent Audit before retrying."**: the answer failed. Check the Atlas entry in Agent Audit, then ask again.
- **A query returns zero rows**: Atlas is instructed to say so and suggest why. Ask whether the table is connected; Atlas can check your log sources.
- **A line like "Dax · query failed"**: the query failed in your workspace. Atlas is instructed to correct the KQL and retry once, then explain the error and show the query.
- **Atlas says no agent can take the request**: the query tool is revoked for Dax, Demitry or Orion. An admin can restore it in the agent tool permissions (Agents page > Permissions > **Edit tool permissions**).
- **"Only read-only queries within this tenant workspace are supported"** when you click **Execute**: the query uses a command that is not allowed. Use a single read-only query.
- **"Only an administrator can file approval requests … Nothing was filed."**: ask an admin, or use the Approvals page.
- **A results heading says "first 20 rows …; more may match"** after **Execute**: the row limit cut the result short. Add a `summarize` or `count` to the query for totals.

## Related

- [Atlas copilot](../features/atlas-copilot.md)
- [The agents](../concepts/the-agents.md)
- [How to triage an incident](triage-an-incident.md)
- [Approvals](../features/approvals.md)
