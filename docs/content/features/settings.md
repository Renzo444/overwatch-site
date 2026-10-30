---
title: Settings
status: current
reviewed: 2026-10-27
---

# Settings

Settings holds your organization's configuration (external notifications, branding, threat-intelligence sources, agent policies, the team and response actions) and your own preferences for how agents appear. Most of it is for admins; everyone can set their own agent appearance and read the agent policies.

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
| Response actions | No access | No access | View and change |
| Setup wizard link | Hidden | Hidden | Shown |

Where you have no access, the tab says so (for example "Tenant administrators manage external notification destinations." or "Only organization administrators can manage the team.") and asks nothing of you.

## What you see

**Header.** **Refresh** re-reads every settings tab.

**Tabs.** **Notifications**, **Branding**, **Threat Intel**, **Agent Policies**, **Agent appearance**, **Team**, **Response actions**. Admins also see a **Setup wizard** link at the end of the tab row, which reopens the first-time setup wizard (see [Getting started](../getting-started.md)).

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
- **What runs on its own**: one row per agent action, each set to **Approval** (a person approves every time), **Full auto** (runs on its own once its checks pass, with spot checks) or **Scheduled** (approval during your staffed hours, full auto outside them). Everything starts in Approval. **Demitry closes a false positive**, **Maxwell deploys a Renzo detection** and the three containment rows (**Isolate a device Demitry confirmed compromised**, **Disable an account Demitry confirmed compromised** and **Revoke the sign-in sessions of an account Demitry confirmed compromised**) can be set to Full auto or Scheduled; Maxwell's row also has a **Daily limit** (1 to 20) and **Rules Maxwell may keep** (5 to 200, default 50), with the note that Sentinel allows 512 rules per workspace, Maxwell always leaves 50 free for your own rules, skips rules that repeat a live one, and asks you before deploying one that overlaps. **Marien applies a rule tune** and **Demitry overrides Dax and closes** always wait for a person. Below the rows, **Protected from automatic containment** lists the accounts and devices automatic containment never touches (one per line; **Save protected list**). See [Containment under Full auto](../concepts/autonomy-and-approvals.md#containment-under-full-auto). Rows set to Scheduled share one set of **Staffed hours**. Each row explains its checks and shows which mode is in force now. Step by step: [Set agent autonomy](../how-to/set-agent-autonomy.md).
- **What Demitry reviews** (admin only): **By risk** (the default) gives a full senior review to Dax's benign calls on high-risk incidents, verdicts below 70% confidence or without one, incidents Dax flagged and every High or Critical incident, and passes other verdicts on with the note "Passed without a senior review". **Every verdict** reviews everything Dax records, which catches more and uses more of the daily AI allowance. The change applies from the next review run and is recorded in the Audit Trail.
- **Detection engineering** (admin only): how Renzo writes new detections. **Renzo may write indicator-only rules** (Off by default) allows rules that match only a threat report's hashes, IP addresses, domains or URLs. While it is off, Renzo writes rules for the attacker's technique and indicator-only rules are discarded before review. A change applies to drafts written from then on.
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
- **People**: everyone in the organization (up to 200, newest first) with their email, role, status (**Active**, **Invited** or **Deactivated**) and last sign-in. Admins also show **two-step on** or **two-step not set up**. Each person other than you has a role picker and **Deactivate** or **Reactivate**, and **Reset two-step** when they have set up an authenticator (see [Getting started](../getting-started.md#two-step-sign-in-for-admins)).

Step by step: [Invite a teammate](../how-to/invite-a-teammate.md).

### Response actions

The app that approved containment runs with, in your own Azure directory. Agents only propose a response; people approve it and an administrator runs it from [Approvals](approvals.md).

- **Connect with Microsoft**: sign in as a Global Administrator of your Sentinel directory, then **Create the response app**. The console creates the app in your directory and grants its permissions, with each step shown as it runs. No script.
- **Use a script instead** (or **Set up with Cloud Shell** when sign-in setup is not available): opens **Generate script**. The script creates the same app, "Overwatch-Responder-" plus your organization's name, and grants it only **User.EnableDisableAccount.All**, **User.Read.All** and **User.RevokeSessions.All** on Microsoft Graph, and **Machine.Isolate** and **Machine.Read.All** on Defender for Endpoint (skipped when Defender is not in your tenant). Run it in Azure Cloud Shell (Bash) as a Global Administrator or Privileged Role Administrator; it sends the app's details back and this tab checks its permissions. **Copy script** copies it. The key inside works once and expires in 24 hours.
- One row per provider: **Microsoft Entra ID** (disable an account, re-enable it to undo, and revoke its sign-in sessions) and **Microsoft Defender for Endpoint** (isolate a device, release it to undo). Each shows **Ready**, **Not set up**, **Not checked**, **Missing permissions** or **Not available** (Sentinel not connected yet), the app ID, when permissions were last checked and when the secret expires.
- **Enter app details**: use an app you already have. Enter the **Application (client) ID** and **New client secret**, then **Save and check**.
- **Check permissions**, **Replace** and **Remove** on a provider that is set up. **Remove** asks you to confirm.
- **How a response runs**: Agent proposes, People approve, Administrator runs, Overwatch verifies, Undo.

A response can only run when its provider shows **Ready**. Step by step: [Set up response actions](../how-to/set-up-response-actions.md).

## What you can do

| Action | Who | Takes effect |
|---|---|---|
| Change notification policy or destinations, send a test | Admin | Immediately for new notifications. Policy switches save as you change them; a destination URL saves when you select **Save**. |
| Save branding | Admin | Immediately |
| Connect, rotate or remove the VirusTotal key | Admin | Immediately; lookups already running may still finish |
| Add or remove your own intel feeds | Admin | New items are fetched every 30 minutes |
| Switch scheduled operations | Admin | For new agent-worker requests; work in progress is not cancelled |
| Change what runs on its own, Maxwell's daily limit or rule limit, or staffed hours | Admin | Immediately, for the whole organization |
| Switch **Renzo may write indicator-only rules** | Admin | For drafts written from then on |
| Add, switch, delete or apply policy rules | Admin | Immediately |
| Change your own agent appearance | Everyone | Immediately, for you only |
| Change the tenant default appearance | Admin | Immediately, for everyone without their own choice |
| Invite a person, change a role, deactivate or reactivate | Admin | On the person's next request |
| Set up, check, replace or remove response actions | Admin | Immediately for the next response run; actions already sent are not undone |

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
- [Set up response actions](../how-to/set-up-response-actions.md)
- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
