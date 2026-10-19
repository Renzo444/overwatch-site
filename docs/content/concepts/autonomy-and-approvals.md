---
title: Autonomy and approvals
status: current
reviewed: 2026-10-19
---

# Autonomy and approvals

Four settings decide how much the agents do without a person. Schedule switches decide which agents run on their own timer. **What runs on its own** decides, action by action, whether an agent action waits for a person or runs end to end. Earned auto mode is the older, accuracy-based way to let Demitry's closes skip a person. Policy rules can hold an action back in any mode. Approvals is where a person decides on everything else. This page explains how they fit together, as the product works today.

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

Maxwell and Atlas have no switch. They show "On demand". Maxwell can still deploy on the worker's schedule when his row under **What runs on its own** is in Full auto (see below).

Turning a switch off stops new scheduled requests. Work already in progress is not cancelled.

Dax's switch also changes what a run you start does. With Dax's switch off, Dax only adds its assessment as an incident comment and marks the incident as triaged; it does not hand the incident to Demitry. With the switch on, a run you start also hands the incident to Demitry.

Earlier versions had four Dax autonomy levels (0 to 3). They behaved the same in Dax's own run and have been replaced by this on/off switch. Any level above 0 that was saved earlier reads as on.

## What runs on its own

Under Settings > Agent Policies, the **What runs on its own** card has one row per agent action. It is admin-only, and every change is recorded in the Audit Trail with the old and new value. Everything starts in **Approval**. Each row has three choices:

- **Approval**: "A person approves every time."
- **Full auto**: "Runs on its own once its checks pass, with spot checks." Switching to it asks for confirmation.
- **Scheduled**: "Approval during your staffed hours, full auto outside them."

All rows set to Scheduled share one set of staffed hours: a **Time zone**, **Shift starts**, **Shift ends** and the staffed days. A shift that ends after midnight belongs to the day it starts. If the staffed hours are not valid, the console treats the row as Approval. Under each row, a "Now:" line shows whether the action is in Approval or Full auto right now and, for Scheduled, when it next switches.

Full auto is still a ceiling: an action runs without a person only when its own built-in checks pass. The rows are:

| Row | Can be set to Full auto? | What its checks are |
|-----|--------------------------|---------------------|
| **Demitry closes a false positive** | Yes | Closes only when Demitry confirms Dax's benign verdict. Never High or Critical incidents, escalated incidents or incidents a policy rule holds. About 1 in 10 still goes to a person as a spot check. A reversed automatic close switches the row back to Approval. |
| **Maxwell deploys a Renzo detection** | Yes | Deploys only Renzo drafts that pass every review check (live validation, replay and an independent review), up to a **Daily limit** you choose (1 to 20, default 3), while Renzo's switch is on. |
| **Marien applies a rule tune** | No, always Approval | Always waits for a person today. Planned: it needs a measured false-positive drop and a replay check first. |
| **Demitry overrides Dax and closes** | No, always Approval | Always waits for a person today. |
| **Containment (isolate a host, disable an account)** | No, always Approval | Always waits for an administrator today. |

Setting Demitry's closes to Full auto or Scheduled here is your administrator's decision for your organization. It does not need the accuracy bar under Agent accuracy; the bar is still shown there so you can see how often Demitry agrees with your reviewers.

### Maxwell under Full auto

When **Maxwell deploys a Renzo detection** is in Full auto (or Scheduled, outside staffed hours), Renzo's switch is on and **Run agents on a schedule for this workspace** is on, the agent worker asks Maxwell about every 10 minutes to deploy Renzo's draft detections on his own. Maxwell takes drafts with the highest intel priority first, newest first among equals, and runs the same deployment review a person would request. Only a draft whose review passed every check is deployed, up to the daily limit per UTC day. Each one is recorded in Approvals History as an approved "Deploy detection '…' to Sentinel (unattended)" request. A draft whose review fails is not reviewed again until its query changes. A deploy that fails for another reason, or a review that could not finish, is tried again later a limited number of times. You can still review and deploy any draft yourself.

