---
title: The agents
status: current
reviewed: 2026-10-19
---

# The agents

Overwatch Console has eight agents. Each one owns one kind of SOC work. This page explains what each agent does, what starts it, where you see its results, and what it may do on its own versus what needs a person.

## How agents are started

Agents start in one of two ways:

- **On request**: a person clicks a run button (on the Agents page, the Incidents page, the Live Feed or the Detection Library). Running an agent needs the Analyst or Admin role unless noted.
- **On a schedule**: a background agent worker calls the agents on a timer. It acts for your tenant only when an admin has turned on **Run agents on a schedule for this workspace** (Settings > Agent Policies), and then only for agents whose own switch is on. See [Autonomy and approvals](autonomy-and-approvals.md).

A switch being on does not prove the worker is running. Check **SLA & health** on the Agents page for the worker heartbeat, and Agent Audit for what was actually recorded.

What an agent may do without a person is set action by action under **What runs on its own** in Settings > Agent Policies: **Approval**, **Full auto** or **Scheduled** (approval during your staffed hours, full auto outside them). Everything starts in Approval. Only an admin can change these, and every change is recorded in the Audit Trail. Two actions can run on their own today: Demitry closing a false positive, and Maxwell deploying a Renzo detection. Marien's tunes, Demitry's overrides of Dax and containment always wait for a person. See [Autonomy and approvals](autonomy-and-approvals.md).

Every agent action is recorded and visible in [Agent Audit](../features/agent-audit.md) and in the agent's **Outputs** tab on the [Agents](../features/agents.md) page.

### What the agents know about your data

Dax, Demitry, Marien, Renzo and Orion read the same summary of what your workspace ingests that the [Data connectors](../features/data-connectors.md) page shows: each connector, its health and its tables, and the sources you marked there as kept outside this workspace. They treat an empty result from a stale, degraded or missing source as a gap in visibility, not as proof that nothing happened. Atlas can look the summary up when you ask about your log sources.

### Agents and incidents a person owns

Once a person owns an incident, no agent takes it over or closes it. Dax and Demitry skip incidents a person owns. If a person claims an incident while an agent is working on it, the agent's verdict is added as a comment and nothing else changes.

### When something goes wrong

- When an agent escalates an incident to a person (Dax's safeguards, or Demitry's escalation), a "Needs a person" notification is sent once per incident.
- When an agent keeps failing (three failed runs in a row, or two at least ten minutes apart), one "is not working" notification is sent with the last error, a reminder after a day if it is still failing, and a "working again" message on the first success.
- Dax and Demitry also notify on verdicts a person should see (a triaged High incident, a confirmed true positive) and when an investigation cannot finish.

These go to the destinations set under Settings > Notifications, if any. See [How to configure notifications](../how-to/configure-notifications.md).

Each failure is recorded once. When the AI service refuses requests (for example because credits ran out), the agents stop that run instead of retrying, and the refusal is recorded at most once an hour.

## Dax: incident triage

**What it does.** Dax investigates open Microsoft Sentinel incidents. It starts from the incident's own alert evidence, chooses each read-only KQL query to test the explanations still open (looking back up to 30 days), records why it ran each one, and records a verdict (true positive, false positive, benign positive or needs investigation), a confidence score and a written analysis. It can ask Caleb to look at a suspicious file or hash, which pauses the incident with a sandbox label; if nobody picks that up within 6 hours, Dax takes the incident back.

**What starts it.**
- On request: **Analyze**, **Analyze all queued** or **Analyze now** in Dax's workspace, or **Analyze unassessed** on the Incidents page.
- On a schedule: when Dax's switch is on, the worker runs Dax about every minute on eligible incidents (New and unassigned or owned by Dax, or Active and owned by Dax, and not already triaged, handed off, escalated or owned by a person). With the switch off Dax never runs on a schedule.

