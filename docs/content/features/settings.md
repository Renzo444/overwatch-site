---
title: Settings
status: current
reviewed: 2026-10-19
---

# Settings

Settings holds your organization's configuration (external notifications, branding, threat-intelligence sources, agent policies and the team) and your own preferences for how agents appear. Most of it is for admins; everyone can set their own agent appearance and read the agent policies.

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
| Branding | No access (a notice says so) | No access (a notice says so) | View and change |
| Threat Intel | No access | No access | View and change |
| Agent Policies | View | View | View and change |
| Agent appearance | Own profile | Own profile | Own profile and the tenant default |
| Team | No access | No access | View and change |
| Setup wizard link | Hidden | Hidden | Shown |

Where you have no access, the tab says so (for example "Tenant administrators manage external notification destinations." or "Only organization administrators can manage the team.") and asks nothing of you.

## What you see

**Header.** **Refresh** re-reads every settings tab.

**Tabs.** **Notifications**, **Branding**, **Threat Intel**, **Agent Policies**, **Agent appearance**, **Team**. Admins also see a **Setup wizard** link at the end of the tab row, which reopens the first-time setup wizard (see [Getting started](../getting-started.md)).

### Notifications

Where Overwatch Console sends alerts outside the console.

- **Delivery policy**: **Enable external notifications** (master switch), **Minimum severity for external delivery** (**Critical only**, **High and above**, **Medium and above**, **Low and above**, **All**), and event switches: **Orion hunt findings**, **Workflow notification steps**, **Incident verdicts**, **Approvals waiting** and **Agent failures**. **IOC matches** is shown as **Not available**.
- **Destinations**: **Slack**, **Microsoft Teams** and **Webhook**, each with a write-only webhook URL field, a **Deliver to ...** switch, **Save**, **Send test** (once a URL is saved) and **Remove**.

Step by step: [Configure notifications](../how-to/configure-notifications.md).

### Branding

Your organization's name and logo.

- **Organization name** (required).
- **Logo URL** (HTTPS only, no embedded credentials).
- **Accent** choices, and **Advanced colours** for exact values.
- **Preview** of the name and logo.
- **Save branding**.

Analysts and viewers see "Only organization administrators can change branding." instead of the form.

Step by step: [Set up branding](../how-to/set-up-branding.md).

### Threat Intel

Threat-intelligence providers and your own advisory feeds.

- **Threat intelligence providers**: **VirusTotal** is used for Caleb's file hash reputation lookups. It shows **Configured** or **Not configured**, and Caleb's last recorded lookup in the last 30 days. **Connect** (or **Rotate key**) opens a dialog to enter a **New VirusTotal API key** and **Save key**. **Remove credentials** asks you to confirm, then blocks future hash lookups. Keys are write-only: once saved they are never shown again, and saving does not test them. Only file hashes are sent to VirusTotal; this does not enable sample uploads or sandbox execution. **AbuseIPDB**, **AlienVault OTX** and **MISP** are listed as **Not available**: there is no integration for them yet.
- **Your intel feeds**: up to five RSS or Atom feeds of your own (for example an ISAC or vendor advisory feed), each with a **Feed name** and **Feed URL (https)**. Orion and Renzo read them alongside the built-in sources. Step by step: [Add an intel feed](../how-to/add-an-intel-feed.md).

### Agent Policies

How much the agents may do on their own, and the rules they must follow.

- **Scheduled operations**: **Dax triages new incidents automatically**, **Run agents on a schedule for this workspace**, **Automatic threat-intelligence ingestion** (Renzo scores each new relevant article; articles scoring 80 or higher become Auto-ingested drafts in the Detection Library) and **Caleb scheduled hash lookups**. Each shows On or Off.
- **What runs on its own**: one row per agent action, each set to **Approval** (a person approves every time), **Full auto** (runs on its own once its checks pass, with spot checks) or **Scheduled** (approval during your staffed hours, full auto outside them). Everything starts in Approval. Today only **Demitry closes a false positive** and **Maxwell deploys a Renzo detection** can be set to Full auto or Scheduled; Maxwell's row also has a **Daily limit** (1 to 20). **Marien applies a rule tune**, **Demitry overrides Dax and closes** and **Containment (isolate a host, disable an account)** always wait for a person. Rows set to Scheduled share one set of **Staffed hours**. Each row explains its checks and shows which mode is in force now. Step by step: [Set agent autonomy](../how-to/set-agent-autonomy.md).
- **Enforced boundaries**: what the policy engine enforces today.
- **Custom rules**: rules per agent that **Allow**, **Deny** or **Require Approval** based on severity, classification, entity count, confidence score or action type. **Add rule** opens the rule builder. Each policy can be switched on or off, expanded, and deleted with **Delete policy**.
- **More policy controls**: ready-made **Policy templates** to apply.

