---
title: Relationships
status: current
reviewed: 2026-10-05
---

# Relationships

Relationships shows how your incidents, the entities in them, Orion's hunts and your detections connect to reported adversary activity. It keeps what was observed in your tenant separate from links that only come from threat intelligence. Use it to see whether something you read about is touching your environment, and to read or generate the strategic brief.

## Where to find it

- Sidebar: **Intelligence > Relationships**.
- Command palette: **Go to Relationships**.
- The strategic brief on the Overview page opens this page.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | All three views, all filters, open records, read the saved brief. |
| Analyst | Everything a viewer can, plus **Ask Atlas**. Analysts can start **Generate brief**, but the server only saves a brief for admins (see "Good to know"). |
| Admin | Everything an analyst can. The generated brief is saved for the tenant. |

## What you see

The page has three views, chosen with **Entity graph**, **Campaigns** and **Strategic brief**, and a **Refresh** button.

### Entity graph

A graph of open incidents, the Sentinel entities mapped to them (users, accounts, devices, IP addresses, processes and others), Orion hunts, and threat actors linked by ingested articles. Lines are drawn either as **Observed in your tenant** or **Linked by threat intel**.

- **Time window**: **24h**, **7d** or **30d**. Open incidents are read for at most 7 days, even with **30d**.
- **Evidence layer**: **Observed + intel** or **Observed only**.
- **Show library** switches to a graph of library detections, source articles, hunts, techniques and actors instead.
- Entities are read for the 8 most severe, most recent open incidents. Other incidents are noted but not drawn. Very busy graphs show the most connected items first, with a "+N more not shown" note.
- Selecting a node opens a side panel with its type, its incidents (click to open the incident), the record behind it (detection or article), and everything it connects to. Buttons: **Open hunt** or **Hunt with Orion**, and **Ask Atlas** (analyst or admin).

If incidents or entities cannot be read, the page says so and shows hunts and intel links only.

### Campaigns

Cards that cluster your library detections, hunts and feed articles by a named actor or by a technique shared by two or more records in the selected window. Each card shows the techniques in order, the evidence for each, and a status: **Observed in tenant** (seen in your hunt hits), **Reported only** or **Not observed**. Links open the Orion hunt, the first detection, the Detection Library or the source article. Nine cards show at first; **Show all … clusters** shows the rest.

### Strategic brief

A generated summary of your detection library, recent hunts and ingested articles, with:

- the headline, summary and **Claims**, each marked **Supported**, **Partly supported** or **Unverified**. Every `[n]` citation is checked on the server against your records and shown as verified only when the record was found;
- tiles for **IOC matches**, **verified true positives**, **hunt hits** and **new articles**. A tile reads **Not connected** where no data source exists yet;
- **In the wild**: recent articles that name a technique or actor, with relevance and trend;
- **IOC matches in your telemetry**: currently "IOC matching is not connected" (Planned);
- **Verified in your environment**: hunts with verified hits in the window;
- **Since your last brief** and **Recommended next steps**, counted from your records;
- **Full generated report** (collapsed): connection hypotheses, assumptions and rationale.

The brief has its own window, **24h** or **7d**.

A collapsed **Library references and examples** section at the bottom lists exact CVE and technique mentions shared across library entries, plus clearly labelled example campaigns for layout only. Their response buttons are disabled.

## What you can do

- **Generate brief** or **Regenerate** creates a new brief from the saved library. It needs at least one library detection and a saved, current library.
- **Send brief** opens a channel picker and **Send**. Brief delivery is Planned: nothing is sent, and the panel says so.
- **Ask Atlas** (analyst or admin) opens Atlas with a question about the selected node.
- **Open hunt** / **Hunt with Orion** opens Orion's workspace on the Agents page.
- Detection, article and incident links open the full detection record, Live Feed or the incident.

Nothing on this page takes a response action. Containment is requested through Approvals, never from the graph.

## Good to know

- **The brief is generated.** It is marked as generated and summarizes library content; shared mentions do not prove a common actor or an active campaign.
- **Saving the brief is admin-only on the server.** The brief is stored in the shared tenant workspace, which only admins can save. An analyst can start generation, but the brief is not saved and the console can show "Dashboard changes could not be saved." Citations are checked only once a brief is saved.
- **Limits.** The brief reads up to 250 library records (120,000 characters), 50 recent hunts and 40 articles. A larger library returns an error asking for a scoped brief.
- **Generation failures** keep the previous brief.
- **Empty states.** "Nothing to connect in this window" (try a longer window), "No clusters in this window" and "No brief generated yet".

## Related

- [Live Feed](live-feed.md)
- [Detection Library](detection-library.md)
- [Atlas copilot](atlas-copilot.md)
- [How to run a threat hunt](../how-to/run-a-threat-hunt.md)
- [How to ask Atlas](../how-to/ask-atlas.md)
- [Overview](overview.md)
