---
title: Live Feed
status: current
reviewed: 2026-10-12
---

# Live Feed

Live Feed collects public threat reporting, plus any advisory feeds your administrators add, so you can read it in one place and turn relevant articles into proposed detections or hunts. Use it to keep up with new attacks and to start detection work from a specific report.

## Where to find it

- Sidebar: **Intelligence > Live Feed**.
- Keyboard: press `g` then `f`.
- Command palette: **Go to Live Feed**.
- Clicking an article on the Overview page opens Live Feed with that article selected. Clicking a source article on the Relationships page does the same.
- The notification panel shows "new intelligence articles" when the feed brings in reports you have not seen; clicking it opens Live Feed.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | Read the feed, filter it, open original articles, open the SOC display. |
| Analyst | Everything a viewer can, plus **Evaluate new reports**, **Force evaluate**, **Generate detection**, **Load full article**, **Ingest article URL** and **Ingest as hunt**. Library entries you create here are saved. |
| Admin | Everything an analyst can, plus **Add a source**, which opens Settings > Threat Intel to add your organization's own feeds. |

## What you see

- **Header.** The page title, the buttons **Refresh**, **SOC display**, **Evaluate new reports** and **Ingest article URL**, and an automatic scoring status: **Auto-scoring on**, **Auto-scoring off** or **Auto-scoring unknown** (shown when the setting cannot be read; it never guesses "off").
- **Sources.** One tile per source with its report count and the age of its newest report, or **Fetch failed** with the error (for example "Site blocks automated requests" when a site refuses automated reads). The card header says how many sources failed, or "all reachable", and for admins has an **Add a source** button. Clicking a tile filters the list to that source; clicking it again clears the filter. The built-in sources are the same for every customer. Feeds your administrators added appear after them with a **Custom** marker.
- **Filter bar.** A search box (**Search keywords, CVEs, malware…**), a date range (**Last 24 hours**, **Last 3 days**, **Last 7 days**, **Last 30 days**, **All dates, including unknown**), a source picker and **Reset filters**. A status line shows how many reports are in view.
- **Reports.** The filtered list, newest first, 30 at a time with a **Show … more** button. Each row shows the source (with "(custom)" for your own feeds), age, auto-tags (for example Ransomware, Zero-Day, RCE, Phishing, CVE, Cloud, Identity), CVE IDs, known threat actors and MITRE ATT&CK technique IDs named in the text, and chips for linked detections and hunts. A dot marks new reports, and an eye or double tick shows reports you have viewed or read. If the article has been scored, a chip shows the score and outcome (for example "Scored … · drafted", "below threshold" or "insufficient evidence"), or simply **Evaluated**.
- **Selected report.** The source (with a **Custom source** marker for your own feeds), title, summary, tags and these sections:
  - **Named in the text**: actors and technique IDs found in the title and summary, each with the quoted text it matched. These are exact word matches, not judgements by an agent.
  - **Evaluation**: whether Renzo has scored this article, how (automatically on ingest or on request), and what happened.
  - **Recorded against this report**: library detections and Orion hunts that came from this article, with their confidence score, an **Auto-ingested** marker and a **deployed** marker where they apply.
  - **Full article**: the full page text, loaded on request.
- **Source columns** (collapsed at the bottom). The older per-source column view of the same reports.

## What you can do

