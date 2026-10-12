---
title: How to set agent autonomy and the operating mode
status: current
reviewed: 2026-10-12
---

# How to set agent autonomy and the operating mode

Decide which agents run on their own schedule, whether agent actions may ever skip a person, and which actions have earned that, for your whole tenant.

## Before you start

- You need the **Admin** role. Other roles see the controls disabled, with "Only administrators can change agent configuration." on the Agents page and "Only administrators can change these settings." or "Only tenant administrators can change the operating mode." in Settings.
- Read [Autonomy and approvals](../concepts/autonomy-and-approvals.md) first. In particular: the operating mode is a ceiling. Full auto changes nothing until an action has earned auto mode and an admin turned it on.
- Scheduled work also needs the background agent worker to be running. Check **SLA & health** on the Agents page for the worker heartbeat.
- Optional: open **Autonomy readiness** on the Agents page to see the operating mode, every agent's current setting and the QA agreement comparison before you change anything.

## Steps

### Let the agents run on a schedule for your tenant

1. Open **Settings** > **Agent Policies**.
2. Under **Scheduled operations**, switch on **Run agents on a schedule for this workspace**.

While this is off, no agent runs on a schedule, whatever the switches below say.

### Turn an agent's schedule on or off

1. Open **Agents** > **Agents** and click the agent's card (Dax, Demitry, Marien, Orion, Renzo or Caleb).
2. Click the autonomy switch in the summary row. It reads "Autonomy ON" or "Autonomy OFF".
3. Wait for the toast "… autonomy is on in tenant configuration" (or off).

Dax's switch, **Automatic threat-intelligence ingestion** and **Caleb scheduled hash lookups** can also be changed in **Settings** > **Agent Policies** under **Scheduled operations**. In Settings, Dax's switch is labelled **Dax triages new incidents automatically**.

### Choose the operating mode

1. Open **Settings** > **Agent Policies**.
2. Under **Operating mode**, click **Approval**, **Full auto** or **Scheduled**.
3. For **Full auto**, read the note in **Switch to full auto?** and click **Switch mode**.
4. For **Scheduled**, set the **Time zone**, **Shift starts**, **Shift ends** and the staffed days (Sun to Sat), then click **Switch to scheduled**. Staffed hours run in approval mode; outside them, full auto.
5. Check the line under the choices. It says which mode is in force now and, on a schedule, when it next switches.

To change staffed hours later, edit them while **Scheduled** is selected and click **Save staffed hours**. Choosing **Approval** saves at once.

### Turn on earned auto mode for an action

1. Open **Approvals** and find the **Agent accuracy** card.
2. Read the action's line: agreement over the last 50 decisions, dangerous misses, reversals, thin reports, and agreement per confidence level.
3. If the bar is met, click **Turn on auto mode…**. If it is not, the card says why it is locked.
4. Read the disclaimer, tick "I have read this and accept it for my organization" and click **Turn on auto mode**.

To stop it, click **Turn off auto mode**. Today only "Close incidents Demitry verified as false or benign positive" can be turned on. Tuning deployments show a scorecard but stay locked (Planned).

### Add a policy rule (optional)

1. Open **Settings** > **Agent Policies**.
2. Under **Custom rules**, click **Add rule**.
3. Choose the **Agent**, **Field**, **Op** and **Value**, pick **Allow**, **Deny** or **Require Approval**, and write a **Reason**.
4. Click **Add rule**.

To apply a ready-made set, open **More policy controls** and click **Conservative**, **Balanced** or **Autonomous** under **Policy templates**. A Require Approval rule on closures keeps Demitry's closes with a person even under full auto.

## What happens next

- Every setting is saved for the whole tenant and recorded in the audit trail. Operating mode changes show in the Audit Trail with the old and new mode; turning auto mode on records your name, the time and the disclaimer version.
- The agent worker reads the configuration before each scheduled run, so a change applies to the next run. Work already in progress is not cancelled.
- The workspace and Settings show the saved value only after the server confirms it.
- Under full auto, eligible Demitry closes are approved automatically; about 1 in 10 still goes to a person as a spot check. Containment and response actions always need an admin's approval in [Approvals](../features/approvals.md).
- Auto mode turns itself off when accuracy drops below the bar or a person reopens an automatic close. The card shows why.
- To follow what the agents do after the change, use [Agent Audit](../features/agent-audit.md) or the agent's **Outputs** tab.

## If something goes wrong

- **"Configuration change not confirmed: … Refresh configuration before retrying."**: the server did not confirm the save. Click **Refresh** and check the value before trying again.
- **"Operating mode not saved: …"**: the mode was not saved. Read the reason, refresh and try again.
- **"Autonomy unknown"** with "configuration unavailable": the configuration could not be read. Click **Refresh**.
- **"Policies changed elsewhere. Refresh before saving."**: another admin changed the policies. Reload the page and repeat your change.
- **Turn on auto mode… is disabled with "Locked: …"**: the action has not met the bar yet (for example "12 of 50 reviewed decisions so far"). Keep reviewing its proposals in Approvals.
- **The card says "full auto changes nothing until one earns it…"**: no action has auto mode turned on, so full auto behaves like approval.
- **A setting is on but nothing happens**: check that **Run agents on a schedule for this workspace** is on, and check the worker heartbeat in **SLA & health**. A setting does not prove a worker is running.

## Related

- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Agents](../features/agents.md)
- [Settings](../features/settings.md)
- [Approvals](../features/approvals.md)
- [The agents](../concepts/the-agents.md)
- [How to run an agent](run-an-agent.md)
