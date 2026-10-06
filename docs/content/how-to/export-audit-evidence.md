---
title: Export audit evidence
status: current
reviewed: 2026-10-05
---

# How to export audit evidence

Download audit records, with proof that they have not been altered, for an auditor, a customer review or an incident report.

## Before you start

- Any role can export. To include a fresh chain verification in the export, you need the **analyst** or **admin** role.
- Exports are built in your browser from the records currently loaded on the page: up to 200 records from the selected window. Decide the period you need before you start.

## Steps

1. Go to **Audit Trail** (sidebar, **Govern**).
2. Analysts and admins: in the chain pill next to the tabs, select **Verify chain** (or **Re-verify**). Wait until it shows the result, for example "chain intact".
3. Select the **Activity ledger** tab and choose the window: **Last 24 hours**, **Last 7 days** or **Last 30 days**.
4. Optional: use **Newer records** / **Older records** to load the page of records you need.
5. Select the **Export & retention** tab.
6. Select **Export JSONL** or **Export CSV**. The file downloads as `audit-ledger-<window>.jsonl` or `.csv`.
7. Optional: for a summary, tick the sections you want under **Executive audit report**, select **Draft report**, check the figures, then select **Download draft (Markdown)**.

## What happens next

- **JSONL** starts with a line describing the chain head (record number and fingerprint), the last verification result and time, the window and the record count, followed by one record per line.
- **CSV** has the columns Timestamp, Position, Actor type, Actor, Action, Type, Target, Outcome, Policy, Incident, Chain seq, Prev hash, Hash and Details, and a final **Chain head** row with the verification status.
- Each record carries its own fingerprint and the fingerprint of the record before it. An auditor can compare these with the chain head to see whether anything was changed or removed after it was sealed. The chain is tamper-evident; it is not signed with a key.
- The executive draft counts the loaded records only. In the console, each figure links back to the filtered records. Review it before sharing.
- Exporting changes nothing and needs no approval.

## If something goes wrong

- **Export buttons are disabled** and the tab says "Ledger records unavailable; nothing to export." or "Loading ledger records…": the ledger has not loaded. Go back to **Activity ledger**, select **Retry** or **Refresh**, then try again.
- **You need more than 200 records.** Export each page separately (use **Older records** between exports), or use a shorter window.
- **You need records older than 30 days.** The ledger window goes up to 30 days, and hot storage keeps agent records for 30 days unless your organization set a different period. There is no long-term archive today. Ask the Overwatch team if you need a longer retention period.
- **The chain pill says "Chain break at record N".** Hover it to see the reason and the range checked. Records removed by retention cleanup are reported separately and are not a break. Raise any other break with the Overwatch team before sharing the evidence.
- **"Chain status unavailable"** with **Retry**: the chain status could not be read. The export still works, but it will show the verification as not run.
- **Viewers** see "Hash-chained · status visible to analysts and admins". Ask an analyst or admin to verify the chain first.
- **Approval votes are not in the ledger export.** They are kept with [Approvals](../features/approvals.md).

## Related

- [Audit Trail](../features/audit-trail.md)
- [Agent Audit](../features/agent-audit.md)
- [Review agent decisions](review-agent-decisions.md)