- **Refresh** reloads the feed now. The page also refreshes itself every 30 minutes.
- **Read full report** opens the original article in a new tab and marks it as read.
- **Load full article** fetches the article text into the page (the first 8 paragraphs, then **Show all … paragraphs**). Any actors or techniques found only in the full text appear under **Also in the full text**. Analyst or admin. Only public web addresses can be read.
- **Force evaluate** asks Renzo to score this article and adds the result to the Detection Library as a draft, whatever the score. Analyst or admin. If a library entry already exists for the article, nothing happens.
- **Generate detection** asks Renzo to write a behavioral detection from the article and adds it to the Detection Library as a draft with no confidence score. Renzo reads the full article when it can be fetched, and the title and summary otherwise. If the report does not describe a specific attacker behavior, you see "Renzo did not draft a detection: …" and nothing is added. Analyst or admin.
- **Ingest as hunt** sends the article to Renzo, who proposes an Orion hunt for review when the article has enough technical evidence. You see either "Proposed Orion hunt recorded for review" with **Open hunt**, or "No hunt proposed". Nothing is run or deployed. Analyst or admin.
- **Ingest article URL** (header) does the same for any article address you paste into **Article URL**, then **Ingest article**.
- **Evaluate new reports** (header) scores every article from the last 24 hours that has not been evaluated yet, up to 50 per run, one after another. Articles scoring 80 or higher are added to the library as drafts. If nothing is pending you see "Intel already synced." Analyst or admin.
- **SOC display** opens a full-screen slideshow of the feed for a wall screen (see below).
- Clicking a linked detection opens it in the Detection Library. Clicking a linked hunt opens it in Orion's workspace on the Agents page.
- **Settings → Agent Policies** (admins only, under the scoring status) opens the setting that turns automatic scoring on or off.
- **Add a source** (admins only) opens Settings > Threat Intel, where you add your own RSS or Atom feeds. See [How to add an intel feed](../how-to/add-an-intel-feed.md).

None of these actions deploys anything. Every library entry created here starts as a draft that needs QA and an admin's deployment. See [How to turn intel into a detection](../how-to/turn-intel-into-a-detection.md).

### SOC display

**SOC display** opens a full-screen view meant for a wall or portrait screen. It has two modes: **Spotlight** (one report at a time) and **Columns** (one column per source). In Spotlight you can choose **Fade** or **Slide** transitions, a speed of **5s Speed**, **10s Speed**, **15s Speed** or **30s Speed**, play or pause, a date range (**24H**, **3D**, **7D**, **30D**, **ALL**) and a source. Keyboard: Space plays or pauses, the arrow keys move between reports, `F` toggles full screen and Escape closes the display.

Each spotlight report has **Force AI Evaluation** and **Generate Behavioral Rule** (the same actions as **Force evaluate** and **Generate detection**, with the same role rules), **Read Full Original Article**, and a QR code button that shows a code for the article link so someone can open it on a phone. The QR image is drawn by an external QR code service from the article's public link.

## Good to know

- **Automatic scoring.** When an admin turns on **Automatic threat-intelligence ingestion** in Settings > Agent Policies, the agent worker scores each new, relevant article published in the last 6 hours. Articles scoring 80 or higher are added to the library as drafts marked **Auto-ingested**. When it is off, articles are only scored when someone clicks **Evaluate new reports** or **Force evaluate**.
- **What is saved, and for whom.** Read and viewed markers, the "evaluated" list and new library entries are saved in the shared tenant workspace for analysts and admins. Viewers' markers are not saved. If a save fails, or someone else changed the workspace first, the console shows "Dashboard changes could not be saved." or "Newer server changes were detected. Your local changes have not been saved." Use **Reload server state** to recover.
- **Auto-tags and named actors/techniques** are keyword and whole-word matches made when the feed is read. They are not model judgements.
- **Repeat evaluations.** If the exact same article address was already analyzed, the server can skip it, and **Force evaluate** then adds nothing.
- **Scores below 80** are recorded and shown on the article but do not create a library entry (except with **Force evaluate**).
- **Adding sources.** The built-in sources cannot be changed. Admins can add up to 5 of their own RSS or Atom feeds in Settings > Threat Intel; they are fetched at most every 30 minutes and scored like the built-in sources. On the empty state, **Connect a source** and the suggested sources' **Add** buttons open that settings tab (admins only), and **Custom URL** opens **Ingest article URL** (analyst or admin).
- **Empty and error states.** "Loading intelligence feeds…", "Intelligence feeds are unavailable" (previously loaded items may be stale), "No intelligence sources connected" and "No reports match these filters".
- **Dates.** Bounded date ranges hide reports with no recorded date. Choose **All dates, including unknown** to see them.

## Related

- [How to turn intel into a detection](../how-to/turn-intel-into-a-detection.md)
- [How to add an intel feed](../how-to/add-an-intel-feed.md)
- [How to run a threat hunt](../how-to/run-a-threat-hunt.md)
- [Detection Library](detection-library.md)
- [Relationships](relationships.md)
- [Settings](settings.md)
- [The agents](../concepts/the-agents.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
