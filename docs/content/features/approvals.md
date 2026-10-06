---
title: Approvals
status: current
reviewed: 2026-10-05
---

# Approvals

Approvals is where agents ask and people decide. Each consequential request, such as containing a host or disabling an account that Demitry proposes after confirming a threat, waits here for an administrator's vote. Approving does not run anything by itself: running an approved response is a separate step, and policy is checked again at that moment.

## Where to find it

- Sidebar: **Operate > Approvals**. The sidebar shows how many requests are pending next to the item.
- The notifications bell in the top bar lists waiting approvals; opening one goes to this page. Opening a notification does not approve anything.
- Command palette (Ctrl+K or Cmd+K): **Go to Approvals**.
- From Overview: the **Pending approvals** count, or **Choose a response** on the decision card.
- From Incidents: **Open Approvals** in the incident panel when a response must be selected.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | Read pending and resolved requests, their evidence and comments, Decision memory, and the status of uncertain tuning rollbacks. |
| Analyst | Everything a viewer can do, plus add comments to pending requests. |
| Admin | Everything above, plus **Approve** and **Deny**, select a response for a confirmed threat, run an approved response, check provider state, reconcile uncertain tuning deployments and rollbacks, configure response providers and turn tuning auto-approve on or off. |

Approve and Deny are shown to every role but only work for administrators. Decisions are recorded with your identity.

## What you see

The page header reads "Approvals" with the line "Agents request; you authorize." and a **Refresh** button.

**Approval view.** Two tabs with counts: **Pending** (the current queue, up to 50) and **History** (resolved requests, up to 50). Next to them is the tuning auto-approve line: "tuning auto-approve: on", "off" or "unknown", with **reload policy** and, for administrators, **turn on** or **turn off**.

**Request cards.** One card per request. Pending cards are sorted by risk, highest first. Each card shows:
- The risk, who requested it (an agent, or "a reviewer" for a request an administrator created) and the linked incident number. Clicking the number opens the incident's investigation workspace.
- The requested action, for example "Isolate endpoint (Full)" or "Disable account" with the target ID.
- The quorum, for example "0 of 1 approvals", a pill for each vote already cast and an "Any admin · pending" pill for each approval still needed.
- The time left before it expires ("Expires in 5h 12m", or "Expired"). Requests expire 24 hours after they are created.
- Three evidence tiles: **Dax · analysis** and **Demitry · QA** (the recorded analysis for the incident) and **Policy** (risk, kind of request, approvers required, and whether it is "vote only, nothing is dispatched" or "re-checked at dispatch").
- **More evidence**, collapsed: Demitry's QA reasoning, the policy preview, the justification for the response, the exact response and target ID, the target evidence (the table and field the target came from, and the query, with a reminder that presence in a query result does not prove compromise) and the incident's severity and confidence.
- Comments, including any rationale an approver gave with their vote.

On the History tab each card ends with the outcome: "Approved by …", "Denied by …" with the reason, "Expired without a decision" or "Superseded by a response proposal". Approved containment requests show **Run the approved response**.

A footer under the pending list reminds you that requests expire 24 hours after creation and links to **Settings** for agent policies.

**Reconciliation.** "Compares Sentinel against saved intent. Only a matching rule resolves an attempt." Three rows, each with a **Check** button:
- **Uncertain tuning deployments**: tuning changes whose outcome in Sentinel was not confirmed. Administrator only.
- **Uncertain tuning rollbacks**: rollbacks whose outcome was not confirmed.
- **Response provider configuration**: the application credentials used to run approved responses. Administrator only.

**Decision memory.** The reasons reviewers gave when denying requests, newest first, up to 50. Each note shows the reason, the linked incident, the note text and its scope. Agents see these notes on similar cases; they do not retrain any model.

## What you can do

- **Approve** (admin). Opens a dialog titled with the request, for example "Approve: isolate FIN-WS-014?". It lists the **Scope** (target, signed-in user when recorded, incident), **What happens** in plain language, **Rollback** steps and the **Quorum**. You can add an optional **Rationale**. Confirm with **Approve**, **Approve isolation** or **Approve account disable**. Your vote is then held for 10 seconds with an **Undo** button before it is recorded. When enough administrators have approved, the request is approved.
- **Deny** (admin). Opens a dialog that asks for a **Reason**: False positive, Wrong target, Business impact too high, Needs more evidence, Already handled or Policy exception. You can add a note under "What should the agents know?" and choose **Apply to similar future cases**. **Deny & store feedback** records the denial and stores the reason in Decision memory. **Deny without feedback** denies with no reason. A single deny resolves the request.
- **Add comment** (analyst, admin). Opens a box; **Post comment** adds context for the approvers. A comment is not a vote.
- **Create response approval** (admin). Shown when Demitry confirmed a threat but did not name a target ("Select a response for confirmed threat"). Choose **Disable account (no session revocation)** or **Isolate endpoint (Full)**, enter the **Entra user object ID** or **Defender machine ID** from your investigation, and write the **Evidence and response justification**. This creates a new approval request; it does not approve or run anything.
- **Run the approved response** (admin), on an approved containment request:
  - **Review execution** shows what will be sent; **Confirm response execution** sends exactly that response for that target, or **Cancel execution** backs out. The approval, its expiry, the target and your tenant's policy are checked again before anything is sent, and the outcome is written to Agent Audit.
  - **Verify provider state** asks the provider (Microsoft Entra ID or Defender for Endpoint) what actually happened, for an attempt whose outcome is uncertain.
  - **Refresh response** re-reads the recorded outcome. Any role can see the status.
- **turn on** / **turn off** tuning auto-approve (admin). When on, Marien's tuning proposals deploy without review; other deployment safeguards still apply.
- **Verify Sentinel state** (admin), under Uncertain tuning deployments: checks Sentinel against the saved intent. Only a matching rule resolves the attempt; nothing is redeployed.
- **Verify rollback state** (admin), under Uncertain tuning rollbacks: checks the saved rollback target against Sentinel. Nothing is rolled back again.
- **Save response credentials** / **Remove response credentials** (admin), under Response provider configuration: set the **Application client ID** and **New application secret** for Microsoft Entra ID or Microsoft Defender for Endpoint. Existing secrets are never displayed. Removing credentials blocks future responses through that provider; it does not undo actions already sent.
- **Refresh**: re-reads the queue, history, Decision memory and policy. The pending list also refreshes about every 15 seconds.

## Good to know

- Nothing on this page runs automatically. Approving records a vote. A containment response only runs when an administrator confirms it under **Run the approved response**.
- An approved response must be run before the request expires, 24 hours after it was created. After that, a new review is needed.
- Approving a request that has no bound response (for example one filed through Atlas) records the decision for the agent that owns the work. It does not run the action.
- Disabling an account does not revoke the user's existing sessions. Revoke them separately if needed.
- The console can only run a response for a tenant that has response provider credentials configured. Saving credentials does not verify the application's permissions.
- If a request changed while you were deciding, the console says "This approval changed while you were deciding. Reload it before voting again."
- A decision you just made stays on the Pending tab, with its undo countdown or outcome, until you click **Dismiss**. If you close the page during the 10-second undo window, the browser warns you first.
- If the queue cannot be read, the page says "Approvals unavailable" and makes clear that this does not mean the queue is empty.
- The Uncertain tuning rollbacks panel shows its verify button to analysts, but the server only accepts the check from an administrator.

## Related

- [How to approve or deny an action](../how-to/approve-or-deny-an-action.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Overview](overview.md)
- [Incidents](incidents.md)
- [Actions](actions.md)
- [Agent Audit](agent-audit.md)
- [Settings](settings.md)
