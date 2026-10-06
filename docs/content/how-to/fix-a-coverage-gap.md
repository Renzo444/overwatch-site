---
title: How to fix a coverage gap
status: current
reviewed: 2026-10-05
---

# How to fix a coverage gap

Find the data your detections need but are not getting, connect it in Microsoft Sentinel, and confirm it is arriving. Or, if you already cover it elsewhere, record that.

## Before you start

- **Analyst** or **admin** to run verification checks and dismiss suggestions. Viewers can read the gaps and copy the KQL.
- Access to Microsoft Sentinel with rights to enable data connectors. Connectors are set up in Sentinel, not in Overwatch Console.
- Gaps are worked out from the KQL of your library detections, so the library needs at least one detection with a saved query.

## Steps

1. Open **Intelligence > Data connectors**.
2. Click **Refresh** to read the latest workspace health.
3. Scroll to **Coverage gaps & suggestions**. Start with **High** cards (a deployed rule needs the data), then **Medium**, then **Recommended** (free data Microsoft recommends for every workspace).
4. Read why the card is there: which detections need which tables, and whether those tables are missing from the workspace or have stopped receiving events.
5. Click **Show setup and check** to see the Sentinel connector, its content hub solution, how it collects data, licence and cost, a Microsoft Learn link and numbered setup steps.
6. Follow the setup steps in Microsoft Sentinel.
7. Back on the card, click **Run check**. Or click **Copy KQL** and run it in Microsoft Sentinel → Logs.
8. Read the result: **Receiving data** means it worked. **No data in the last 24 hours**, **No data in the last 7 days** or **Tables not in the workspace** mean data is not arriving yet.
9. If you already collect this data somewhere else, click **Already covered elsewhere** instead, choose **Another SIEM**, **Separate console**, **Different workspace / tenant** or **We don't use this**, add a note if useful, and click **Dismiss suggestion**.

To fix a source that has stopped sending: in the **Data connectors** list, select a connector marked **Degraded** or **Stale**, read the issue and **Connector status**, fix the connector in Sentinel, then use **Run check** in **Verify with KQL**.

To fix a gap in technique coverage rather than data: open the **Detection Library**, switch to **MITRE ATT&CK**, look for columns marked **Gap · no detections**, then draft detections for those techniques from Live Feed (see [How to turn intel into a detection](turn-intel-into-a-detection.md)) or ask Orion to hunt for them.

## What happens next

- Once the tables receive data, the gap card disappears on the next read. Health is re-read every 10 minutes while the page is open, or when you click **Refresh**.
- A check result is saved with who ran it and when, so others see it too.
- A dismissed suggestion stays on the page, marked **Dismissed** with the reason, who dismissed it and when. The reason is also saved in Decision memory. **Undo** reopens it.
- Nothing on this page needs approval, because nothing here changes your workspace.

## If something goes wrong

- **Check failed.** The message under the result says why the query could not run.
- **"Unavailable · connector health could not be read"** The workspace could not be queried. Only tables proven absent are listed until health can be read.
- **"Unavailable · coverage gaps cannot be computed"** Neither workspace health nor the table list could be read.
- **"No library detection has saved KQL to check"** Add detections with queries to the library first.
- **A table no connector writes.** Tables listed under "Tables your detections read that no Microsoft Sentinel connector in the catalog writes" are custom or platform tables. Check your own data collection rule or partner connector, or the table name in the detection.
- **Health monitoring is off.** Turn it on under Microsoft Sentinel → **Settings → Auditing and health monitoring** to see connector failures.

## Related

- [Data connectors](../features/data-connectors.md)
- [Detection Library](../features/detection-library.md)
- [How to turn intel into a detection](turn-intel-into-a-detection.md)
- [How to run a threat hunt](run-a-threat-hunt.md)
- [Metrics & Health](../features/metrics-and-health.md)
