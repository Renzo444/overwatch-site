---
title: How to run an agent
status: current
reviewed: 2026-10-05
---

# How to run an agent

Start an agent on request from its workspace on the Agents page, instead of waiting for its schedule.

## Before you start

- You need the **Analyst** or **Admin** role. Viewers see the buttons disabled.
- Caleb's detonation lab, and sending an Orion hunt to Renzo, need the **Admin** role.
- Dax and Demitry read your Sentinel incidents, so your tenant's Sentinel connection must be set up.

## Steps

1. In the sidebar, open **Agents** > **Agents**.
2. Click the agent's card to open its workspace.
3. Click the agent's main button in the summary row, or use the workspace controls:
   - **Dax**: pick an incident in the **Analyze an incident** panel and click **Analyze**, or click **Analyze all queued** to let the server pick every eligible queued incident. In the **Triage runs** list, an unassessed incident also has **Analyze now**.
   - **Demitry**: click **Run QA now**. Demitry reviews one incident per run.
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
- Dax adds its assessment as a comment on the Sentinel incident. At autonomy level 1 or higher it also hands the incident to Demitry for QA.
- Demitry may close a confirmed false or benign positive if your policy rules allow it, escalate to a human, or file response requests in [Approvals](../features/approvals.md).
- Marien, Renzo and Orion produce proposals, drafts and hunt records. Nothing is deployed by these runs, except that Marien deploys tuning on its own when tuning auto-approve is on.
- Maxwell's review records whether the rule may be deployed. Deploying is a separate admin step: **Approve & deploy**.

## If something goes wrong

- **The button is disabled with "Analysts and administrators can run …"**: your role is Viewer. Ask an admin.
- **"Your role cannot run this action."**: the server refused the request for your role.
- **"Can't review yet: no QA evidence or passing backtest is recorded for this rule."** (Maxwell): send the rule to QA from Renzo's workspace first.
- **"Load a writable tenant workspace before generating detections."** (Renzo, Orion): the detection library did not load. Refresh the page.
- **"No detection was drafted."** (Renzo): the article did not support a behavioral detection.
- **Orion reports the daily hunt limit**: Orion runs at most 10 scheduled and 20 requested hunts per day.
- **Renzo refuses a research cycle**: the daily allowance shown under the panel is used up for today (UTC).
- **"Latest run reported a problem."** on the workspace: open **Outputs** or Agent Audit to read the failure.

## Related

- [Agents](../features/agents.md)
- [The agents](../concepts/the-agents.md)
- [How to triage an incident](triage-an-incident.md)
- [How to run a threat hunt](run-a-threat-hunt.md)
- [How to turn intel into a detection](turn-intel-into-a-detection.md)
- [How to review agent decisions](review-agent-decisions.md)
