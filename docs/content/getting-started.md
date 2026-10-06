---
title: Getting started
status: current
reviewed: 2026-10-05
---

# Getting started with Overwatch Console

Overwatch Console is a security operations console for Microsoft Sentinel. A team of AI agents triages incidents, hunts, writes and tunes detections, and records everything they do. Consequential actions wait for a person in Approvals. This page gets you signed in and oriented, then points you to the feature guides.

## Getting access

Today, access is arranged with the Overwatch team. They create your organization and your user accounts, and set each person's role (viewer, analyst or admin). See [Roles and permissions](concepts/roles-and-permissions.md).

**Planned: self-service signup is not open yet.** The sign-in page links to **Start a 14-day Sentinel trial**. That page currently shows "Trial enrollment is not open yet" and offers **Sign in to an existing account** and **Check again**. When enrollment opens, you will request a verification link with your organization name and work email, set a password from the emailed link, then sign in and connect Sentinel.

## Sign in

1. Open your Overwatch Console address. If you are not signed in, you are sent to the sign-in page.
2. Enter your **Username** (your email address) and **Password**.
3. Select **Sign In**.

If the details are wrong you see "Invalid credentials". After five attempts in a minute from the same network, sign-in is paused for 60 seconds.

Your sign-in lasts up to 8 hours. If your account or organization is deactivated, or your role changes, the change applies on your next request.

## Two ways in

### Explore Demo

Explore Demo is a separate, read-only demo access window for a signed-in account. It does not need an Azure connection.

- Go to `/demo` (or choose **Explore Demo** on the "Choose your workspace" page) and select **Start or resume demo**.
- Your access lasts seven days from first entry. Signing in again, returning or using **Reset demo progress** does not extend it.
- Demo mode cannot run agents, hunts, deployments, uploads or response actions.
- Right now the shared demo data source is not set up, so the page shows "Demo records unavailable" and no incidents or results. Prepared playback is also disabled.
- **Connect your environment** leaves the demo and takes you to the connected trial setup.

### Connected trial

The connected trial uses your own Sentinel workspace and isolated credentials. An organization admin sets it up on the "Your trial workspace" page (`/trial/setup`):

1. Under **Connect Microsoft Sentinel**, enter the **Azure directory (tenant) ID**, **Subscription ID**, **Resource group**, **Log Analytics workspace name**, **Application (client) ID** and **Client secret value** of an application with read access to the workspace.
2. Select **Verify and start trial**.

Overwatch Console checks the workspace identity, reads up to one incident without keeping it, and runs a zero-row SecurityAlert query. Only a successful check stores the reader credentials (encrypted) and starts the 14-day trial. Connecting does not deploy rules or create Azure resources. Viewers and analysts can read the trial status; only an admin can submit the connection.

The page then shows the plan, trial start and end dates, and today's AI request usage against any daily limit. When the trial expires, new agent requests are blocked but stored evidence stays readable. Select **Open console** to go to the main console.

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

It also has run commands: **Run Dax (Analyst)**, **Run Demitry (Senior QA)**, **Run Orion (Threat Hunter)**, **Run Caleb (Malware Analyst)** and **Force Intel Sync**. Running an agent needs the analyst role (Caleb needs admin). Follow progress in [Agent Audit](features/agent-audit.md). **Run Marien (Tuning)** is listed but does not currently start a run; use Marien's workspace on the [Agents](features/agents.md) page instead.

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

A thin bar under the top bar shrinks over 30 minutes without mouse, keyboard, scroll or touch activity, and changes when 5 minutes are left. It is only an indicator: it does not sign you out.

## First-time setup wizard (admins)

When an admin signs in to an organization that is not configured yet, the setup wizard opens. Admins can reopen it from **Setup** in the account menu or **Setup wizard** in Settings. It has six steps:

1. **Tenant Settings**: tenant name and Azure tenant ID.
2. **Azure Config**: choose **I already have Sentinel** and enter the subscription, resource group and workspace name.
3. **Service Principals**: copy the generated Cloud Shell setup script, run it in Azure, and enter the client IDs and secrets it creates.
4. **Connection Test**: **Test All Connections** saves the credentials and checks them.
5. **Rule Pack**: choose Baseline, TI Mapping or Full Suite.
6. **Provisioning**: validates the credentials, then deploys the chosen rule pack to your Sentinel workspace.

Rule pack deployment from the wizard runs straight away when the admin reaches the last step. It does not go through Approvals.

**Planned:** the **Deploy Sentinel for me** option in step 2 (create a new workspace) is shown but cannot complete yet. Use an existing workspace.

**Close** dismisses the wizard. It will not reopen on its own for you in this browser.

## Where to go next

- [Roles and permissions](concepts/roles-and-permissions.md): what you can do with your role.
- [The agents](concepts/the-agents.md): who Dax, Demitry, Marien, Renzo, Orion, Caleb, Maxwell and Atlas are.
- [Autonomy and approvals](concepts/autonomy-and-approvals.md): what runs on its own and what waits for a person.
- [Triage an incident](how-to/triage-an-incident.md) and [Approve or deny an action](how-to/approve-or-deny-an-action.md).
