---
title: Agents
status: current
reviewed: 2026-10-05
---

# Agents

The Agents page lists the eight Overwatch Console agents and opens a workspace for each one. Use it to run an agent on request, read what each agent recorded, and (as an administrator) switch an agent's scheduled work on or off.

## Where to find it

- Sidebar: **Agents** group > **Agents**.
- Command palette: type an agent's name and pick the entry (for example "Dax · Incident triage") to open that agent's workspace. Picking Atlas opens the Atlas copilot instead.
- Other pages link here: hunts opened from the Detection Library or Relationships open in Orion's workspace, and Metrics & Health can open an agent.
- The page remembers the agent you last had open in this browser.

If an administrator renamed the agents under Settings > Agent appearance, the page shows those names. This guide uses the default names.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | See the roster, each workspace, recorded outputs and permissions. Mark outputs read or unread for yourself. Open SLA & health and Autonomy readiness. Run buttons are disabled. |
| Analyst | Everything a viewer can, plus run agents on request (Dax, Demitry, Marien, Orion, Renzo), record Helpful or Needs review feedback on QA decisions, ingest articles, execute or discard hunts, and send rules to QA or deployment review. |
| Admin | Everything an analyst can, plus change autonomy switches and Dax's autonomy level, set the tenant industry, approve and deploy tuning or rules, reject tuning proposals, recall rules, clear a tuning circuit breaker, use Caleb's detonation lab, edit tool permissions, and send a hunt to Renzo as a detection. |

The server checks every action. If your role is not allowed, the button is disabled or the action fails with a permission message. See [Roles and permissions](../concepts/roles-and-permissions.md).

## What you see

### Roster

The page header reads "Eight specialists. Open one to see its workspace, outputs and controls." Each agent has a card with:

- Name and role (Incident triage, Quality review, Detection tuning, Threat hunting, Detection engineering, Deployment & response, Malware analysis, SOC copilot).
- The agent's latest recorded output from the last 7 days, or "No recorded output in the last 7 days."
- A callout when the latest run reported a problem.
- A status dot. Hover it to read its meaning: "Output in the last hour", "Latest run reported a problem", "No output in the last hour" or "No recorded output in the last 7 days".
- An unread badge with the number of that agent's outputs you have not read (a "+" means the 7-day snapshot was cut short).

Clicking a card opens that agent's workspace. Clicking the Atlas card opens the Atlas copilot.

A recorded output shows that the agent did something. The roster does not show whether the background worker that runs scheduled agents is running.

### Header buttons (roster)

- **SLA & health**: opens a section with platform checks, the tenant worker heartbeat, a resolution SLA sample and up to 100 recorded agent events from the last 24 hours.
- **Autonomy readiness**: opens a section that lists each agent's scheduled setting (Enabled, Disabled or a Dax level), a QA agreement comparison, and links: **Review investigation settings** (opens Dax's level picker for admins), **Review approvals** and **Open Agent Audit**. It states that shadow execution is not implemented.
- Notification history (bell button): the messages this page showed you in this browser session, newest first, up to 50, with **Clear all**.
- **Refresh**: reloads outputs, configuration, policies and tool permissions.

### Agent workspace

Opening an agent shows a breadcrumb (**Agents** / agent name), a summary row and three tabs.

The summary row has:

- An autonomy control. For Dax it reads "Autonomy ON" or "Autonomy OFF" with the level name. For Demitry, Marien, Orion, Renzo and Caleb it is an on/off switch. Maxwell and Atlas show "On demand". The small line under it shows the tenant level and the name of the custom policy that applies, if any.
- The agent's main button: **Analyze incident** (Dax), **Open QA review** (Demitry), **Refresh recommendations** (Marien), **Run proactive hunt** (Orion), **Ingest intel article** (Renzo), **Review deployments** (Maxwell), **Provision sandbox** (Caleb), **Open copilot** (Atlas).
- "Latest run reported a problem." with the message, when the newest output was a failure.

Tabs:

- **Workspace**: the agent's own tools (described below), and a collapsed **Operations** section that keeps earlier dashboards for that agent.
- **Outputs**: the agent's recorded outputs from the last 7 days. Filter with **All**, **Unread**, **Review & failures** and **Read**, or search ("Find a report or incident…"). Up to 50 matching outputs show at a time. Open one to see the recorded outcome, model confidence, review status, linked incident, the generated summary and the raw evidence. Buttons: **Open investigation**, **Agent Audit**, **Mark read** / **Mark unread**. At the bottom: **Mark visible read** and **Open in Agent Audit →**. Read state is yours alone; reading approves nothing.
- **Permissions**: what the agent is designed to do (**Can**) and not do (**Cannot**), plus the tools the tenant policy currently allows or denies. Admins also see **Edit tool permissions**.

