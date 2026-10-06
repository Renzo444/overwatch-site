---
title: Audit Trail
status: current
reviewed: 2026-10-05
---

# Audit Trail

The Audit Trail is the record of every agent and human action in your organization: who acted, what they did, what it touched, the outcome, and the policy decision that allowed, held or blocked it. Records are append-only and hash-chained, so a later change or removal shows up when the chain is verified. Use it to investigate what happened, to spot-check agent decisions, and to export evidence for an auditor.

## Where to find it

- Sidebar: **Govern > Audit Trail**.
- Command palette: "Go to Audit Trail".
- From Settings, the **Audit Trail** link under Branding.

For a step-by-step view of one agent's reasoning, queries and tool calls, use [Agent Audit](agent-audit.md) instead.

## Who can use it

| Role | What they can do |
|---|---|
| Viewer | Read the ledger, spot-check sample and configuration changes; draft the report and export JSONL or CSV |
| Analyst | Everything a viewer can, plus **Verify chain** and record **Agree** / **Reopen** spot-checks |
| Admin | Same as analyst |

Viewers see "Hash-chained · status visible to analysts and admins" instead of the chain status.

## What you see

**Header.** **Refresh**.

**View tabs.** **Activity ledger**, **Benign spot-check**, **Configuration changes** and **Export & retention**, each with a count.

**Chain pill.** Next to the tabs: how many records are sealed into the hash chain, the latest verification result and when it ran, for example "1,204 records · chain intact · verified 3 minutes ago". If a check found a problem it says "Chain break at record N". Hover it for the range that was checked.

### Activity ledger

- **How to read this ledger**: a collapsible guide explaining each outcome and why records are chained.
- **Filters**: a search box (actor, action, target, incident, rule, hash), an action type list (**All actions**, Verdict, Approval, Containment, Deployment, Detection, Tuning, Hunt, Closure, Report, Access, Feedback, Config, Other), and a window (**Last 24 hours**, **Last 7 days**, **Last 30 days**).
- **Actor chips**: **All actors**, **Agents**, **Humans**, with counts.
- **Outcome chips**: **Any outcome**, **Success**, **Failed**, **Denied**, **Held**, **Pending**, with counts.
- **Record list**: newest first, up to 200 records per page, with time, actor, action, target, outcome and the policy decision. **Newer records** and **Older records** page through the window.
- **Record detail**: the selected record's explanation ("What happened", "What happens next"), its tool calls, its chain link (**Integrity**), links to the related incident or workspace, **Inspect recorded details** and **Copy record JSON**.

Outcomes mean:

| Outcome | Meaning |
|---|---|
| Success | The action ran. It does not mean the conclusion was right. |
| Failed | The action was allowed but could not finish. Treat the result as unknown. |
| Denied by policy | A tenant policy blocked the action before it happened. |
| Held | Paused on purpose (for example autonomy off or a circuit breaker) until a person decides. |
| Pending | Waiting for a human decision. Nothing has executed. |

### Benign spot-check

A random sample of records an agent closed as benign in the last 30 days (newest 100 read). Choose **10% sample**, **25% sample** or **All records**. Each row shows the incident, title and rationale, disposition, confidence, agent and time.

### Configuration changes

Agent configuration, policy, permission, credential, branding and notification changes from the last 90 days (newest 100), each with who made it, when, and the before and after values. Secrets show only their last four characters.

### Export & retention

- **Executive audit report**: choose a **Report window** and the sections to include (**Approvals and denials, with reasons**, **Agent actions by outcome**, **Policy denials and holds**, **Configuration changes**, **Benign spot-check results**).
- **Retention & integrity**: **Hot storage** (how many days of records are kept), **Long-term archive**, **Records in this tenant**, **Last chain verification** and **Export format**.

### Earlier audit views

A collapsed section at the bottom keeps the previous views: **Benign disposition review**, **System audit logs** (paged, with **Export loaded records**) and an executive report drafter.

## What you can do

- **Filter and search the ledger.** Anyone. Filters apply to the records loaded for the current page.
- **Open the related incident or workspace** from a record's detail. Anyone.
- **Verify chain** (or **Re-verify**). Analysts and admins. Re-checks the stored fingerprints. "Chain intact" means nothing has been altered since it was sealed. The chain shows changes; it does not prevent them.
- **Agree** or **Reopen** a spot-check row. Analysts and admins. Your verdict is stored as reviewer feedback. **Reopen** does not reopen the Sentinel incident; reopen it in Sentinel if it needs more work.
- **Draft report.** Builds a summary in your browser from the loaded ledger records. Every figure links back to the matching filtered records. **Download draft (Markdown)** saves it. Review before sharing.
- **Export JSONL** / **Export CSV.** Downloads the loaded ledger records with the chain head and last verification result. See [Export audit evidence](../how-to/export-audit-evidence.md).

Nothing on this page needs approval, and nothing on it changes an incident or a rule.

## Good to know

- **Exports cover the loaded page only**: up to 200 records from the selected window. For a longer period, page through with **Older records** and export each page, or use a shorter window.
- **Retention.** Hot storage keeps agent records for 30 days unless your organization has a different setting ("(default)" is shown when it has not been changed). Older records can be removed by retention cleanup, and the chain verification notes how many sealed records were removed. There is no screen in the console to change retention; ask the Overwatch team.
- **Long-term archive** is "Not configured". There is no archive option today.
- Approval votes are kept with Approvals, not in this ledger.
- Outcomes that were not recorded are derived from the record and marked as derived in the tooltip.
- If the ledger cannot be read you see "Audit records unavailable" with **Retry**. If a refresh fails, the page keeps showing the last records and says they may be stale.

## Related

- [Export audit evidence](../how-to/export-audit-evidence.md)
- [Agent Audit](agent-audit.md)
- [Review agent decisions](../how-to/review-agent-decisions.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
