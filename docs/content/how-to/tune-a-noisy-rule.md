---
title: How to tune a noisy rule
status: current
reviewed: 2026-10-19
---

# How to tune a noisy rule

Review Marien's proposal to cut false positives from a deployed Sentinel rule (or to widen it to close a coverage gap), prove it still catches known attacks, and approve or reject it.

## Before you start

- **Admin** to attest known-positive cases, approve and deploy, reject, act on held proposals, or clear a circuit breaker.
- **Analyst** or **admin** to ask Marien for proposals and to run the read-only backtests. Viewers can read proposals.
- The rule must be deployed in Microsoft Sentinel. Marien tunes deployed rules only. For a draft in the library, edit the query and re-run the backtest instead (see [Detection Library](../features/detection-library.md)).
- For the backtest you need a reviewed known-positive case for the rule. If none exists, an admin attests one: the closed true-positive incidents the rule raised (up to 10), a column in the rule's results that identifies each hit, and the event IDs the rule must still match (up to 100).

## Steps

1. Open **Agents** and click Marien.
2. Click **Refresh recommendations**. This reloads Marien's proposals and, for analysts and admins, asks Marien to look for new ones.
3. In **Tuning proposals**, use the chips **All**, **Needs replay**, **Queued for review**, **Detection changes** or **Blocked**, and select a proposal.
4. Read Marien's reasoning and the query diff. For a tuning, check **Recorded FP count**, **Attribution**, **Confidence** and **Est. alerts suppressed**. For a detection change, read the coverage gap it closes. Open **Show word-level changes** for a precise comparison.
5. Work through **Backtest before deployment** on the proposal card. Each step keeps its button visible and says why it cannot run yet:
   1. **Known-positive case.** Pick a case in **Reviewed case used for the backtest**, or click **Attest a case** (admin). Fill in **Closed true-positive incident IDs**, **Event ID column in the rule's results**, **Event IDs the rule must still match**, **Window start (UTC)** and **Window end (UTC)** (the last 30 days are filled in) and **Why these are confirmed attacks**, then click **Save attestation**. Overwatch Console checks the incidents against Sentinel; the event IDs are your attestation.
   2. **Run read-only backtest.** Click **Run backtest**. It runs the original and proposed queries over the case window and checks the proposal still matches every attested event. It reads data only.
   3. **Run 30-day volume backtest** (detection changes only). Click **Run volume backtest**. It counts alerts from the original and proposed queries for each of the last 30 days and compares the added alerts with the rule's false-positive budget: 20 a month for High severity, 40 for Medium, 80 for Low or Informational. A rule with no known severity gets the High budget.
6. If the volume backtest is over budget, or could not be projected to 30 days, type your reason in the box that appears. It is required to deploy and is recorded with the deployment.
7. Click **Approve & deploy** (admin) and confirm.
8. To reject instead, click **Reject proposal**, choose a reason (**False positive**, **Wrong target**, **Business impact too high**, **Needs more evidence**, **Already handled** or **Policy exception**), add a note for the agents if useful, and click **Reject & store feedback**. You can also **Reject without feedback**.

Proposals Marien held back are listed under **Held for a person**, with the reason they were held. An admin can **Dismiss** one, or **Send back for review** to put it in the review list, where it still needs a backtest and an approval. A proposal that changes more than exclusions and names no coverage gap cannot be sent back.

## What happens next

- **Approve & deploy** writes the proposed query to the existing Sentinel rule, records your approval, and removes the proposal from the list. The server checks the backtest evidence again and runs an independent QA review of the new query before writing it; the rule must not have changed in Sentinel since the backtest. For a detection change, the server also checks the volume backtest or your written reason.
- Passing a backtest is not approval. Approval is the separate admin click and confirmation.
- Every tuned rule needs a person's approval. The **tuning auto-approve** line on the Approvals page can only be turned off, and **Marien applies a rule tune** under Settings > Agent Policies can only be set to Approval.
- The previous version of the rule is kept, so a deployed change can be rolled back. See [How to deploy or recall a rule](deploy-or-recall-a-rule.md).
- A rejection reason is stored with the tuning record. With **Apply to similar future cases** on, Marien cites your note on later proposals for the same rule.
- After each outcome, Marien waits before looking at the same rule again, for example 72 hours after deciding no change is needed, 48 hours after a proposal and 2 hours after a failure. When her latest proposal for a rule expired unanswered or was rejected, she proposes that rule again only after a new false or benign positive is raised for it, so the same proposal does not keep coming back.
- Marien's false-positive evidence includes closed false and benign positives, and open incidents whose benign close Dax and Demitry agreed on while the close waits for a person. Denying that close removes the incident from her evidence. When Demitry confirms an attack, no tuning request is sent for the rule that caught it.
- Rules that fail tuning repeatedly appear under **Blocked**. Marien stops retrying them until an admin clicks **Clear circuit breaker**. Clearing does not change the rule.
- Tuning deployments that ended in an uncertain state are listed on the Approvals page under **Uncertain tuning deployments** and **Uncertain tuning rollbacks**.
- All of this is recorded in Agent Audit under Marien. The full replay tool is also available in Agent Audit.

## If something goes wrong

- **"No reviewed case for this rule yet. An administrator must attest one before the backtest can run."** Ask an admin to attest a case (step 5.1).
- **"Attestation not saved: …"** The server could not confirm the case, for example the incidents are not closed true positives of this rule.
- **"Backtest did not run: …"** or **"Volume backtest did not run: …"** The message gives the reason.
- **"Failed: … Don't deploy; reject or revise the proposal."** The proposal no longer catches an attested attack.
- **"The earlier backtest result could not be confirmed or is more than 24 hours old. Run it again."** Re-run the backtest before approving. Volume results also expire after 24 hours.
- **"Reviewed replay required. Open Agent Audit to run a replay, then refresh this recommendation."** Run the backtest (step 5) before approving.
- **"Sentinel rule changed during review; replay and approve the current version"** The rule was edited in Sentinel. Run the backtest again.
- **"Independent detection QA did not pass; review the evidence before deployment"** The proposed query was refused. Reject it or wait for a new proposal.
- **"Sentinel deployment succeeded, but approval recording failed"** The rule changed but the record did not. Refresh and review before retrying.
- **"Deploy failed: …"** or **"Deployment outcome unconfirmed: …"** Check the rule in Sentinel before retrying. A proposal whose last attempt failed shows "Last deployment attempt failed: …".
- **"No pending tuning proposals or blocked rules."** Marien has nothing to propose right now.

## Related

- [Agents](../features/agents.md)
- [Detection Library](../features/detection-library.md)
- [Approvals](../features/approvals.md)
- [How to deploy or recall a rule](deploy-or-recall-a-rule.md)
- [How to review agent decisions](review-agent-decisions.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
