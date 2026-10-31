---
title: Offboard your organization
status: current
reviewed: 2026-10-30
---

# How to offboard your organization

Leave Overwatch Console and remove everything your organization connected: the apps, roles and consent in your Microsoft directory, every rule Overwatch's agents deployed, and every key and connection Overwatch holds. You keep an exit report that lists each item and what happened to it. Your Sentinel logs are never touched.

## Before you start

- You need the **admin** role in Overwatch Console. Other roles see "Only organization administrators can offboard."
- In Microsoft you need to be a **Global Administrator** of the directory your Sentinel workspace is in, and **Owner** or **User Access Administrator** on the workspace's subscription. Removing apps, role assignments and custom roles needs both.
- The rules Overwatch deployed are Overwatch's detection content, so they are always removed. Your own rules are never touched.

## Steps

1. Go to **Govern > Settings** and open the **Offboard** tab. It lists what your organization has connected: Sentinel workspaces, agent apps, the response actions app, rules Overwatch deployed, webhooks, integration and intel keys, members and the subscription.
2. Choose **Delete my data after 30 days** or **Delete my data as soon as offboarding finishes**.
3. Select **Start offboarding**, type your organization's name and select **Stop agents and start**. Every agent and schedule stops at once and members who are not administrators lose access. Nothing is removed yet; until the Microsoft step you can select **Cancel offboarding**.
4. Select **Download export**. You get one file with your investigations, verdicts, audit trail, reports and the names of the detections Overwatch ran for you (without their detection logic).
5. Select **Sign in with Microsoft**, sign in as the administrator described above and approve **Overwatch Console Setup** if Microsoft asks. Back on the tab, select **Remove now**. The console removes, for each connected workspace, every rule Overwatch deployed, the agent apps' access and the three custom roles, then the three agent apps and their secrets, the response app with its Graph and Defender permissions, and last the consent to Overwatch Console Setup. It checks each one is gone and lists it as **removed**, **not present** or **failed**.
   - If your organization blocks third-party apps, select **Download the removal script**, run it in Azure Cloud Shell (Bash) as the same administrator, then select **tell us you ran it**.
6. Select **Finish offboarding**. Overwatch deletes your connection secrets, webhooks, integration and intel keys and account links, and cancels the subscription at the end of the period you paid for. If you chose **Delete my data as soon as offboarding finishes**, download the export first.
7. Keep the **Exit report**: **Print or save as PDF** saves a copy.

## What happens next

Your data is kept for 30 days (or not at all, if you chose that), during which administrators can still sign in and download the export. Then every record of your organization is deleted and Overwatch keeps only a deletion record: when it happened, who started it and how many records were deleted. Stripe keeps your invoices for accounting.

## If something was not removed

When the exit report shows **failed**, or you used the script, check these in the Microsoft portals:

- Microsoft Entra admin center > **App registrations** > **All applications**: search "Overwatch-" and delete each app. Then **Deleted applications** > delete permanently.
- Entra admin center > **Enterprise applications**: open **Overwatch Console Setup** > **Properties** > **Delete**.
- Azure portal > your Sentinel workspace > **Access control (IAM)**: remove role assignments to Overwatch apps, then delete the custom roles "Overwatch Analyst", "Overwatch Engineer" and "Overwatch Deployer".
- Microsoft Sentinel > **Analytics**: delete any rule Overwatch deployed that is still there. Their names are in your export.

## Related

- [How your data is handled](../concepts/data-handling.md)
- [Settings](../features/settings.md)
- [Connect Microsoft Sentinel](connect-microsoft-sentinel.md)
