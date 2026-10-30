---
title: Actions
status: current
reviewed: 2026-10-27
---

# Actions

Actions is where you build response playbooks out of steps, without writing code. A trigger or a schedule starts a playbook. Conditions decide which path it takes, and steps then comment, tag, assign, change severity, notify, report, hand work to an agent, or contain a threat. Anything destructive waits for a person to approve it in Approvals. You can test a playbook against a real incident before you enable it. Once enabled, it runs on its own.

## Where to find it

- Sidebar: **Operate > Actions**.
- Command palette (Ctrl+K or Cmd+K): **Go to Actions**.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | Open playbooks and read the canvas, step details, run history (including every step of a live run) and versions. |
| Analyst | Everything a viewer can do, plus **Test** a playbook on an incident and **Dry run** it. |
| Admin | Everything above, plus create, edit, save, enable, disable, publish, **Run now** and delete playbooks. |

## What you see

The page header reads "Actions" with the line "Build response playbooks from steps: a trigger or schedule starts them, conditions pick the path, and anything destructive waits for a person to approve it." A short note under it says how playbooks run. An enabled playbook runs its published version when its trigger fires, which is checked every minute. Steps after a Human approval wait in Approvals, and responses re-check policy at dispatch. **Open Approvals** takes you there.

**Playbook list.** One pill per playbook with its name, number of steps and state (draft, enabled, disabled), and a dot when it is enabled. Unsaved new playbooks are marked "unsaved". Administrators see **New playbook** and **From template**. A line under the list shows how many playbooks your tenant has out of the limit.

**Templates.** **From template** (or **Start from a template** when there are no playbooks yet) lists four starting points, each with a sentence on what it does:
- **Contain compromised endpoint**: when Dax records a true positive that is high risk, ask for approval, then isolate the device and disable the account. Otherwise, email the team.
- **Escalate high-severity incidents**: tag a new High incident, comment on it and email the administrators.
- **Close QA-confirmed false positives**: when Demitry confirms a false positive, comment, then close it after one approval.
- **Weekly activity summary**: every Monday at 09:00 UTC, email the administrators a summary of the last 7 days.

A template opens as an unsaved copy you can change. Nothing runs until you save and enable it.

**Toolbar.** The **Enabled** / **Disabled** / **Draft** switch, **Incident to test on** ("Test on #1234") and **Test**, zoom (**Zoom out**, **Zoom in**, **Fit**), **Dry run**, **Run now** and **Save**. Under them, administrators see the step palette in four groups:
- **Start**: **Trigger**, **Schedule**.
- **Decide**: **Condition**, **Human approval**.
- **Respond**: **Isolate host**, **Disable account**, **Revoke sessions**, **Close incident**, **Add comment**, **Assign owner**, **Change severity**, **Add tag**.
- **Hand off**: **Agent task**, **Notify**, **Report**.

**Canvas.** The playbook as connected squares, starting from a trigger or schedule. A condition has **Yes** and **No** outputs; other steps have one output. Each response square shows its own icon. A destructive step with no Human approval before it is marked. A minimap beside the canvas shows the whole graph.

**Step inspector.** Select a step to edit its title and settings. The inspector shows what happens **When it runs**, whether the step needs approval, its connections and, for destructive steps, whether a Human approval guards it.
- **Conditions** and a trigger's **Only when** filter use a builder: rows of field, comparison and value, joined by **All of these** or **Any of these**. Values with a known list (severity, verdicts, status) are picked from it, and "is one of" lets you pick several. A line under the rows says the condition in words, for example "Yes when Severity is at least High and Dax confidence is at least 85%." **Edit as text** shows the same condition as text, and **Use the builder** goes back.
- **Comment**, **Closing comment** and **Message** fields offer values you can insert where the cursor is: incident number, title, severity and status, Dax verdict and confidence, QA verdict, owner, detection name, playbook name and what started the run.