### The older organization-wide mode

Before these rows existed there was one organization-wide operating mode. If your organization chose Full auto or Scheduled there and nobody has set the **Demitry closes a false positive** row since, that row shows the old choice and Demitry's closes follow it. Under that older setting, Demitry's closes also need earned auto mode under Agent accuracy (see below), and the row says "Following the organization-wide mode, which still waits for earned auto mode under Approvals → Agent accuracy." Choose a mode on the row to decide yourself. All other rows start in Approval whatever the old mode was.

## Agent accuracy and earned auto mode

The **Agent accuracy** card on the [Approvals](../features/approvals.md) page scores each agent action from your team's decisions on its proposals. Analysts and admins can see it; only admins can turn auto mode on or off. Use it to decide whether you are comfortable setting an action to Full auto under **What runs on its own**.

For each action the card shows how often people accepted the proposal unchanged over the last 50 reviewed decisions, dangerous misses, reversals, reports flagged as thin, and the agreement at each stated confidence level (High, Medium, Low).

- Only people's decisions count. Requests that were approved automatically are never counted as agreement.
- Approving with **Right verdict, thin report** switched on counts against the agent even though the close goes ahead.
- Denying a close counts as a dangerous miss unless the reason is Already handled, Needs more evidence, Policy exception or Business impact too high.
- A reversal is an automatic close that a person later reopened or reclassified as a true positive, or a deployed tuning that was rolled back.

Two actions are scored today:

- **Close incidents Demitry verified as false or benign positive.**
- **Deploy rule tunings Marien proposed.** The scorecard is shown, but auto mode stays locked. Planned: it also needs a measured false-positive drop and a clean replay for each tune.

**Earned auto mode** only matters for organizations still on the older organization-wide mode (see above). There, Demitry's closes run without a person only when an admin also turned auto mode on here. It unlocks only when the card shows 95% agreement over the last 50 decisions, with no dangerous misses or reversals in that window, and it acts only at confidence levels with at least 20 decisions at that bar. To turn it on, an admin clicks **Turn on auto mode…**, reads the disclaimer, ticks "I have read this and accept it for my organization" and confirms. Your name and the time are recorded. **Turn off auto mode** turns it off. It turns itself off when accuracy drops below the bar or an automatic close is reversed, and the card then shows the reason. Once an admin chooses a mode on the **Demitry closes a false positive** row, that choice decides instead and the accuracy bar is not required.

### When a Demitry close still goes to a person

Even when Demitry's closes may run on their own, a close still goes to a person when:

- Demitry overrode Dax rather than confirming Dax's benign verdict.
- The incident is High or Critical severity.
- The incident was escalated to a person.
- A policy rule requires approval for it.
- The close was picked as a spot check. About 1 in 10 automatic closes goes to a person anyway.
- A person has claimed the incident since. The recommendation is then left as a comment and the incident is not closed.

Every automatic close is recorded under Demitry and noted on the incident. To reverse one, reopen the incident. That turns earned auto mode off, and if the **Demitry closes a false positive** row was set to Full auto or Scheduled, it switches back to Approval; the switch is recorded in the Audit Trail with the reason. An admin chooses the mode again to resume.

## What the agents may do without a person

In every mode:

