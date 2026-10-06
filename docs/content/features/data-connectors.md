---
title: Data connectors
status: current
reviewed: 2026-10-05
---

# Data connectors

Data connectors shows what data is flowing into your Microsoft Sentinel workspace, which sources are healthy, what each source is used for, and which Sentinel connectors would close a gap in your detections. Use it when a rule never fires, when you onboard, or when you want to check that a source is still sending.

## Where to find it

- Sidebar: **Intelligence > Data connectors**.
- Command palette: **Go to Data connectors**.

## Who can use it

| Role | What you can do here |
|------|----------------------|
| Viewer | See everything on the page, copy verification KQL, **Refresh**. |
| Analyst | Everything a viewer can, plus **Run check**, **Already covered elsewhere** (dismiss a suggestion) and **Undo**. |
| Admin | Same as analyst. |

Connectors themselves are set up in Microsoft Sentinel, not here. Nothing on this page changes your workspace.

## What you see

- **Summary tiles.** **Connected** (sources sending data), **Daily volume** (last 24 hours), **Healthy** (receiving data), **Needs attention** (degraded or stale) and **Open suggestions** (with the number dismissed). When the workspace cannot be read, tiles say **Unavailable**, never 0.
- **Connector health note.** What Microsoft's own health monitoring reports: how many connectors report and how many fail. If health monitoring is off in your workspace, the note tells you where to turn it on in Microsoft Sentinel (**Settings → Auditing and health monitoring**).
- **Data flow.** A diagram of your top 10 connectors by volume feeding Microsoft Sentinel, and what uses the data: Orion's hunts and library detections are counted; use by Dax, Demitry, Caleb and the strategic brief is shown as "not tracked".
- **Data connectors list.** Category buttons (**All**, **Endpoint**, **Identity**, **Network**, **Email**, **SaaS**, **Cloud**) and one row per connector with its tables, volume and status.
- **Connector detail** for the selected connector:
  - **What it sends**, the Sentinel connector and content hub solution, how data is collected, licence and cost, and a Microsoft Learn link;
  - any issue found, such as daily volume falling against the 7-day average or data that has stopped arriving;
  - **Volume**, **Last ingestion** (with ingest lag when measured) and **Status**;
  - **Tables**, including tables that exist but received nothing in 7 days ("no data");
  - for CEF, the appliances sending events;
  - **Connector status** from Microsoft's health records;
  - **Verify with KQL**, with the query and the latest check result;
  - **Used by**: Orion hunts and library detections that read these tables.
- **Coverage gaps & suggestions.** One card per Microsoft Sentinel connector that would supply tables your library detections need. Each card says why (which library detections reference which tables, and whether those tables are missing or silent), what it unlocks and a priority:
  - **High**: a deployed rule depends on the missing data.
  - **Medium**: only undeployed rules depend on it.
  - **Recommended**: free data Microsoft recommends for every workspace that you are not ingesting.

  A separate list names tables your detections read that no catalog connector writes, such as custom log tables.

### How status is decided

| Status | Rule |
|--------|------|
| Healthy | Data arrived in the last 24 hours at no less than half the 7-day daily average. |
| Degraded | Data arrived in the last 24 hours, but at less than half the 7-day daily average. |
| Stale | Nothing in the last 24 hours, or nothing in 7 days. |

Volumes are billed bytes from the workspace's usage records over a 7-day window.

## What you can do

- **Refresh** re-reads workspace health, the table list, checks and dismissals. The page also re-reads health every 10 minutes while open. If a refresh fails, the figures shown are from the last successful read.
- **Show setup and check** on a gap card shows the connector facts, numbered setup steps for Microsoft Sentinel and the verification panel.
- **Copy KQL** copies the verification query so you can run it in Microsoft Sentinel → Logs.
- **Run check** (analyst or admin) runs the verification query now and saves the result with who ran it and when. Results read **Receiving data**, **No data in the last 24 hours**, **No data in the last 7 days**, **Tables not in the workspace** or **Check failed**, with per-table event counts.
- **Already covered elsewhere** (analyst or admin) dismisses a suggestion. Pick where the data lives (**Another SIEM**, **Separate console**, **Different workspace / tenant**, **We don't use this**), add an optional note and click **Dismiss suggestion**. The dismissal is saved with your name and time, and the reason is also kept in Decision memory.
- **Undo** (analyst or admin) reopens a dismissed suggestion.
- The **library detections read these tables** link opens the Detection Library.

## Good to know

- **Suggestions only name connectors Microsoft Sentinel offers.** Overwatch Console does not install or configure connectors.
- **Gaps depend on your library.** They compare the tables your library detections read against what the workspace receives. With no saved KQL in the library you see "No library detection has saved KQL to check".
- **Partial checks.** If workspace health cannot be read but the table list can, only tables proven absent are listed; tables that stopped sending are not checked until health is readable.
- **Health monitoring coverage.** Microsoft reports health only for some connectors. For the rest, the KQL check is the proof that data arrives.
- **Unavailable states.** "Unavailable · connector health could not be read", "No table ingested data in the last 7 days", "Dismissals unavailable" (dismissed suggestions may show as open) and "Unavailable · coverage gaps cannot be computed".

## Related

- [How to fix a coverage gap](../how-to/fix-a-coverage-gap.md)
- [Detection Library](detection-library.md)
- [Metrics & Health](metrics-and-health.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
