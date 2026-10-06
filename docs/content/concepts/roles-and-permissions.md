---
title: Roles and permissions
status: current
reviewed: 2026-10-05
---

# Roles and permissions

Every Overwatch Console user has one of three roles: **viewer**, **analyst** or **admin**. Roles are cumulative: an analyst can do everything a viewer can, and an admin can do everything an analyst can. Your role is shown in the account menu (your initials, top right).

The server enforces every rule on this page. If a button is visible but your role does not allow the action, the request is refused and you see an error such as "Access Denied" or "Administrator privileges required".

## The three roles in short

| Role | Intended for | In one line |
|---|---|---|
| Viewer | Stakeholders, auditors, managers | Reads every page. Cannot run agents, change records or settings. |
| Analyst | SOC analysts and engineers | Runs agents, works incidents, comments and records reviews. Cannot approve, deploy, close incidents or change tenant settings. |
| Admin | SOC leads and platform owners | Everything, including approval decisions, deployments, incident closure and tenant configuration. |

## What each role can do, page by page

| Page | Viewer | Analyst | Admin |
|---|---|---|---|
| [Overview](../features/overview.md) | Read | Read | Read, plus **Approve** / **Deny** on the decision card |
| [Incidents](../features/incidents.md) | Read incidents and investigations | Run Dax analysis, assign, rate Helpful / Needs review, add case notes, flag a false positive for tuning, ask Atlas | All analyst actions, plus close an incident in Sentinel |
| [Approvals](../features/approvals.md) | Read requests and history | Comment on requests | Approve or deny, choose a response, run an approved response, turn tuning auto-approve on or off, manage response providers |
| [Actions](../features/actions.md) | Read playbooks | Run a test (dry run) | Create, edit, save, enable and delete playbooks |
| [Agents](../features/agents.md) | Read | Run each agent's main action (Caleb sandbox actions need admin) | All, plus change the autonomy level |
| [Agent Audit](../features/agent-audit.md) | Read | Rate an event Helpful / Needs review | All, plus edit agent tool permissions |
| [Live Feed](../features/live-feed.md) | Read | Evaluate, generate detections, ingest as hunt (see the known gap below) | All |
| [Detection Library](../features/detection-library.md) | Read | Run backtests, send a rule to QA | Edit queries, deploy and recall rules |
| [Data connectors](../features/data-connectors.md) | Read | Run verification, dismiss a coverage gap with a note | All |
| [Relationships](../features/relationships.md) | Read | Generate the strategic brief, ask Atlas | All |
| [Metrics & Health](../features/metrics-and-health.md) | Read | Read | Read |
| [Audit Trail](../features/audit-trail.md) | Read the ledger, export | Verify the chain, record benign spot-checks | All |
| [Settings](../features/settings.md) | Own agent appearance; view agent policies | Same as viewer | Notifications, Branding, Threat Intel, Agent Policies, tenant default appearance, setup wizard |
| [Atlas copilot](../features/atlas-copilot.md) | Not available ("Atlas needs analyst access") | Ask Atlas | Ask Atlas |

## Approvals are separate from roles

Having the admin role does not let anything skip the approval gate. Response actions an agent proposes, such as containment, create a request in [Approvals](../features/approvals.md), and an admin must approve it. Running an approved response is its own step. Rule deployments and tuning changes also need an admin decision, unless an admin has turned on tuning auto-approve in Approvals. See [Autonomy and approvals](autonomy-and-approvals.md).

Some admin actions run straight away because the admin is the person deciding: for example closing an incident, deploying or recalling a rule from the Detection Library, or deploying the rule pack at the end of the setup wizard. These are recorded in the [Audit Trail](../features/audit-trail.md).

## Adding users and changing roles

The console has no user management screen. To add a user, change someone's role or deactivate an account, contact the Overwatch team.

- A new user's default role is viewer unless another role is set.
- A role change or deactivation takes effect on the user's next request. They do not need to sign out.
- A sign-in lasts up to 8 hours.

## Known gaps

These are places where the screen and the server currently disagree. The server rule is the one that applies.

- **Closing an incident is admin-only.** The **Close incident** button is enabled for analysts, but the server refuses it for anyone but an admin.
- **Saving shared workspace content is admin-only.** Analysts can run Live Feed evaluations, generate detections and generate the strategic brief, but saving those results to the shared workspace is currently refused for analysts. Results an analyst produces may not be kept.
- **The Branding tab loads only for admins.** Analysts and viewers see "Branding unavailable" instead of a read-only view.

## Related

- [Getting started](../getting-started.md)
- [Autonomy and approvals](autonomy-and-approvals.md)
- [Settings](../features/settings.md)
- [Approve or deny an action](../how-to/approve-or-deny-an-action.md)
