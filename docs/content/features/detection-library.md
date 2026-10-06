---
title: Detection Library
status: current
reviewed: 2026-10-05
---

# Detection Library

The Detection Library holds every detection rule your tenant has drafted, and shows how far each one has got on the path from draft to deployment in Microsoft Sentinel. Being in the library does not mean a rule is deployed. Use it to review drafts, test them against past data, send them to QA and, as an admin, deploy or recall them.

## Where to find it

- Sidebar: **Intelligence > Detection Library**.
- Keyboard: press `g` then `d`.
- Command palette: **Go to Detection Library**. Searching for a detection's name in the palette opens its full record.
- In Live Feed, clicking a detection under **Recorded against this report** opens the library with that rule selected.
- On Data connectors, the "library detections read these tables" link opens the library.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | Browse, filter and search rules, switch to the ATT&CK matrix, open full records, see backtest results and version history, export. |
| Analyst | Everything a viewer can, plus **Run backtest**, **Send to QA**, **Ask Orion to hunt**, **Ask Marien to review**, **Refine with Atlas**. |
| Admin | Everything an analyst can, plus **Edit query**, **Apply & re-run**, **Deploy**, **Deploy anyway**, **Recall**, and **Delete** in the full record. |

## What you see

- **Filters.** A search box (**Search name, technique, article, actor, KQL…**) with a shown/total count, a view switch (**List** or **MITRE ATT&CK**), a sort (**Newest first**, **Severity**, **Lifecycle stage**, **Not hunted first**, **Confidence, highest first**), lifecycle chips (**All stages**, **Draft**, **In QA**, **QA approved**, **Backtest passed**, **Deployed**), hunt chips (**Any hunt status**, **Hunted by Orion**, **Not hunted**), and pickers for tactic, source article, age (**Any time**, **Last 24 hours**, **Last 7 days**, **Last 30 days**) and origin (**Any origin**, **Auto-ingested**, **Manual (user-triggered)**). **Clear all filters** resets them.
- **Rule list.** One row per rule: severity, name, source article, technique and tactic (or **Unmapped**), Orion's hunt state, Renzo's confidence score, an **Auto** marker for auto-ingested drafts, the lifecycle stage with progress dots, age and a **Record** button. Tick boxes select rules for bulk actions.
- **Rule detail.** For the selected rule:
  - technique, tactic and the source article (click to open it);
  - an Orion hunt card (for example "Orion hasn't hunted T1059", "Hunted · 2 hits", "Hunt proposed") with **View hunt** or **Ask Orion to hunt**;
  - four tiles: **Author**, **QA evidence**, **Backtest** and **Confidence**;
  - **Why Renzo built this**, when the rule has a recorded rationale (marked as generated);
  - the deployment bar with **Send to QA**, **Deploy** or **Recall**, and **Full record**;
  - the **Backtest** panel;
  - the **Query** with its version history (for example "Original · Renzo", "Marien · tuning proposal", "You · manual edit") and a short query hash.
- **MITRE ATT&CK matrix.** Every tactic as a column, with a cell per technique showing how many rules cover it, how many are deployed and its hunt state. Empty tactics show **Gap · no detections**. Rules with no tactic appear under **Unmapped**. Clicking a cell filters the list to that technique.
- **Export and deployment history** (collapsed). **Export CSV** and **Export JSON** for the rules in view, and the results of deployments run from this page in this session.

### Lifecycle stages

| Stage | Meaning |
|-------|---------|
| Draft | In the library, not yet sent to QA. |
| In QA | A QA review by Demitry is running or did not pass. |
| QA approved | A QA review passed. |
| Backtest passed | QA passed and a backtest of the current query passed. |
| Deployed | The rule is recorded as deployed in Sentinel. |

## What you can do

