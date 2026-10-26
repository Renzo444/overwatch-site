---
title: How to set agent autonomy and what runs on its own
status: current
reviewed: 2026-10-26
---

# How to set agent autonomy and what runs on its own

Decide which agents run on their own schedule and, action by action, which agent actions wait for a person and which run end to end, for your whole tenant.

## Before you start

- You need the **Admin** role. Other roles see the controls disabled, with "Only administrators can change agent configuration." on the Agents page and "Only administrators can change these settings." or "Only tenant administrators can change what runs on its own." in Settings.
- Read [Autonomy and approvals](../concepts/autonomy-and-approvals.md) first. In particular: Full auto is a ceiling. An action runs on its own only when its own checks pass, and some actions always wait for a person today.
- Optional: read the **Agent accuracy** card on the Approvals page to see how often your reviewers agree with Demitry before you let his closes run on their own.
- Scheduled work also needs the background agent worker to be running. Check **SLA & health** on the Agents page for the worker heartbeat.
- Optional: open **Autonomy readiness** on the Agents page to see every agent's scheduled setting and the QA agreement comparison before you change anything.

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

### Choose what runs on its own

1. Open **Settings** > **Agent Policies** and find **What runs on its own**.
2. On the row for the action, click **Approval**, **Full auto** or **Scheduled**. Only **Demitry closes a false positive** and **Maxwell deploys a Renzo detection** can leave Approval today; on the other rows those buttons are disabled.
3. For **Full auto** or **Scheduled**, a dialog titled with the action and mode (for example "Demitry closes a false positive: Full auto?") repeats the action's checks. Click **Switch mode**, or **Cancel**.
4. For **Scheduled**, set the **Time zone**, **Shift starts**, **Shift ends** and the staffed days (Sun to Sat) under **Staffed hours** before you click **Switch mode**. Staffed hours run in Approval; outside them, Full auto. All Scheduled rows share these hours.
5. For **Maxwell deploys a Renzo detection**, pick the **Daily limit** (1 to 20) and **Rules Maxwell may keep** (10 to 200, default 50) that appear once the row is not in Approval. Each saves as soon as you change it.
6. Check the "Now:" line under the row. It says whether the action is in Approval or Full auto right now and, on a schedule, when it next switches.

To change staffed hours later, edit them and click **Save staffed hours**. Choosing **Approval** on a row saves at once.

Maxwell always leaves 50 of Sentinel's 512 rule slots free for your own rules, skips drafts that repeat a live rule, and asks in Approvals before deploying one that overlaps a live rule or retiring one of his rules to stay within **Rules Maxwell may keep**.

Maxwell's Full auto also needs Renzo's switch and **Run agents on a schedule for this workspace** to be on, because Maxwell deploys Renzo's drafts on the worker's schedule.

### Allow indicator-only detections (optional)

By default Renzo writes rules for the attacker's technique and discards rules that match only a report's hashes, IP addresses, domains or URLs. To allow those rules, open **Settings** > **Agent Policies** and, under **Detection engineering**, switch on **Renzo may write indicator-only rules**. It applies to drafts written from then on.

### Earned auto mode (older organization-wide mode only)

If the **Demitry closes a false positive** row says "Following the organization-wide mode, which still waits for earned auto mode under Approvals → Agent accuracy", your organization is on the older organization-wide mode. Either choose a mode on the row yourself (recommended), or turn on earned auto mode:

1. Open **Approvals** and find the **Agent accuracy** card.
2. Read the action's line: agreement over the last 50 decisions, dangerous misses, reversals, thin reports, and agreement per confidence level.
3. If the bar is met, click **Turn on auto mode…**. If it is not, the card says why it is locked.
4. Read the disclaimer, tick "I have read this and accept it for my organization" and click **Turn on auto mode**.

To stop it, click **Turn off auto mode**. Tuning deployments show a scorecard but stay locked (Planned).

### Add a policy rule (optional)

1. Open **Settings** > **Agent Policies**.
2. Under **Custom rules**, click **Add rule**.
3. Choose the **Agent**, **Field**, **Op** and **Value**, pick **Allow**, **Deny** or **Require Approval**, and write a **Reason**.
4. Click **Add rule**.

To apply a ready-made set, open **More policy controls** and click **Conservative**, **Balanced** or **Autonomous** under **Policy templates**. A Require Approval rule on closures keeps Demitry's closes with a person even under full auto.

## What happens next

- Every setting is saved for the whole tenant and recorded in the audit trail. Changes under **What runs on its own** show in the Audit Trail with the old and new values; turning auto mode on records your name, the time and the disclaimer version.
- The agent worker reads the configuration before each scheduled run, so a change applies to the next run. Work already in progress is not cancelled.
- The workspace and Settings show the saved value only after the server confirms it.
- Under Full auto, eligible Demitry closes are approved automatically; about 1 in 10 still goes to a person as a spot check. High and Critical incidents, escalated incidents, closes where Demitry overrode Dax, closes Demitry passed on without a senior review and closes a policy rule holds always go to a person. Containment and response actions always need an admin's approval in [Approvals](../features/approvals.md).
- Under Full auto, Maxwell deploys Renzo drafts that passed every review check, up to the daily limit and within **Rules Maxwell may keep**. Each deploy appears in Approvals History as approved automatically. Requests to deploy an overlapping draft or to retire one of his rules wait in Pending for a person.
- If a person reopens an automatic close, Demitry's row switches back to Approval (and earned auto mode turns off). Earned auto mode also turns itself off when accuracy drops below the bar. The Audit Trail and the card show why.
- To follow what the agents do after the change, use [Agent Audit](../features/agent-audit.md) or the agent's **Outputs** tab.

## If something goes wrong

- **"Configuration change not confirmed: … Refresh configuration before retrying."**: the server did not confirm the save. Click **Refresh** and check the value before trying again.
- **"Not saved: …"**: the change under **What runs on its own** was not saved. Read the reason, refresh and try again.
- **"Agent settings unavailable"**: the agent configuration could not be read. Click **Retry**.
- **"Autonomy unknown"** with "configuration unavailable": the configuration could not be read. Click **Refresh**.
- **"Policies changed elsewhere. Refresh before saving."**: another admin changed the policies. Reload the page and repeat your change.
- **Turn on auto mode… is disabled with "Locked: …"**: the action has not met the bar yet (for example "12 of 50 reviewed decisions so far"). Keep reviewing its proposals in Approvals.
- **A setting is on but nothing happens**: check that **Run agents on a schedule for this workspace** is on, and check the worker heartbeat in **SLA & health**. A setting does not prove a worker is running.

## Related

- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Agents](../features/agents.md)
- [Settings](../features/settings.md)
- [Approvals](../features/approvals.md)
- [The agents](../concepts/the-agents.md)
- [How to run an agent](run-an-agent.md)
