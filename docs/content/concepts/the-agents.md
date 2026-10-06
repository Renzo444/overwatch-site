---
title: The agents
status: current
reviewed: 2026-10-05
---

# The agents

Overwatch Console has eight agents. Each one owns one kind of SOC work. This page explains what each agent does, what starts it, where you see its results, and what it may do on its own versus what needs a person.

## How agents are started

Agents start in one of two ways:

- **On request**: a person clicks a run button (on the Agents page, the Incidents page, the Live Feed or the Detection Library). Running an agent needs the Analyst or Admin role unless noted.
- **On a schedule**: a background agent worker runs alongside Overwatch Console and calls the agents on a timer. It only runs an agent when that agent's switch (or Dax's autonomy level) is on for your tenant. An admin sets these on the Agents page or under Settings > Agent Policies. See [Autonomy and approvals](autonomy-and-approvals.md).

A switch being on does not prove the worker is running. Check **SLA & health** on the Agents page for the worker heartbeat, and Agent Audit for what was actually recorded.

Every agent action is recorded and visible in [Agent Audit](../features/agent-audit.md) and in the agent's **Outputs** tab on the [Agents](../features/agents.md) page.

## Dax: incident triage

**What it does.** Dax investigates open Microsoft Sentinel incidents. It runs read-only KQL queries, looks at entities and similar past incidents, and records a verdict (true positive, false positive, benign positive or needs investigation), a confidence score and a written analysis. It can ask Caleb to look at a suspicious file or hash, which pauses the incident with a sandbox label.

**What starts it.**
- On request: **Analyze**, **Analyze all queued** or **Analyze now** in Dax's workspace, or **Analyze unassessed** on the Incidents page.
- On a schedule: when Dax's autonomy level is 1, 2 or 3, the worker runs Dax about every 30 seconds on eligible incidents (open, unassigned or owned by Dax, and not already triaged or handed off). At level 0 Dax never runs on a schedule.

**What it produces.** A comment on the Sentinel incident with Dax's assessment, an investigation chain (steps, queries, reasoning), and an output on the Agents page. At levels 1 to 3, Dax also assigns the incident to itself and labels it for Demitry's QA. At level 0, a run you start only adds the comment and does not hand the incident to Demitry.

**Alone vs approval.** Dax does not close incidents. If Dax tries a disruptive tool during an investigation, the call is blocked, and the incident is labelled for senior QA and human review with a comment explaining why. Response actions only happen through Approvals.

## Demitry: quality review

**What it does.** Demitry re-checks Dax's work. It picks one incident per run (incidents waiting for QA first, then recently closed incidents Dax handled), runs its own queries and records one of: confirm true positive, confirm false positive, override to true positive, override to false positive, or escalate to a human.

**What starts it.**
- On request: **Run QA now** in Demitry's workspace.
- On a schedule: when Demitry's switch is on, about every 5 minutes.

**What it produces.**
- Confirmed or overridden false or benign positive: Demitry closes the incident in Sentinel with Dax's classification, unless a policy rule requires approval or denies closure. In that case it escalates instead.
- Confirmed or overridden true positive: the incident stays open and Demitry files up to five high-risk response requests in Approvals ("Disable account …" or "Isolate endpoint (Full) …") for targets its queries observed, or a "Select a response for confirmed threat" request when it found no specific target.
- Escalate: the incident stays open, labelled for human review, with Demitry's reasoning as a comment.
- QA decisions appear in Demitry's workspace (QA reviews list and tiles) and on the incident.

**Alone vs approval.** Demitry may close confirmed false and benign positives on its own when your policy rules allow it. It never runs a response action; those wait in [Approvals](../features/approvals.md).

## Marien: detection tuning

**What it does.** Marien looks for the analytics rule producing the most false positives, studies the closed false-positive incidents and live data, and proposes a tuned query (for example excluding a verified benign account). A proposal whose exclusions do not match the false-positive evidence is blocked and saved as needing investigation. After repeated tuning failures on a rule, a circuit breaker stops Marien retrying that rule until an admin clears it.

**What starts it.**
- On request: **Refresh recommendations** in Marien's workspace, or **Ask Marien to review** from a backtest in the Detection Library.
- On a schedule: when Marien's switch is on, about every 10 minutes. Separately, the worker checks the effect of already-deployed tunings about every 15 minutes; this only reads Sentinel.

**What it produces.** Tuning proposals with reasoning, a query diff, the recorded false-positive count and attribution, listed in Marien's workspace.

**Alone vs approval.** By default a proposal waits for an admin: attest known positives, run the read-only backtest, then **Approve & deploy** (a confirmation dialog, not an Approvals request). If an admin turns on **tuning auto-approve** on the Approvals page, Marien deploys its proposals to Sentinel without review.

