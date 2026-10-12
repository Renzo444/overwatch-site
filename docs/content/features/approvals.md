---
title: Approvals
status: current
reviewed: 2026-10-12
---

# Approvals

Approvals is where agents ask and people decide. Each consequential request waits here for an administrator's vote: containing a host or disabling an account after Demitry confirms a threat, undoing such a containment, closing an incident Demitry found benign, or disabling a new rule that raises too many alerts. Approving does not run a response by itself: running an approved response is a separate step, and policy is checked again at that moment.

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
| Analyst | Everything a viewer can do, plus add comments to pending requests, verify uncertain tuning rollbacks and read Agent accuracy. |
| Admin | Everything above, plus **Approve** and **Deny**, select a response for a confirmed threat, run an approved response, request its undo, check provider state, reconcile uncertain tuning deployments, configure and check response providers, turn tuning auto-approve off and turn auto mode on or off under Agent accuracy. |

Approve and Deny are shown to every role but only work for administrators. Decisions are recorded with your identity.

## What you see

The page header reads "Approvals" with the line "Agents request; you authorize." and a **Refresh** button.

**Approval view.** Two tabs with counts: **Pending** (the current queue, up to 50) and **History** (resolved requests, up to 50). Next to them is the tuning auto-approve line: "tuning auto-approve: on", "off" or "unknown", with **reload policy**.

**Request cards.** One card per request. Pending cards are sorted by risk, highest first. Each card shows:
- The risk, who requested it (an agent, or "a reviewer" for a request a person created, such as a selected response or an undo) and the linked incident. Clicking the incident number (or "open the incident" when no number is recorded) opens the incident's investigation workspace.
- The requested action, for example "Isolate endpoint (Full)" or "Disable account" with the target ID.
- The quorum, for example "0 of 1 approvals", a pill for each vote already cast and an "Any admin · pending" pill for each approval still needed.
- The time left before it expires ("Expires in 5h 12m", or "Expired"). Requests expire 24 hours after they are created.
- Three evidence tiles: **Dax · analysis** and **Demitry · QA** (the recorded analysis for the incident) and **Policy** (risk, kind of request, approvers required, and whether it is "vote only, nothing is dispatched" or "re-checked at dispatch").
- **More evidence**, collapsed: Demitry's QA reasoning, the policy preview, the justification for the response, the exact response and target ID, the target evidence (the table and field the target came from, and the query, with a reminder that presence in a query result does not prove compromise) and the incident's severity and confidence.
- Comments, including any rationale an approver gave with their vote.

On the History tab each card ends with the outcome: "Approved by …", "Denied by …" with the reason, "Expired without a decision" or "Superseded by a response proposal". Approved response requests show **Run the approved response**.

A footer under the pending list reminds you that requests expire 24 hours after creation and links to **Settings** for agent policies.

### Kinds of request

| Request | Who files it | What approving does |
|---------|--------------|---------------------|
| **Isolate endpoint (Full)** or **Disable account** with a target ID | Demitry, after he confirms a true positive and a query returned the target | Authorizes that exact response. An administrator then runs it under **Run the approved response**. |
| **Select a response for confirmed threat** | Demitry, when he confirmed a threat but no target he proposed was backed by his queries | Nothing until an administrator selects a response, which creates a new request. A note on the card says why no target was accepted. |
| **Re-enable account** or **Release endpoint from isolation** with a target ID | An administrator, with **Request undo** on a containment that ran | Authorizes the undo. An administrator then runs it like any other response. |
| Close incident #… "…" as … | Demitry, when he confirms a false or benign positive on an open incident | Demitry closes the incident with that classification on his next run. If someone already closed it, it stays as they closed it. |
| Disable new rule '…': N alerts in the last 24 hours | Maxwell, when a rule he deployed in the last 48 hours raises 50 or more alerts in 24 hours | The rule is disabled in Sentinel at the next scheduled check. Denying keeps it running. |
| Deploy the "…" rule pack | A rule pack deployment during onboarding | The next deployment request for that pack goes ahead. Each approval is used once. |
| Requested via Atlas for … | An administrator, through Atlas | Records the decision for the agent that owns the work. It does not run anything. |