- **Run backtest** (analyst or admin) runs the rule's saved query over the last **7 days**, **30 days** or **90 days** of your Log Analytics data. It is read-only: it only reads counts and creates nothing in Sentinel. The result is one of:
  - **PASSED**: it matched, at no more than 3 alerts a day.
  - **NOISY**: more than 3 alerts a day.
  - **NO MATCHES**: zero matches. The panel lists what zero can mean, such as the source table receiving no data.
  - **MISSES POSITIVES**: it missed known-attack events someone attested.

  Backtest results are stored for the tenant. A result from an earlier version of the query is flagged so you can re-run it.
- After a backtest, follow-up options appear:
  - **Refine with Atlas** opens Atlas with the rule, the result and the query.
  - **Edit query** (admin, undeployed rules only) opens an editor. **Save & re-run backtest** saves a new version and tests it.
  - **Request deployment** or **Send to QA first** appear after a pass.
  - **Attest a known positive**, **Ask Orion to hunt** and **Ask Marien to review** appear after zero matches. Marien only reviews deployed rules.
  - **Deploy anyway** (admin) appears after any result other than a pass. You must type a reason, which is saved to Decision memory before anything deploys. If the reason cannot be saved, nothing deploys. Only **Full incidents** mode is available; **Alert-only** is Planned.
- **Tuning suggestions from Marien** appear under a non-passing backtest when Marien has a pending proposal for the rule. For a draft, **Apply & re-run** (admin) saves the proposal as a new version and re-runs the backtest. For a deployed rule, **Review in Marien's workspace** opens the tuning review.
- **Send to QA** (analyst or admin) asks Demitry to review the rule. Reviews are limited to 3 per minute. A passed review expires after one hour and is lost if you reload the page, so deploy soon after it passes.
- **Deploy** (admin) appears once a current QA review has passed, and needs a passing backtest. You confirm in a dialog. Maxwell then deploys that exact reviewed query to Sentinel as a scheduled rule that creates incidents. The server re-checks the review and query hash, and rejects a different query.
- **Recall** (admin) deletes a deployed rule from Sentinel after you confirm.
- **Full record** or **Record** opens the detection record with the tabs **Overview** (AI assessment, ATT&CK coverage, Pyramid of Pain), **Provenance & QA** and **Detections**. It has **Export JSON** and **Delete**.
- **Bulk actions** (tick rules first): **Send to QA** (drafts only, up to 3 at a time), **Backtest selected**, **Ask Orion to hunt**, **Export** (CSV) and **Clear**.
- **Refresh** reloads stored backtests, Marien's suggestions and version history.

Deploy and recall from this page are direct admin actions with a confirmation dialog. They do not create a request on the Approvals page. See [How to deploy or recall a rule](../how-to/deploy-or-recall-a-rule.md).

## Good to know

- **Deployed rules are not edited here.** To change a deployed rule's query, use Marien's tuning review, or recall the rule and edit the draft.
- **Library changes are saved by admins only.** New entries, edits, deploy results and deletions are saved to the shared tenant library, and the server only accepts those saves from admins. Backtests, QA reviews, version history and hunt requests are stored separately and work for analysts.
- **Delete** in the full record removes the entry from the library with no confirmation. It does not remove a deployed rule from Sentinel. Recall the rule first.
- **Confidence** is Renzo's 0 to 100 score from the article evaluation. Rules made with **Generate detection** show **Not scored**.
- **No attested positives** are linked to library rules yet, so a passing backtest does not confirm the rule catches a real attack.
- **Empty states.** "No detections in the library yet. Generate detections from threat intelligence in Live Feed." and "No detections match."

## Related

- [How to turn intel into a detection](../how-to/turn-intel-into-a-detection.md)
- [How to deploy or recall a rule](../how-to/deploy-or-recall-a-rule.md)
- [How to tune a noisy rule](../how-to/tune-a-noisy-rule.md)
- [How to run a threat hunt](../how-to/run-a-threat-hunt.md)
- [How to fix a coverage gap](../how-to/fix-a-coverage-gap.md)
- [Live Feed](live-feed.md)
- [Data connectors](data-connectors.md)
- [Agents](agents.md)
