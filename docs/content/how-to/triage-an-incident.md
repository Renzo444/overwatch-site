---
title: How to triage an incident
status: current
reviewed: 2026-10-05
---

# How to triage an incident

Work one incident from the queue to a decision: read what Dax and Demitry recorded, get an analysis if there is none, take ownership and decide what happens next.

## Before you start

- You need the **analyst** or **admin** role to ask Dax to analyze, assign incidents and rate assessments. A viewer can read everything in these steps but cannot change anything.
- Your tenant must be connected to a Microsoft Sentinel workspace.

## Steps

1. In the sidebar, open **Operate > Incidents**.
2. Click the **No assessment** chip to see incidents Dax has not assessed, or **All** to see everything.
3. Narrow the list if you need to with **Incident time range**, **Incident severity** and the status picker. Click a column header such as **Sev** or **Created** to sort.
4. Click the incident's row to open the incident panel.
5. Read the **Dax verdict** and **Demitry QA** tiles at the top of the panel.
6. If the panel says "No investigation chain recorded yet", click **Ask Dax to analyze**. To run a fresh analysis on an incident that already has one, click **Re-analyze**.
7. Read **Similar past cases** to see how closed incidents with the same rule, entities or techniques were classified. Click **Open historical case** for the details of one.
8. Read the **Investigation chain**. Expand **Recorded assessment and full trail** for Dax's full reasoning and the queries he ran.
9. Check **Entities** for the accounts, hosts and addresses involved.
10. Click **Assign to me** to take ownership, or **Assign to…** and enter a colleague's email, then click **Assign**.
11. If you want to ask a question about the incident, click **Ask Atlas**. You can pin a useful answer to the incident's case notes from the Atlas drawer with **Pin to #… notes**.
12. Record your opinion of Dax's assessment with **Helpful** or **Needs review**.
13. If the assessment is a false positive caused by a noisy rule, click **Flag FP & request tuning**.
14. Decide the outcome: close the incident (see [How to close an incident](close-an-incident.md)), or, if a response is waiting in **Awaiting your approval**, decide it (see [How to approve or deny an action](approve-or-deny-an-action.md)).

To ask Dax to analyze every unassessed open incident in view at once, click **Analyze unassessed** in the filter row instead of steps 4 to 6.

## What happens next

- After you ask for an analysis, a message confirms the request. Dax's steps appear in the investigation chain and in Agent Audit as they are recorded. Dax writes his assessment to the incident in Sentinel.
- Demitry then reviews Dax's work. Workflow labels such as **Awaiting QA** and **Senior Verified** appear on the incident as this happens.
- When Demitry confirms a true positive, he files a response request (for example isolating a host or disabling an account) in Approvals. Nothing is contained until an administrator approves it and then runs it.
- Depending on your tenant's agent policy, Demitry can close an incident he confirms as a false or benign positive. Otherwise he escalates it for human review.
- Assigning an incident to a person takes it out of Dax's automatic queue until it is unassigned.
- **Helpful** and **Needs review** are recorded in Agent Audit as your opinion. They do not change the verdict or retrain anything.
- **Flag FP & request tuning** saves a tuning proposal from Marien. It is reviewed before anything is deployed.

## If something goes wrong

- **"Incident queue unavailable"**: the console could not read Sentinel. Click **Retry**. If a list was already loaded, the page keeps it and marks it as possibly stale.
- **"Select an incident status to load the queue."**: every status checkbox is cleared. Tick at least one.
- **"No incidents match these filters"**: up to 50 incidents were read and none match. Widen the time range, severity or status.
- **"Investigation evidence has not loaded yet, so unassessed incidents cannot be told apart."**: wait for the verdict column to load, then click **Analyze unassessed** again.
- **"No unassessed incident is eligible for Dax"**: every unassessed incident is assigned to a person or already handed off. Use **Re-analyze** on a single incident to override.
- **"Analysis request failed: …"** or **"Assignment failed: …"**: the request was refused or Sentinel could not be updated. The message gives the reason. A viewer sees these buttons disabled.
- **Flag FP & request tuning** is disabled: it needs a recorded false-positive assessment and an incident that names its analytic rule.

## Related

- [Incidents](../features/incidents.md)
- [How to close an incident](close-an-incident.md)
- [How to approve or deny an action](approve-or-deny-an-action.md)
- [How to ask Atlas](ask-atlas.md)
- [How to tune a noisy rule](tune-a-noisy-rule.md)
- [The agents](../concepts/the-agents.md)