### What each workspace contains

Every workspace has a record list on the left (filter chips, search, a time window of Any time, Last 24 hours, Last 7 days or Last 30 days) and the selected record's evidence on the right. Most records have **Open in Agent Audit**.

- **Dax**: an **Analyze an incident** panel with an incident picker, **Analyze** and **Analyze all queued**. The **Triage runs** list shows loaded Sentinel incidents (up to 50, using the current queue filters) with chips **All**, **Assessed**, **No assessment**, **Review & failures**. The detail shows Verdict, Confidence, QA and either the autonomy level, the review state or a pending response approval, plus the investigation steps. Buttons: **Open incident**, **Analyze now** (unassessed incidents), and **Review approval** when a response request is pending, otherwise **Open in Agent Audit**.
- **Demitry**: a **QA review** panel with **Run QA now**, four tiles for the last 7 days (Agreement, Override rate, Override direction, Avg confidence) and a **QA reviews** list with chips **All**, **Agreements**, **Overrides**. The detail shows Demitry's reasoning, both agents' decisions and **Human-verified: Unavailable**. Buttons: **Open incident**, **Mark helpful**, **Needs review**, **Open in Agent Audit**. Agreement is Demitry's own decision code, not measured accuracy.
- **Marien**: a **Tuning proposals** list with chips **All**, **Needs replay**, **Queued for review**, **Blocked**. A proposal shows Marien's reasoning, the recorded false-positive count, attribution, confidence and a query diff (with **Show word-level changes**), then three steps: **Attest** known-positive cases, **Run again** (read-only backtest) and **Approve & deploy**. Also **Reject proposal**. A blocked rule (circuit breaker after repeated tuning failures) offers **Clear circuit breaker**.
- **Orion**: a **Proactive OSINT ingestion** panel (paste a URL, **Ingest intel**) and a **Recorded threat hunts** list with chips **All**, **Has hits**, **Verified zero hits**, **Proposed**, **Failed**, plus a tactic filter. Depending on the hunt: **Execute hunt**, **Discard**, **Retry hunt**, **Review provider access**, **Open result**, **Send to Renzo as detection**, **Copy KQL**.
- **Renzo**: a **Detection from threat intel** panel (paste a URL, an **Industry** selector, **Generate proposal**, and **Run research cycle**). The note shows the daily allowance used. The **Generated detections** list (undeployed library entries) has chips **All**, **In QA**, **Draft**. Buttons: **Send to QA**, **Open in Detection Library**, **Copy KQL**.
- **Maxwell**: a **Table inventory** panel (**Refresh inventory**; reviews are limited to 3 per minute) and a **Deployment queue** with chips **All**, **Pending**, **Deployed**. Pending rules offer **Review for deployment** or, after a passed review, **Approve & deploy**. Deployed rules offer **Recall rule** and **Check Sentinel**.
- **Caleb**: a **Detonation lab** (select a sample, **Analysis mode** Automated or Interactive, **VM image**, **Launch sandbox**, **Request cleanup**) with console output, and a **Saved investigations & sessions** list with chips **All**, **Investigations**, **Sandbox sessions**. Sessions offer **Check Azure**, **Delete resources** (after a check) and **Load into lab**. The lab and the saved lists are for administrators only.
- **Atlas**: an **Ask Atlas** panel with **Open copilot**, and a **Copilot sessions** list (completed and failed Atlas answers from the last 7 days) with chips **All**, **Completed**, **Failed**.

## What you can do

