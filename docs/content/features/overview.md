---
title: Overview
status: current
reviewed: 2026-10-05
---

# Overview

Overview is the console's home page. It puts the decisions waiting for you first, then what the agents recorded, then what the threat-intel feed is reporting. Use it at the start of a shift, or any time you want to know what needs you.

## Where to find it

- Sidebar: **Operate > Overview**. It is also the page the console opens on the first time you sign in; after that the console reopens the last page you used.
- Command palette (Ctrl+K or Cmd+K): **Go to Overview**.
- Keyboard: press `g` then `h`.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | See every panel, change the layout and windows, refresh, and click through to other pages. |
| Analyst | Everything a viewer can do. Approve and Deny on the decision card are shown but disabled. |
| Admin | Everything above, plus **Approve** and **Deny** on the "Needs your decision" card. |

## What you see

The page header reads "Know what needs you." Every count on the page shows where it came from and the window it covers, in a small line under the panel title. When a source cannot be read, the panel says "Unavailable" or shows an error. It never shows a zero in place of missing data.

**Overview layout.** A toggle with two options, **Analyst** and **SOC lead**.
- **Analyst** (the default): "Your decisions and queue first." The strategic brief sits near the bottom as a collapsed row.
- **SOC lead**: "Brief and adversary activity first." A strategic brief card appears at the top with four tallies: awaiting decision, issue reports, articles with hunt hits, and new articles in the selected article window. Clicking the card opens the Relationships page.

**Stat strip.** Four counts. Each one is a button that opens the page behind it.
- **Open incidents returned**: open Sentinel incidents created in the last 7 days, up to 50 per read (shown as "50+" at the cap). Opens Incidents.
- **Pending approvals**: requests in the current approval queue, up to 100 per read. Opens Approvals.
- **Recorded dispositions**: agent events that recorded a disposition, from the latest 200 agent events in the agent window. Opens Agent Audit.
- **Issue reports**: agent events that report a failure or blocked work, from the same 200 events. Opens Agent Audit.

**Needs your decision.** The highest-risk pending approval in the queue (high, then medium, then low). It shows the requested action, who asked for it, the linked incident number, the risk and how many approvals it has (for example "0 of 1 approvals"). Below that, two tiles quote the recorded analysis from Dax and the QA review from Demitry for that incident, or say that none was recorded. If the queue is empty you see "No requests are waiting for you."

**Swarm activity.** One row per agent with its latest output from the last 7 days, newest first. Agents with nothing recorded still appear, marked "No recorded output in this snapshot". When the console tracks what you have read, each row shows your unread count. Clicking a row opens that agent on the Agents page; **All agents** opens the Agents page.

**Needs attention.** The five most severe open incidents from the same 7-day, 50-incident read, with a search box ("Find an incident or ID…") and a severity filter (**All severities**, Critical, High, Medium, Low, Informational). A footer says how many of the matching incidents are shown. Clicking an incident opens its full investigation workspace. **All incidents** opens the Incidents page.

**Recent issue reports.** Up to four recent agent log entries that mention failures or blocked work. These are leads, not a health check. **Inspect evidence** opens Agent Audit.

**Adversary operations.** A carousel of articles from the Live Feed, ranked by relevance to your tenant: articles with hunt hits in your tenant first, then articles linked to your detections, then the newest. Each card shows the source, age, the named threat group (or "Unattributed"), up to three ATT&CK technique IDs named in the article, the hunt status and how many detections link to it. The carousel moves on its own every few seconds while there is more than one article; it pauses while your pointer or keyboard focus is on it, and it does not move if your system asks for reduced motion. If some feeds failed to load, a line names them.

**Techniques in reporting.** ATT&CK techniques named in the window's articles, with how often each appears and your coverage for it: detection deployed, hunted only, or a gap. A technique only counts when an article names its ID; nothing is inferred.

**Actor watch.** Threat groups named in the window's articles, how often, and how they relate to your tenant: "Hunt hits in tenant", "Covered" or "Coverage gap".

**Strategic brief** (Analyst layout). A collapsed row. Open it to read the latest generated brief, its top threats and when it was generated. The text is labelled as generated. If there is no brief, it tells you to generate one from Relationships.

**More telemetry.** A collapsed section with two panels:
- **Sign-in geography**: Sentinel sign-ins for the last 24 hours, top 20 countries, on a map and in a ranked list. Select a country to see its sign-ins, recorded failures, unknown outcomes and how many had coordinates. This is sign-in telemetry, not confirmed threats.
- **Swarm conversations**: recent agent records grouped into threads when they share an incident or correlation ID, up to 50 records.

## What you can do

- **Refresh** (header): re-reads incidents, approvals, agent activity, sign-in geography and agent outputs. Any role. The page also refreshes on its own about every 30 seconds (sign-in geography about every 5 minutes).
- **Agent Audit** (header): opens the Agent Audit page. Any role.
- **Overview layout**: switch between **Analyst** and **SOC lead**. Any role. The choice is saved in this browser only.
- **Article window**: **24h**, **7d**, **14d** or **30d**. Sets the window for Adversary operations, Techniques in reporting, Actor watch and the SOC lead tally. Any role.
- **Previous article** / **Next article** arrows and the dots under the carousel: move through the articles. Clicking an article title opens it on the Live Feed page. **Live Feed** opens the Live Feed page.
- **Approve** on the decision card (admin only). Opens the approval dialog described in [Approvals](approvals.md). When the request is a containment response the button reads **Approve isolation** or **Approve account disable**. Your vote is held for 10 seconds with an **Undo** button before it is recorded. Approving never runs a response by itself.
- **Choose a response** (shown instead of Approve when Demitry confirmed a threat but did not name a target): opens the Approvals page, where an admin selects the response.
- **Deny** on the decision card (admin only). Opens the deny dialog, where you pick a reason and can add a note for the agents.
- **Review evidence**: opens the full investigation workspace for the linked incident. Any role.
- **Agent window** (inside More telemetry): **Last hour**, **Last 6 hours** or **Last 24 hours**. Sets the window for the Recorded dispositions and Issue reports counts, Recent issue reports and Swarm conversations. Any role.
- In Swarm conversations: **Show** (**All activity**, **Linked investigations**, **Issues**), **Search records**, and **Pause** / **Resume** to freeze the display while you read. Any role.

## Good to know

- Every count is bounded: up to 50 incidents, up to 100 approvals and the latest 200 agent events per read. A count at the cap is shown with a "+".
- "Open incidents returned" is not a count of all open incidents in Sentinel. It covers incidents created in the last 7 days, up to 50.
- The decision card shows one request. If more are waiting, it says how many more are in Approvals.
- If your tenant is not connected yet, panels say so ("Connect a tenant to see approvals.") instead of showing empty data.
- The strategic brief is generated on request from the Relationships page. Opening Overview never generates one.
- The Overview layout choice is stored in your browser, so it does not follow you to another device.

## Related

- [Approvals](approvals.md)
- [Incidents](incidents.md)
- [How to approve or deny an action](../how-to/approve-or-deny-an-action.md)
- [How to triage an incident](../how-to/triage-an-incident.md)
- [Live Feed](live-feed.md)
- [Agent Audit](agent-audit.md)
- [Relationships](relationships.md)
