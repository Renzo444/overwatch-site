---
title: Autonomy and approvals
status: current
reviewed: 2026-10-12
---

# Autonomy and approvals

Four settings decide how much the agents do without a person. Schedule switches decide which agents run on their own timer. The operating mode decides whether any agent action may skip a person. Earned auto mode decides which individual actions have proven themselves well enough to skip a person. Policy rules can hold an action back in any mode. Approvals is where a person decides on everything else. This page explains how they fit together, as the product works today.

## Schedule switches

All schedule switches apply to the whole tenant, are stored in the tenant's agent configuration and can only be changed by an admin. Every change is audited. Viewers and analysts can see the current values.

A switch is configuration only. Scheduled work also needs the background agent worker to be running; the console says "It does not show that a worker is running" wherever these switches appear.

### Run agents on a schedule for this workspace

Under Settings > Agent Policies > **Scheduled operations**, **Run agents on a schedule for this workspace** lets the shared agent worker act for your tenant at all. It is off for a new tenant. While it is off, no agent runs on a schedule, whatever the individual switches say; agents run only when someone starts them.

### Per-agent switches

Each of these turns on one agent's scheduled run:

| Setting | Where to change it | When on |
|---------|--------------------|---------|
| Dax's switch, shown in Settings as **Dax triages new incidents automatically** | Dax's workspace (Agents page), or Settings > Agent Policies > **Scheduled operations** | The worker runs Dax about every minute on eligible incidents. Dax records a verdict, assigns the incident to itself and labels it for Demitry's QA. |
| Demitry's switch | Demitry's workspace | QA runs about every 5 minutes, one incident per run. |
| Marien's switch | Marien's workspace | A tuning poll runs about every 10 minutes and produces proposals. |
| Orion's switch | Orion's workspace | A proactive hunt runs about every 10 minutes (up to 10 scheduled hunts per day). |
| Renzo's switch | Renzo's workspace | A research cycle runs about every 10 minutes, within Renzo's daily allowance. Drafts only. |
| Caleb's switch, also **Caleb scheduled hash lookups** | Caleb's workspace, or Settings > Agent Policies > **Scheduled operations** | Hash reputation lookups for sandbox requests about every 2 minutes. Does not enable sandbox execution. |
| **Automatic threat-intelligence ingestion** | Settings > Agent Policies > **Scheduled operations** | About every 2 hours the worker reads the feeds; Renzo scores new relevant articles and those scoring 80 or higher become Auto-ingested drafts in the Detection Library. |

Maxwell and Atlas have no switch. They show "On demand".

Turning a switch off stops new scheduled requests. Work already in progress is not cancelled.

Dax's switch also changes what a run you start does. With Dax's switch off, Dax only adds its assessment as an incident comment and marks the incident as triaged; it does not hand the incident to Demitry. With the switch on, a run you start also hands the incident to Demitry.

Earlier versions had four Dax autonomy levels (0 to 3). They behaved the same in Dax's own run and have been replaced by this on/off switch. Any level above 0 that was saved earlier reads as on.

## Operating mode

The operating mode is set under Settings > Agent Policies > **Operating mode**. It is admin-only and every change is recorded in the Audit Trail with the old and new value. It has three choices:

- **Approval** (the default): "Agents investigate and recommend. Every close, tune and deployment waits for a person."
- **Full auto**: "Actions that have earned it run without waiting, with spot checks. Everything else still waits for a person." Switching to it asks for confirmation.
- **Scheduled**: "Approval during your staffed hours, full auto outside them." You set a **Time zone**, **Shift starts**, **Shift ends** and the staffed days. A shift that ends after midnight belongs to the day it starts. If the staffed hours are not valid, the console treats the mode as Approval.

The card shows which mode is in force now and, for Scheduled, when it next switches.

Full auto is a ceiling, never a grant. On its own it lets nothing skip a person. An action runs without a person only when all of these are true:

