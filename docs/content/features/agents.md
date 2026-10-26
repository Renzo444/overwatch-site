---
title: Agents
status: current
reviewed: 2026-10-26
---

# Agents

The Agents page lists the eight Overwatch Console agents and opens a workspace for each one. Use it to run an agent on request, read what each agent recorded, review and deploy what the agents propose, and (as an administrator) switch an agent's scheduled work on or off.

## Where to find it

- Sidebar: **Agents** group > **Agents**.
- Command palette: type an agent's name and pick the entry (for example "Dax · Incident triage") to open that agent's workspace. Picking Atlas opens the Atlas copilot instead.
- Other pages link here: hunts opened from the Detection Library or Relationships open in Orion's workspace, and Metrics & Health can open an agent.
- The page remembers the agent you last had open in this browser.

If an administrator renamed the agents under Settings > Agent appearance, the page shows those names. This guide uses the default names.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | See the roster, each workspace, recorded outputs and permissions. Mark outputs read or unread for yourself. Open SLA & health and Autonomy readiness. Check Sentinel for deployed rules. Run buttons are disabled. |
| Analyst | Everything a viewer can, plus run agents on request (Dax, Demitry, Marien, Orion, Renzo), record Helpful or Needs review feedback on QA decisions, ingest articles, execute or discard hunts, send a hunt to Renzo, run Marien's backtests, and send rules to QA or deployment review. |
| Admin | Everything an analyst can, plus switch agents' schedules, set the tenant industry, attest known-positive cases, approve and deploy tuning or rules, reject or dismiss tuning proposals, roll back and recall rules, clear a tuning circuit breaker, use Caleb's detonation lab and edit tool permissions. |

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
- **Autonomy readiness**: opens a section that lists the older organization-wide operating mode (and which mode is in force now; the per-action choices are in Settings > Agent Policies > **What runs on its own**), each agent's scheduled setting (Enabled or Disabled), a QA agreement comparison, and links: **Review investigation settings** (opens Dax's workspace), **Review approvals** and **Open Agent Audit**. It states that shadow execution is not implemented.
- Notification history (bell button): the messages this page showed you in this browser session, newest first, up to 50, with **Clear all**.
- **Refresh**: reloads outputs, configuration, policies and tool permissions.

### Agent workspace

Opening an agent shows a breadcrumb (**Agents** / agent name), a summary row and three tabs.

The summary row has:

- An autonomy switch for Dax, Demitry, Marien, Orion, Renzo and Caleb. It reads "Autonomy ON" or "Autonomy OFF" and turns that agent's scheduled work on or off. Maxwell and Atlas show "On demand". The small line under it shows whether that agent's own action is in "Approval mode" or "Full auto mode" right now, from Settings > Agent Policies > **What runs on its own**, and the name of the custom policy that applies, if any. Only Demitry's closes can show Full auto there; the other agents with a switch always read Approval mode. Maxwell's card reads "Runs only when requested" even when his deploys are set to Full auto.
- The agent's main button: **Analyze incident** (Dax), **Open QA review** (Demitry), **Refresh recommendations** (Marien), **Run proactive hunt** (Orion), **Ingest intel article** (Renzo), **Review deployments** (Maxwell), **Provision sandbox** (Caleb), **Open copilot** (Atlas).
- "Latest run reported a problem." with the message, when the newest output was a failure.

Tabs:

- **Workspace**: the agent's own tools (described below).
- **Outputs**: the agent's recorded outputs from the last 7 days. Filter with **All**, **Unread**, **Review & failures** and **Read**, or search ("Find a report or incident…"). Up to 50 matching outputs show at a time. Open one to see the recorded outcome, model confidence, review status, linked incident, the generated summary and the raw evidence. Buttons: **Open investigation**, **Agent Audit**, **Mark read** / **Mark unread**. At the bottom: **Mark visible read** and **Open in Agent Audit →**. Read state is yours alone; reading approves nothing.
- **Permissions**: what the agent is designed to do (**Can**) and not do (**Cannot**), plus the tools the tenant policy currently allows or denies. Admins also see **Edit tool permissions**.

