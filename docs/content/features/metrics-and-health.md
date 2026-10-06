---
title: Metrics & Health
status: current
reviewed: 2026-10-05
---

# Metrics & Health

Metrics & Health shows how your SOC is performing (detection, response and SLA measures, rule efficacy, coverage, QA agreement) and whether the platform behind it is healthy. Use it for a weekly review, a management report, or to check that the agents' worker is running.

Every figure shows how many records it was measured from. A value that could not be measured shows as **Unavailable** or **Not measured**, never as zero.

## Where to find it

- Sidebar: **Govern > Metrics & Health**.
- Keyboard: **g** then **m**.
- Command palette: "Go to Metrics & Health".

## Who can use it

| Role | What they can do |
|---|---|
| Viewer | See everything on the page, change the window, print, refresh |
| Analyst | Same as viewer |
| Admin | Same as viewer |

The page is read-only for everyone. Nothing on it changes an incident, rule or agent.

## What you see

**Header.** **Print report** and **Refresh**.

**Window bar.** The **Metrics window** control (**7d**, **30d**, **90d**), a source line, and **Schedule this report**. If more incidents exist than the page reads, the source line says "sample capped at 5,000 incidents".

**Key measurements.** Eight tiles: **MTTD**, **MTTA**, **MTTR**, **SLA compliance**, **True-positive rate**, **False-positive rate**, **Escalation rate** and **Open backlog**. Each shows the value, the change from the previous window where it can be compared, and how many records it was measured from (for example "12 / 40 incidents"). Hover the information icon for the definition. Open backlog lists open incidents by severity and the age of the oldest.

**Alert & incident volume.** Incidents created per day, split by severity, from Sentinel. Alerts are not counted.

**SLA by severity.** For high, medium and low: the time-to-resolve target, the median, how many closures met the target, and the percentage. Reopened incidents cannot be detected because Sentinel keeps no reopen flag. Closures with no valid close time count as unmeasured, not as met.

**Detection efficacy.** Your noisiest deployed rules, with true positives, false positives and precision. Marien uses the noisiest rules as tuning candidates.

**MITRE ATT&CK coverage.** Deployed detections per tactic and how many tactics are covered. Rules that are only in the library, not deployed, do not count.

**QA review · Dax and Demitry.** **Agreement**, **Override rate**, **Override direction** and **Avg confidence**, from Demitry's latest QA decision per incident. Agent agreement is not human-verified accuracy.

**Who handled the work.** Closed incidents split into **Agents (policy-allowed)**, **Agent-assisted analyst**, **Analyst only** and, when it applies, **Owner not recorded**.

**Needs attention.** The five most severe recent incidents (from up to 50 incidents created in the last 7 days), with status and the latest Dax or Demitry verdict. **All incidents** opens the Incidents page.

**Agent issues.** Problems agents reported in their latest 200 events from the last 24 hours (up to six shown). Only failures an agent recorded are listed, so an empty list is not proof of health.

**Platform health.** Three cards, checked every minute:

- **Database connectivity**: whether the console's readiness check reached its database.
- **Tenant worker heartbeat**: whether the agent worker that runs scheduled work has reported in the last 2 minutes. A heartbeat only proves the process was alive.
- **Resolution SLA sample**: median time to resolve over the last 30 days, from up to 1,000 incidents.

**More telemetry.** A collapsed section with agent issue rates, recorded agent operations, Sentinel incident activity, incident distributions, incident title groups and QA details. It uses the page window, but the Sentinel activity panels read at most 30 days, so with **90d** selected they show 30 days and say so.

## What you can do

- **Change the window.** **7d**, **30d** or **90d** changes every panel and the More telemetry section. Changes are compared with the previous window of the same length.
- **Open the incidents behind a number.** Select a key measurement tile to open Incidents with a matching filter (for example Open backlog opens new and active incidents; MTTR, SLA and TP/FP rates open closed incidents). For 7d and 30d the time range carries over; Incidents has no 90-day range, so for 90d it does not.
- **Open an incident.** Select a row in Needs attention to open its investigation.
- **Open an agent.** Select a row in Agent issues to go to that agent on the Agents page.
- **Print report.** Opens your browser's print dialog for the page.
- **Refresh.** Re-reads every source. The page also refreshes on its own every few minutes.

## Good to know

- **SLA targets.** SLA compliance needs a target. If none is set, the tile says "no SLA target set". There is no screen in the console to set SLA targets; ask the Overwatch team.
- **Metrics come from Sentinel and the agent audit record.** If Sentinel cannot be reached, the panels show the error instead of a number.
- **Planned: scheduled reports.** **Schedule this report** only opens the Actions page. Scheduled or emailed metrics reports are not available.
- The panels and tiles cannot be rearranged or customized.
- MTTA and Escalation rate depend on agent records. If the agent audit record is unavailable, they show as unavailable.

## Related

- [Incidents](incidents.md)
- [Agents](agents.md)
- [Audit Trail](audit-trail.md)
- [Tune a noisy rule](../how-to/tune-a-noisy-rule.md)
- [Fix a coverage gap](../how-to/fix-a-coverage-gap.md)
