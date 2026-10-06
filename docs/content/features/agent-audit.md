---
title: Agent Audit
status: current
reviewed: 2026-10-05
---

# Agent Audit

Agent Audit lists every action the agents recorded for your tenant, with the investigation behind it. Use it to check why an agent reached a verdict, which queries and tools it used, and whether a tool call was allowed by policy.

## Where to find it

- Sidebar: **Agents** group > **Agent Audit**.
- Keyboard: press **g** then **a**.
- **Open in Agent Audit** and **Agent Audit** buttons on the Agents page open it filtered to that agent.
- A "reported a problem" item in the top bar notifications opens it filtered to the agent concerned.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | Read events, the investigation chain and the tool permission table. |
| Analyst | Everything a viewer can, plus record **Helpful** or **Needs review** on an event. |
| Admin | Everything an analyst can, plus change agent tool permissions. |

## What you see

### Toolbar

- Search box: "Search agent, action, disposition, incident…".
- Agent filter: **All agents** or one of the eight agents.
- Disposition filter: **All dispositions**, True Positive, Benign Positive, False Positive, Escalated, Hunt, Tuning.
- Time range: **Last 1h**, **Last 6h**, **Last 24h** (default), **Last 7d**, **Last 30d**.
- **Refresh** in the page header.

### Event list

Up to 300 events for the chosen agent, disposition and time range, newest first. Each row shows the agent, the time, what it did, and the disposition and confidence when recorded. Reviewer feedback is not listed as a separate event; it appears under the event it is about.

When you first open the page, the newest Dax event linked to an incident is selected.

### Event detail

- **Events linked to an incident** replay the incident's investigation chain:
  - A summary line with the number of events, tool calls and reasoning steps, and the agents involved.
  - The final disposition with confidence and the recorded rationale, or "No final disposition is recorded for this incident."
  - Each step in order: agent, time, step type, text, any KQL query, row counts and duration.
  - For a Dax event, only Dax's steps show first. Use **Show all N recorded steps** to include other agents and tools.
  - Tool calls have **Inspect tool request and result**: the permission decision and policy version, the outcome, HTTP status, an input preview, a result summary and **Payload integrity hashes**.
  - Permission records have **Inspect permission decision**.
- **Events without an incident** say "This event has no linked investigation chain. Its record is shown as written."
- **Record as written**: every stored field of the event (agent, action, time, incident, disposition, confidence, severity, correlation, duration, record id) and its raw details.
- Earlier reviewer feedback on this event, with the reviewer, time and any note.

Text marked as generated was written by an agent's model.

### Collapsed sections at the bottom

- **Tuning evidence**: current and archived tuning baselines and detection backtests.
- **Agent tool permissions and scope**: the tool policy for every agent (tool, current permission, credential route) and **Enforcement coverage and verification limits**.

## What you can do

- **Open #N**: opens the linked incident. All roles.
- **Helpful** / **Needs review**: records your opinion of this event. Analysts and admins. It is stored as its own audit record. It does not change the agent's verdict or retrain anything.
- Change tool permissions (admins, in **Agent tool permissions and scope**): tick or untick **Allow** per agent and tool, then **Review N permission changes** and **Apply permission changes**, or **Cancel permission changes**. Revoking a tool blocks the agent's next call to it; work already running is not cancelled. **Refresh permissions** reloads the table.

Nothing on this page needs approval, and nothing here runs an agent.

## Good to know

- The list shows records, not proof that work succeeded. A permission decision without a completion record is intent, not proof of execution.
- Payload hashes link a tool call to its input and output. They do not prove the storage is immutable.
- If the list cannot be read you see "Agent activity unavailable" and the message "Nothing here means the records could not be read, not that nothing happened."
- If no events match, you see "No agent activity matches these filters." Widen the time window or clear the search.
- Requests that Atlas hands to another agent are recorded under that agent. In **Record as written**, the agent name ends with "(via Atlas)".
- For the tenant-wide tamper-evident ledger, exports and configuration changes, use [Audit Trail](audit-trail.md).

## Related

- [How to review agent decisions](../how-to/review-agent-decisions.md)
- [Agents](agents.md)
- [The agents](../concepts/the-agents.md)
- [Audit Trail](audit-trail.md)
- [How to export audit evidence](../how-to/export-audit-evidence.md)
