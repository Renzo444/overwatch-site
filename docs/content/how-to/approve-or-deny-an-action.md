---
title: How to approve or deny an action
status: current
reviewed: 2026-10-27
---

# How to approve or deny an action

Decide a request an agent filed in Approvals, run an approved containment response, and undo it if you need to.

## Before you start

- You need the **admin** role to approve, deny, select a response, run one or request its undo. Analysts can read requests and add comments; viewers can read them.
- To run an approved containment response, your tenant needs response provider credentials for Microsoft Entra ID (disable account) or Microsoft Defender for Endpoint (isolate host). An administrator sets them under **Reconciliation > Response provider configuration** on the Approvals page.
- Requests expire 24 hours after they are created. Decide, and run an approved response, within that window.

## Steps

### Approve a request

1. In the sidebar, open **Operate > Approvals**. The **Pending** tab is selected.
2. Find the request's card. The highest-risk requests are first.
3. Read the **Dax · analysis**, **Demitry · QA** and **Policy** tiles. Open **More evidence** for the response, the target ID and the query that returned the target.
4. To open the linked incident, click its number next to "Requested by".
5. Click **Approve**.
6. In the dialog, check the **Scope**, **What happens**, **Rollback** and **Quorum**.
7. Optionally type a **Rationale**. It is stored with your vote and shown on the request.
8. If the request is a close from Demitry and the verdict is right but his report is thin, turn on **Right verdict, thin report**. It counts against his accuracy score; the close is still approved.
9. Click **Approve**, or the button that names the response: **Approve isolation**, **Approve account disable**, **Approve isolation release** or **Approve account re-enable**.
10. Within 10 seconds, click **Undo** if you changed your mind. Otherwise your vote is recorded.

### Deny a request

1. On the request's card, click **Deny**.
2. Pick a **Reason**: False positive, Wrong target, Business impact too high, Needs more evidence, Already handled or Policy exception.
3. Optionally type a note under **What should the agents know?**
4. Leave **Apply to similar future cases** on if Dax and Demitry should see your note when they triage a similar incident, or turn it off for this request only. Requests that are not about an incident keep the note in Decision memory only.
5. Click **Deny & store feedback**. To deny without giving a reason, click **Deny without feedback** instead.

### Select a response for a confirmed threat

Some requests read "Select a response for confirmed threat". Demitry confirmed the threat but did not name a target his queries returned. A note on the card says why.

1. On that card, choose the **Proposed response**: **Disable account (no session revocation)** or **Isolate endpoint (Full)**.
2. Enter the **Entra user object ID** or **Defender machine ID** from your investigation.
3. Write the **Evidence and response justification**.
4. Click **Create response approval**. A new request appears in the queue. Approve it with the steps above.

### Run an approved response

1. Approve a containment request (once the quorum is met, **Run the approved response** appears on the card), or open the **History** tab and find the approved request.
2. Under **Run the approved response**, click **Review execution**.
3. Check the response, target ID, incident and directory.
4. Click **Confirm response execution**, or **Cancel execution** to back out.
5. Click **Refresh response** to see the provider's status.

### Undo a containment

Use this when an account disable or an endpoint isolation ran and should be reversed, for example after a false positive.

1. Open the **History** tab and find the approved request.
2. Under **Run the approved response**, click **Request undo**. The button appears once the response has run and did not fail.
3. Under **Why undo this?**, write the reason (at least 10 characters).
4. Click **Request undo**, or **Cancel undo** to back out. The message "Undo requested. It needs approval like the original, then an administrator runs it from Approvals." confirms it.
5. On the **Pending** tab, find the new request, **Re-enable account** or **Release endpoint from isolation**, requested by "a reviewer". Approve it with the steps above. It needs as many approvers as the original.
6. Run it with the steps in **Run an approved response**.

You can also approve or deny from the **Needs your decision** card on Overview and from **Awaiting your approval** in an incident's panel. Both open the same dialogs.

## What happens next

- A request is approved once the number of administrators it requires have approved it. A single deny resolves it as denied. Each administrator votes once.
- Approving a request with no bound response records the decision for the agent that owns the work. It does not run anything.
- Approving a containment request does not run it. It only runs when an administrator confirms it under **Run the approved response**.
- At that point the approval, its expiry, the target and your tenant's policy are checked again before anything is sent. The outcome is written to Agent Audit.
- Isolating a host blocks all network traffic except the Defender management channel and cuts active sessions on the device. To undo it, use **Request undo** once it has run, or release the device from isolation in Defender.
- Disabling an account stops it signing in. Existing sessions are not revoked; revoke them separately if needed. To undo it, use **Request undo** once it has run, or re-enable the account in Entra ID.
- An undo is a new request on the same target. Requesting it does not vote or run anything. Each containment can have one undo; if an undo was denied, expired or failed, you can request it again.
- Approving a close request from Demitry lets him close the incident with that classification on his next run. Approving Maxwell's request to disable a new rule disables it at the next scheduled check.
- Approving Maxwell's "Deploy detection '…' although it overlaps a live rule" lets him review and deploy that draft on a later run; denying it, or letting it expire, keeps the draft out of Sentinel. Approving "Retire Maxwell's rule '…' to make room for new detections" deletes that rule from Sentinel on a later unattended run, with a full backup in the audit log; denying keeps it, and he does not propose it again.
- A close request whose reasoning starts "Passed without a senior review" rests on Dax's verdict alone: Demitry did not review it. Read Dax's analysis with that in mind. These closes are never approved automatically.
- Denying a close request from Demitry leaves the incident open for a person. It counts against his accuracy score as a dangerous miss unless the reason is Already handled, Needs more evidence, Policy exception or Business impact too high.
- A denial reason is stored in **Decision memory**. With **Apply to similar future cases** on, Dax and Demitry see it when they triage a similar incident. It never decides a verdict and does not retrain any model.

## If something goes wrong

- **Approve** and **Deny** are disabled with "Only an administrator can record approval decisions.": your role is not admin.
- **"This approval changed while you were deciding. Reload it before voting again."**: someone else voted or the request changed. Click **Refresh** and decide again.
- **"This approval expired before your vote, so nothing was recorded."**, **"You already voted on this approval; your earlier vote stands."** or **"This approval was already approved, so your vote was not recorded."** (or denied): your vote was not counted. Click **Refresh** to see the current state.
- **"Denied. The feedback could not be stored; add it again from Decision memory."**: the denial was recorded but the reason was not saved.
- **"Approval expired. A new review is required to execute."**: the 24 hours ran out before the response was run. A new request is needed.
- **"Outcome uncertain. Verify provider state before taking further action."**: click **Verify provider state** to ask the provider what happened. Do not run the response again.
- **"Response outcome is unknown. Refresh or verify; do not resubmit containment."**: the console did not get a clear answer. Click **Refresh response** or **Verify provider state**.
- **"This response has not run, so there is nothing to undo"** or **"The provider reported this response failed, so there is nothing to undo"**: there is no containment to reverse.
- **"This response was already undone; see its undo approval"**: an undo already ran. Find it on the **History** tab.
- **"The tenant directory changed since this response; undo it in the provider"**: release the device in Defender or re-enable the account in Entra ID directly.
- **"Approvals unavailable"**: the queue could not be read. This does not mean the queue is empty. Click **Retry**.

## Related

- [Approvals](../features/approvals.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [How to triage an incident](triage-an-incident.md)
- [Overview](../features/overview.md)
- [Agent Audit](../features/agent-audit.md)
