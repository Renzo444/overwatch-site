---
title: How to run a threat hunt
status: current
reviewed: 2026-10-26
---

# How to run a threat hunt

Have Orion search your Microsoft Sentinel data for signs of a reported threat, triage what the query returns, and read what it found.

## Before you start

- **Analyst** or **admin** to run, retry, ingest or discard hunts, and to send a hunt to Renzo. Viewers can read recorded hunts.
- Your Microsoft Sentinel workspace must be connected. Hunt queries are read-only. The one thing a hunt can write is a new Sentinel incident when Orion judges the results malicious or suspicious (see "What happens next").
- Orion runs at most 20 manual hunts and 10 automated hunts per day (UTC). Failed hunts, and hunts recorded as a missing log source, count toward the limit. After that, a manual request is refused with "Orion has reached today's limit of 20 manual hunts. Try again tomorrow."

## Steps

### Run a proactive hunt

1. Open **Agents** and click Orion.
2. Click **Run proactive hunt**. Orion picks one advisory from recent threat reporting (the built-in sources and any intel feeds your admins added) and reads it, including the techniques and indicators it quotes. Advisories stay active for 7 days and can be hunted again once a day; among those due, Orion picks the one your workspace can best observe and act on. Orion then writes a hunt query against tables that are receiving data and runs it. With no advisory to work from, Orion hunts a library technique that has not been hunted yet.
3. Wait for "Hunt request accepted". Acceptance is not completion: the result appears in **Recorded threat hunts** once Orion records it. The list refreshes every minute.

### Hunt from a specific article

1. In Orion's workspace, paste the address into **Proactive OSINT ingestion** and click **Ingest intel**. (From Live Feed, **Ingest as hunt** does the same for the selected report.)
2. If the article has enough technical evidence, a hunt is saved with the status **Proposed**. Saving does not run anything.
3. In **Recorded threat hunts**, pick **Proposed**, select the hunt and review its query.
4. Click **Execute hunt** to run it, or **Discard** to drop it. A discarded proposal stays in Agent Audit.

### Hunt for a detection's technique

1. In the **Detection Library**, select a rule with a mapped technique.
2. Click **Ask Orion to hunt** in the hunt card. You can also tick several rules and use the bulk **Ask Orion to hunt**.
3. The card shows **Hunt requested** until the result is recorded in Orion's hunt history.

### Read the results

1. In **Recorded threat hunts**, use the chips **All**, **Has hits**, **Verified zero hits**, **Proposed** or **Failed**, or search. Hunts marked **Not run · log source missing** are listed under **All**.
2. Select a hunt to see Orion's reasoning, **Source**, **Execution** (verified or not), **Hits**, **Verdict**, **Incident** (when one was opened) and **Technique**, Orion's triage of the results, and the query.
3. Use **Copy KQL** to run the query yourself in Microsoft Sentinel, or **Open in Agent Audit** to see the recorded query results and tool calls.

## What happens next

- **Second look.** When the first query returns nothing from tables that do hold data, or returns as many rows as the limit allows, Orion runs one follow-up query: broader in the first case, rarest results first in the second. It replaces the first result only when it returns rows, and the hunt then shows the follow-up query. Both are in Agent Audit.
- **Triage.** When a query returns rows, Orion judges each entity in them (account, host, IP address, process) against the hunt's hypothesis and gives the verdict for the most concerning one: malicious, suspicious, benign or inconclusive, with a confidence, the rows that support it, the entity behind it and next steps. One suspicious entity among many ordinary ones still makes the hunt suspicious. Rows on their own are not findings.
- **Findings open an incident automatically.** A malicious or suspicious verdict opens a new Sentinel incident for Dax to triage, and the hunt shows **Incident** with its number. This needs no approval: it only creates an incident and never changes or closes one. If Orion finds the same pattern again within a week while that incident is still open, it adds a comment to it instead of opening another. If the incident could not be opened, the hunt shows **Incident: Could not be opened** and the finding is still recorded.
- **Benign or inconclusive** results are recorded as reviewed and open nothing. Investigate them in Sentinel or Agent Audit if you disagree. The devices behind the hits are not shown with the hunt; open Agent Audit for the recorded query results.
- **Not run · log source missing** means none of the tables that would record the behaviour has data in your workspace, so Orion did not run the query. The hunt names the missing source; connect it (see [Data connectors](../features/data-connectors.md)) to make the behaviour huntable.
- **Verified zero hits** means the query ran successfully and returned nothing in the window. That is a result, not missing data. **No rows · not a verified zero** means the query returned nothing but Orion could not confirm the tables it read receive data.
- Hunt results feed the Detection Library's hunt status, the Relationships graph and campaigns, and the strategic brief.
- **Send to Renzo as detection** on a completed hunt asks Renzo to draft a detection from it (analyst or admin). Hunts with findings show it as **Send to Renzo as detection (recommended)**. The draft is added to the library and needs QA and an admin's deployment. If the hunt does not support a specific attacker behavior, Renzo says so and adds nothing.
- **Automatic hunting.** When an admin turns on Orion's autonomy (the **Autonomy** switch in Orion's workspace header), the agent worker runs a scheduled hunt at most every 6 hours, hunting up to 3 advisories one after another within the daily limit. Hunts do not go through Approvals.

## If something goes wrong

- **"Hunt request rejected: …"** or **"Hunt not submitted: …"** The server refused the request; the message gives the reason, for example the daily limit.
- **"Hunt request outcome is unknown. Check Agent Audit before submitting again; the server may have accepted it."** Check Agent Audit before you retry, to avoid a duplicate run.
- **A hunt under Failed.** Read the error. Click **Retry hunt**, or **Review provider access** if the failure is about a threat-intel provider (provider keys live in Settings > Threat Intel). Failed hunts leave the retry queue after 24 hours or when a retry succeeds.
- **"No source-supported attacker behavior was found; no hunt proposal was created."** or **"No hunt proposed"** The article did not have enough technical evidence.
- **"No hunts recorded yet. Run a proactive hunt or ingest an article."** Nothing has been hunted for your tenant yet.

## Related

- [Agents](../features/agents.md)
- [Live Feed](../features/live-feed.md)
- [How to add an intel feed](add-an-intel-feed.md)
- [Incidents](../features/incidents.md)
- [Detection Library](../features/detection-library.md)
- [Relationships](../features/relationships.md)
- [Agent Audit](../features/agent-audit.md)
- [How to turn intel into a detection](turn-intel-into-a-detection.md)
- [How to set agent autonomy](set-agent-autonomy.md)
