---
title: How to review agent decisions
status: current
reviewed: 2026-10-05
---

# How to review agent decisions

Check what an agent decided and why, and record whether you found it helpful or think it needs review.

## Before you start

- Any role can read agent decisions.
- Recording **Helpful** or **Needs review** needs the **Analyst** or **Admin** role.
- Your feedback is an opinion. It is stored with the record and does not change the agent's verdict, close or reopen anything, or retrain an agent.

## Steps

### Review one decision in Agent Audit

1. In the sidebar, open **Agents** > **Agent Audit** (or press **g** then **a**).
2. Choose the agent in the **All agents** filter, and a time range such as **Last 7d**.
3. Optionally pick a disposition, for example **False Positive**, or search for an incident ID.
4. Click an event in the list.
5. Read the disposition, confidence and rationale, then the steps. Expand **Inspect tool request and result** on a tool call to see the query, its permission decision and its result summary.
6. For a Dax event, click **Show all N recorded steps** to include Demitry's QA and other agents.
7. Click **Helpful** or **Needs review**.
8. To act on the incident, click **Open #N**.

### Review Demitry's QA decisions

1. Open **Agents** > **Agents** and click Demitry's card.
2. In **QA reviews**, click **Overrides** to see where Demitry disagreed with Dax.
3. Select a review and read Demitry's reasoning and the two agents' decisions.
4. Click **Mark helpful** or **Needs review**.

### Work through an agent's outputs

1. Open the agent's workspace and click the **Outputs** tab.
2. Click **Unread** or **Review & failures**.
3. Open an output to read its outcome and summary. Click **Mark read** when done, or **Mark visible read** for the whole page.

## What happens next

- Your feedback appears under the event in Agent Audit, with your user and the time.
- Read state on the Outputs tab is yours only. Reading approves nothing.
- If a decision is wrong, act on the incident yourself from the Incidents page, for example re-analyze or close it. See [How to close an incident](close-an-incident.md).
- Response actions that Demitry requested wait in [Approvals](../features/approvals.md) for an admin.

## If something goes wrong

- **"Only analysts and administrators can record feedback on a record."**: your role is Viewer.
- **"Agent activity unavailable"**: the records could not be read. This does not mean nothing happened. Click **Refresh**.
- **"No agent activity matches these filters."**: widen the time range or clear the search.
- **"This event has no linked investigation chain."**: the event is not tied to an incident. Its stored record is shown instead.
- **"Timeline unavailable"**: the investigation chain could not be read; the event record is still shown.

## Related

- [Agent Audit](../features/agent-audit.md)
- [Agents](../features/agents.md)
- [How to triage an incident](triage-an-incident.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Audit Trail](../features/audit-trail.md)
