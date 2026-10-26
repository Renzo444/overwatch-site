---
title: Incidents
status: current
reviewed: 2026-10-26
---

# Incidents

The Incidents page lists incidents from your Microsoft Sentinel workspace next to what the agents recorded about them: Dax's verdict and Demitry's QA review. Use it to work the queue, read an investigation, ask Dax to analyze, assign an owner and close incidents.

## Where to find it

- Sidebar: **Operate > Incidents**.
- Command palette (Ctrl+K or Cmd+K): **Go to Incidents**. Searching the palette for an incident title or number opens that incident's investigation workspace directly.
- Keyboard: press `g` then `i`.
- From Overview: the **Open incidents returned** count and **All incidents** link.
- From Metrics & Health: a KPI tile opens Incidents with a matching filter already applied.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | Read the table and the incident panel, filter, sort, search, export CSV, open the full workspace and the audit trail. |
| Analyst | Everything a viewer can do, plus ask Dax to analyze, assign or unassign incidents, rate an assessment **Helpful** or **Needs review**, request tuning for a false positive, ask Atlas about the incident and close incidents in Sentinel. |
| Admin | Everything an analyst can do, plus approve or deny a pending request shown in the incident panel. |

## What you see

The page header reads "Follow the investigation." with a **Refresh** button.

**Filter row.**
- **Assessment filter** chips, each with a count: **All**, **No assessment**, **Assessed**, **Assigned to me**. "Assigned to me" matches incidents whose Sentinel owner is your account.
- **Incident time range**: **Last 7 days** (default), **Last 14 days**, **Last 30 days**, **Last 60 days**. Incidents are matched by when they were created.
- **Incident severity**: **All severities**, **High**, **Medium**, **Low**, **Informational**.
- **Incident status** picker: checkboxes for **Active**, **New**, **Closed** and **All incidents**. The default is Active, which includes incidents Sentinel marks New or Active.
- **Search incidents**: a search button that opens a box for title, number, owner, ID or severity.
- **Export CSV** and **Analyze unassessed** at the right.

A line under the filters says when the list was read from Sentinel and reminds you that the list holds up to 50 matching incidents. It is not a count of all open incidents. If the cap was reached it says "sample cap reached".

**Incidents table.** Columns: **Sev**, **Incident** (title, number, owner, workflow labels and a "N similar" hint when similar closed cases were already found), **Status**, **Dax verdict**, **Demitry QA**, **Entities** and **Created**. The Sev, Incident, Status, Dax verdict and Created headers sort the rows; click again to reverse. The newest incidents are first by default.
- **Dax verdict** shows the recorded conclusion (for example True positive, False positive, Benign positive) with confidence and time, "Assessment not finalized" when Dax recorded steps but no conclusion, or "No assessment recorded".
- **Demitry QA** shows Demitry's latest decision and whether it agrees with or overrides Dax, "passed without review" when he passed Dax's verdict on without a senior review, or a dash when there is no review.
- **Entities** shows a dash until you open the incident, then the number of entities Sentinel mapped.
- Workflow labels written by the agents appear as small markers: **Senior Verified**, **Awaiting QA** and **SOAR Executed**.

**Incident panel.** Click a row (or press Enter on it) to open a panel on the right. Press Escape or the close button to close it. From top to bottom:
- Severity, number, status and owner ("You" when it is yours), workflow labels and the title. For a closed incident, the Sentinel classification, close time and closing comment.
- Two tiles: **Dax verdict** and **Demitry QA**.
- **Awaiting your approval**, when a pending request is linked to this incident, with **Approve** and **Deny**.
- **Similar past cases**: closed Sentinel incidents from the last 90 days that share the rule, entities or techniques. Each case shows a match score, what it matched on, the classification it was closed with, the closing comment, time to resolve and who closed it. A summary line describes the mix of past dispositions; it is built from the stored classifications, not generated. Any reviewer feedback stored for similar cases or for this incident is shown here too. **Open historical case** shows a read-only view of the closed case with a link to open it in Sentinel.
- **Investigation chain**: the agent steps recorded for this incident (up to the latest 40), from Dax, Demitry and any other agent that worked on it. Every query step reads the same way: why the agent ran it (or "Ran a query (no reason recorded)"), a **Result** line (for example "3 rows returned", "No rows returned" or "Query failed: …") and the KQL itself. A verdict step shows the verdict with its **Confidence** and **Why**. Demitry's QA verdict also shows **Versus Dax** (what Dax concluded and whether Demitry agrees or disagrees) and, when he recommends a close, the **Closure note**. A step an agent's tool permissions blocked reads "Blocked from using … by its tool permissions". Expand **Recorded assessment and full trail** for Dax's reasoning, recorded disposition, confidence explanation and the full step-by-step trail.
- **Case notes**: Atlas answers that someone pinned to this incident. Each note is labelled as generated and shows who pinned it. The section is hidden when there are no notes.
- **Entities**: accounts, hosts, IPs, URLs, files and other entities Sentinel mapped to the incident.
- **Sentinel description**, collapsed, when Sentinel has one.
- The action buttons described below.

## What you can do