- Dax never closes an incident and never runs a response action. Disruptive tools are blocked and the incident is routed to senior QA and human review.
- Demitry never closes an open incident on its own decision. It files a close request in Approvals; the close happens after a person approves it (or, when Demitry's closes may run on their own, after it is approved automatically). An incident Dax had already closed is only re-labelled as verified, never reopened.
- When Dax called an incident a true positive and Demitry finds it benign, Demitry files a close request with the classification he chose: Benign Positive (the rule fired correctly on real but expected or authorised activity) or False Positive (the rule's logic or data was wrong). This kind of close always waits for a person. If the incident's tactics or techniques are high risk (for example credential access, privilege escalation, defense evasion, persistence, collection, exfiltration or impact), Demitry does not propose a close at all: he escalates the incident to a person instead.
- On a confirmed true positive, Demitry files response requests in Approvals. Nothing runs until an admin approves and then runs the response.
- Marien's tuning proposals always wait for an admin's **Approve & deploy** in Marien's workspace.
- Renzo only drafts detections. Deployment needs a passed review and an admin's **Approve & deploy** in Maxwell's workspace, unless **Maxwell deploys a Renzo detection** is in Full auto (see above).
- Orion opens a new Sentinel incident on its own when a hunt finding is malicious or suspicious, so that Dax triages it. If the same pattern turns up again within a week while that incident is open, Orion adds a comment to it instead. It never changes or closes other incidents.
- After Maxwell deploys a rule, the worker watches its alert volume for 48 hours. More than 50 alerts in 24 hours raises a high-risk request in Approvals to disable the rule; it is disabled only after a person approves.

### A person's claim always wins

Once a person owns an incident (assigned in the console or in Sentinel to anyone who is not an agent), no agent takes it over or closes it. Dax and Demitry skip incidents a person owns. If a person claims an incident while an agent is working on it, the agent's verdict arrives as a comment and nothing else changes. A close that a person approved in Approvals still runs.

## Policy rules

Policy rules restrict what agents may do automatically. They are managed under Settings > Agent Policies (admins change them; everyone can read them).

### Where rules are enforced

Rules are checked at two points today:

1. **Incident closure proposed by Demitry.** When Demitry would close a confirmed false or benign positive, the rules for Dax and Demitry are evaluated with the incident's original Sentinel severity and the classification the close would carry. A Deny rule makes Demitry escalate the incident to a person instead of filing a close request. A Require Approval rule keeps the close request with a person: it is never approved automatically.
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

- **Conservative**: requires approval for every severity and for every closure. In practice every Demitry close stays with a person, even under Full auto.
- **Balanced**: requires approval for High and Critical; allows Medium and Low; requires approval for endpoint isolation and account disabling.
- **Autonomous**: adds no severity restriction; still requires approval for endpoint isolation, account disabling and IP blocking. It does not grant full autonomy.

## Approvals

The [Approvals](../features/approvals.md) page holds requests for consequential actions: Demitry's close requests, response actions on confirmed true positives, requests to disable a noisy new rule, requests Atlas files when an admin asks, and others.

- **Who decides**: only admins can vote **Approve** or **Deny**. Analysts and admins can add comments, which never change the outcome.
- **Quorum**: each request states how many approvals it needs (1 unless set otherwise, up to 10). Each person votes once. The request is approved when enough different admins approve. A single Deny resolves it as denied.
- **Undo**: after you confirm an approval, the console waits 10 seconds before sending your vote. **Undo** in that time cancels it.
- **Expiry**: a request expires 24 hours after it was created if it was not decided. Expired requests move to History and can no longer be approved.
- **Approval is not execution**: approving records the decision. An approved Demitry close is carried out at the start of Demitry's next run (scheduled, or when someone clicks **Run QA now**). A response action runs only when an admin uses **Run the approved response** on the approved request, and approval, expiry, target and policy are checked again at that moment. Requests filed by Atlas never run on approval.

Rule deploys, tuning deploys, rollbacks and recalls from the Maxwell and Marien workspaces are not Approvals requests. They are direct admin actions protected by a confirmation dialog and server checks. The exception is Maxwell's own deploys under Full auto, which appear in Approvals History as approved automatically.

When notifications are set up, people are told when a request is waiting, when an agent escalates an incident to a person, and when an agent keeps failing. See [How to configure notifications](../how-to/configure-notifications.md).

## Related

- [How to set agent autonomy](../how-to/set-agent-autonomy.md)
- [How to approve or deny an action](../how-to/approve-or-deny-an-action.md)
- [The agents](the-agents.md)
- [Approvals](../features/approvals.md)
- [Settings](../features/settings.md)
- [Roles and permissions](roles-and-permissions.md)
