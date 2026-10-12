---
title: How to close an incident
status: current
reviewed: 2026-10-12
---

# How to close an incident

Close an incident in your Sentinel workspace from Overwatch Console, with the classification and comment Sentinel records.

## Before you start

- You need the **analyst** or **admin** role. Viewers see the **Close incident** button disabled.
- The incident must not already be closed. Closed incidents do not show the button.
- Ideally, read Dax's verdict and Demitry's QA review first. See [How to triage an incident](triage-an-incident.md).

## Steps

1. In the sidebar, open **Operate > Incidents**.
2. Find the incident. Use the filters or **Search incidents** if it is not in view.
3. Click the incident's row to open the incident panel.
4. Scroll to the action buttons and click **Close incident**.
5. In the dialog "Close #… in Sentinel?", check the **Classification**. If Dax recorded a disposition, it is already selected and marked with his name. Change it if you disagree. If Dax recorded nothing, choose one:
   - **True Positive - suspicious activity**
   - **Benign Positive - suspicious but expected**
   - **False Positive - incorrect alert logic**
   - **False Positive - inaccurate data**
   - **Undetermined**
6. Type a **Comment** explaining why. It becomes the closing comment in Sentinel.
7. Click **Close incident**.

## What happens next

- The classification, its reason and your comment are written to the incident in Sentinel, the same fields as Sentinel's own close dialog. If you leave the comment empty, the console writes "Closed in Overwatch Console by" followed by your account.
- The console also adds a comment to the incident saying who closed it and with which classification.
- The close is recorded in Agent Audit with your identity.
- The incident list refreshes once Sentinel confirms. If your status filter does not include **Closed**, the incident leaves the list.
- Your close is final for the agents. Dax and Demitry never reopen or reclassify an incident a person closed, and a close you make while an agent is working on the incident stands.

Closing an incident yourself does not go through Approvals; it is a direct action recorded with your name. When Demitry wants to close an incident, he files a close request in [Approvals](../features/approvals.md) instead, and an administrator decides it. If a close request from Demitry is waiting for an incident you have already closed, the incident stays closed with your classification.

## If something goes wrong

- The **Close incident** button in the dialog is disabled: choose a classification first. There is no default, so an incident never closes as Undetermined unless someone picks it.
- The **Close incident** button on the panel is disabled: your role is viewer. Ask an analyst or administrator to close it.
- **"Failed to close incident: Sentinel did not close the incident: …"**: Sentinel refused the update or could not be reached. The incident is unchanged. Try again later.

## Related

- [Incidents](../features/incidents.md)
- [How to triage an incident](triage-an-incident.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