1. The operating mode in force right now is full auto.
2. That action has earned auto mode on your tenant's own reviewed decisions, and an admin turned auto mode on for it (see below).
3. Nothing else keeps it with a person (see the limits under Earned auto mode).

If no action has auto mode turned on, the card says "full auto changes nothing until one earns it and is turned on under Approvals → Agent accuracy." Containment always waits for a person in every mode.

## Earned auto mode (Agent accuracy)

The **Agent accuracy** card on the [Approvals](../features/approvals.md) page scores each agent action from your team's decisions on its proposals. Analysts and admins can see it; only admins can turn auto mode on or off.

For each action the card shows how often people accepted the proposal unchanged over the last 50 reviewed decisions, dangerous misses, reversals, reports flagged as thin, and the agreement at each stated confidence level (High, Medium, Low).

- Only people's decisions count. Requests that auto mode approved are never counted as agreement.
- Approving with **Right verdict, thin report** switched on counts against the agent even though the close goes ahead.
- Denying a close counts as a dangerous miss unless the reason is Already handled, Needs more evidence, Policy exception or Business impact too high.
- A reversal is an automatic close that a person later reopened or reclassified as a true positive, or a deployed tuning that was rolled back.

Auto mode for an action unlocks only when the card shows 95% agreement over the last 50 decisions, with no dangerous misses or reversals in that window. Even then it acts only at confidence levels with at least 20 decisions at that bar. To turn it on, an admin clicks **Turn on auto mode…**, reads the disclaimer, ticks "I have read this and accept it for my organization" and confirms. Your name and the time are recorded. **Turn off auto mode** turns it off.

Auto mode turns itself off when accuracy drops below the bar or an automatic close is reversed. The card then shows the reason.

Two actions are scored today:

- **Close incidents Demitry verified as false or benign positive.** This is the only action that can run in auto mode today.
- **Deploy rule tunings Marien proposed.** The scorecard is shown, but auto mode stays locked. Planned: it also needs a measured false-positive drop and a clean replay for each tune.

Even with auto mode on and full auto in force, a Demitry close still goes to a person when:

- Demitry overrode Dax rather than confirming Dax's benign verdict.
- The incident is High or Critical severity.
- The incident was escalated to a person.
- A policy rule requires approval for it.
- The close was picked as a spot check. About 1 in 10 automatic closes goes to a person anyway.
- A person has claimed the incident since. Auto mode then leaves the recommendation as a comment and does not close it.

Every automatic close is recorded under Demitry and noted on the incident. To reverse one, reopen the incident; that also turns auto mode off.

## What the agents may do without a person

In every mode:

- Dax never closes an incident and never runs a response action. Disruptive tools are blocked and the incident is routed to senior QA and human review.
- Demitry never closes an open incident on its own decision. It files a close request in Approvals; the close happens after a person approves it (or, under earned auto mode, after auto mode approves it). An incident Dax had already closed is only re-labelled as verified, never reopened.
- On a confirmed true positive, Demitry files response requests in Approvals. Nothing runs until an admin approves and then runs the response.
- Marien's tuning proposals always wait for an admin's **Approve & deploy** in Marien's workspace.
- Renzo only drafts detections. Deployment needs a passed review and an admin's **Approve & deploy** in Maxwell's workspace.
- Orion opens a new Sentinel incident on its own when a hunt finding is malicious or suspicious, so that Dax triages it. If the same pattern turns up again within a week while that incident is open, Orion adds a comment to it instead. It never changes or closes other incidents.
- After Maxwell deploys a rule, the worker watches its alert volume for 48 hours. More than 50 alerts in 24 hours raises a high-risk request in Approvals to disable the rule; it is disabled only after a person approves.

### A person's claim always wins

Once a person owns an incident (assigned in the console or in Sentinel to anyone who is not an agent), no agent takes it over or closes it. Dax and Demitry skip incidents a person owns. If a person claims an incident while an agent is working on it, the agent's verdict arrives as a comment and nothing else changes. A close that a person approved in Approvals still runs.

## Policy rules

