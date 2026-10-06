---
title: How to build a playbook
status: current
reviewed: 2026-10-05
---

# How to build a playbook

Draw your team's response to an incident as a playbook on the Actions page, test it against a real incident, and save and publish it.

## Before you start

- You need the **admin** role to create, save and enable playbooks. Analysts can test and dry-run playbooks that exist; viewers can read them.
- A playbook documents a response. In this release nothing runs playbooks automatically, and containment still goes through [Approvals](../features/approvals.md).
- To test against an incident, your tenant must be connected to Microsoft Sentinel and have incidents created in the last 30 days.

## Steps

1. In the sidebar, open **Operate > Actions**.
2. Click **New playbook**. If your tenant has no playbooks yet, you can instead click **Start from “Contain compromised endpoint”** to begin from a template.
3. Click the **Choose a trigger** step on the canvas. In the inspector, type a step title and pick the **Event**, for example **Incident verdict recorded**. Optionally add a **Filter** such as `verdict in (True Positive, Escalated)`.
4. In the **Add** palette, click **Condition**. In the inspector, give it a title and an **Expression** such as `severity >= High and confidence >= 85%`.
5. Connect the trigger to the condition: click the trigger's right-side port, then click the condition's left-side input port.
6. Click **Human approval** in the palette. Set **Approvers required**. Connect the condition's **Yes** port to it.
7. Add the response steps you need, for example **Isolate host** or **Disable account**. Set the **Target** in the inspector. Connect the **Human approval** step's port to each of them.
8. Add any **Notify**, **Run agent task** or **Generate report** steps and connect them. Use the condition's **No** port for what should happen when the condition is false.
9. Drag steps by their header to tidy the layout. Use **Fit** to see the whole graph.
10. Open the **Versions** card and type the **Playbook name**.
11. Click **Dry run** to list every step and what it would call.
12. Pick an incident in **Incident to test on** and click **Test** to walk the playbook against that incident's real data.
13. Fix anything the result reports, then click **Save**.
14. Turn on the **Enabled** switch to publish the saved version.

## What happens next

- **Save** records a new version with your identity, the time and a content hash, and writes it to the audit trail. The Versions card lists it.
- **Test** reads the incident from Sentinel and Dax's recorded verdict, evaluates the trigger and conditions, follows only the branch taken and stops at the **Human approval** step. It reports, for example, "Test on #1234 · 3 steps reached · paused at approval". Nothing is executed, no approval is created and no agent is called.
- Dry runs and tests on a saved playbook are recorded in its **Run history** with your name.
- Enabling publishes the saved version for your team to reference. Because no runner exists in this release, the playbook does not fire on incidents and its steps are not sent. Containment still happens through Approvals: an administrator approves the request and then runs it.
- To change a published playbook, edit it, **Save** a new version, and click **Publish** on that version in the Versions card.

## If something goes wrong

- **"Can't save: 1 destructive step has no Human approval upstream"**: an isolate, disable or close step has no **Human approval** before it. Connect one, then save again. The step is also marked on the canvas and in the inspector.
- **"Can't save yet: N problems"**: the list below names each problem. Click one to select the step. Common causes: no name, no **Trigger** step, a step without a title, or connections that form a loop.
- **"Not saved: this playbook changed since you opened it"**: someone saved a newer version. Click **Discard my changes and reload** to load it.
- **"Can't enable: save the playbook first."** or **"Can't enable unsaved changes"**: enabling publishes the saved version, so save first.
- A palette item is dimmed: **Schedule**, **Block IP / domain** and **Create ticket** are not available yet. Hover over the item to see why.
- **"The incident could not be read from Sentinel, so nothing was evaluated."**: Sentinel was unreachable during a test. Try again, or use **Dry run**.
- A test says the trigger did not fire or a condition "Can't evaluate": the incident does not match, a field is missing (for example no recorded verdict), or the expression mixes `and` and `or`.
- **New playbook** is disabled: your tenant has reached 25 playbooks. Disable and delete one first.

## Related

- [Actions](../features/actions.md)
- [Approvals](../features/approvals.md)
- [How to approve or deny an action](approve-or-deny-an-action.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
