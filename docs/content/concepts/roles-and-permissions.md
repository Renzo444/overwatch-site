---
title: Roles and permissions
status: current
reviewed: 2026-10-19
---

# Roles and permissions

Every Overwatch Console user has one of three roles: **viewer**, **analyst** or **admin** (shown as **Administrator** on the Team tab). Roles are cumulative: an analyst can do everything a viewer can, and an admin can do everything an analyst can. Your role is shown in the account menu (your initials, top right).

The server enforces every rule on this page. If a button is visible but your role does not allow the action, the request is refused and you see an error such as "Access Denied" or "Administrator privileges required".

## The three roles in short

| Role | Intended for | In one line |
|---|---|---|
| Viewer | Stakeholders, auditors, managers | Reads every page and exports audit records. Cannot run agents, ask Atlas, or change records or settings. |
| Analyst | SOC analysts and engineers | Runs agents, works and closes incidents, comments, records reviews and drafts detections. Cannot approve, deploy or change tenant settings. |
| Admin | SOC leads and platform owners | Everything, including approval decisions, deployments, tenant configuration and the team. |

## What each role can do, page by page

| Page | Viewer | Analyst | Admin |
|---|---|---|---|
| [Overview](../features/overview.md) | Read | Read | Read, plus **Approve** / **Deny** on the decision card |
| [Incidents](../features/incidents.md) | Read incidents and investigations | Run Dax analysis, assign, rate Helpful / Needs review, add case notes, flag a false positive for tuning, close an incident in Sentinel, ask Atlas | All analyst actions |
| [Approvals](../features/approvals.md) | Read requests and history | Comment on requests, view Agent accuracy | Approve or deny, run an approved response and request its undo, turn auto mode for an action on or off under Agent accuracy, turn tuning auto-approve off, manage response providers |
| [Actions](../features/actions.md) | Read playbooks | Run a test (dry run) | Create, edit, save, enable and delete playbooks |
| [Agents](../features/agents.md) | Read | Run each agent's main action (Caleb's sandbox detonation needs admin) | All, plus turn each agent's autonomy on or off |
| [Agent Audit](../features/agent-audit.md) | Read | Rate an event Helpful / Needs review | All, plus edit agent tool permissions |
| [Live Feed](../features/live-feed.md) | Read | Evaluate articles, generate detections, ingest as hunt | All |
| [Detection Library](../features/detection-library.md) | Read | Run backtests, send a rule to QA | Edit queries, deploy and recall rules |
| [Data connectors](../features/data-connectors.md) | Read | Run verification, dismiss a coverage gap with a note | All |
| [Relationships](../features/relationships.md) | Read | Generate the strategic brief, ask Atlas | All |
| [Metrics & Health](../features/metrics-and-health.md) | Read | Read | Read |
| [Audit Trail](../features/audit-trail.md) | Read the ledger, draft the report, export | Verify the chain, record benign spot-checks | All |
| [Settings](../features/settings.md) | Own agent appearance; view agent policies | Same as viewer | Notifications, Branding, Threat Intel and intel feeds, Agent Policies (including what runs on its own), Team, tenant default appearance, setup wizard and Azure connection |
| [Atlas copilot](../features/atlas-copilot.md) | Not available ("Atlas needs analyst access") | Ask Atlas | Ask Atlas |

Results analysts produce (Live Feed evaluations, generated detections, the strategic brief) are saved to the shared workspace for everyone to see.

## Approvals are separate from roles

Having the admin role does not let anything skip the approval gate. Response actions an agent proposes, such as containment, create a request in [Approvals](../features/approvals.md), and an admin must approve it. Running an approved response is its own step. Rule deployments, tuning changes and Demitry's incident closes also wait for an admin decision.

An admin chooses, action by action, what runs on its own in **Settings > Agent Policies** under **What runs on its own**: **Approval**, **Full auto** or **Scheduled** (full auto outside staffed hours). Today only two actions can run without a person: Demitry closing a false positive, and Maxwell deploying a Renzo detection that passed every review check, up to a daily limit the admin sets. Even then, each action runs only when its own checks pass. Rule tunes, Demitry's overrides of Dax and containment always wait for a person. See [Autonomy and approvals](autonomy-and-approvals.md) and [Set agent autonomy](../how-to/set-agent-autonomy.md).

Some actions run straight away because the person is the one deciding: for example an analyst or admin closing an incident, or an admin deploying or recalling a rule from the Detection Library. These are recorded in the [Audit Trail](../features/audit-trail.md).

## Adding users and changing roles

Admins manage people in **Settings > Team**. From there an admin invites a person by email with a role, changes another person's role, and deactivates or reactivates an account. See [Invite a teammate](../how-to/invite-a-teammate.md).

- Your organization's first admin is created by the Overwatch team, who send that person a one-time invitation link.
- You cannot change your own role or deactivate yourself. Ask another admin.
- The organization always keeps at least one active admin. To demote or deactivate the last one, make someone else an admin first.
- Every role change is recorded in the [Audit Trail](../features/audit-trail.md) with who made it and the old and new role.
- An invitation starts on the viewer role unless the admin picks another.
- A role change or deactivation takes effect on the user's next request. They do not need to sign out.
- A sign-in lasts up to 8 hours.

## Related

- [Getting started](../getting-started.md)
- [Invite a teammate](../how-to/invite-a-teammate.md)
- [Autonomy and approvals](autonomy-and-approvals.md)
- [Settings](../features/settings.md)
- [Approve or deny an action](../how-to/approve-or-deny-an-action.md)