**What it produces.** A comment on the Sentinel incident with Dax's assessment, an investigation chain (steps, queries, reasons, reasoning), and an output on the Agents page. With the switch on, Dax also assigns the incident to itself and labels it for Demitry's QA. With the switch off, a run you start only adds the comment and marks the incident as triaged.

**Alone vs approval.** Dax does not close incidents. Safeguards route an incident to senior QA and human review when the verdict rests on queries that returned no rows, the confidence is low, the incident's threat severity is high, the report could not be read, or a disruptive tool was attempted. An investigation that fails repeatedly is labelled for a person. Response actions only happen through Approvals.

## Demitry: quality review

**What it does.** Demitry re-checks Dax's finished work, and only that: open incidents Dax labelled for QA, and recently closed incidents Dax closed itself. It never reviews an incident a person closed, an escalated incident, or one a person owns. It picks one incident per run, runs its own queries (recording why it ran each one), and records one of: confirm true positive, confirm false positive, override to true positive, override to false positive, or escalate to a human. Whether a decision is a confirmation or an override is measured against Dax's recorded verdict.

**What starts it.**
- On request: **Run QA now** in Demitry's workspace.
- On a schedule: when Demitry's switch is on, about every 5 minutes.

**What it produces.**
- Confirmed or overridden false or benign positive on an open incident: Demitry files a close request in Approvals ("Close incident #N … as …") and labels the incident as awaiting close approval. The close happens at the start of Demitry's next run after a person approves. When Demitry overturns Dax's true positive, he chooses whether the close is a benign positive (the rule fired correctly on expected or authorized activity) or a false positive (the rule should not have fired). If a policy rule denies the close, Demitry escalates instead.
- High-risk incidents: when Dax called an incident a true positive and its tactics or techniques are high risk (for example credential access, privilege escalation, defense evasion, persistence, collection, exfiltration or impact), Demitry does not overturn it to benign. If his review finds it benign, he escalates it to a person instead, with his assessment as a comment.
- An incident Dax already closed and Demitry confirms: the classification is recorded as verified. It is not reopened.
- Confirmed or overridden true positive: the incident stays open and Demitry files up to five high-risk response requests in Approvals ("Disable account …" or "Isolate endpoint (Full) …") for targets its queries observed, or a "Select a response for confirmed threat" request when it found no specific target.
- Escalate: the incident stays open, labelled for human review, with Demitry's reasoning as a comment.
- QA decisions appear in Demitry's workspace (QA reviews list and tiles). On the incident's **Investigation chain** you see why Demitry ran each query, what came back, and his verdict compared with Dax's.

**Alone vs approval.** By default Demitry never closes an open incident on its own decision, and he never runs a response action. Closes and responses wait in [Approvals](../features/approvals.md). When an admin sets **Demitry closes a false positive** to Full auto (or Scheduled, outside staffed hours), a close where Demitry confirms Dax's benign verdict runs without a person. High or Critical, escalated and policy-held incidents still wait, some closes are still sent to a person as spot checks, and a reversed automatic close switches the setting back to Approval. Closes where Demitry overrides Dax always wait for a person.

## Marien: detection tuning

**What it does.** Marien looks for the analytics rule producing the most false positives, studies the closed false-positive incidents and live data, and proposes a tuned query (usually excluding a verified benign entity). Marien also picks up tuning requests from Demitry when he overturns Dax's true positive as benign, and from Dax's proposals that Demitry confirmed as benign. When Demitry confirms an attack, no tuning request is sent, so a rule that caught a real attack is not narrowed because of it.

- The false-positive evidence Marien works from includes closed false and benign positives, and open incidents whose benign close Dax and Demitry agreed on while it waits for a person. If a person denies that close, the incident no longer counts.
- When Marien's latest proposal for a rule expired or was rejected, she proposes that rule again only after a new false or benign positive is raised for it.