### What each workspace contains

Every workspace has a record list on the left (filter chips, search, a time window of Any time, Last 24 hours, Last 7 days or Last 30 days) and the selected record's evidence on the right. Most records have **Open in Agent Audit**.

- **Dax**: an **Analyze an incident** panel with an incident picker, **Analyze** and **Analyze all queued**, and a note saying whether Dax triages new incidents on schedule or only when someone asks. The **Triage runs** list shows loaded Sentinel incidents (up to 50, using the current queue filters) with chips **All**, **Assessed**, **No assessment**, **Review & failures**. The detail shows Verdict, Confidence, QA and either the review state, a pending response approval, or (for an unassessed incident) whether triage is Scheduled or On request, plus the investigation steps. Buttons: **Open incident**, **Analyze now** (unassessed incidents), and **Review approval** when a response request is pending, otherwise **Open in Agent Audit**.
- **Demitry**: a **QA review** panel with **Run QA now**, four tiles for the last 7 days (Agreement, Override rate, Override direction, Avg confidence) and a **QA reviews** list with chips **All**, **Agreements**, **Overrides**. The detail shows Demitry's reasoning, both agents' decisions and **Human-verified: Unavailable**. Buttons: **Open incident**, **Mark helpful**, **Needs review**, **Open in Agent Audit**. Agreement is Demitry's own decision code, not measured accuracy. For measured accuracy from your team's decisions, see **Agent accuracy** on the [Approvals](approvals.md) page.
- **Marien**: a **Tuning proposals** list with chips **All**, **Needs replay**, **Queued for review**, **Detection changes**, **Blocked**. A proposal shows Marien's reasoning, the recorded false-positive count, attribution, confidence, estimated alerts suppressed and a query diff (with **Show word-level changes**). A detection change instead explains the coverage gap it closes and the rule's false-positive budget. Below that, **Backtest before deployment** walks the steps: **1. Known-positive case** (pick a reviewed case or **Attest a case**), **2. Run read-only backtest** (**Run backtest**), for a detection change **3. Run 30-day volume backtest** (**Run volume backtest**), then **Approve & deploy**. Every step's button stays visible; a step that cannot run yet is disabled and says why. Also **Reject proposal**. A blocked rule (circuit breaker after repeated tuning failures) offers **Clear circuit breaker**. A **Held for a person** section lists proposals Marien held back, with **Dismiss** and **Send back for review**.
- **Orion**: a **Proactive OSINT ingestion** panel (paste a URL, **Ingest intel**) and a **Recorded threat hunts** list with chips **All**, **Has hits**, **Verified zero hits**, **Proposed**, **Failed**, plus a tactic filter. Each hunt is built on one threat-intel advisory. When none of the tables that would record the behaviour has data in your workspace, Orion does not run the query: the hunt shows "Not run · log source missing" (listed under **All** only) with the missing source, so you know which log source to connect. A hunt with results shows Orion's reasoning, its **Verdict** on the rows (with confidence and the rows it cited), and the **Incident** it opened in Sentinel for a finding. Depending on the hunt: **Execute hunt**, **Discard**, **Retry hunt**, **Review provider access**, **Open result**, **Send to Renzo as detection** (marked "(recommended)" for a finding), **Copy KQL**.
- **Renzo**: a **Detection from threat intel** panel (paste a URL, an **Industry** selector, **Generate proposal**, and **Run research cycle**). The note shows the daily allowance used. The **Generated detections** list (undeployed library entries) has chips **All**, **In QA**, **Draft**. The detail shows the backtest Renzo ran when drafting, when recorded. Buttons: **Send to QA**, **Open in Detection Library**, **Copy KQL**.
- **Maxwell**: a **Table inventory** panel (**Refresh inventory**; reviews are limited to 3 per minute) and a **Deployment queue** with chips **All**, **Pending**, **Deployed**. Pending rules say what they are waiting on and offer **Review for deployment** (or **Review again**) or, after a passed review, **Approve & deploy**. A passed review is valid for one hour. Deployed rules offer **Recall rule**, **Check Sentinel** and, for admins, **Roll back** to an earlier saved version.
- **Caleb**: a **Detonation lab** (select a sample, **Analysis mode** Automated or Interactive, **VM image**, **Launch sandbox**, **Request cleanup**) with console output, and a **Saved investigations & sessions** list with chips **All**, **Investigations**, **Sandbox sessions**. Sessions offer **Check Azure**, **Delete resources** (after a check) and **Load into lab**. The lab and the saved lists are for administrators only.
- **Atlas**: an **Ask Atlas** panel with **Open copilot**, and a **Copilot sessions** list (completed and failed Atlas answers from the last 7 days) with chips **All**, **Completed**, **Failed**.