## Renzo: detection engineering

**What it does.** Renzo turns threat intelligence into draft detection rules (KQL mapped to MITRE ATT&CK), tailored to your industry, and tests queries against your workspace tables.

**What starts it.**
- On request: **Generate proposal** (from an article URL) or **Run research cycle** in Renzo's workspace, **Generate detection** on the Live Feed, or **Send to Renzo as detection** from an Orion hunt (admin).
- On a schedule: when Renzo's switch is on, a research cycle about every 10 minutes, limited by a daily allowance (3 drafts per day unless your configuration says otherwise). When **Automatic threat-intelligence ingestion** is on (Settings > Agent Policies), the worker also reads the feeds about every 2 hours, scores new relevant articles, and adds those scoring 80 or higher to the Detection Library as Auto-ingested drafts.

**What it produces.** Draft detections in the Detection Library and in Renzo's **Generated detections** list.

**Alone vs approval.** Renzo never deploys. Every draft needs QA (**Send to QA**) and an admin's deployment through Maxwell.

## Orion: threat hunting

**What it does.** Orion builds hunt hypotheses from threat intelligence and your detection library, prioritising techniques you have not hunted yet, and runs read-only KQL hunts in your workspace. It records the hypothesis, query, hit count and reasoning. You can also paste an article URL to save a hunt proposal for review.

**What starts it.**
- On request: **Run proactive hunt**, **Execute hunt**, **Retry hunt** or **Ingest intel** in Orion's workspace, or **Ask Orion to hunt** in the Detection Library.
- On a schedule: when Orion's switch is on, about every 10 minutes.
- Daily limits: 10 scheduled hunts and 20 requested hunts per day.

**What it produces.** Hunt records in Orion's **Recorded threat hunts** list (with hits, verified zero hits, proposed or failed), also used by Relationships and the Detection Library.

**Alone vs approval.** Orion only reads. It does not change incidents or rules. Turning a hunt into a detection goes through Renzo, QA and an admin deployment.

## Caleb: malware analysis

**What it does.** Caleb handles suspicious files and hashes.
- Scheduled hash lookups: when Dax asks for sandbox analysis, Caleb looks up the hash reputation (this needs a VirusTotal key under Settings > Threat Intel), adds the result as an incident comment, and labels the incident for Dax to look at again.
- Detonation lab: an admin uploads a sample, Caleb provisions a sandbox VM in your Azure subscription, runs the analysis and writes a report.

**What starts it.**
- On a schedule: when **Caleb scheduled hash lookups** is on, about every 2 minutes. This does not enable sandbox execution.
- On request: the **Detonation lab** in Caleb's workspace (admin only).

**What it produces.** Incident comments with hash reputation, and sandbox reports listed under **Saved investigations & sessions**.

**Alone vs approval.** Lookups and reports change nothing in your environment beyond incident comments and labels. Sandbox provisioning and cleanup are admin actions.

## Maxwell: deployment and response

**What it does.** Maxwell deploys detection rules to Sentinel, recalls them, and carries out approved response actions (such as isolating an endpoint or disabling an account).

**What starts it.** Only people. Maxwell has no schedule.
- **Review for deployment** (analyst or admin) runs the deployment QA review.
- **Approve & deploy** and **Recall rule** (admin) deploy or delete a rule after a confirmation dialog.
- On the Approvals page, an admin uses the **Run the approved response** section of an approved request to carry out the response action.

**What it produces.** Deployed or recalled Sentinel rules (shown in Maxwell's **Deployment queue**), and response results recorded on the approval.

**Alone vs approval.** Nothing. Rule deployment needs a current passed review and an admin's confirmation; the server re-checks the review and query hash. Response actions need an approved request in Approvals, and approval, expiry, target and policy are re-checked when the response runs.

## Atlas: SOC copilot

**What it does.** Atlas answers questions in a chat drawer. It hands data questions to Dax, Demitry or Orion (read-only queries) and reads records owned by Renzo, Marien and Caleb, then explains the results.

**What starts it.** Only people, by asking a question. No schedule.

**What it produces.** Answers in the drawer, which you can pin to an incident's case notes, and an audit record of each question.

**Alone vs approval.** Atlas cannot approve, deny or run anything. An admin can ask it to file an Approvals request; approving that request records the decision but does not run the action. See [Atlas copilot](../features/atlas-copilot.md).

## Related

- [Agents](../features/agents.md)
- [Autonomy and approvals](autonomy-and-approvals.md)
- [Roles and permissions](roles-and-permissions.md)
- [Approvals](../features/approvals.md)
- [Agent Audit](../features/agent-audit.md)
- [How to run an agent](../how-to/run-an-agent.md)
