---
title: Configure notifications
status: current
reviewed: 2026-10-12
---

# How to configure notifications

Send incident verdicts, waiting approvals, agent failures, Orion's hunt findings and playbook notification steps to Slack, Microsoft Teams or a webhook.

## Before you start

- You need the **admin** role.
- Have an incoming webhook URL ready for each destination:
  - **Slack**: an incoming webhook (it starts with `https://hooks.slack.com/services/`).
  - **Microsoft Teams**: a Teams Workflows webhook ("Post to a channel when a webhook request is received"). Messages are sent as Adaptive Cards.
  - **Webhook**: any HTTPS endpoint that accepts a JSON POST.
- These are notifications sent outside the console. The bell in the top bar works without any setup.

## Steps

1. Go to **Settings** and select the **Notifications** tab.
2. On the destination card (**Slack**, **Microsoft Teams** or **Webhook**), paste the webhook URL into the URL field.
3. Select **Save**. The card changes to **Configured · off**.
4. Select **Send test** on that card. You see "<destination> accepted the test message. Check the channel to confirm it arrived." Check that the message arrived.
5. Turn on **Deliver to Slack** (or **Deliver to Microsoft Teams**, **Deliver to Webhook**) on that card. The card changes to **Configured**.
6. Under **Delivery policy**, turn on **Enable external notifications**.
7. Choose the **Minimum severity for external delivery**: **Critical only**, **High and above** (the starting value), **Medium and above**, **Low and above** or **All**.
8. Check the event switches. All of them start on; turn off any you do not want:
   - **Orion hunt findings**
   - **Workflow notification steps**
   - **Incident verdicts**
   - **Approvals waiting**
   - **Agent failures**

Switches and the severity list save as soon as you change them. A notice confirms each save.

## What happens next

A notification is sent only when all of these are true: the master switch is on, the event's switch is on, the event's severity is at or above your minimum, and at least one destination is configured and switched on. Each event is sent like this:

| Event | When it is sent | Severity |
|---|---|---|
| **Incident verdicts** | Dax finishes triage of a High incident (whatever the verdict); Demitry confirms a true positive; Dax or Demitry hands an incident to a person for review (sent once per incident) | The incident's severity. A hand-off to a person is never below medium |
| **Approvals waiting** | A new request is waiting in [Approvals](../features/approvals.md), such as a close, a rule change or a containment. Also when Marien holds a tuning proposal back for a detection engineer. Requests that auto mode approves on its own do not notify | High for containment and other high-risk requests, otherwise medium |
| **Agent failures** | Dax or Demitry cannot finish an investigation or review; any agent keeps failing (several failed runs in a row), again if it is still failing a day later, and once when it works again | High (the "working again" message is medium) |
| **Orion hunt findings** | An Orion hunt records findings | The hunt's severity |
| **Workflow notification steps** | A playbook in [Actions](../features/actions.md) reaches a Notify step | The step's severity (info if none is set) |

Sentinel incidents are never above High, so **Critical only** filters out incident, approval and agent-failure notifications.

- Each delivery attempt and whether the provider accepted it is recorded in [Agent Audit](../features/agent-audit.md) under Notifications. Use **Open Agent Audit** at the bottom of the tab. "Accepted" means the provider took the message, not that someone read it.
- Each settings change is recorded in the [Audit Trail](../features/audit-trail.md) under **Configuration changes**.
- A failed delivery never stops the agent action that triggered it.

To change a destination later, paste a new URL and select **Save** (leave the field blank to keep the current one). To stop using it, select **Remove**, then **Remove destination** to confirm. The stored webhook is deleted.

## If something goes wrong

- **The test fails** with "The destination did not accept the test message (...)": the destination refused or did not answer. Check the URL and that the webhook is still active in Slack or Teams, save it again, and send another test. **Send test** is disabled until a URL is saved. A test ignores the master switch, the event switches and the minimum severity.
- **Nothing arrives for real events.** Check that **Enable external notifications** is on, the event's switch is on, the destination's **Deliver to ...** switch is on, and the minimum severity is not higher than the event's severity (see the table above). Then look under Notifications in Agent Audit.
- **"Settings changed elsewhere. Reload before saving."** Another admin saved changes after you opened the tab. Select **Refresh** at the top of Settings and make your change again.
- **"Notification settings unavailable"** with **Retry**: the settings could not be read. Retry, or reload the page.
- **The URL is not shown after saving.** This is expected. URLs are write-only and stored encrypted.
- **IOC matches** shows **Not available**. Nothing sends this event yet. Email, daily digests and SLA alerts are not available either.
- **"Tenant administrators manage external notification destinations."** You are not an admin. Ask one to make the change.

## Related

- [Settings](../features/settings.md)
- [Approve or deny an action](approve-or-deny-an-action.md)
- [Run a threat hunt](run-a-threat-hunt.md)
- [Build a playbook](build-a-playbook.md)
- [Agent Audit](../features/agent-audit.md)
