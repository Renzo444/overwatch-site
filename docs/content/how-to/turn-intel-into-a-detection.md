---
title: How to turn intel into a detection
status: current
reviewed: 2026-10-05
---

# How to turn intel into a detection

Take a threat report from Live Feed (or any article address) and get a draft detection into the Detection Library, ready for QA, testing and deployment.

## Before you start

- **Admin** to save new library entries. The server only accepts library saves from admins, and **Generate detection** is admin-only. Analysts can score articles and request QA, but a library entry they create is not saved.
- Your Microsoft Sentinel workspace must be connected for the later QA, backtest and deploy steps.

## Steps

1. Open **Intelligence > Live Feed**.
2. Use the search box, date range or a source tile to find the report, then click it in **Reports**.
3. Check **Named in the text** for the actors and ATT&CK techniques it mentions. If you need more than the summary, click **Load full article**.
4. Choose how to draft the detection:
   - **Force evaluate**: Renzo reads the article, scores it from 0 to 100, and adds the result to the library as a draft whatever the score.
   - **Generate detection**: Renzo writes one behavioral detection from the article's title and summary. It has no confidence score.
5. Wait for the button to finish. The new entry appears under **Recorded against this report**.
6. Click the entry's name to open it in the **Detection Library**.
7. In the rule detail, read **Why Renzo built this** and the **Query**.
8. In the **Backtest** panel, choose **7 days**, **30 days** or **90 days** and click **Run backtest**.
9. If the result is **NOISY** or **NO MATCHES**, use **Refine with Atlas** or **Edit query** (admin), then **Save & re-run backtest**.
10. Click **Send to QA** so Demitry reviews the rule.
11. When QA passes and the backtest passes, deploy it. See [How to deploy or recall a rule](deploy-or-recall-a-rule.md).

You can also draft from any article address: open **Agents**, open Renzo, paste the address into **Detection from threat intel** and click **Generate proposal**. To score many reports at once, click **Evaluate new reports** in the Live Feed header; it scores up to 50 unevaluated articles from the last 24 hours and adds those scoring 80 or higher.

## What happens next

- The entry starts at **Draft** and moves through **In QA**, **QA approved** and **Backtest passed** to **Deployed**. Nothing is deployed until an admin clicks **Deploy** and confirms.
- If an admin has turned on **Automatic threat-intelligence ingestion** (Settings > Agent Policies), new relevant articles are scored automatically and those scoring 80 or higher arrive as drafts marked **Auto-ingested**. They still need QA and an admin's deployment.
- The article's score and outcome show on its Live Feed row and in its **Evaluation** section.

## If something goes wrong

- **"Load a writable tenant workspace before generating content."** The tenant library has not loaded, a save failed, or you are a viewer. Use **Reload server state** and try again.
- **"Dashboard changes could not be saved."** The library change was not saved. This is expected for analysts, because library saves are admin-only.
- **Nothing happens on Force evaluate or Generate detection.** A library entry already exists for this article, or the same article address was already analyzed.
- **"Engineer Failed: …"** or **"Analysis Failed: …"** Renzo could not draft a detection. The message gives the reason.
- **"No reports match these filters."** Widen the date range or clear the search.

## Related

- [Live Feed](../features/live-feed.md)
- [Detection Library](../features/detection-library.md)
- [How to deploy or recall a rule](deploy-or-recall-a-rule.md)
- [How to run a threat hunt](run-a-threat-hunt.md)
- [The agents](../concepts/the-agents.md)
