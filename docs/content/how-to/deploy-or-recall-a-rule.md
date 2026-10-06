---
title: How to deploy or recall a rule
status: current
reviewed: 2026-10-05
---

# How to deploy or recall a rule

Have Maxwell deploy a reviewed detection from the library to Microsoft Sentinel as a scheduled rule, or remove a deployed rule from Sentinel.

## Before you start

- **Admin** to deploy or recall. Analysts can run backtests and QA reviews to get a rule ready.
- The rule must be in the Detection Library with a saved query.
- To deploy, the rule needs a current, passed QA review from Demitry. A review expires after one hour, is lost if you reload the page, and stops counting if the rule changes after it.
- **Deploy** in the library also needs a passing backtest of the current query. **Deploy anyway** lets an admin deploy without one, with a recorded reason.

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
2. In **Deployment queue**, pick **Pending** and select the rule.
3. Click **Review for deployment** (analyst or admin). This is available only when QA evidence or a passing backtest is already recorded for the rule.
4. When the review passes, click **Approve & deploy** and confirm.

### Recall a deployed rule

1. In the Detection Library, select the deployed rule and click **Recall**. Or, in Maxwell's **Deployment queue**, pick **Deployed**, select the rule and click **Recall rule**.
2. Confirm in the **Confirm Recall** dialog.

## What happens next

- **Deploy.** The server re-checks the QA review and the query hash and rejects any other query. Maxwell creates the rule in Sentinel and reads it back. The rule creates incidents for Dax to triage. The library shows the rule as **Deployed**, and the result is listed under **Export and deployment history** for this session.
- **Recall.** The rule is deleted from Sentinel and the event is recorded in Agent Audit under Maxwell.
- **Approvals.** Deploy and recall are direct admin actions confirmed in a dialog. They do not create a request on the Approvals page.
- **Checking Sentinel.** In Maxwell's workspace, **Check Sentinel** reads the live rule state into the **Read-back** field.

## If something goes wrong

- **"A current passed QA review is required. Send the rule to QA first."** The review is missing, expired or out of date. Send the rule to QA again.
- **"Can't review yet: no QA evidence or passing backtest is recorded for this rule."** (Maxwell) Send the rule to QA from the library or Renzo's workspace first.
- **"Select up to 3 detections per review batch. Reviews are limited to 3 per minute."** Wait a minute and send the rest.
- **"A deployment or rollback is actively executing for this rule."** Wait for the other action to finish.
- **"Deploy failed for …"** The message gives the server's reason. Run QA again before you retry.
- **"Recall failed: …"** The rule was not removed. Use **Check Sentinel** before trying again.
- **Deploy button disabled.** You are not an admin, or there is no passing backtest. Its tooltip says which.

## Related

- [Detection Library](../features/detection-library.md)
- [How to turn intel into a detection](turn-intel-into-a-detection.md)
- [How to tune a noisy rule](tune-a-noisy-rule.md)
- [Agents](../features/agents.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Agent Audit](../features/agent-audit.md)
