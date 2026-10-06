---
title: Autonomy and approvals
status: current
reviewed: 2026-10-05
---

# Autonomy and approvals

Autonomy settings decide which agents run on their own schedule. Policy rules restrict what agents may do automatically. Approvals are where a person decides on consequential actions. This page explains how the three fit together, as the product works today.

## Autonomy settings

All autonomy settings apply to the whole tenant, are stored in the tenant's agent configuration, and can only be changed by an admin. Every change is audited. Viewers and analysts can see the current values.

A setting is configuration only. Scheduled work also needs the background agent worker to be running; the console says "It does not show that a worker is running" wherever autonomy appears.

### Dax's autonomy level (0 to 3)

Dax has a level instead of an on/off switch. The Agents page and Settings use different names for the same levels:

| Level | Agents page name | Settings name | What it does today |
|-------|------------------|---------------|--------------------|
| 0 | Manual | Manual | Dax never runs on a schedule. A run you start adds Dax's assessment as an incident comment only; the incident is not handed to Demitry. |
| 1 | Semi | Advisory | The worker runs Dax on eligible incidents about every 30 seconds. Each assessed incident gets Dax's comment, is assigned to Dax and is labelled for Demitry's QA. |
| 2 | Near Full | Semi-auto | Same as level 1 in Dax's own run. |
| 3 | Full | Autonomous | Same as level 1 in Dax's own run. |

The level descriptions in the console ("Auto-close False Positives", "Full auto: prompts response on TPs") describe what happens after Demitry's QA, not something Dax does itself. In the current version:

- Dax never closes an incident and never runs a response action at any level. Disruptive tools are blocked and the incident is routed to senior QA and human review.
- False-positive closure is done by Demitry, whenever Demitry runs (on request or on its own schedule), and only when your policy rules allow it.
- On a confirmed true positive, Demitry files response requests in Approvals. Nothing runs until an admin approves and then runs the response.

Settings also shows a **Level 4 · Full auto** option. It is disabled ("Not available: the agent configuration accepts levels 0–3, and no stored level runs SOAR playbooks automatically.").

Changing the level to 2 or 3 from a lower level, or back to 0, asks for confirmation.

### Agent switches

These are on/off. Each turns on that agent's scheduled run.

| Setting | Where to change it | When on |
|---------|--------------------|---------|
| Demitry autonomy | Demitry's workspace (Agents page) | QA runs about every 5 minutes, one incident per run. |
| Marien autonomy | Marien's workspace | A tuning poll runs about every 10 minutes and produces proposals. |
| Orion autonomy | Orion's workspace | A proactive hunt runs about every 10 minutes (up to 10 scheduled hunts per day). |
| Renzo autonomy | Renzo's workspace | A research cycle runs about every 10 minutes, within Renzo's daily allowance. Drafts only. |
| Caleb autonomy, also **Caleb scheduled hash lookups** | Caleb's workspace, or Settings > Agent Policies > **Scheduled operations** | Hash reputation lookups for sandbox requests about every 2 minutes. Does not enable sandbox execution. |
| **Automatic threat-intelligence ingestion** | Settings > Agent Policies > **Scheduled operations** | About every 2 hours the worker reads the feeds; Renzo scores new relevant articles and those scoring 80 or higher become Auto-ingested drafts in the Detection Library. |

Maxwell and Atlas have no schedule. They show "On demand".

Turning a switch off stops new scheduled requests. Work already in progress is not cancelled.

### Tuning auto-approve

On the Approvals page, admins see "tuning auto-approve: on/off" with **turn on** / **turn off**. When it is on, Marien deploys its tuning proposals to Sentinel without human review, whether the proposal came from the schedule or from someone clicking **Refresh recommendations**. Leave it off if every rule change should be reviewed.

## Policy rules

Policy rules restrict what agents may do automatically. They are managed under Settings > Agent Policies (admins change them; everyone can read them).

### Where rules are enforced

Rules are checked at two points today:

1. **Incident closure by Demitry.** When Demitry would close a confirmed false or benign positive, the rules for Dax and Demitry are evaluated with the incident's original Sentinel severity. If a rule says Deny or Require Approval, Demitry escalates the incident to a human instead of closing it.
2. **Running an approved response.** When an approved containment request is run, the rules for Maxwell and the requesting agent are evaluated again. A rule can stop it; a rule never replaces the human approval.

Detection deployment, tuning and agent queries are not covered by custom rules yet. The Settings page says so under **Enforced boundaries**.

### How rules work

Each rule has:

- **Agent**: All Agents, or one agent.
- **Field**: Severity, Classification, Entity Count, Confidence Score or Action Type.
- **Op**: =, ≠, >, <, ≥, ≤ or contains. Number comparisons only work on Entity Count and Confidence Score.
- **Value**: for example Critical.
- **Action**: Allow, Deny or Require Approval.
- **Reason**: shown in decisions and audit records.

When several rules match, the most restrictive wins: Deny, then Require Approval, then Allow. If a rule needs a value the request does not have (for example a confidence score that was not recorded), a Deny or Require Approval rule still applies. With no rules at all, closure is allowed.

Rules you add with **Add rule** are grouped into a policy named "Custom Rules" per agent choice. Each policy has an on/off switch, and expanding it shows its rules and **Delete policy**. Every change is audited, and if someone else changed the policies first you are asked to refresh before saving.

### Templates

Under **More policy controls** > **Policy templates**, admins can apply one of three templates. Applying a template adds it as a policy for all agents; existing policies stay in force.

- **Conservative**: requires approval for every severity (Critical, High, Medium, Low) and for every closure. In practice Demitry escalates every false positive to a human.
- **Balanced**: requires approval for High and Critical; allows Medium and Low; requires approval for endpoint isolation and account disabling.
- **Autonomous**: adds no severity restriction; still requires approval for endpoint isolation, account disabling and IP blocking. It does not grant full autonomy.

## Approvals

The [Approvals](../features/approvals.md) page holds requests for consequential actions. Requests come from Demitry (response actions on confirmed true positives), from Atlas when an admin asks it to file one, and from other parts of the product.

- **Who decides**: only admins can vote **Approve** or **Deny**. Analysts and admins can add comments, which never change the outcome.
- **Quorum**: each request states how many approvals it needs (1 unless set otherwise, up to 10). Each person votes once. The request is approved when enough different admins approve. A single Deny resolves it as denied.
- **Undo**: after you confirm an approval, the console waits 10 seconds before sending your vote. **Undo** in that time cancels it. After that the vote is recorded.
- **Expiry**: a request expires 24 hours after it was created if it was not decided. Expired requests move to History and can no longer be approved.
- **Approval is not execution**: approving records the decision. A response action runs only when an admin uses **Run the approved response** on the approved request, and approval, expiry, target and policy are checked again at that moment. Requests filed by Atlas never run on approval.

Rule deploys and recalls from the Maxwell and Marien workspaces are not Approvals requests. They are direct admin actions protected by a confirmation dialog and server checks.

## Related

- [How to set agent autonomy](../how-to/set-agent-autonomy.md)
- [How to approve or deny an action](../how-to/approve-or-deny-an-action.md)
- [The agents](the-agents.md)
- [Approvals](../features/approvals.md)
- [Settings](../features/settings.md)
- [Roles and permissions](roles-and-permissions.md)