## What you can do

| Action | Who | What happens | Approval? |
|--------|-----|--------------|-----------|
| **Analyze**, **Analyze all queued**, **Analyze now** (Dax) | Analyst, Admin | Dax investigates the incident (or every eligible queued incident) and records its assessment. With Dax's schedule switch on, the incident is also handed to Demitry. | No. Dax cannot close incidents or run response actions. |
| **Run QA now** (Demitry) | Analyst, Admin | Demitry first carries out closes people approved since its last run, then reviews one incident Dax finished. It may file a close request, escalate to a human, or file response requests in Approvals. A verdict that does not need a senior review (see [Autonomy and approvals](../concepts/autonomy-and-approvals.md)) is passed on without one: a benign call still becomes a close request for a person. On a high-risk incident Dax called a true positive, Demitry escalates to a person rather than proposing a close. | Closes and response actions wait in Approvals. See [Autonomy and approvals](../concepts/autonomy-and-approvals.md). |
| **Mark helpful** / **Needs review** (Demitry) | Analyst, Admin | Records your opinion. Does not change the verdict. | No |
| **Refresh recommendations** (Marien) | Analyst, Admin | Reloads proposals and asks Marien to run a tuning poll. | No. Nothing is deployed. |
| **Attest a case** (Marien) | Admin | Records closed true-positive incidents of this rule and the event IDs a correct rule must still match. The server checks the incidents against Sentinel. | No |
| **Run backtest**, **Run volume backtest** (Marien) | Analyst, Admin | Read-only replays of the proposal: against the attested case, and for a detection change, alert counts per day over 30 days against the false-positive budget. | No |
| **Approve & deploy** (Marien) | Admin | After a confirmation, deploys the tuned query to Sentinel and records your approval. Needs a passing backtest from the last 24 hours; a detection change also needs a fresh volume backtest, and a written reason when it is over budget. | Your confirmation is the approval. It does not go through the Approvals page. |
| **Reject proposal** (Marien) | Admin | Stores your reason (and optional note) with the tuning record. Marien cites it on later proposals for the rule when you leave "Apply to similar future cases" on. | No |
| **Dismiss**, **Send back for review** (Marien, held proposals) | Admin | Dismiss records your name and the time. Send back puts the proposal in the review list, where it still needs a backtest and approval. | No |
| **Clear circuit breaker** (Marien) | Admin | Resets the failure count so Marien can propose again next cycle. | No |
| **Run proactive hunt**, **Execute hunt**, **Retry hunt**, **Discard**, **Ingest intel** (Orion) | Analyst, Admin | Starts a read-only hunt, or saves or discards a hunt proposal. A finding opens a Sentinel incident. | No |
| **Send to Renzo as detection** (Orion) | Analyst, Admin | Renzo drafts a detection from the hunt, or says why it did not. The draft is added to the library and still needs QA and deployment approval. | No |
| **Generate proposal**, **Run research cycle** (Renzo) | Analyst, Admin | Renzo drafts detections. Nothing is deployed. Research cycles count against a daily allowance. | No |
| **Industry** (Renzo) | Admin | Sets the tenant industry used by Renzo's scheduled research. | No |
| **Send to QA** (Renzo), **Review for deployment** (Maxwell) | Analyst, Admin | Runs the deployment review. Limited to 3 reviews per minute. | No |
| **Approve & deploy** (Maxwell) | Admin | After a confirmation, deploys the rule to Sentinel. The server re-checks the passed review and the query hash. | Your confirmation is the approval. It does not go through the Approvals page. |
| **Roll back** (Maxwell) | Admin | Shows the saved versions and the query change, then restores the version you pick after **Roll back to vN**. If the live rule was edited outside Overwatch Console, it shows the live query and asks again. | Your confirmation only. Not through Approvals. |
| **Recall rule** (Maxwell) | Admin | After a confirmation, deletes the rule from Sentinel. Only rules Overwatch Console deployed can be recalled. | Your confirmation only. Not through Approvals. |
| **Check Sentinel** (Maxwell) | All roles | Reads the rule inventory from Sentinel. | No |
| Detonation lab actions (Caleb) | Admin | Provisions a sandbox in Azure, uploads a sample, runs analysis and requests cleanup. | No |
| Autonomy switch | Admin | Saves the agent's scheduled setting for the whole tenant. | No. See [Set agent autonomy](../how-to/set-agent-autonomy.md). |
| **Edit tool permissions** | Admin | Allows or denies individual agent tools for this tenant after a review step. | No |
| **Mark read**, **Mark visible read** | All roles | Changes your own read state. | No |