| Control | What it does | Who | Approval |
|---------|--------------|-----|----------|
| **Refresh** | Re-reads the incident list, assessments and pending approvals. The list also refreshes about every 15 seconds. | Any role | No |
| **Export CSV** | Downloads the incidents in view, in the table's order, as `incidents.csv` (ID, Severity, Title, Status, Verdict, Created). | Any role | No |
| **Analyze unassessed** | Asks Dax to analyze every open incident in view that has no recorded assessment, up to 50 at a time. Incidents assigned to a person or already handed off are skipped, and a message says how many. | Analyst, Admin | No |
| **Ask Dax to analyze** | Shown in the investigation chain when nothing is recorded yet. Asks Dax to analyze this incident. | Analyst, Admin | No |
| **Re-analyze** | Asks Dax to analyze this incident again, even if it is assigned to a person. Not available on closed incidents. | Analyst, Admin | No |
| **Assign to me** / **Unassign me** | Sets or clears you as the incident owner in Sentinel. An incident owned by a person leaves Dax's automatic queue until it is unassigned. | Analyst, Admin | No |
| **Assign to…** | Opens an email field; **Assign** sets that person as the owner in Sentinel. | Analyst, Admin | No |
| **Ask Atlas** | Opens the Atlas drawer focused on this incident. | Analyst, Admin (viewers can open the drawer but cannot send questions) | No |
| **Helpful** / **Needs review** | Records your opinion of Dax's assessment in Agent Audit. It does not change the verdict or retrain anything. Available once there is a recorded assessment; after you rate, both buttons are disabled for that incident. | Analyst, Admin | No |
| **Flag FP & request tuning** | Asks Marien to propose a tuning change for the rule that fired. Available when the recorded assessment is a false positive and the incident names its rule. The proposal must be reviewed before anything is deployed. | Analyst, Admin | Yes, the tuning proposal is reviewed separately |
| **Audit trail** | Opens the forensic audit trail for this incident: the tool calls and queries the agents ran. | Any role | No |
| **Open full workspace** | Opens the full-screen investigation workspace for this incident. | Any role | No |
| **Approve** / **Deny** | Votes on the pending request linked to this incident, using the same dialogs as the Approvals page. | Admin | This is the approval |
| **Close incident** | Opens the close dialog. You choose a Sentinel classification and add a comment; both are written to the incident in Sentinel. | Analyst, Admin | No, it is a direct human action |

See [How to close an incident](../how-to/close-an-incident.md) for the close dialog.

## Good to know

- The table holds up to 50 incidents per read, filtered in Sentinel by status, severity and time range before the cap. Narrow the filters if you hit the cap.
- If you clear every status checkbox, nothing loads and the page says "Select an incident status to load the queue."
- Verdicts and QA reviews come from what the agents recorded. "No assessment recorded" only means Dax has not written evidence for that incident; it does not mean nobody looked at it.
- If the list cannot be refreshed, the page keeps the last list it read and says it may be stale, with a **Retry** link.
- Dax only picks up incidents that are unassigned or owned by Dax. Assigning an incident to a person takes it out of his automatic queue.
- A person's claim and a person's close are final for the agents. Demitry does not review an incident a person owns; if someone claims it while he is reviewing, he leaves his verdict as a comment and changes nothing else. No agent reopens or reclassifies an incident a person closed.
- When Demitry confirms a false or benign positive on an open incident, he does not close it himself. He files a close request in [Approvals](approvals.md), and the incident is closed on his next run after an administrator approves it. Your tenant's policy rules can also send the incident to a person instead. An administrator can let some of these closes be approved automatically under Settings > Agent Policies > **What runs on its own**. See [Autonomy and approvals](../concepts/autonomy-and-approvals.md).
- When Dax called an incident a true positive and Demitry finds it benign, Demitry chooses whether the close should be Benign Positive (the rule fired correctly on real but expected or authorised activity) or False Positive (the rule's logic or data was wrong). His comment on the incident says which, and the close request always waits for a person. On a high-risk incident (for example credential access, privilege escalation, defense evasion, persistence, collection, exfiltration or impact) he does not propose a close: he escalates the incident to a person and it stays open.
- Demitry reviews by risk. Dax's benign calls on high-risk incidents, verdicts below 70% confidence, incidents Dax flagged and every High or Critical incident get a full senior review. Other verdicts are passed on without one, with a comment starting "Passed without a senior review". A benign verdict passed this way still becomes a close request that waits for a person. An attack verdict passed this way stays open for you to decide the response; Demitry files no response request for it.
- If the AI service is unavailable while Dax investigates, the incident goes back to his queue instead of being escalated, and Dax comments on it when he investigates it again.
- Dax, Demitry and the other agents know which log sources your workspace ingests (the same summary as the [Data connectors](data-connectors.md) page). When evidence is missing because a source is stale or not connected, they treat it as missing data, not as proof the activity did not happen.
- When Demitry escalates an incident for human review, the console also sends a "Needs a person" notification through the channels your administrator set up. See [How to configure notifications](../how-to/configure-notifications.md).
- **Not similar?** on a similar case marks it in your current view only. It is not saved.
- Response actions (isolating a host, disabling an account) are never run from this page. They go through [Approvals](approvals.md).
- Agent names shown on this page follow your Settings > Agent appearance choices, so they may differ from the default names used here.

## Related

- [How to triage an incident](../how-to/triage-an-incident.md)
- [How to close an incident](../how-to/close-an-incident.md)
- [How to approve or deny an action](../how-to/approve-or-deny-an-action.md)
- [Approvals](approvals.md)
- [Agent Audit](agent-audit.md)
- [Atlas copilot](atlas-copilot.md)
- [The agents](../concepts/the-agents.md)
