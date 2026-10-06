---
title: Configure notifications
status: current
reviewed: 2026-10-05
---

# How to configure notifications

Send Orion's hunt findings and playbook notification steps to Slack, Microsoft Teams or a webhook.

## Before you start

- You need the **admin** role.
- Have an incoming webhook URL ready for each destination:
  - **Slack**: an incoming webhook (it starts with `https://hooks.slack.com/services/`).
  - **Microsoft Teams**: a Teams Workflows webhook that accepts MessageCard payloads.
  - **Webhook**: any HTTPS endpoint that accepts a JSON POST.
- These are notifications sent outside the console. The bell in the top bar works without any setup.

## Steps

1. Go to **Settings** and select the **Notifications** tab.
2. On the destination card (**Slack**, **Microsoft Teams** or **Webhook**), paste the webhook URL into the URL field.
3. Select **Save**. The card changes to **Configured**.
4. Turn on **Deliver to Slack** (or **Deliver to Microsoft Teams**, **Deliver to Webhook**) on that card.
5. Under **Delivery policy**, turn on **Enable external notifications**.
6. Choose the **Minimum severity for external delivery**: **Critical only**, **High and above**, **Medium and above**, **Low and above** or **All**.
7. Turn on the events you want: **Orion hunt findings** and/or **Workflow notification steps**.

Switches and the severity list save as soon as you change them. A notice confirms each save.

## What happens next

- A notification is sent only when all of these are true: the master switch is on, the event's switch is on, the event's severity is at or above your minimum, and at least one destination is configured and switched on.
- **Orion hunt findings** are sent when an Orion hunt records findings. **Workflow notification steps** are sent when a playbook in [Actions](../features/actions.md) reaches a Notify step.
- Each delivery attempt and whether the provider accepted it is recorded in [Agent Audit](../features/agent-audit.md) under Notifications. Use **Open Agent Audit** at the bottom of the tab. "Accepted" means the provider took the message, not that someone read it.
- Each settings change is recorded in the [Audit Trail](../features/audit-trail.md) under **Configuration changes**.

To change a destination later, paste a new URL and select **Save** (leave the field blank to keep the current one). To stop using it, select **Remove**, then **Remove destination** to confirm. The stored webhook is deleted.

## If something goes wrong

- **No test message.** **Send test** is disabled: there is no test-send yet, and saving does not send a message. To check a destination, wait for a real event and look in Agent Audit.
- **"Settings changed elsewhere. Reload before saving."** Another admin saved changes after you opened the tab. Select **Refresh** at the top of Settings and make your change again.
- **"Notification settings unavailable"** with **Retry**: the settings could not be read. Retry, or reload the page.
- **The URL is not shown after saving.** This is expected. URLs are write-only and stored encrypted.
- **Approvals waiting** and **IOC matches** show **Not available**. Nothing sends these events yet. Email, daily digests, SLA alerts and agent-failure subscriptions are not available either.
- **"Tenant administrators manage external notification destinations."** You are not an admin. Ask one to make the change.

## Related

- [Settings](../features/settings.md)
- [Run a threat hunt](run-a-threat-hunt.md)
- [Build a playbook](build-a-playbook.md)
- [Agent Audit](../features/agent-audit.md)
