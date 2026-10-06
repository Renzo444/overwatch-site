---
title: How to run a threat hunt
status: current
reviewed: 2026-10-05
---

# How to run a threat hunt

Have Orion search your Microsoft Sentinel data for signs of a reported threat, and read what it found.

## Before you start

- **Analyst** or **admin** to run, retry, ingest or discard hunts. Viewers can read recorded hunts.
- Your Microsoft Sentinel workspace must be connected. Hunts run read-only KQL queries against it; they change nothing.
- Orion runs at most 20 manual hunts and 10 automated hunts per day (UTC). After that, requests are skipped until the next day.

## Steps

### Run a proactive hunt

1. Open **Agents** and click Orion.
2. Click **Run proactive hunt**. Orion picks recent threat reporting and library detections that have not been hunted yet, writes hunt queries and runs them.
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

1. In **Recorded threat hunts**, use the chips **All**, **Has hits**, **Verified zero hits**, **Proposed** or **Failed**, or search.
2. Select a hunt to see Orion's reasoning, **Source**, **Execution** (verified or not), **Hits** and **Technique**, and the query.
3. Use **Copy KQL** to run the query yourself in Microsoft Sentinel, or **Open in Agent Audit** to see the recorded query results and tool calls.

## What happens next

- **Hits** are not incidents. Investigate them in Sentinel or Agent Audit. The devices behind the hits are not stored with the hunt.
- **Verified zero hits** means the query ran successfully and returned nothing in the window. That is a result, not missing data.
- Hunt results feed the Detection Library's hunt status, the Relationships graph and campaigns, and the strategic brief.
- **Send to Renzo as detection** on a completed hunt asks Renzo to draft a detection from it. The draft is added to the library and needs QA and an admin's deployment. The server only allows this action for admins.
- **Automatic hunting.** When an admin turns on Orion's autonomy (the **Autonomy** switch in Orion's workspace header), the agent worker runs proactive hunts on a schedule. Hunts never need approval because they only read data.

## If something goes wrong

- **"Hunt request rejected: …"** The server refused the request; the message gives the reason.
- **"Hunt request outcome is unknown. Check Agent Audit before submitting again; the server may have accepted it."** Check Agent Audit before you retry, to avoid a duplicate run.
- **A hunt under Failed.** Read the error. Click **Retry hunt**, or **Review provider access** if the failure is about a threat-intel provider (provider keys live in Settings > Threat Intel). Failed hunts leave the retry queue after 24 hours or when a retry succeeds.
- **"No source-supported attacker behavior was found; no hunt proposal was created."** or **"No hunt proposed"** The article did not have enough technical evidence.
- **"No hunts recorded yet. Run a proactive hunt or ingest an article."** Nothing has been hunted for your tenant yet.

## Related

- [Agents](../features/agents.md)
- [Live Feed](../features/live-feed.md)
- [Detection Library](../features/detection-library.md)
- [Relationships](../features/relationships.md)
- [Agent Audit](../features/agent-audit.md)
- [How to turn intel into a detection](turn-intel-into-a-detection.md)
- [How to set agent autonomy](set-agent-autonomy.md)