- A proposal that rewrites a rule's logic to close a named coverage gap is queued as a **detection change**. It gets an extra 30-day volume backtest against the rule's false-positive budget (20 alerts a month for High severity, 40 for Medium, 80 for Low).
- A proposal whose exclusions do not match the false-positive evidence, or that changes more than exclusions without naming a gap, is held back under **Held for a person** in Marien's workspace, with a notification. Nothing is deployed.
- After repeated tuning failures on a rule, a circuit breaker stops Marien retrying that rule until an admin clears it.

**What starts it.**
- On request: **Refresh recommendations** in Marien's workspace, or **Ask Marien to review** from a backtest in the Detection Library.
- On a schedule: when Marien's switch is on, about every 10 minutes. Separately, the worker checks the effect of already-deployed tunings about every 15 minutes; this only reads Sentinel.

**What it produces.** Tuning proposals with reasoning, a query diff, the recorded false-positive count and attribution, listed in Marien's workspace.

**Alone vs approval.** Every proposal waits for an admin. The workspace walks through a guided backtest: pick or attest a known-positive case, run the read-only backtest (analyst or admin), run the volume backtest for a detection change, then **Approve & deploy** (admin, a confirmation dialog, not an Approvals request). Tuning auto-approve can no longer be turned on, and earned auto mode for tuning is not available yet.

## Renzo: detection engineering

**What it does.** Renzo turns threat intelligence into draft detection rules (KQL mapped to MITRE ATT&CK), tailored to your industry, and backtests each draft against your workspace when it drafts it.

**What starts it.**
- On request: **Generate proposal** (from an article URL) or **Run research cycle** in Renzo's workspace, **Generate detection** on the Live Feed, or **Send to Renzo as detection** from an Orion hunt.
- On a schedule: when Renzo's switch is on, the worker checks about every 10 minutes and starts a research cycle when new scored intel has arrived, or once a day otherwise, limited by a daily allowance (3 drafts per day unless your configuration says otherwise). If Maxwell's automatic deployment review declines every rule in a draft, Renzo may draft that article once more, taking the review's reasons into account. When **Automatic threat-intelligence ingestion** is on, the worker also reads the feeds (including any your admin added under Settings > Threat Intel) about every 2 hours, scores new relevant articles, and adds those scoring 80 or higher to the Detection Library as Auto-ingested drafts.

**What it produces.** Draft detections in the Detection Library and in Renzo's **Generated detections** list. A research cycle can finish without a new conclusion; then nothing is saved.

**Alone vs approval.** Renzo never deploys. Every draft needs a passed review and a deployment through Maxwell: by an admin, or by Maxwell on his own when an admin has set his deploys to Full auto.

## Orion: threat hunting

**What it does.** Orion builds each hunt on one threat advisory from your feeds: its text, the ATT&CK techniques it names and the indicators it quotes (IP addresses, domains, hashes, file names, CVEs). An advisory stays active for 7 days after it is published and can be hunted again once a day in that time. Among the advisories due, Orion picks the one your workspace can best observe and act on, whichever feed it came from. Without an advisory, Orion hunts techniques from your detection library that have not been hunted yet.

Hunts are read-only KQL against tables that receive data in your workspace, summarize over the last 14 days and return up to 50 rows. When none of the tables that would record the behaviour has data, Orion does not run the query and records the hunt as a missing log source instead. When the first query returns nothing from tables that do hold data, or hits the row limit, Orion runs one follow-up query (broader, or rarest results first) and keeps it only if it returns rows. Orion then judges each entity in the rows (account, host, IP address, process) against the hypothesis and gives the verdict for the most concerning one: malicious, suspicious, benign or inconclusive, citing the rows it relied on. One suspicious entity among many ordinary ones still makes the hunt suspicious.

**What starts it.**
- On request: **Run proactive hunt**, **Execute hunt**, **Retry hunt** or **Ingest intel** in Orion's workspace, or **Ask Orion to hunt** in the Detection Library.
- On a schedule: when Orion's switch is on, a scheduled run at most every 6 hours, hunting up to 3 advisories one after another.
- Daily limits: 10 scheduled hunts and 20 requested hunts per day. Failed hunts and hunts recorded as a missing log source count too.

