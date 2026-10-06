---
title: How to set agent autonomy
status: current
reviewed: 2026-10-05
---

# How to set agent autonomy

Turn an agent's scheduled work on or off, or change Dax's autonomy level, for your whole tenant.

## Before you start

- You need the **Admin** role. Other roles see the controls disabled with "Only administrators can change agent configuration."
- Read [Autonomy and approvals](../concepts/autonomy-and-approvals.md) first. In particular: Dax levels 1, 2 and 3 currently behave the same in Dax's own run, and Demitry closes confirmed false positives whenever it runs unless a policy rule stops it.
- Scheduled work also needs the background agent worker to be running. Check **SLA & health** on the Agents page for the worker heartbeat.
- Optional: open **Autonomy readiness** on the Agents page to see every agent's current setting and the QA agreement comparison before you change anything.

## Steps

### Change Dax's autonomy level

1. Open **Agents** > **Agents** and click Dax's card.
2. Click the autonomy control in the summary row (it reads "Autonomy ON" or "Autonomy OFF" with the level name).
3. In **Choose an autonomy level**, click **L0 Manual**, **L1 Semi**, **L2 Near Full** or **L3 Full**.
4. If asked, confirm: **Yes, Enable** for level 2 or 3, **Yes, Disable** to go back to Manual. Click **Cancel** to keep the current level.

Or, in Settings:

1. Open **Settings** > **Agent Policies**.
2. Under **Tenant autonomy level**, click **Level 0**, **Level 1**, **Level 2** or **Level 3**.
3. If asked, click **Change level** to confirm.

### Turn another agent's schedule on or off

1. Open **Agents** > **Agents** and click the agent's card (Demitry, Marien, Orion, Renzo or Caleb).
2. Click the autonomy switch in the summary row.
3. Wait for the toast "… autonomy is on in tenant configuration" (or off).

For **Automatic threat-intelligence ingestion** and **Caleb scheduled hash lookups**:

1. Open **Settings** > **Agent Policies**.
2. Under **Scheduled operations**, switch the setting on or off.

### Add a policy rule (optional)

1. Open **Settings** > **Agent Policies**.
2. Under **Custom rules**, click **Add rule**.
3. Choose the **Agent**, **Field**, **Op** and **Value**, pick **Allow**, **Deny** or **Require Approval**, and write a **Reason**.
4. Click **Add rule**.

To apply a ready-made set, open **More policy controls** and click **Conservative**, **Balanced** or **Autonomous** under **Policy templates**.

## What happens next

- The setting is saved for the whole tenant and recorded in the audit trail.
- The agent worker reads the configuration before each scheduled run, so a change applies to the next run. Work already in progress is not cancelled.
- The workspace shows the saved value only after the server confirms it.
- Response actions still need an admin's approval in [Approvals](../features/approvals.md) at every level.
- To follow what the agents do after the change, use [Agent Audit](../features/agent-audit.md) or the agent's **Outputs** tab.

## If something goes wrong

- **"Configuration change not confirmed: … Refresh configuration before retrying."**: the server did not confirm the save. Click **Refresh** and check the value before trying again.
- **"Autonomy unknown"** with "configuration unavailable": the configuration could not be read. Click **Refresh**.
- **"Policies changed elsewhere. Refresh before saving."**: another admin changed the policies. Reload the page and repeat your change.
- **Level 4 · Full auto is disabled**: it is not available. The configuration accepts levels 0 to 3.
- **The setting is on but nothing happens**: check the worker heartbeat in **SLA & health**. The setting does not prove a worker is running.

## Related

- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Agents](../features/agents.md)
- [Settings](../features/settings.md)
- [The agents](../concepts/the-agents.md)
- [How to run an agent](run-an-agent.md)
