---
title: How to approve or deny an action
status: current
reviewed: 2026-10-05
---

# How to approve or deny an action

Decide a request an agent filed in Approvals, and, for an approved containment response, run it.

## Before you start

- You need the **admin** role to approve, deny, select a response or run one. Analysts can read requests and add comments; viewers can read them.
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
8. Click **Approve**, **Approve isolation** or **Approve account disable**.
9. Within 10 seconds, click **Undo** if you changed your mind. Otherwise your vote is recorded.

### Deny a request

1. On the request's card, click **Deny**.
2. Pick a **Reason**: False positive, Wrong target, Business impact too high, Needs more evidence, Already handled or Policy exception.
3. Optionally type a note under **What should the agents know?**
4. Leave **Apply to similar future cases** on if the agents should cite your note on similar cases, or turn it off for this request only.
5. Click **Deny & store feedback**. To deny without giving a reason, click **Deny without feedback** instead.

### Select a response for a confirmed threat

Some requests read "Select a response for confirmed threat". Demitry confirmed the threat but did not name a target.

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

You can also approve or deny from the **Needs your decision** card on Overview and from **Awaiting your approval** in an incident's panel. Both open the same dialogs.

## What happens next

- A request is approved once the number of administrators it requires have approved it. A single deny resolves it as denied. Each administrator votes once.
- Approving a request with no bound response records the decision for the agent that owns the work. It does not run anything.
- Approving a containment request does not run it. It only runs when an administrator confirms it under **Run the approved response**.
- At that point the approval, its expiry, the target and your tenant's policy are checked again before anything is sent. The outcome is written to Agent Audit.
- Isolating a host blocks all network traffic except the Defender management channel and cuts active sessions on the device. To undo it, release the device from isolation in Defender, or request a release through Approvals.
- Disabling an account stops it signing in. Existing sessions are not revoked; revoke them separately if needed. To undo it, re-enable the account in Entra ID, or request it through Approvals.
- A denial reason is stored in **Decision memory**. Dax and Demitry see it on similar cases. It does not retrain any model.

## If something goes wrong

- **Approve** and **Deny** are disabled with "Only an administrator can record approval decisions.": your role is not admin.
- **"This approval changed while you were deciding. Reload it before voting again."**: someone else voted or the request changed. Click **Refresh** and decide again.
- **"Denied. The feedback could not be stored; add it again from Decision memory."**: the denial was recorded but the reason was not saved.
- **"Approval expired. A new review is required to execute."**: the 24 hours ran out before the response was run. A new request is needed.
- **"Outcome uncertain. Verify provider state before taking further action."**: click **Verify provider state** to ask the provider what happened. Do not run the response again.
- **"Response outcome is unknown. Refresh or verify; do not resubmit containment."**: the console did not get a clear answer. Click **Refresh response** or **Verify provider state**.
- **"Approvals unavailable"**: the queue could not be read. This does not mean the queue is empty. Click **Retry**.

## Related

- [Approvals](../features/approvals.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [How to triage an incident](triage-an-incident.md)
- [Overview](../features/overview.md)
- [Agent Audit](../features/agent-audit.md)
