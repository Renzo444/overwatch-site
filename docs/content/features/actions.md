---
title: Actions
status: current
reviewed: 2026-10-05
---

# Actions

Actions is a playbook builder. You draw how your team responds to an incident: a trigger, conditions, a human approval and the response steps. You can then test the playbook against a real incident to see what each step would do. In this release a playbook documents a response; nothing runs playbooks automatically.

## Where to find it

- Sidebar: **Operate > Actions**.
- Command palette (Ctrl+K or Cmd+K): **Go to Actions**.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | Open playbooks, read the canvas, step details, run history and versions. |
| Analyst | Everything a viewer can do, plus **Test** a playbook on an incident and **Dry run** it. |
| Admin | Everything above, plus create, edit, save, enable, disable, publish and delete playbooks. |

## What you see

The page header reads "Actions" with a **Refresh** button and a short notice: a published playbook documents the response, nothing runs playbooks automatically in this release, and every response still goes through Approvals with policy re-checked at dispatch. **Open Approvals** takes you there.

**Playbook list.** One pill per playbook with its name, number of steps and state (draft, published), and a dot when it is enabled. Unsaved new playbooks are marked "unsaved". Administrators see **New playbook**. A line under the list shows how many playbooks your tenant has out of the limit.

When there are no playbooks yet, administrators see **New playbook** and **Start from “Contain compromised endpoint”**, a template with a trigger, a high-risk condition, a human approval, isolate and disable steps, and notifications.

**Toolbar.**
- **Add** palette: **Trigger**, **Schedule**, **Condition**, **Human approval**, **Isolate host**, **Disable account**, **Block IP / domain**, **Create ticket**, **Run agent task**, **Notify**, **Generate report**, **Close incident**. Steps that are not available are shown dimmed; hover to see why.
- The **Enabled** / **Disabled** / **Draft** switch.
- **Incident to test on** ("Test on #1234") and **Test**, for analysts and administrators.
- Zoom: **Zoom out**, **Zoom in** and **Fit**.
- **Dry run** (analysts and administrators) and **Save** (administrators).

**Canvas.** The playbook as connected steps, starting from the trigger. A condition has **Yes** and **No** outputs; other steps have one output. A destructive step with no human approval before it is marked. A minimap beside the canvas shows the whole graph.

**Step inspector.** Select a step to see and edit its title and settings, what it **Would call**, whether it needs approval ("Needs approval" or "No approval needed"), its connections, and, for destructive steps, whether a human approval guards it.

**Run history.** The newest six dry runs, tests, saves and state changes recorded on this playbook, with who ran them. There are no live runs because no runner exists.

**Versions.** A collapsed card with the **Playbook name**, every retained version (number, draft or published, author, time, a short content hash and step count) and **Delete playbook**.

## What you can do

| Control | What it does | Who |
|---------|--------------|-----|
| **New playbook** | Starts an unsaved playbook with one trigger step. It exists only in this browser tab until you save it. | Admin |
| **Add** palette items | Adds a step to the canvas. | Admin |
| Drag a step by its header | Moves the step on the canvas. | Admin |
| Right-side port, then another step's left-side input port | Connects two steps. **Cancel** in the banner stops connecting. **Connect** in the inspector does the same. | Admin |
| **Remove** (inspector) | Deletes the selected step and its connections. The **x** next to a connection removes just that connection. | Admin |
| **Save** | Validates the playbook and saves it as a new version with your identity, the time and a content hash. The save is written to the audit trail. | Admin |
| **Enabled** switch | Turning it on publishes the latest saved version and enables the playbook. Turning it off disables it; the published version stays for reference. | Admin |
| **Publish** (Versions) | On an enabled playbook, publishes a newer saved version. | Admin |
| **Open** (Versions) | Loads a version into the editor. Saving it makes it the next version. | Any role can view; only admins can save |
| **Delete playbook** | Removes a disabled playbook, its versions and run history after you confirm. The audit trail keeps the record of every save. | Admin |
| **Test** | Reads the chosen incident from Sentinel and Dax's recorded verdict, then walks the playbook: the trigger and conditions are evaluated and only the branch taken continues. It stops at a human approval step. Nothing is executed, no approval is created and no agent is called. | Analyst, Admin |
| **Dry run** | Walks every step without an incident and lists what each would call. Triggers and conditions are not evaluated. Nothing is executed. | Analyst, Admin |
| **Clear test** | Hides the test result. | Analyst, Admin |

The step types and their settings:

- **Trigger**: **Event** (Incident created, Incident verdict recorded, Approval granted, Detection deployed) and an optional **Filter**.
- **Condition**: an **Expression** such as `severity >= High and confidence >= 85%`.
- **Human approval**: **Approvers required** (1, 2 or 3). **Expires after** is fixed at 24h.
- **Isolate host**, **Disable account**, **Close incident**: a **Response** and a **Target**. These are destructive.
- **Run agent task**: an **Agent** (Dax triage incident, Orion run hunt, Renzo build detection, Marien tune rule, Caleb sandbox sample) and a **Task**.
- **Notify**: a **Channel** (Teams, Slack, Webhook) and a **Destination**.
- **Generate report**: **Report** (Executive draft) and **Range** (7d, 30d, 90d).

## Good to know

- **Planned: running playbooks.** No runner exists in this release. Enabling a playbook does not make it fire on incidents, and its notify, report and agent steps are not sent. To contain a threat, use [Approvals](approvals.md).
- **Planned:** **Schedule** (no playbook scheduler yet), **Block IP / domain** (no firewall integration yet) and **Create ticket** (no ticketing route yet) cannot be added.
- **Approval guardrail.** Isolate host, Disable account and Close incident, and any action whose title says isolate, disable, revoke, block, purge, quarantine or close, must have a **Human approval** step somewhere before them. Until one is connected, the playbook cannot be saved or enabled, and the canvas and inspector say why.
- **Save checks.** A playbook needs a name, at least one **Trigger**, a title on every step, a valid choice in every list, and no loops between steps.
- **Limits.** Up to 25 playbooks per tenant, 40 steps and 80 connections per playbook. The last 10 versions are kept, plus the published one. Run history keeps up to 12 entries and shows the newest six.
- **Conflicts.** If someone else saved a newer version after you opened the playbook, your save is refused. **Discard my changes and reload** loads their version.
- **Expressions** in a condition or trigger filter can use `severity`, `confidence`, `status`, `verdict`, `title` and `incidentNumber`, with `>=`, `<=`, `>`, `<`, `==`, `!=`, `contains` and `in (…)`. Join clauses with `and` or with `or`, not both in one expression. A test that cannot evaluate an expression stops there and says why.
- In a test, only **Incident created** and **Incident verdict recorded** triggers can fire. The other events are not incident events, so the test reports that the trigger did not fire.
- The test incident list holds up to 50 incidents of any status created in the last 30 days.
- An administrator must disable a playbook before deleting it.

## Related

- [How to build a playbook](../how-to/build-a-playbook.md)
- [Approvals](approvals.md)
- [How to approve or deny an action](../how-to/approve-or-deny-an-action.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Audit Trail](audit-trail.md)