**Reconciliation.** "Compares Sentinel against saved intent. Only a matching rule resolves an attempt." Three rows, each with a **Check** button:
- **Uncertain tuning deployments**: tuning changes whose outcome in Sentinel was not confirmed. Administrator only.
- **Uncertain tuning rollbacks**: rollbacks whose outcome was not confirmed.
- **Response provider configuration**: the application credentials used to run approved responses. Administrator only.

**Agent accuracy** (analysts and administrators). "Scored from your team's decisions on agent proposals." One row per agent action:
- **Close incidents Demitry verified as false or benign positive**.
- **Deploy rule tunings Marien proposed**. This row shows its score but cannot be turned on: automatic tuning deployment is not available yet.

Each row shows how often your team accepted the proposal unchanged over the last 50 decisions, with dangerous misses, reversals and reports flagged as thin, then the same rate for each confidence level (High, Medium, Low) marked "proven", "needs 20" or "below the bar". It ends with "Auto mode: on" or "off" and, when it is locked, why.

**Decision memory.** The reasons reviewers gave when denying requests, newest first, up to 50. Each note shows the reason, the linked incident, the note text and its scope. Agents see these notes on similar cases; they do not retrain any model.

## What you can do

- **Approve** (admin). Opens a dialog titled with the request, for example "Approve: isolate FIN-WS-014?". It lists the **Scope** (target, signed-in user when recorded, incident), **What happens** in plain language, **Rollback** steps and the **Quorum**. You can add an optional **Rationale**. On a close request from Demitry you can also turn on **Right verdict, thin report**: you still approve the close, but it counts against Demitry's accuracy score. Confirm with **Approve**, or with the button that names the response: **Approve isolation**, **Approve account disable**, **Approve isolation release** or **Approve account re-enable**. Your vote is then held for 10 seconds with an **Undo** button before it is recorded. When enough administrators have approved, the request is approved.
- **Deny** (admin). Opens a dialog that asks for a **Reason**: False positive, Wrong target, Business impact too high, Needs more evidence, Already handled or Policy exception. You can add a note under "What should the agents know?" and choose **Apply to similar future cases**. **Deny & store feedback** records the denial and stores the reason in Decision memory. **Deny without feedback** denies with no reason. A single deny resolves the request.
- **Add comment** (analyst, admin). Opens a box; **Post comment** adds context for the approvers. A comment is not a vote.
- **Create response approval** (admin). Shown when Demitry confirmed a threat but did not name a usable target ("Select a response for confirmed threat"). Choose **Disable account (no session revocation)** or **Isolate endpoint (Full)**, enter the **Entra user object ID** or **Defender machine ID** from your investigation, and write the **Evidence and response justification**. This creates a new approval request; it does not approve or run anything.
- **Run the approved response** (admin), on an approved response request:
  - **Review execution** shows what will be sent; **Confirm response execution** sends exactly that response for that target, or **Cancel execution** backs out. The approval, its expiry, the target and your tenant's policy are checked again before anything is sent, and the outcome is written to Agent Audit.
  - **Verify provider state** asks the provider (Microsoft Entra ID or Defender for Endpoint) what actually happened, for an attempt whose outcome is uncertain.
  - **Refresh response** re-reads the recorded outcome. Any role can see the status.