**Run history.** Live runs come first: what started each one (trigger, schedule or Run now, and by whom), the incident, the version it ran and its state (Running, Waiting for approval, Completed, Finished with problems, Stopped). Open a run to see every step's outcome, with **Open Approvals** on a step that waits and **Open incident**. Below, under **Tests and changes**, are the newest tests, dry runs, saves and state changes.

**Versions.** A collapsed card with the **Playbook name**, every retained version (number, draft or published, author, time, a short content hash and step count) and **Delete playbook**.

## What you can do

| Control | What it does | Who |
|---------|--------------|-----|
| **New playbook** | Starts an unsaved playbook with one trigger step. It exists only in this browser tab until you save it. | Admin |
| **From template** | Opens a described template as an unsaved copy. | Admin |
| Palette items | Add a step to the canvas. | Admin |
| Drag a step by its header | Moves the step on the canvas. | Admin |
| Right-side port, then another step's left-side input port | Connects two steps. **Cancel** in the banner stops connecting. **Connect** in the inspector does the same. | Admin |
| **Remove** (inspector) | Deletes the selected step and its connections. The **x** next to a connection removes just that connection. | Admin |
| **Save** | Validates the playbook and saves it as a new version with your identity, the time and a content hash. The save is written to the audit trail. | Admin |
| **Enabled** switch | Turning it on publishes the latest saved version, and from then on the playbook runs when its trigger fires or its schedule comes due. Turning it off stops it: runs it started stop at their next step, and the published version stays for reference. | Admin |
| **Publish** (Versions) | On an enabled playbook, publishes a newer saved version. Runs already started finish on the version they started with. | Admin |
| **Open** (Versions) | Loads a version into the editor. Saving it makes it the next version. | Any role can view; only admins can save |
| **Run now** | After you confirm, runs the latest saved version once, for real. A playbook started by an incident trigger asks which incident to run on. The trigger's **Only when** filter still applies, and every step after a Human approval still waits in Approvals. | Admin |
| **Delete playbook** | Removes a disabled playbook, its versions and its test history after you confirm. The audit trail keeps the record of every save and run. | Admin |
| **Test** | Reads the chosen incident from Sentinel with Dax's and Demitry's recorded verdicts, then walks the playbook: the trigger and conditions are evaluated and only the branch taken continues. At a Human approval step it shows exactly what the approval request would list, naming the accounts and devices. Nothing is executed, no approval is created and no agent is called. | Analyst, Admin |
| **Dry run** | Walks every step without an incident and lists what each would do. Triggers and conditions are not evaluated. Nothing is executed. | Analyst, Admin |
| **Clear test** | Hides the test result. | Analyst, Admin |

The steps and their settings:

- **Trigger**: **Event** and an optional **Only when** filter. The events are **Incident created** (new Sentinel incidents), **Incident verdict recorded** (Dax's verdict), **QA verdict recorded** (Demitry's verdict), **Approval granted** (an approval a person granted in Approvals) and **Detection deployed** (Maxwell's verified rule deployments).
- **Schedule**: **Cadence** (daily, weekly on Mondays, monthly on the 1st) and **At** (an hour, UTC). A scheduled run has no incident, so it is for reports and notifications.
- **Condition**: the checks described above. A condition follows **Yes** or **No**.
- **Human approval**: **Approvers required** (1, 2 or 3). **Expires after** is fixed at 24h.
- **Isolate host**, **Disable account** and **Revoke sessions**: which devices or accounts (those on the incident) and **After approval**, either **Run it straight away** or **Wait for an administrator to run it**. Destructive.
- **Close incident**: **Close as** (a classification) and an optional **Closing comment**. Destructive.
- **Add comment**: the **Comment**.
- **Assign owner**: **Assign to (email)**.
- **Change severity**: **Severity**.
- **Add tag**: the **Tag**.
- **Agent task**: **Marien · tune the rule that raised the incident** or **Caleb · look up file hashes**, with an optional **Note for the agent**.
- **Notify**: **Send to** (**Email administrators**, **Teams**, **Slack** or **Webhook**) and an optional **Message**.
- **Report**: **SOC activity summary** for the last day, 7 days or 30 days, and where to send it.

## How a run works

1. A trigger fires or a schedule comes due, and the run starts with the evidence read at that moment: the incident, Dax's verdict and confidence, and Demitry's QA verdict.
2. Steps run in order along the connections. Conditions follow **Yes** or **No**. Each step's outcome is recorded in the run and in the audit trail.
3. At a **Human approval**, the run files one request in Approvals listing exactly what the steps after it will do, naming accounts and devices. Then it waits.
4. When an administrator approves, the run continues straight away and does those steps, and only those. A denial or a request that expires stops that branch.
5. **Isolate host**, **Disable account** and **Revoke sessions** file one approval for each account or device, approved with the votes of the playbook's approval. They then run through the same checks as a response run from Approvals: the response must be set up and ready, policy is re-checked at dispatch, and each response runs once. With **Wait for an administrator to run it**, the response waits in Approvals for an administrator to run it.

## Good to know

- **Scheduled runs must be on.** Enabled playbooks run on the same worker as the agents. If "Run agents on a schedule for this workspace" is off in **Settings > Agent Policies**, enabling is refused, and the page warns when enabled playbooks are not running. **Run now** works either way.
- **Only new events.** An enabled playbook reacts to events that happen after it was enabled; older incidents and verdicts are never replayed.
- **Approval guardrail.** Isolate host, Disable account, Revoke sessions and Close incident, and any step whose title says isolate, disable, revoke, block, purge, quarantine or close, must have a **Human approval** step somewhere before them. Until one is connected, the playbook cannot be saved or enabled, and the canvas and inspector say why. When it runs, a destructive step that was reached without an approval listing it is refused.
- **Containment needs setup.** Isolate host, Disable account and Revoke sessions run only once [response actions are set up](../how-to/set-up-response-actions.md). Until they are, admins see "Containment can't run yet" at the top of the page, with **Set up response actions**, which opens Settings → Response actions. Until then those steps finish with a problem that says so, and the request stays in Approvals. A step acts on at most 5 accounts or devices; with more, nothing is done and the run asks you to handle it from the incident. Only accounts with an Entra object id and devices with a Defender device id can be acted on, and others are listed as skipped.
- **People-owned incidents.** Assign owner leaves an incident that a person already owns with them. Close incident leaves an incident that is already closed as it is.
- **Messages.** Email goes to every active administrator and follows the **Email administrators** switch in Settings > Notifications. Teams, Slack and webhook use the destinations set there. A message that could not be sent is recorded as a problem, but it doesn't stop the steps after it.
- **Agent tasks.** Marien needs the incident to come from an analytics rule. Caleb needs to be turned on and VirusTotal set up, and he looks up at most 3 file hashes from the incident.
- **Not interrupted twice.** If the worker stops in the middle of a step, the step is not repeated. It is marked **Uncertain** for a person to check.
- **Save checks.** A playbook needs a name, at least one **Trigger** or **Schedule**, a title on every step, every required field filled in, and no loops between steps. Steps that work on an incident cannot follow a schedule or a **Detection deployed** trigger.
- **Limits.** Up to 25 playbooks per tenant, 40 steps and 80 connections per playbook. The last 10 versions are kept, plus the published one. The run list keeps the newest 200 runs.
- **Conflicts.** If someone else saved a newer version after you opened the playbook, your save is refused. **Discard my changes and reload** loads their version.
- **Not available yet.** Blocking an IP or domain (no firewall integration) and creating a ticket (no ticketing integration) are not offered. To hand either to another system, use **Notify > Webhook**.

## Related

- [How to build a playbook](../how-to/build-a-playbook.md)
- [How to set up response actions](../how-to/set-up-response-actions.md)
- [Approvals](approvals.md)
- [How to approve or deny an action](../how-to/approve-or-deny-an-action.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Audit Trail](audit-trail.md)