Policy rules restrict what agents may do automatically. They are managed under Settings > Agent Policies (admins change them; everyone can read them).

### Where rules are enforced

Rules are checked at two points today:

1. **Incident closure proposed by Demitry.** When Demitry would close a confirmed false or benign positive, the rules for Dax and Demitry are evaluated with the incident's original Sentinel severity and the classification the close would carry. A Deny rule makes Demitry escalate the incident to a person instead of filing a close request. A Require Approval rule keeps the close request with a person: auto mode may not approve it.
2. **Running an approved response.** When an approved containment request is run, the rules for Maxwell and the requesting agent are evaluated again. A rule can stop it; a rule never replaces the human approval.

Detection deployment, tuning and agent queries are not covered by custom rules yet. The Settings page says so under **Enforced boundaries**.

### How rules work

Each rule has:

- **Agent**: All Agents, or one agent.
- **Field**: Severity, Classification, Entity Count, Confidence Score or Action Type.
- **Op**: =, ≠, >, <, ≥, ≤ or contains. Number comparisons only work on Entity Count and Confidence Score.
- **Value**: for Severity, pick High, Medium, Low or Informational; for Classification, False Positive; for the other fields, type a value.
- **Action**: Allow, Deny or Require Approval.
- **Reason**: shown in decisions and audit records.

When several rules match, the most restrictive wins: Deny, then Require Approval, then Allow. If a rule needs a value the request does not have (for example a confidence score that was not recorded), a Deny or Require Approval rule still applies.

Rules you add with **Add rule** are grouped into a policy named "Custom Rules" per agent choice. Each policy has an on/off switch, and expanding it shows its rules and **Delete policy**. Every change is audited, and if someone else changed the policies first you are asked to refresh before saving.

### Templates

Under **More policy controls** > **Policy templates**, admins can apply one of three templates. Applying a template adds it as a policy; existing policies stay in force.

- **Conservative**: requires approval for every severity and for every closure. In practice every Demitry close stays with a person, even under full auto.
- **Balanced**: requires approval for High and Critical; allows Medium and Low; requires approval for endpoint isolation and account disabling.
- **Autonomous**: adds no severity restriction; still requires approval for endpoint isolation, account disabling and IP blocking. It does not grant full autonomy.

## Approvals

The [Approvals](../features/approvals.md) page holds requests for consequential actions: Demitry's close requests, response actions on confirmed true positives, requests to disable a noisy new rule, requests Atlas files when an admin asks, and others.

- **Who decides**: only admins can vote **Approve** or **Deny**. Analysts and admins can add comments, which never change the outcome.
- **Quorum**: each request states how many approvals it needs (1 unless set otherwise, up to 10). Each person votes once. The request is approved when enough different admins approve. A single Deny resolves it as denied.
- **Undo**: after you confirm an approval, the console waits 10 seconds before sending your vote. **Undo** in that time cancels it.
- **Expiry**: a request expires 24 hours after it was created if it was not decided. Expired requests move to History and can no longer be approved.
- **Approval is not execution**: approving records the decision. An approved Demitry close is carried out at the start of Demitry's next run (scheduled, or when someone clicks **Run QA now**). A response action runs only when an admin uses **Run the approved response** on the approved request, and approval, expiry, target and policy are checked again at that moment. Requests filed by Atlas never run on approval.

Rule deploys, tuning deploys, rollbacks and recalls from the Maxwell and Marien workspaces are not Approvals requests. They are direct admin actions protected by a confirmation dialog and server checks.

When notifications are set up, people are told when a request is waiting, when an agent escalates an incident to a person, and when an agent keeps failing. See [How to configure notifications](../how-to/configure-notifications.md).

## Related

- [How to set agent autonomy and the operating mode](../how-to/set-agent-autonomy.md)
- [How to approve or deny an action](../how-to/approve-or-deny-an-action.md)
- [The agents](the-agents.md)
- [Approvals](../features/approvals.md)
- [Settings](../features/settings.md)
- [Roles and permissions](roles-and-permissions.md)
