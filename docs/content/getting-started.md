---
title: Getting started
status: current
reviewed: 2026-10-27
---

# Getting started with Overwatch Console

Overwatch Console is a security operations console for Microsoft Sentinel. A team of AI agents triages incidents, hunts, writes and tunes detections, and records everything they do. Consequential actions wait for a person in Approvals. This page gets you signed in and oriented, then points you to the feature guides.

## Getting access

Today, the Overwatch team creates your organization and its first admin account, and sends that admin a one-time invitation link. The link works once and expires after 72 hours; if it expires, ask the Overwatch team for a new one. The admin sets a password on the **Join your team** page and signs in, and the setup wizard opens to connect Microsoft Sentinel (see [Connect Microsoft Sentinel](how-to/connect-microsoft-sentinel.md)). After that, an admin invites the rest of the team from **Settings > Team**, choosing each person's role (viewer, analyst or admin). The invited person gets an email link, sets their own password and signs in. Invitations need account email to be set up for your deployment; if it is not, ask the Overwatch team to create the accounts. See [Invite a teammate](how-to/invite-a-teammate.md) and [Roles and permissions](concepts/roles-and-permissions.md).

**Self-service trial.** The sign-in page links to **Start a 14-day Sentinel trial**. Enter your **Organization name** and **Work email** and select **Request verification link**. Open the emailed link, choose a password and select **Verify account**, then **Sign in and connect Sentinel**. As your organization's first admin you set up two-step sign-in (below), then reach the **Connect your environment** page; select **Connect your environment** to open your trial workspace page and connect Sentinel (see [Connected trial](#connected-trial)). The 14-day trial starts only when the first Sentinel connection succeeds. If enrollment is closed for your deployment, the page shows "Trial enrollment is not open yet" and offers **Sign in to an existing account** and **Check again**.

## Sign in

1. Open your Overwatch Console address. If you are not signed in, you are sent to the sign-in page.
2. Enter your email address in **Email or username**, and your **Password**.
3. Select **Sign In**.

If the details are wrong you see "Invalid credentials".

### Two-step sign-in for admins

Admins sign in with their password and a six-digit code from an authenticator app (Microsoft Authenticator, Google Authenticator, 1Password or any app that supports time-based codes).

- **First sign-in as an admin:** after your password, the console opens the **Two-step sign-in** page and nothing else works until you set it up. Select **Show setup code**, scan the QR code with the app (or type the key shown under it), enter the code the app shows and select **Turn on two-step sign-in**. Then select **Sign in again** and sign in with your password and a code.
- **Every sign-in after that:** enter your username and password, select **Sign In**, then enter the **Authenticator code** and select **Sign In** again. Each code works once and changes every 30 seconds. Wrong codes count toward the same lock as wrong passwords.
- **Lost your phone?** Another admin of your organization selects **Reset two-step** next to your name in **Settings > Team**, or Overwatch support (AskOverwatch@overwatchsecurity.tech) resets it. The code step on the sign-in page says the same. You then set it up again at your next sign-in. Resetting your password does not turn two-step sign-in off.

Analysts and viewers sign in with a password only. Set up two-step sign-in right after your first sign-in as an admin, so nobody else who learns the password can set it up first.

Sign-in is protected against password guessing:

- After ten failed sign-ins for one account within 15 minutes, that account is locked for 15 minutes, from any network. While it is locked, even the right password shows "Invalid credentials". Wait 15 minutes, or reset your password: a successful reset clears the lock.
- More than five sign-in attempts in a minute from the same network are refused, and you see "Unable to reach the sign-in service. Please try again." Wait a minute and try again.

