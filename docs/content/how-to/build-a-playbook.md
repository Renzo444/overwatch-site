---
title: How to build a playbook
status: current
reviewed: 2026-10-27
---

# How to build a playbook

Build your team's response as a playbook on the Actions page, without code. You test it against a real incident, then save and enable it so it runs on its own.

## Before you start

- You need the **admin** role to create, save, enable and run playbooks. Analysts can test and dry-run playbooks that exist; viewers can read them.
- Enabled playbooks run on the agent worker. In **Settings > Agent Policies**, turn on "Run agents on a schedule for this workspace".
- Steps that isolate a host or disable an account need [response actions set up](set-up-response-actions.md).
- To test against an incident, your tenant must be connected to Microsoft Sentinel and have incidents created in the last 30 days.

## Steps

1. In the sidebar, open **Operate > Actions**.
2. Click **From template** and pick the closest starting point, or click **New playbook** to start from a single trigger.
3. Click the trigger on the canvas. In the inspector, pick the **Event**, for example **Incident verdict recorded**. To narrow it, use **Only when**: click **Add check** and pick a field, a comparison and a value, for example **Dax verdict** · **is** · **True Positive**.
4. Under **Decide**, click **Condition**. Add checks such as **Severity** · **is at least** · **High** and **Dax confidence** · **is at least** · **85** %. Choose **All of these** or **Any of these**. The line under the checks says the condition in words.
5. Connect the trigger to the condition: click the trigger's right-side port, then the condition's left-side input port.
6. Under **Decide**, click **Human approval**. Set **Approvers required** and connect the condition's **Yes** port to it.
7. Under **Respond**, add the steps the approval should release, for example **Isolate host** and **Disable account**, and connect the approval to each. For containment, choose **After approval**: **Run it straight away** or **Wait for an administrator to run it**.
8. Add what happens otherwise, for example a **Notify** step on the condition's **No** port. In **Message**, click a value such as **Incident title** to insert it.
9. Drag steps by their header to tidy the layout. Use **Fit** to see the whole graph.
10. Open the **Versions** card and type the **Playbook name**.
11. Pick an incident in **Incident to test on** and click **Test**. The result shows the branch taken and, at the approval, exactly what the request would list.
12. Fix anything the result reports, then click **Save**.
13. Turn on the **Enabled** switch. The playbook now runs whenever its trigger fires.
14. To try it once for real now, click **Run now**, pick the incident and confirm.

## What happens next

- **Save** records a new version with your identity, the time and a content hash, and writes it to the audit trail.
- When the trigger fires, a run appears in **Run history**. Open it to see each step's outcome.
- At the Human approval, the run waits in **Approvals**. The request says "Approving runs these steps, and only these" and lists them. When an administrator approves, the run carries on straight away. A denial or expiry stops that branch.
- Every step a run takes is recorded in the audit trail under "Playbooks".
- To change an enabled playbook, edit it, **Save** a new version, and click **Publish** on that version in the Versions card. Runs already started finish on the version they started with.

## If something goes wrong

- **"Can't save: 1 destructive step has no Human approval upstream"**: an isolate, disable or close step has no **Human approval** before it. Connect one, then save again.
- **"Can't save yet: N problems"**: the list names each problem. Click one to select the step. Common causes: no name, no trigger, a required field left empty, an email or tag in the wrong form, or a loop.
- **"Can't enable yet" with "Run agents on a schedule for this workspace"**: scheduled runs are off. Click **Open Agent Policies**, turn the setting on, then enable again.
- **"Enabled playbooks are not running"**: scheduled runs were turned off after the playbook was enabled. Turn them on in **Settings > Agent Policies**.
- **A run "Finished with problems"**: open it in Run history. Each failed step says why, for example "Not sent: Teams isn't set up in Settings → Notifications" or "Response actions are not set up".
- **A step is "Uncertain"**: the worker stopped while the step was running. It was not repeated. Check the incident and do it by hand if needed.
- **Run now says the filter is false**: the trigger's **Only when** filter doesn't match that incident, so nothing ran.
- **"Not saved: this playbook changed since you opened it"**: someone saved a newer version. Click **Discard my changes and reload** to load it.
- **"The incident could not be read from Sentinel"**: Sentinel was unreachable. Try again, or use **Dry run**.
- **New playbook** is disabled: your tenant has reached 25 playbooks. Disable and delete one first.

## Related

- [Actions](../features/actions.md)
- [How to set up response actions](set-up-response-actions.md)
- [Approvals](../features/approvals.md)
- [How to approve or deny an action](approve-or-deny-an-action.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