- **Request undo** (admin), under **Run the approved response** on an account disable or an endpoint isolation that has run and did not fail. Write why under **Why undo this?** (at least 10 characters) and click **Request undo**, or **Cancel undo**. This files a new pending request to re-enable the account or release the device, on the same target and with the same number of approvers as the original. It does not vote or run anything: the undo is approved and then run like any other response. Once an undo is filed, the original card says "An undo was requested for this response. Find it in Approvals."
- **turn off** tuning auto-approve (admin). Shown only while it is on. Tuning auto-approve can no longer be turned on: each of Marien's tuning changes waits for a person.
- **Verify Sentinel state** (admin), under Uncertain tuning deployments: checks Sentinel against the saved intent. Only a matching rule resolves the attempt; nothing is redeployed.
- **Verify rollback state** (analyst, admin), under Uncertain tuning rollbacks: checks the saved rollback target against Sentinel. Nothing is rolled back again.
- **Save response credentials**, **Check permissions** and **Remove response credentials** (admin), under Response provider configuration: set the **Application client ID** and **New application secret** for Microsoft Entra ID or Microsoft Defender for Endpoint. Existing secrets are never displayed. **Check permissions** reads the permissions granted to the saved application and either says "Permissions verified. No action was taken in the provider." or names the missing permissions to grant with admin consent. Removing credentials blocks future responses through that provider; it does not undo actions already sent.
- **Turn on auto mode…** and **Turn off auto mode** (admin), under Agent accuracy. Turning on is only possible when the row meets the bar. It opens a dialog with the disclaimer; turn on "I have read this and accept it for my organization" and click **Turn on auto mode**. Your name and the time are recorded in the audit log.
- **Refresh**: re-reads the queue, history, Decision memory and policy. The pending list also refreshes about every 15 seconds.

## Good to know

- Nothing on this page runs a response automatically. Approving records a vote. A response, including an undo, only runs when an administrator confirms it under **Run the approved response**.
- An approved response must be run before the request expires, 24 hours after it was created. After that, a new review is needed. An undo request has its own 24 hours.
- Each containment can have one undo. If an undo was denied, expired or failed, you can request it again. An undo cannot itself be undone; if the target needs containing again, a new response review is needed.
- Undo is refused when the response never ran ("This response has not run, so there is nothing to undo"), when the provider reported it failed, when it was already undone, or when your tenant's directory changed since the response ran. In the last case, undo it in the provider directly.
- You can still reverse a containment outside the console: release the device in Defender, or re-enable the account in Entra ID.
- Disabling an account does not revoke the user's existing sessions. Revoke them separately if needed.
- The console can only run a response for a tenant that has response provider credentials configured.
- Approving a request with no bound response (for example one filed through Atlas) records the decision for the agent that owns the work. It does not run the action.
- **Auto mode** is off by default. It unlocks at 95% agreement over the last 50 decisions with no dangerous misses or reversals, and only at confidence levels with 20 or more proven decisions. Even when it is on, it only acts while your operating mode in [Settings](settings.md) is full auto, or outside staffed hours on a schedule. About 1 in 10 closes still goes to a person as a spot check. It never applies to High or Critical incidents, to a close where Demitry overrode Dax, to an escalated incident or to a close your policy rules require approval for. Closes it approves appear in History as approved.
- Auto mode turns itself off when accuracy falls below the bar or when someone reopens an automatic close, or reclassifies it as a true positive, within 14 days. It never closes an incident a person owns; the owner gets the recommendation as a comment instead.
- Your decisions on Demitry's close requests feed Agent accuracy. A denied close counts as a dangerous miss unless the reason is Already handled, Needs more evidence, Policy exception or Business impact too high.
- If a request changed while you were deciding, the console says "This approval changed while you were deciding. Reload it before voting again." If it expired, was already decided, or you already voted, the console says so and your vote is not recorded.
- A decision you just made stays on the Pending tab, with its undo countdown or outcome, until you click **Dismiss**. If you close the page during the 10-second undo window, the browser warns you first.
- If the queue cannot be read, the page says "Approvals unavailable" and makes clear that this does not mean the queue is empty.

## Related

- [How to approve or deny an action](../how-to/approve-or-deny-an-action.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Overview](overview.md)
- [Incidents](incidents.md)
- [Actions](actions.md)
- [Agent Audit](agent-audit.md)
- [Settings](settings.md)