Background: [Autonomy and approvals](../concepts/autonomy-and-approvals.md).

### Agent appearance

How agent names and faces appear in the console.

- **Agent names**: **Specialist names** (Dax, Orion, Maxwell...) or **Role titles** (Security Analyst, Threat Hunter...).
- **Avatar style**: **Portraits**, **Bot icons** or **Monograms**.
- **Per-agent icon**: pick an icon for each agent, or reset it to the avatar style default.

A banner shows the admin default. Your choices apply only to you. **Use admin default** removes your own choices. Admins can switch **Edit appearance for** between **Your profile** and **Tenant default**; the tenant default applies to everyone who has not made their own choice.

### Team

The people in your organization.

- **Invite a person**: **Email**, **Name (optional)** and **Role** (**Viewer**, **Analyst** or **Administrator**), then **Send invitation**. The person gets an email link to set their own password.
- **People**: everyone in the organization (up to 200, newest first) with their email, role, status (**Active**, **Invited** or **Deactivated**) and last sign-in. Each person other than you has a role picker and **Deactivate** or **Reactivate**.

Step by step: [Invite a teammate](../how-to/invite-a-teammate.md).

## What you can do

| Action | Who | Takes effect |
|---|---|---|
| Change notification policy or destinations, send a test | Admin | Immediately for new notifications. Policy switches save as you change them; a destination URL saves when you select **Save**. |
| Save branding | Admin | Immediately |
| Connect, rotate or remove the VirusTotal key | Admin | Immediately; lookups already running may still finish |
| Add or remove your own intel feeds | Admin | New items are fetched every 30 minutes |
| Switch scheduled operations | Admin | For new agent-worker requests; work in progress is not cancelled |
| Change what runs on its own, Maxwell's daily limit or staffed hours | Admin | Immediately, for the whole organization |
| Add, switch, delete or apply policy rules | Admin | Immediately |
| Change your own agent appearance | Everyone | Immediately, for you only |
| Change the tenant default appearance | Admin | Immediately, for everyone without their own choice |
| Invite a person, change a role, deactivate or reactivate | Admin | On the person's next request |

Tenant setting changes (notifications, branding, credentials, intel feeds, agent configuration including what runs on its own, policies, the tenant default appearance) are recorded in the [Audit Trail](audit-trail.md) under **Configuration changes**, with before and after values. Invitations and role changes are recorded in the Audit Trail's **Activity ledger**. None of these changes go through Approvals; they are made directly by the admin.

## Good to know

- **Not available on Notifications**: email, daily digests, SLA alerts and the **IOC matches** event.
- **Branding only applies in a few places.** The organization name appears in your account menu and the trial pages. The logo and accent choices are stored and shown in the Branding preview, but the console does not use them yet (Planned).
- **Team invitations need account email.** If account email is not set up for your deployment, the Team tab shows "Invitations need account email" instead of the invite form. You can still change roles and deactivate people.
- **Team guards.** You cannot change your own role or deactivate yourself, and the organization always keeps at least one active admin.
- **Conflicting edits.** If another admin changed notifications or policies since you loaded them, you see "Settings changed elsewhere. Reload before saving." (or "Policies changed elsewhere. Refresh before saving."). Select **Refresh** and try again.
- A reversed automatic close switches **Demitry closes a false positive** back to Approval by itself. The row says so, and the change is in the Audit Trail.
- Scheduled operations need an active agent worker. Check **Tenant worker heartbeat** on [Metrics & Health](metrics-and-health.md).
- There is no SLA target or retention screen in Settings. Ask the Overwatch team for these.

## Related

- [Configure notifications](../how-to/configure-notifications.md)
- [Set up branding](../how-to/set-up-branding.md)
- [Set agent autonomy](../how-to/set-agent-autonomy.md)
- [Add an intel feed](../how-to/add-an-intel-feed.md)
- [Invite a teammate](../how-to/invite-a-teammate.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