**What it produces.** Hunt records in Orion's **Recorded threat hunts** list (with hits, verified zero hits, proposed, failed, or not run because a log source is missing), also used by Relationships and the Detection Library. A malicious or suspicious verdict is a finding: Orion opens a new Sentinel incident for it so that Dax triages it like any other, and flags the hunt as a detection candidate. If the same pattern is found again within a week while that incident is open, Orion adds a comment to it instead of opening another.

**Alone vs approval.** Orion only reads your data. It may open new incidents for findings on its own; it never changes or closes other incidents or rules. Turning a hunt into a detection goes through Renzo, QA and an admin deployment.

## Caleb: malware analysis

**What it does.** Caleb handles suspicious files and hashes.
- Scheduled hash lookups: when Dax asks for sandbox analysis, Caleb looks up the hash reputation (this needs a VirusTotal key under Settings > Threat Intel), adds the result as an incident comment, and labels the incident for Dax to look at again. A lookup that keeps failing for one request is given up after three attempts.
- Detonation lab: an admin uploads a sample, Caleb provisions a sandbox VM in your Azure subscription, runs the analysis and writes a report.

**What starts it.**
- On a schedule: when **Caleb scheduled hash lookups** is on, about every 2 minutes. This does not enable sandbox execution.
- On request: the **Detonation lab** in Caleb's workspace (admin only).

**What it produces.** Incident comments with hash reputation, and sandbox reports listed under **Saved investigations & sessions**.

**Alone vs approval.** Lookups and reports change nothing in your environment beyond incident comments and labels. Sandbox provisioning and cleanup are admin actions.

## Maxwell: deployment and response

**What it does.** Maxwell deploys detection rules to Sentinel, rolls them back to an earlier saved version, recalls them, and carries out approved response actions (such as isolating an endpoint or disabling an account).

**What starts it.** People, and for detection deploys the schedule when an admin allows it.
- **Review for deployment** (analyst or admin) runs the deployment review: Demitry checks the query, repairs it if he can and runs it against your workspace. A passed review is valid for one hour.
- **Approve & deploy**, **Roll back** and **Recall rule** (admin) deploy, restore or delete a rule after a confirmation. Recall only works on rules Overwatch Console deployed for your tenant.
- On the Approvals page, an admin uses the **Run the approved response** section of an approved request to carry out the response action.
- Automatic deploys: when an admin sets **Maxwell deploys a Renzo detection** to Full auto (or Scheduled, outside staffed hours) and Renzo's switch is on, the worker runs Maxwell about every 10 minutes. He takes Renzo's undeployed drafts, those your workspace can best observe first and newest first among equals, runs the same deployment review a person would request, and deploys only drafts that pass every check, up to the daily limit the admin sets (3 unless changed). Each automatic deploy is recorded as an approval that the system approved, and in Agent Audit. A draft whose review fails is not reviewed again until its query changes, and the reviewer's reasons are kept with the draft for Renzo. A deploy that fails for another reason, or a review the reviewer could not finish, is tried again later with a fresh review, up to three times.
- For 48 hours after a deployment, the worker counts the new rule's alerts. More than 50 in 24 hours raises a high-risk request in Approvals to disable the rule; the rule is disabled only after a person approves.

**What it produces.** Deployed, rolled-back or recalled Sentinel rules (shown in Maxwell's **Deployment queue**), and response results recorded on the approval.

**Alone vs approval.** By default nothing on its own: rule deployment needs a current passed review and an admin's confirmation, and the server re-checks the review and query hash. With Full auto set for his deploys, Maxwell deploys passed Renzo drafts himself, within the daily limit. Rollback and recall always need an admin. Response actions need an approved request in Approvals, and approval, expiry, target and policy are re-checked when the response runs.

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
- [How to configure notifications](../how-to/configure-notifications.md)
