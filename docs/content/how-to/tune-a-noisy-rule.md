---
title: How to tune a noisy rule
status: current
reviewed: 2026-10-05
---

# How to tune a noisy rule

Review Marien's proposal to cut false positives from a deployed Sentinel rule, prove it still catches known attacks, and approve or reject it.

## Before you start

- **Admin** to attest known positives, run the replay check, approve and deploy, reject, or clear a circuit breaker. Analysts can ask Marien for proposals and read them.
- The rule must be deployed in Microsoft Sentinel. Marien tunes deployed rules only. For a draft in the library, edit the query and re-run the backtest instead (see [Detection Library](../features/detection-library.md)).
- For the replay check you need one or more known-positive events for the rule: their stable event IDs, the time window they fall in, and the closed true-positive incidents they came from (up to 10).

## Steps

1. Open **Agents** and click Marien.
2. Click **Refresh recommendations**. This reloads Marien's proposals and, for analysts and admins, asks Marien to look for new ones.
3. In **Tuning proposals**, use the chips **All**, **Needs replay**, **Queued for review** or **Blocked**, and select a proposal.
4. Read Marien's reasoning, the **Recorded FP count**, **Attribution** and **Confidence**, and the query diff. Open **Show word-level changes** for a precise comparison.
5. Under **Attest known-positive cases**, click **Attest** to open the replay panel.
6. Open **Attest a known-positive case** and fill in **Sentinel rule ID**, **Stable event ID column**, **Window start** and **Window end** (ISO 8601 with a timezone), **Known-positive event IDs**, **Closed true-positive incident IDs** and **Why these events are confirmed positives**. Click **Save human attestation**.
7. Click **Find proposals**, choose the proposal in **Pending tuning proposal**, and check that **Reviewed case ID** holds the case you just saved.
8. Click **Run read-only replay**. It checks that the tuned query still matches every attested event. It reads data only.
9. If the replay passes, click **Approve & deploy** and confirm. If it fails, reject the proposal or wait for a better one.
10. To reject, click **Reject proposal**, choose a reason (**False positive**, **Wrong target**, **Business impact too high**, **Needs more evidence**, **Already handled** or **Policy exception**), add a note for the agents if useful, and click **Reject & store feedback**. You can also **Reject without feedback**.

## What happens next

- **Approve & deploy** writes the tuned query to the existing Sentinel rule, records your approval, and removes the proposal from the list. The server checks the replay evidence again and runs an independent QA review of the new query before writing it; the rule must not have changed in Sentinel since the replay.
- Passing the replay is not approval. Approval is the separate admin click and confirmation.
- A rejection reason is stored with the tuning record. With **Apply to similar future cases** on, Marien cites your note on later proposals for the same rule.
- Rules that fail tuning repeatedly appear under **Blocked**. Marien stops retrying them until an admin clicks **Clear circuit breaker**. Clearing does not change the rule.
- If an admin has turned **tuning auto-approve** on (on the Approvals page), Marien's proposals can deploy without this review. Deployment safeguards still apply.
- Tuning deployments that ended in an uncertain state are listed on the Approvals page under **Uncertain tuning deployments** and **Uncertain tuning rollbacks**.
- All of this is recorded in Agent Audit under Marien.

## If something goes wrong

- **"Reviewed replay required. Open Agent Audit to run a replay, then refresh this recommendation."** Run the replay (steps 5 to 8) before approving.
- **"Sentinel rule changed during review; replay and approve the current version"** The rule was edited in Sentinel. Run the replay again.
- **"Independent detection QA did not pass; review the evidence before deployment"** The tuned query was refused. Reject it or wait for a new proposal.
- **"Sentinel deployment succeeded, but approval recording failed"** The rule changed but the record did not. Refresh and review before retrying.
- **"Deploy failed: …"** or **"Deployment outcome unconfirmed: …"** Check the rule in Sentinel before retrying.
- **"No pending tuning proposals or blocked rules."** Marien has nothing to propose right now.

## Related

- [Agents](../features/agents.md)
- [Detection Library](../features/detection-library.md)
- [Approvals](../features/approvals.md)
- [How to deploy or recall a rule](deploy-or-recall-a-rule.md)
- [How to review agent decisions](review-agent-decisions.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
