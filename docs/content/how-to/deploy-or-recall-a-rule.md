---
title: How to deploy or recall a rule
status: current
reviewed: 2026-10-26
---

# How to deploy or recall a rule

Have Maxwell deploy a reviewed detection from the library to Microsoft Sentinel as a scheduled rule, put a deployed rule back to an earlier version, or remove it from Sentinel.

## Before you start

- **Admin** to deploy, roll back or recall. Analysts can run backtests and QA reviews to get a rule ready. Recall and rollback always need a signed-in person: no agent or scheduled job can do them.
- The rule must be in the Detection Library with a saved query.
- To deploy, the rule needs a current, passed QA review from Demitry. A review expires after one hour, is lost if you reload the page, and stops counting if the rule changes after it.
- **Deploy** in the library also needs a passing backtest of the current query. **Deploy anyway** lets an admin deploy without one, with a recorded reason.
- The query must return at least one entity column (such as an account, host, IP address, URL, process or file), and the rule must have a severity. Maxwell refuses to deploy a rule without them.

## Steps

### Deploy from the Detection Library

1. Open **Intelligence > Detection Library** and select the rule.
2. In the **Backtest** panel, click **Run backtest** and check that the result is **PASSED**.
3. Click **Send to QA** and wait for the QA tile to show **Approved**. If it shows **Not passed**, read the reason, fix the query and click **Re-run QA**.
4. Click **Deploy** (or **Request deployment** in the Backtest panel).
5. Read the confirmation, which names the query version and hash, and click **Deploy**.

To deploy against a backtest that did not pass: in the **Backtest** panel click **Deploy anyway**, type the reason in **Why deploy anyway?**, click **Deploy anyway…** and confirm. Your reason is saved to Decision memory first. If it cannot be saved, nothing deploys.

### Deploy from Maxwell's workspace

1. Open **Agents** and click Maxwell, then **Review deployments**.
2. In **Deployment queue**, pick **Pending** and select the rule. The detail says what the rule is waiting on, for example **Needs review** or **Ready to deploy**, and shows Renzo's **Draft backtest** when one was recorded.
3. Click **Review for deployment** (analyst or admin). Demitry checks the query, repairs it if he can and runs it against your workspace. This can take a few minutes. Nothing needs to be recorded beforehand.
4. When the review passes, click **Approve & deploy** (admin) and confirm. If it did not pass, read the reason, fix what it names and click **Review again**.

### Let Maxwell deploy Renzo's drafts on his own

1. Open **Settings > Agent Policies** (admin).
2. Under **What runs on its own**, find **Maxwell deploys a Renzo detection** and click **Full auto**, or **Scheduled** to keep approval during your staffed hours.
3. Read the confirmation and click **Switch mode**.
4. Pick a **Daily limit** (1 to 20 deploys a day; 3 unless you change it).
5. Pick **Rules Maxwell may keep**: the most rules his automatic deploys may have in Sentinel at once (50 unless you change it).

Maxwell's automatic deploys run on the agent worker, so **Run agents on a schedule for this workspace** must be on, and Renzo's switch must be on: switching Renzo off also pauses them. To stop them, click **Approval** in the same row. See [How to set agent autonomy](set-agent-autonomy.md).

### Roll back a deployed rule

1. In Maxwell's **Deployment queue**, pick **Deployed** and select the rule.
2. Click **Roll back**. This is shown to admins only, and only when Overwatch Console has more than one saved version of the rule linked to this Sentinel rule.
3. In **Earlier version**, pick the version to put back. Each entry shows the version number, who saved it, when and why.
4. Read the preview. It shows the query change between the live version and the one you picked, and whether all rule settings come back (severity, schedule, tactics, entity mappings and the rest) or only the query, for versions saved before full settings were kept.
5. Click **Roll back to v…**.
6. If someone changed the rule outside Overwatch Console since it was deployed (in the Sentinel portal or by tuning), you see "The live rule was changed outside Overwatch since v…" with the live query and the expected query side by side. Click **Overwrite the outside change and roll back to v…** only if you mean to discard that change.

### Recall a deployed rule

1. In the Detection Library, select the deployed rule and click **Recall**. Or, in Maxwell's **Deployment queue**, pick **Deployed**, select the rule and click **Recall rule**.
2. Confirm in the **Confirm Recall** dialog.

## What happens next