**Forgot your password?** on the sign-in page lets you request a reset link by email. The link works once and expires after 1 hour. See [Invite a teammate](how-to/invite-a-teammate.md#help-someone-reset-their-password) for the steps. Password resets need account email to be set up for your deployment. If it is not, the page says "Password reset email is not available yet. Contact Overwatch support to reset your password."

The sign-in page also gives the support address under "Trouble signing in?" and links to the **Terms of service** and **Privacy policy**. Both pages are currently marked "Draft for review. This text is not yet in effect."

Your sign-in lasts up to 8 hours. If your account or organization is deactivated, or your role changes, the change applies on your next request.

## Two ways in

### Explore Demo

Explore Demo is a separate, read-only demo access window for a signed-in account. It does not need an Azure connection.

- Go to `/demo` and select **Start or resume demo**. The trial start page does not offer the demo while its data source is not set up.
- Your access lasts seven days from first entry. Signing in again, returning or using **Reset demo progress** does not extend it.
- Demo mode cannot run agents, hunts, deployments, uploads or response actions.
- Right now the shared demo data source is not set up, so the page shows "Demo records unavailable" and no incidents or results. Prepared playback is also disabled.
- **Connect your environment** leaves the demo and takes you to the connected trial setup.

### Connected trial

The connected trial uses your own Sentinel workspace and isolated credentials. An organization admin sets it up on the "Your trial workspace" page (`/trial/setup`), under **Connect Microsoft Sentinel**. There are two ways:

- **Start guided setup** (recommended) opens the setup wizard in the console. You sign in with Microsoft as an administrator and the console creates the Overwatch apps and permissions in your directory, then starts your trial on its own. Organizations that block third-party apps can use a script in Azure Cloud Shell instead. See [Connect Microsoft Sentinel](how-to/connect-microsoft-sentinel.md).
- **Or connect one read-only app yourself**: enter the **Azure directory (tenant) ID**, **Subscription ID**, **Resource group**, **Log Analytics workspace name**, **Application (client) ID** and **Client secret value** of an application with read access to the workspace, then select **Verify and start trial**.

With the read-only app, Overwatch Console checks the workspace identity, reads up to one incident without keeping it, and runs a zero-row SecurityAlert query. Only a successful check stores the reader credentials (encrypted) and starts the 14-day trial. Connecting does not deploy rules or create Azure resources. Viewers and analysts can read the trial status; only an admin can submit the connection.

The page then shows the plan, trial start and end dates, and today's AI request usage against any daily limit. Every organization also has a daily AI spend budget (US$25 by default; Overwatch can change it): administrators are told when 80% of it is used, and agents pause for the rest of the UTC day once it is spent. When the trial expires, new agent requests are blocked but stored evidence stays readable. Overwatch moves a paying organization off the trial plan, which lifts the daily request quotas; the AI budget still applies. Select **Open console** to go to the main console.

## The console at a glance

### Navigation

The left sidebar has four groups:

| Group | Pages |
|---|---|
| Operate | [Overview](features/overview.md), [Incidents](features/incidents.md), [Approvals](features/approvals.md), [Actions](features/actions.md) |
| Agents | [Agents](features/agents.md), [Agent Audit](features/agent-audit.md) |
| Intelligence | [Live Feed](features/live-feed.md), [Detection Library](features/detection-library.md), [Data connectors](features/data-connectors.md), [Relationships](features/relationships.md) |
| Govern | [Metrics & Health](features/metrics-and-health.md), [Audit Trail](features/audit-trail.md), [Settings](features/settings.md) |

- **Approvals** shows a badge with the number of pending requests (shown as 99+ above 99).
- **Agents** shows a badge with your unread agent outputs from the last seven days.
- **Collapse sidebar** shrinks the sidebar to icons. This is remembered in your browser.
- The Atlas box at the bottom of the sidebar lets analysts and admins ask Atlas about the page they are on. See [Atlas copilot](features/atlas-copilot.md).

### Top bar

- **Breadcrumb**: where you are. Select **Overview** to go back.
- **Search incidents, detections, agents**: opens the command palette (see below).
- **Live / Offline**: whether the console's live event stream is connected.
- **Light/dark toggle**: switches between the light and dark theme. Remembered in your browser.
- **Help and support** (question mark): the guide to the page you are on, all guides, **Email support** and **Keyboard shortcuts**. See [Help](features/help.md).
- **Notifications** (bell): see below.
- **Account** (your initials): shows your name, organization and role, plus **Setup** (admins only), **Keyboard shortcuts** and **Sign out**.

On a demonstration deployment, the top bar also shows an **Example features** label.

### Notifications panel

The bell lists what needs attention in what the console has loaded:

- approvals waiting for a decision,
- problems an agent reported in the last 24 hours,
- new threat-intelligence articles since the feed last refreshed.

Selecting an item opens the matching page (Approvals, Agent Audit or Live Feed). **Mark all read** clears the unread count. Read state is kept in your browser only, so it does not follow you to another device. Opening a notification never approves anything.

These are in-console notices. To send alerts to Slack, Teams or a webhook, see [Configure notifications](how-to/configure-notifications.md).

### Command palette

Press **Ctrl+K** (or **⌘K** on a Mac) or select the search box. Type to find:

- loaded incidents (by number or title), which open the investigation view,
- detections in your library,
- agents, which open that agent on the Agents page (Atlas opens the Atlas panel),
- pages ("Go to Approvals").

It also has run commands: **Run Dax (Analyst)**, **Run Demitry (Senior QA)**, **Run Orion (Threat Hunter)**, **Run Marien (Tuning)**, **Force Intel Sync** and **Run Caleb (Malware Analyst)**. Running an agent needs the analyst role. You see "Agent request accepted. Follow its progress in Agent Audit." when the request is taken; follow progress in [Agent Audit](features/agent-audit.md).

The palette shows up to 50 matches.

### Keyboard shortcuts

Press **Shift+?** or choose **Keyboard shortcuts** in the account menu.

| Keys | Action |
|---|---|
| Ctrl/⌘ + K | Open the command palette |
| Ctrl/⌘ + J | Open or close Atlas |
| g then h | Overview |
| g then i | Incidents |
| g then d | Detection Library |
| g then f | Live Feed |
| g then m | Metrics & Health |
| g then s | Settings |
| g then a | Agent Audit |
| Esc | Close a dialog |

The "g" shortcuts do not work while you are typing in a field or while a dialog is open.

### Activity indicator

A thin bar under the top bar shrinks over 30 minutes without mouse, keyboard, scroll or touch activity, and changes when 5 minutes are left. When it runs out, you are signed out and returned to the sign-in page. Any activity in the console resets it.

## First-time setup wizard (admins)

When an admin signs in to an organization that is not configured yet, the setup wizard opens. Admins can reopen it from **Setup** in the account menu or **Setup wizard** in Settings. It has five steps:

1. **Organization**: select **Connect with Microsoft** and sign in as an administrator (Global Administrator, and Owner or User Access Administrator on the Sentinel subscription). Microsoft asks you once to approve Overwatch Console Setup.
2. **Workspace**: pick your Sentinel workspace from the list of workspaces your account can see.
3. **Access**: choose whether to also set up containment, then select **Create access**. The console creates three apps with least-privilege roles on that workspace in your own directory and saves their credentials. No script to run.
4. **Connection test**: runs on its own when setup finishes (or select **Test All Connections**). It checks each of the three apps: that it can sign in and read Sentinel rules, that it has every permission its role needs on the workspace (any missing permission is named), and, for roles that query logs, that a one-row test query succeeds. A note says when a missing optional permission means a feature will not work.
5. **Finish**: final checks that Azure access is valid, that the agents' AI service is ready for your organization, and that the console now sees your organization as configured. Then select **Finish setup**.

### Turn on your SOC

A new organization starts with every agent off, so nothing runs after setup until an admin turns agents on. While they are off, the Overview shows a **Turn on your SOC** card. Dax (triage), Demitry (QA) and Marien (tuning proposals) are preselected; Renzo (detections from threat intelligence) and Orion (threat hunts) are optional. Select **Turn on agents** to enrol the workspace with the agent worker and switch the chosen agents on. The change is recorded in the [Audit Trail](features/audit-trail.md). Nothing is closed, tuned or deployed without approval; to let an individual action run on its own, use Settings → Agent Policies (see [Set agent autonomy](how-to/set-agent-autonomy.md)). Analysts and viewers see the card but only an admin can turn agents on. Until Microsoft Sentinel is connected, the card says "Connect Sentinel first" and an admin sees **Connect Microsoft Sentinel**, which opens the setup wizard; the agent choices appear once the connection test passes.

Setup does not deploy any rules to your workspace. See [Connect Microsoft Sentinel](how-to/connect-microsoft-sentinel.md) for the full steps and error messages.

If your organization blocks third-party apps, select **My organization blocks third-party apps: set up with a script instead** in step 1: you enter the tenant ID and workspace details, run a generated script in Azure Cloud Shell, and it sends the credentials back. You can also enter credentials by hand.

The Azure client secrets setup creates expire after one year. From 30 days before they expire, admins see a warning at the top of the console and on [Data connectors](features/data-connectors.md). Run setup again from the wizard to add new secrets without breaking the current ones.

**Planned:** the **Deploy Sentinel for me** option in step 2 (create a new workspace) is shown but cannot complete yet. Use an existing workspace.

**Close** dismisses the wizard. It will not reopen on its own for you in this browser.

## Where to go next

- [Roles and permissions](concepts/roles-and-permissions.md): what you can do with your role.
- [The agents](concepts/the-agents.md): who Dax, Demitry, Marien, Renzo, Orion, Caleb, Maxwell and Atlas are.
- [Autonomy and approvals](concepts/autonomy-and-approvals.md): what runs on its own and what waits for a person.
- [Triage an incident](how-to/triage-an-incident.md) and [Approve or deny an action](how-to/approve-or-deny-an-action.md).