## Good to know

- Agents run on a schedule only when **Run agents on a schedule for this workspace** is on (Settings > Agent Policies), the agent's own switch is on, and the background agent worker is running. The autonomy switch shows configuration, not that a worker is running.
- Atlas never runs on a schedule. Maxwell has no switch, but when **Maxwell deploys a Renzo detection** is in Full auto (Settings > Agent Policies > **What runs on its own**) and Renzo's switch is on, the worker has Maxwell deploy Renzo drafts that pass every review check, up to the daily limit. He keeps room for your own rules under Sentinel's 512-rule limit, stays within **Rules Maxwell may keep**, and asks in Approvals before deploying a draft that overlaps a live rule or retiring one of his rules.
- What happens after a verdict depends on what runs on its own (Settings > Agent Policies), not on Dax's switch. See [Autonomy and approvals](../concepts/autonomy-and-approvals.md).
- No agent takes over or closes an incident a person owns.
- If the AI service is unavailable while Dax investigates, the incident goes back to his queue instead of to a person. When he picks it up again he notes on the incident that the earlier run was stopped for that reason.
- "Analyze all queued" lets the server choose: open incidents that are unassigned or owned by Dax and not already handed off, triaged or owned by a person.
- When a run is accepted, results appear only after the agent records them. "Accepted" is not "completed".
- Marien's tuning proposals always wait for an admin. Tuning auto-approve can no longer be turned on.
- Rule deploys, rollbacks and recalls from the Maxwell and Marien workspaces are direct admin actions with a confirmation dialog. Maxwell's own deploys under Full auto are recorded in Approvals History instead. Response actions (isolate an endpoint, disable an account) always go through [Approvals](approvals.md).
- If a read fails, the page says so (for example "Recorded outputs unavailable" or "Records unavailable") with a **Retry** link, instead of showing an empty list.
- Caleb's lists show "Saved investigations and sandbox sessions are visible to administrators only." for other roles. The FLARE VM image is listed but disabled ("image config required").
- Notification history is kept for this browser session only. Notifications to Slack, Teams or a webhook are set up under Settings > Notifications.

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
