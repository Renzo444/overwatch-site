---
title: How to run an agent
status: current
reviewed: 2026-10-19
---

# How to run an agent

Start an agent on request from its workspace on the Agents page, instead of waiting for its schedule.

## Before you start

- You need the **Analyst** or **Admin** role. Viewers see the buttons disabled.
- Caleb's detonation lab needs the **Admin** role.
- Dax and Demitry read your Sentinel incidents, so your tenant's Sentinel connection must be set up.
- Dax and Demitry skip incidents a person owns. To have an agent look at one, unassign it first.

## Steps

1. In the sidebar, open **Agents** > **Agents**.
2. Click the agent's card to open its workspace.
3. Click the agent's main button in the summary row, or use the workspace controls:
   - **Dax**: pick an incident in the **Analyze an incident** panel and click **Analyze**, or click **Analyze all queued** to let the server pick every eligible queued incident. In the **Triage runs** list, an unassessed incident also has **Analyze now**.
   - **Demitry**: click **Run QA now**. Demitry first carries out closes people approved, then reviews one incident Dax has finished.
   - **Marien**: click **Refresh recommendations**. This reloads proposals and asks Marien for a new tuning poll.
   - **Orion**: click **Run proactive hunt**. To run a saved proposal or a failed hunt, select it in **Recorded threat hunts** and click **Execute hunt** or **Retry hunt**. To save a proposal from an article, paste the URL and click **Ingest intel**.
   - **Renzo**: paste an article URL and click **Generate proposal**, or click **Run research cycle**.
   - **Maxwell**: click **Review deployments**, select a pending rule and click **Review for deployment**.
   - **Caleb** (admin): click **Select a sample**, choose **Analysis mode** and **VM image**, then click **Launch sandbox**.
   - **Atlas**: click **Open copilot** and type your question. See [How to ask Atlas](ask-atlas.md).
4. Wait for the toast message. While a run is in progress the button shows "Analyzing…", "Reviewing…", "Refreshing…", "Hunting…" or "Researching…".
5. Open the **Outputs** tab, or the workspace list, to see the result once the agent records it.

## What happens next

- The server accepts the request and the agent works in the background. Acceptance is not completion; results appear when the agent records them.
- Every run is recorded in [Agent Audit](../features/agent-audit.md) and shows on the agent's roster card and **Outputs** tab.
- Dax adds its assessment as a comment on the Sentinel incident. When Dax's schedule switch is on, it also hands the incident to Demitry for QA. If a person claims the incident during the run, Dax only adds the comment.
- Demitry files a close request in [Approvals](../features/approvals.md) for a confirmed false or benign positive, escalates to a human, or files response requests. The close happens on Demitry's next run after a person approves it, or without a person when an admin has set **Demitry closes a false positive** to Full auto in Settings > Agent Policies. On a high-risk incident Dax called a true positive, Demitry escalates to a person instead of overturning it.
- Orion records the hunt and its verdict on the results. A malicious or suspicious finding opens a new Sentinel incident for Dax to triage. If your workspace has no data in any table that would record the behaviour, the hunt is recorded as "Not run · log source missing" and names the source to connect.
- Marien and Renzo produce proposals and drafts. Nothing is deployed by these runs. Renzo may finish a research cycle without a new conclusion; then nothing is saved.
- Maxwell's review records whether the rule may be deployed. Deploying is a separate admin step: **Approve & deploy**, within an hour of the passed review. If an admin has set Maxwell's deploys to Full auto, Maxwell also reviews and deploys Renzo's drafts on his schedule. See [How to deploy or recall a rule](deploy-or-recall-a-rule.md).

## If something goes wrong

- **The button is disabled with "Analysts and administrators can run …"**: your role is Viewer. Ask an admin.
- **"Your role cannot run this action."**: the server refused the request for your role.
- **"This rule has no KQL query, so there is nothing to review."** (Maxwell): draft the rule again from Renzo's workspace.
- **"The review did not pass: …"** (Maxwell): fix what the review names, then click **Review again**.
- **"Load a writable tenant workspace before generating detections."** (Renzo, Orion): the detection library did not load. Refresh the page.
- **"No detection was drafted."** (Renzo): the article did not support a behavioral detection.
- **"Renzo did not draft a detection: …"** (Orion): the hunt did not support a specific attacker behavior.
- **"Orion has reached today's limit of … hunts. Try again tomorrow."**: Orion runs at most 10 scheduled and 20 requested hunts per day, failed hunts included.
- **Renzo refuses a research cycle**: the daily allowance shown under the panel is used up for today (UTC).
- **"Investigation paused for a server restart; the incident goes back to the queue."** (Dax, in Agent Audit): the service restarted during the run. Dax releases the incident and picks it up again on a later run, or you can start it again.
- **"Latest run reported a problem."** on the workspace: open **Outputs** or Agent Audit to read the failure. If the AI service is refusing requests, the run stops and the refusal is recorded at most once an hour; retry once your provider access is restored.

## Related

- [Agents](../features/agents.md)
- [The agents](../concepts/the-agents.md)
- [How to triage an incident](triage-an-incident.md)
- [How to run a threat hunt](run-a-threat-hunt.md)
- [How to turn intel into a detection](turn-intel-into-a-detection.md)
- [How to review agent decisions](review-agent-decisions.md)
