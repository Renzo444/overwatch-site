---
title: Your first 30 days
status: current
reviewed: 2026-10-30
---

# Your first 30 days

This is the onboarding plan for a new Overwatch Console client, from signed order form to the agents working the way your team wants. You start in approval mode, so nothing in your environment changes without a person approving it, and you decide when (and whether) any action runs on its own.

## Before day 1

Have these ready. The Overwatch team checks them with you on a short kickoff call.

| What | Who | Why |
| --- | --- | --- |
| A Microsoft Sentinel workspace with incidents flowing | Your security team | The agents work on your Sentinel incidents and query its logs |
| An admin who can sign in as Global Administrator, and is Owner or User Access Administrator on the Sentinel subscription | Your Microsoft admin | Setup creates three least-privilege apps in your directory ([Connect Microsoft Sentinel](how-to/connect-microsoft-sentinel.md)) |
| The people who will use the console and their roles (viewer, analyst, admin) | Your SOC lead | Admins change settings and approve; analysts run agents and approve; viewers read ([Roles and permissions](concepts/roles-and-permissions.md)) |
| Who gets approval and alert emails, and any Slack, Teams or webhook target | Your SOC lead | Requests that wait for a person reach someone outside the console ([Configure notifications](how-to/configure-notifications.md)) |
| Your expected incident volume a day | Your SOC lead | It sets your plan and daily AI budget |
| A security contact for breach notices | Your security lead | Named on the order form |

## Day 1: connect and turn on

1. Your first admin signs in and sets up two-step sign-in with an authenticator app ([Getting started](getting-started.md#two-step-sign-in-for-admins)).
2. The setup wizard connects your Sentinel workspace and runs the connection test. Setup does not deploy rules or change your workspace.
3. On the Overview, the **Turn on your SOC** card turns on Dax (triage), Demitry (QA) and Marien (tuning proposals). Leave Renzo and Orion off for now.
4. Invite your team from **Settings > Team** ([Invite a teammate](how-to/invite-a-teammate.md)).
5. Set up notifications so approvals reach the right people.

## Week 1: watch the agents work

Everything stays in approval mode.

- Each morning, open **Approvals** and decide on what is waiting ([Approve or deny an action](how-to/approve-or-deny-an-action.md)).
- Open a few incidents Dax triaged and read the verdict, the queries it ran and Demitry's check ([Review agent decisions](how-to/review-agent-decisions.md)).
- When you disagree with a verdict, deny it or close the incident yourself with your reason. Tell us about anything that looks wrong; that is the most useful feedback you can give.
- Ask Atlas questions about your environment ([Ask Atlas](how-to/ask-atlas.md)).

## Week 2: cut the noise and find the gaps

- Review Marien's tuning proposals for your noisiest rules. Each one shows its replay against past incidents before you approve it ([Tune a noisy rule](how-to/tune-a-noisy-rule.md)).
- Turn on Renzo and look at the coverage map in the Detection Library to see which ATT&CK techniques you have no detection for ([Fix a coverage gap](how-to/fix-a-coverage-gap.md)).
- If you want containment (disable a user, isolate a device), set up response actions. They still wait for approval ([Set up response actions](how-to/set-up-response-actions.md)).

## Weeks 3 and 4: decide how much runs on its own

- Turn on Orion for proactive hunts if you want them ([Run a threat hunt](how-to/run-a-threat-hunt.md)).
- Review your first weeks on **Metrics & Health** and in the **Audit Trail**.
- On a review call with the Overwatch team, decide action by action whether anything should run in Full auto. Many teams keep everything in approval mode; that is fine. Changes are made in **Settings > Agent Policies** by an admin and are recorded in the Audit Trail ([Set agent autonomy](how-to/set-agent-autonomy.md), [Autonomy and approvals](concepts/autonomy-and-approvals.md)).

## Onboarding is done when

- Sentinel is connected and the connection test passes.
- Dax and Demitry run on every new incident.
- Your team has made at least one approval decision and one denial.
- Notifications reach the people who approve.
- You have decided, per action, approval mode or Full auto.
- Your team knows how to reach support ([Support](support.md)).

## If you leave

Ask us to delete your organization's data; we confirm in writing when it is done ([How your data is handled](concepts/data-handling.md)). Deleting data in Overwatch never touches your Sentinel workspace. Remove the Overwatch apps from Microsoft Entra ID to end our access.