| Action | Who | What happens | Approval? |
|--------|-----|--------------|-----------|
| **Analyze**, **Analyze all queued**, **Analyze now** (Dax) | Analyst, Admin | Dax investigates the incident (or every eligible queued incident) and records its assessment. | No. Dax cannot close incidents or run response actions. |
| **Run QA now** (Demitry) | Analyst, Admin | Demitry reviews one incident waiting for QA. It may close a confirmed false or benign positive (if policy allows), escalate to a human, or file response requests in Approvals. | Response actions always need approval. Closure follows your [policy rules](../concepts/autonomy-and-approvals.md). |
| **Mark helpful** / **Needs review** (Demitry) | Analyst, Admin | Records your opinion. Does not change the verdict. | No |
| **Refresh recommendations** (Marien) | Analyst, Admin | Reloads proposals and asks Marien to run a tuning poll. | No, unless tuning auto-approve is on (see Good to know). |
| **Attest** known positives (Marien) | Admin | Records event IDs a correct rule must still match. | No |
| Run the read-only backtest (Marien) | Admin | Replays the proposal against attested cases. | No |
| **Approve & deploy** (Marien) | Admin | After a confirmation, deploys the tuned query to Sentinel and records your approval. Needs a recorded replay. | Your confirmation is the approval. It does not go through the Approvals page. |
| **Reject proposal** (Marien) | Admin | Stores your reason (and optional note) with the tuning record. | No |
| **Clear circuit breaker** (Marien) | Admin | Resets the failure count so Marien can propose again next cycle. | No |
| **Run proactive hunt**, **Execute hunt**, **Retry hunt**, **Discard**, **Ingest intel** (Orion) | Analyst, Admin | Starts a read-only hunt, or saves or discards a hunt proposal. | No |
| **Send to Renzo as detection** (Orion) | Admin | Renzo drafts a detection from the hunt. The draft is added to the library and still needs QA and deployment approval. | No |
| **Generate proposal**, **Run research cycle** (Renzo) | Analyst, Admin | Renzo drafts detections. Nothing is deployed. Research cycles count against a daily allowance. | No |
| **Industry** (Renzo) | Admin | Sets the tenant industry used by Renzo's scheduled research. | No |
| **Send to QA** (Renzo), **Review for deployment** (Maxwell) | Analyst, Admin | Runs the deployment QA review. Limited to 3 reviews per minute. | No |
| **Approve & deploy** (Maxwell) | Admin | After a confirmation, deploys the rule to Sentinel. The server re-checks the passed review and the query hash. | Your confirmation is the approval. It does not go through the Approvals page. |
| **Recall rule** (Maxwell) | Admin | After a confirmation, deletes the rule from Sentinel. | Your confirmation only. Not through Approvals. |
| **Check Sentinel** (Maxwell) | All roles | Reads the rule inventory from Sentinel. | No |
| Detonation lab actions (Caleb) | Admin | Provisions a sandbox in Azure, uploads a sample, runs analysis and requests cleanup. | No |
| Autonomy switch or level | Admin | Saves the agent's scheduled setting for the whole tenant. Dax level 2 or 3, and returning to Manual, ask for confirmation. | No. See [Set agent autonomy](../how-to/set-agent-autonomy.md). |
| **Edit tool permissions** | Admin | Allows or denies individual agent tools for this tenant after a review step. | No |
| **Mark read**, **Mark visible read** | All roles | Changes your own read state. | No |

## Good to know

- Agents with scheduled work only run on a schedule when their switch (or Dax's level) is on and the background agent worker is running. The autonomy control shows configuration, not that a worker is running.
- Maxwell and Atlas never run on a schedule.
- "Analyze all queued" lets the server choose: open incidents that are unassigned or owned by Dax and not already handed off or triaged.
- When a run is accepted, results appear only after the agent records them. "Accepted" is not "completed".
- When tuning auto-approve is turned on (Approvals page, admin), Marien deploys its tuning proposals without human review. It is off unless an admin turns it on.
- Rule deploys and recalls from the Maxwell and Marien workspaces are direct admin actions with a confirmation dialog. Response actions (isolate an endpoint, disable an account) always go through [Approvals](approvals.md).
- If a read fails, the page says so (for example "Recorded outputs unavailable" or "Records unavailable") with a **Retry** link, instead of showing an empty list.
- Caleb's lists show "Saved investigations and sandbox sessions are visible to administrators only." for other roles. The FLARE VM image is listed but disabled ("image config required").
- Notification history is kept for this browser session only.

## Related

- [The agents](../concepts/the-agents.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [How to run an agent](../how-to/run-an-agent.md)
- [How to set agent autonomy](../how-to/set-agent-autonomy.md)
- [How to review agent decisions](../how-to/review-agent-decisions.md)
- [Agent Audit](agent-audit.md)
- [Atlas copilot](atlas-copilot.md)
- [Approvals](approvals.md)
- [How to tune a noisy rule](../how-to/tune-a-noisy-rule.md)
- [How to run a threat hunt](../how-to/run-a-threat-hunt.md)
- [How to deploy or recall a rule](../how-to/deploy-or-recall-a-rule.md)
