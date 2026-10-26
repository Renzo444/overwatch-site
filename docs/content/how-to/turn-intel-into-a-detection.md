---
title: How to turn intel into a detection
status: current
reviewed: 2026-10-26
---

# How to turn intel into a detection

Take a threat report from Live Feed (or any article address) and get a draft detection into the Detection Library, ready for QA, testing and deployment.

## Before you start

- **Analyst** or **admin** to score articles, generate detections, run backtests and send rules to QA. Viewers can read the feed and the library only.
- **Admin** to edit a draft's query and to deploy.
- Your Microsoft Sentinel workspace must be connected for the later QA, backtest and deploy steps.
- To draft from your own advisory sources, an admin can add them first. See [How to add an intel feed](add-an-intel-feed.md).

## Steps

1. Open **Intelligence > Live Feed**.
2. Use the search box, date range or a source tile to find the report, then click it in **Reports**.
3. Check **Named in the text** for the actors and ATT&CK techniques it mentions. If you need more than the summary, click **Load full article**.
4. Choose how to draft the detection:
   - **Force evaluate**: Renzo reads the article, scores it from 0 to 100, and adds the result to the library as a draft whatever the score.
   - **Generate detection**: Renzo writes a behavioral detection from the article (the full text when it can be read, otherwise the title and summary). It has no confidence score. If the report does not describe a specific attacker behavior, Renzo says so and adds nothing.

   Renzo writes rules for the attacker's technique, so they still fire when the attacker changes infrastructure, hashes or file names. He takes into account which techniques your workspace already covers and what data it ingests. A rule that would match only the report's hashes, IP addresses, domains or URLs is discarded, unless an admin has turned on **Renzo may write indicator-only rules** in Settings > Agent Policies.
5. Wait for the button to finish. The new entry appears under **Recorded against this report**.
6. Click the entry's name to open it in the **Detection Library**.
7. In the rule detail, read **Why Renzo built this** and the **Query**.
8. In the **Backtest** panel, choose **7 days**, **30 days** or **90 days** and click **Run backtest**.
9. If the result is **NOISY** or **NO MATCHES**, use **Refine with Atlas**, or **Edit query** (admin) and then **Save & re-run backtest**.
10. Click **Send to QA** so Demitry reviews the rule. For a new rule, QA also fails a rule that matches only indicators (unless allowed) and a rule whose technique your live rules already cover, unless it catches something they miss.
11. When QA passes and the backtest passes, deploy it. See [How to deploy or recall a rule](deploy-or-recall-a-rule.md).

You can also draft from any article address: open **Agents**, open Renzo, paste the address into **Detection from threat intel** and click **Generate proposal**. To score many reports at once, click **Evaluate new reports** in the Live Feed header; it scores up to 50 unevaluated articles from the last 24 hours and adds those scoring 80 or higher.

## What happens next

- The entry starts at **Draft** and moves through **In QA**, **QA approved** and **Backtest passed** to **Deployed**. By default nothing is deployed until an admin clicks **Deploy** and confirms. If an admin has set **Maxwell deploys a Renzo detection** to Full auto (or Scheduled) in Settings > Agent Policies, Maxwell also reviews drafts on his own and deploys those that pass every review check, up to a daily limit. See [How to deploy or recall a rule](deploy-or-recall-a-rule.md).
- If an admin has turned on **Automatic threat-intelligence ingestion** (Settings > Agent Policies), new relevant articles are scored automatically and those scoring 80 or higher arrive as drafts marked **Auto-ingested**. They still need a passed review and a deployment, by an admin or by Maxwell under Full auto. When Renzo's switch is on, his scheduled research cycles work from these articles and may draft a tested detection from one.
- The article's score and outcome show on its Live Feed row and in its **Evaluation** section.

## If something goes wrong

- **"Load a writable tenant workspace before generating content."** The tenant library has not loaded, a save failed, or you are a viewer. Use **Reload server state** and try again.
- **"Dashboard changes could not be saved."** or **"Newer server changes were detected. Your local changes have not been saved."** The library change was not saved. Use **Reload server state** and try again.
- **Nothing happens on Force evaluate or Generate detection.** A library entry already exists for this article, or the same article address was already analyzed.
- **"Renzo did not draft a detection: …"** The report does not support a specific attacker behavior, or every rule Renzo wrote matched only indicators. The message gives Renzo's reason.
- **"Engineer Failed: …"** or **"Analysis Failed: …"** Renzo could not draft a detection. The message gives the reason.
- **"No reports match these filters."** Widen the date range or clear the search.

## Related

- [Live Feed](../features/live-feed.md)
- [How to add an intel feed](add-an-intel-feed.md)
- [Detection Library](../features/detection-library.md)
- [How to deploy or recall a rule](deploy-or-recall-a-rule.md)
- [How to run a threat hunt](run-a-threat-hunt.md)
- [How to fix a coverage gap](fix-a-coverage-gap.md)
- [The agents](../concepts/the-agents.md)