- **Deploy.** The server re-checks the QA review and the query hash and rejects any other query. Maxwell creates the rule in Sentinel and reads it back. The rule's schedule follows the time span in its query, alerts that share all their entities within 5 hours are grouped into one incident, and the incidents go to Dax to triage. The rule's ATT&CK mapping in Sentinel lists parent techniques only (T1059.001 is sent as T1059). The library shows the rule as **Deployed**, and the result is listed under **Export and deployment history** for this session.
- **Automatic deploys.** With Full auto set, the worker runs Maxwell about every 10 minutes. He takes Renzo's undeployed drafts, those your workspace can best observe first and the newest first among equals, and runs the same deployment review a person would request (at most five reviews a run). Only a draft that passes every check is deployed, through the same deploy path and checks as an admin's deploy, until the daily limit is reached. A draft whose review fails is not reviewed again until its query changes; the reviewer's reasons are kept with the draft so Renzo can redraft it once. A deploy that fails after a passed review, or a review the reviewer itself could not finish, is tried again with a fresh review after 6 hours, up to three times. An admin can still review and deploy any of these drafts by hand.
- **Room in Sentinel.** Sentinel allows 512 analytics rules per workspace. Before each run Maxwell reads the live rule count and stops automatic deploys while fewer than 50 slots are left, so your own rules always have room. If the count cannot be read, he deploys nothing that run.
- **Repeats and overlaps.** Before reviewing a draft, Maxwell compares it with every live rule. A draft that repeats a live rule is declined for good, with the reason written on the draft. A draft that overlaps a live rule waits for a person: Maxwell files a medium-risk request on the Approvals page ("Deploy detection '…' although it overlaps a live rule"). Approving lets him review and deploy it on a later run; denying it, or leaving it until it expires after a day, keeps it out of Sentinel. Renzo also drops a draft that repeats a live rule before saving it.
- **Rule budget.** When Maxwell's automatic deploys already have as many rules in Sentinel as **Rules Maxwell may keep** allows, he deploys nothing and files one request on the Approvals page to retire his lowest-value rule ("Retire Maxwell's rule '…' to make room for new detections"). He picks a rule that overlaps another live rule first, then one that raised more alerts in 30 days than its severity's budget, then the one from the lowest-scored intel. A rule is never retired for being quiet. Approving deletes the rule on Maxwell's next run through the same checks as a recall (ownership check, full backup in the audit log, verified delete). Denying keeps it, and he will not propose that rule again. Nothing is retired without a person.
- **AI service outages.** If the reviewer cannot answer because the AI service is unavailable, Maxwell stops the run, records one outage line in Agent Audit and declines nothing. The drafts stay eligible for the next run.
- **New rule volume watch.** For 48 hours after a deploy, the scheduled upkeep counts the rule's alerts over the last 24 hours. If it raises 50 or more, Maxwell files a high-risk request on the Approvals page to disable it ("Disable new rule '…': … alerts in the last 24 hours"). Nothing is disabled unless an admin approves; the rule is then disabled on the next upkeep. Denying keeps it running.
- **Roll back.** Only this rule changes in Sentinel. The restored query is saved as a new version, and the library entry shows the restored query with a "Rolled back to v…" note. Whether the rule is on or off does not change. The rollback is recorded in Agent Audit under Maxwell.
- **Recall.** Only rules Overwatch Console deployed for your organization can be recalled. The full rule is saved to the audit log before it is deleted, and Maxwell reads Sentinel again to confirm it is gone. The event is recorded in Agent Audit under Maxwell.
- **Approvals.** Deploy, roll back and recall are direct admin actions confirmed in a dialog. They do not create a request on the Approvals page. An automatic deploy files a high-risk request that the system approves itself, so it appears under **History** on the Approvals page and in Agent Audit under Maxwell. The overlap, retire and storm-disable requests above wait for a person.
- **Checking Sentinel.** In Maxwell's workspace, **Check Sentinel** reads the live rule state into the **Read-back** field.

## If something goes wrong

- **"A current passed QA review is required. Send the rule to QA first."** The review is missing, expired or out of date. Send the rule to QA again.
- **"Review expired. Run review again."** or **"Detection changed since review. Run review again."** Review the rule again before you deploy.
- **"Select up to 3 detections per review batch. Reviews are limited to 3 per minute."** Wait a minute and send the rest.
- **"A deployment or rollback is actively executing for this rule."** Wait for the other action to finish.
- **QA did not pass because the rule matches only indicators**, or because live rules already cover its technique. Rewrite the rule to detect the attacker's behaviour, or to catch something the existing rules miss. An admin can allow indicator-only rules with **Renzo may write indicator-only rules** in Settings > Agent Policies.
- **"This detection returns no entity columns …"** or **"This detection has no severity …"** Revise the query or set a severity, then review it again.
- **"Deploy failed for …"** The message gives the server's reason. Run QA again before you retry.
- **"This rule is already gone from Azure Sentinel. Nothing was deleted."** Someone removed it outside Overwatch Console. The recorded deployment is kept.
- **"Recall failed: Overwatch did not deploy this rule, so it cannot recall it"** Remove the rule in Sentinel yourself if it should go.
- **"Recall failed: Sentinel still shows the rule after the delete; check it before retrying"** Use **Check Sentinel** before trying again.
- **"Rollback failed: …"** The rule was not rolled back. Common reasons: the earlier version's query is no longer valid, the rule is not in Sentinel, or the outcome could not be confirmed ("Reconcile Sentinel before retrying").
- **"Rollback unavailable: …"** The version history could not be read.
- **Preview and rollback** share a limit of 3 requests a minute.
- **Deploy button disabled.** You are not an admin, or there is no passing backtest. Its tooltip says which.

## Related

- [Detection Library](../features/detection-library.md)
- [How to turn intel into a detection](turn-intel-into-a-detection.md)
- [How to tune a noisy rule](tune-a-noisy-rule.md)
- [Agents](../features/agents.md)
- [Approvals](../features/approvals.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Agent Audit](../features/agent-audit.md)
