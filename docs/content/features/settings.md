---
title: Settings
status: current
reviewed: 2026-10-05
---

# Settings

Settings holds your organization's configuration (external notifications, branding, threat-intelligence credentials and agent policies) and your own preferences for how agents appear. Most of it is for admins; everyone can set their own agent appearance.

## Where to find it

- Sidebar: **Govern > Settings**.
- Keyboard: **g** then **s**.
- Command palette: "Go to Settings".
- The Live Feed's link to Agent Policies opens the **Agent Policies** tab directly.

Settings opens on the **Agent appearance** tab.

## Who can use it

| Tab | Viewer | Analyst | Admin |
|---|---|---|---|
| Notifications | No access | No access | View and change |
| Branding | No access (see Good to know) | No access | View and change |
| Threat Intel | No access | No access | View and change |
| Agent Policies | View | View | View and change |
| Agent appearance | Own profile | Own profile | Own profile and the tenant default |
| Setup wizard link | Hidden | Hidden | Shown |

Where you have no access, the tab says so (for example "Tenant administrators manage external notification destinations.") and asks nothing of you.

## What you see

**Header.** **Refresh** re-reads every settings tab.

**Tabs.** **Notifications**, **Branding**, **Threat Intel**, **Agent Policies**, **Agent appearance**. Admins also see a **Setup wizard** link at the end of the tab row, which reopens the first-time setup wizard (see [Getting started](../getting-started.md)).

### Notifications

Where Overwatch Console sends alerts outside the console.

- **Delivery policy**: **Enable external notifications** (master switch), **Minimum severity for external delivery** (**Critical only**, **High and above**, **Medium and above**, **Low and above**, **All**), and event switches: **Orion hunt findings** and **Workflow notification steps**. **Approvals waiting** and **IOC matches** are shown as **Not available**.
- **Destinations**: **Slack**, **Microsoft Teams** and **Webhook**, each with a write-only webhook URL field, a **Deliver to ...** switch, **Save**, **Send test** (disabled) and **Remove** once configured.

Step by step: [Configure notifications](../how-to/configure-notifications.md).

### Branding

Your organization's name and logo.

- **Organization name** (required).
- **Logo URL** (HTTPS only, no embedded credentials).
- **Accent** choices, and **Advanced colours** for exact values.
- **Preview** of the name and logo.
- **Save branding**.

Step by step: [Set up branding](../how-to/set-up-branding.md).

### Threat Intel

Credentials for threat-intelligence providers. Credentials are write-only: once saved they are never shown again.

- **VirusTotal**: used for Caleb's file hash reputation lookups. Shows **Configured** or **Not configured**, and Caleb's last recorded lookup in the last 30 days. **Connect** (or **Rotate key**) opens a dialog to enter a **New VirusTotal API key** and **Save key**. **Remove credentials** asks you to confirm, then blocks future hash lookups.
- **AbuseIPDB**, **AlienVault OTX** and **MISP** are listed as **Not available**: there is no integration for them yet.

Saving a key does not test it. Only file hashes are sent to VirusTotal; this does not enable sample uploads or sandbox execution.

### Agent Policies

How much the agents may do on their own, and the rules they must follow.

- **Scheduled operations**: **Automatic threat-intelligence ingestion** (the agent worker reads the feeds and Renzo scores each new relevant article; articles scoring 80 or higher become Auto-ingested drafts in the Detection Library) and **Caleb scheduled hash lookups**. Each shows On or Off.
- **Tenant autonomy level**: Level 0 **Manual**, Level 1 **Advisory**, Level 2 **Semi-auto**, Level 3 **Autonomous**. Level 4 **Full auto** is shown as **Not available**. Moving to level 2 or higher, or back to 0, asks you to confirm.
- **Enforced boundaries**: what the policy engine enforces today.
- **Custom rules**: rules per agent that **Allow**, **Deny** or **Require Approval** based on severity, classification, entity count, confidence score or action type. **Add rule** opens the rule builder. Each policy can be switched on or off, expanded, and deleted with **Delete policy**.
- **More policy controls**: ready-made **Policy templates** to apply.

Step by step: [Set agent autonomy](../how-to/set-agent-autonomy.md). Background: [Autonomy and approvals](../concepts/autonomy-and-approvals.md).

### Agent appearance

How agent names and faces appear in the console.

- **Agent names**: **Specialist names** (Dax, Orion, Maxwell...) or **Role titles** (Security Analyst, Threat Hunter...).
- **Avatar style**: **Portraits**, **Bot icons** or **Monograms**.
- **Per-agent icon**: pick an icon for each agent, or reset it to the avatar style default.

A banner shows the admin default. Your choices apply only to you. **Use admin default** removes your own choices. Admins can switch **Edit appearance for** between **Your profile** and **Tenant default**; the tenant default applies to everyone who has not made their own choice.

## What you can do

| Action | Who | Takes effect |
|---|---|---|
| Change notification policy or destinations | Admin | Immediately for new notifications. Policy switches save as you change them; a destination URL saves when you select **Save**. |
| Save branding | Admin | Immediately |
| Connect, rotate or remove the VirusTotal key | Admin | Immediately; lookups already running may still finish |
| Switch scheduled operations | Admin | For new agent-worker requests; work in progress is not cancelled |
| Change the autonomy level | Admin | Immediately, for the whole organization |
| Add, switch, delete or apply policy rules | Admin | Immediately |
| Change your own agent appearance | Everyone | Immediately, for you only |
| Change the tenant default appearance | Admin | Immediately, for everyone without their own choice |

Every tenant setting change is recorded in the [Audit Trail](audit-trail.md) under **Configuration changes**, with before and after values. None of these changes go through Approvals; they are made directly by the admin.

## Good to know

- **Not available on Notifications**: test messages (**Send test** is disabled), email, daily digests, SLA alerts, agent-failure subscriptions, and the **Approvals waiting** and **IOC matches** events.
- **Branding only applies in a few places.** The organization name appears in your account menu and the trial pages. The logo and accent choices are stored and shown in the Branding preview, but the console does not use them yet (Planned).
- **The Branding tab currently loads only for admins.** Analysts and viewers see "Branding unavailable".
- **Conflicting edits.** If another admin changed notifications or policies since you loaded them, you see "Settings changed elsewhere. Reload before saving." (or "Policies changed elsewhere. Refresh before saving."). Select **Refresh** and try again.
- Scheduled operations need an active agent worker. Check **Tenant worker heartbeat** on [Metrics & Health](metrics-and-health.md).
- There is no user management, SLA target or retention screen in Settings. Ask the Overwatch team for these.

## Related

- [Configure notifications](../how-to/configure-notifications.md)
- [Set up branding](../how-to/set-up-branding.md)
- [Set agent autonomy](../how-to/set-agent-autonomy.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
