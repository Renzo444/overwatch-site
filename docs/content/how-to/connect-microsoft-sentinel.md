---
title: Connect Microsoft Sentinel
status: current
reviewed: 2026-11-02
---

# How to connect Microsoft Sentinel

Connect your organization's Microsoft Sentinel workspace to Overwatch Console with the setup wizard, so the agents can read incidents and logs and work on your detections. You sign in with Microsoft and the console creates everything. Organizations that block third-party apps can enter the details of apps they created themselves.

## Before you start

- You need the **admin** role in Overwatch Console. The wizard opens on its own the first time an admin signs in to an organization that is not connected yet. You can also open it from **Setup** in the account menu (your initials, top right) or **Setup wizard** in Settings.
- You need an existing Microsoft Sentinel workspace.
- In Microsoft you need one account that is a **Global Administrator** of the directory and **Owner** or **User Access Administrator** on the subscription Sentinel runs in. You need it once, for setup; the agents never use it.
- If your organization came from a connected trial, start from **Start guided setup** on the "Your trial workspace" page. See [Getting started](../getting-started.md#connected-trial).

## Steps

### Connect with Microsoft (recommended)

1. In **Organization**, select **Connect with Microsoft**. Microsoft's sign-in opens.
2. Sign in with the administrator account above. Microsoft asks you once to approve **Overwatch Console Setup**: it lets the console act as you during setup to create app registrations and role assignments. Select **Accept**. The console then holds that sign-in for 30 minutes at most and deletes it as soon as setup finishes.
3. Back in the wizard, it says "Signed in as" your account and directory. Check the directory is the one your Sentinel workspace is in, then select **Continue**. If it is not, select **Sign in with a different Microsoft account**.
4. In **Workspace**, the wizard lists the Log Analytics workspaces your account can see in that directory, with Microsoft Sentinel workspaces first. Select yours and select **Continue**.
5. In **Access**, choose whether to tick **Also let Overwatch run containment you approve**. It is off unless you tick it. Ticked, setup also creates the response app (see [Set up response actions](set-up-response-actions.md)); you can add it later instead.
6. Select **Create access** and leave the wizard open. It shows each step as it runs: **Checking the workspace**, **Creating the three least-privilege roles**, **Creating the agent apps and their secrets**, **Giving each app its role on the workspace** and **Saving the connection** (and, with containment, **Creating the response app and its secret**, **Granting only the response permissions** and **Saving and checking response actions**). Azure can take a minute or two to apply new role assignments; the wizard waits for it. If you reload the page meanwhile, the wizard comes back to the same run, and once it has finished, to the connection test.
7. When setup is done, the wizard moves to **Connection test** and runs it on its own. When every app and the workspace pass, select the **All Tests Passed** button to continue.
8. The wizard runs its final checks: **Validating Azure access**, **Checking AI readiness** and **Final health check**. When they pass, the wizard says Sentinel is connected and that your agents start switched off. Select **Finish setup**.

Microsoft may show **Overwatch Console Setup** as an unverified app on the approval screen. It asks only for your sign-in and for permission to manage app registrations and Azure access on your behalf during setup; it does not read your mail, files or users' data.

### If your organization blocks third-party apps

The Cloud Shell setup script is turned off until it passes a live test, so the wizard does not offer it. Instead, create the three app registrations and their workspace roles yourself and enter their details by hand. You need your **Microsoft Entra tenant ID** (Azure portal → Microsoft Entra ID → Overview → Tenant ID) and the workspace's **Subscription ID**, **Resource group** and **Workspace name**.

1. In **Organization**, select **My organization blocks third-party apps: set up with a script instead**. Check your organization name, enter your **Microsoft Entra tenant ID** and select **Continue with current tenant**.
2. In **Workspace**, choose **I already have Sentinel**, enter the **Subscription ID**, **Resource group** and **Workspace name**, and select **Continue**.
3. In **Access**, read the three role cards: **Overwatch Analyst** (used by Dax), **Overwatch Engineer** (used by Orion) and **Overwatch Deployer** (used by Maxwell). Select a card to see what that role can and cannot do. Give each of your apps the matching permissions on the workspace.
4. Under **App credentials**, enter a **Client ID** and **Client secret** for the **Analyst app**, **Engineer app** and **Deployer app**, and the date in **Secrets expire on** (the earliest secret expiry in Microsoft Entra). The date is required when you enter new secrets, so the console can warn you before access stops.
5. Select **Continue to the connection test**, then **Test All Connections**, and continue as in steps 7 and 8 above.

To go back to signing in with Microsoft, select **Use Connect with Microsoft instead (no script)** in **Organization**.

A trial organization does not have the hand-entry option in the wizard. Its **Access** step offers **Connect with one read-only app instead**, which goes back to the trial page.

## What happens next

- Connect with Microsoft creates these in your own directory: three custom roles scoped to your workspace, and three app registrations named "Overwatch-Dax-", "Overwatch-Orion-" and "Overwatch-Maxwell-" plus your organization's name, each with its role on the workspace only. They do not change your workspace or other resources. You can see and remove them in Microsoft Entra ID and the workspace's Access control (IAM) at any time.
- It is safe to run again: it reuses the apps made before, update the custom roles to the permissions the current version needs, and add new secrets next to the existing ones.
- Each secret expires after one year. The console encrypts the secrets it receives and records the expiry date.
- The connection test checks each principal: that it can sign in and read Sentinel rules, that it has the permissions its role needs (for roles that query logs, both running queries and reading the workspace's tables), and, for roles that query logs, that a test query succeeds.
- For a trial organization, the connection test also starts your 14-day trial. Azure can take a few minutes to apply new role assignments, so the test retries a few times before it gives up.
- No rules are deployed during setup. Rule deployments happen later, through [Approvals](../features/approvals.md).
- Connect with Microsoft sign-ins and setup runs (completed or failed) and secret expiry dates recorded by hand are in the [Audit Trail](../features/audit-trail.md) Activity ledger.
- To monitor more Sentinel workspaces, in this directory or another one, an admin adds them under **Data connectors > Monitored workspaces** with Connect with Microsoft. See [Data connectors](../features/data-connectors.md).

### Keep the secrets from expiring

When the Azure client secrets are 30 days or less from expiry, admins see a warning at the top of the console, for example "The Azure client secrets expire on (date) (12 days). Run setup again from the setup wizard before then; it adds new secrets without breaking the current ones." After the date, the agents cannot reach Microsoft Sentinel until you run setup again.

To renew, open the setup wizard and select **Connect with Microsoft** again. Setup adds a new one-year secret to each app and the console switches to it; the old secrets keep working until their own date.

Admins also see the expiry date on [Data connectors](../features/data-connectors.md), with **Open setup** when action is needed. If no expiry date is recorded, Data connectors says so: run setup again, or enter the date by hand in the wizard.

## If something goes wrong

### With Connect with Microsoft

- **"Microsoft sign-in was cancelled or consent was not given, so nothing was created."**: select **Connect with Microsoft** again and select **Accept** on Microsoft's approval screen. If your organization requires an administrator to approve apps and you cannot, enter app details by hand instead (see above).
- **"You signed in to a different Microsoft directory (…) than the one this organization uses (…)."**: this organization is already connected to another directory. Sign in with an account from that directory.
- **"Setup moves this organization from directory … to this one."**: a first setup that failed part way can start over in another directory, as long as the first connection test has not passed. Overwatch apps created in the earlier directory stay until you delete them in Microsoft Entra.
- **"Microsoft signed you in but did not grant Azure access."**: the account cannot sign in to the Azure portal. Use an account that can, then try again.
- **"Your account can't see any Log Analytics workspace in the directory you signed in to."**: go back to **Organization**, select **Sign in with a different Microsoft account** and use an account from the directory your Sentinel workspace is in, with access to its subscription. The list only shows workspaces in the directory you signed in to, even when your account can also see others as a guest.
- **"Your account cannot manage access on this workspace."**: the account is not Owner or User Access Administrator on the workspace's subscription. Sign in with one that is and run setup again.
- **"Your account cannot create app registrations or grant app permissions in this directory."**: sign in as a Global Administrator and run setup again.
- **"Your Microsoft sign-in expired."**: the sign-in lasts 30 minutes. Select **Connect with Microsoft** again; setup reuses what it already created.
- Any other failed step shows Microsoft's reason with **Run setup again**. Setup picks up what it already created.

### With hand-entered details or the connection test

- **Connection test failures**: each app, and the Sentinel workspace, shows **Passed** or **Failed** with the reason. "Some connections failed. Review the errors above and update credentials." or "All connections failed. Check your Azure Tenant ID and credentials." Fix the problem and select **Test All Connections** again.
- **"Missing permissions on the workspace: ..."**: the principal's Azure role lacks the permissions listed. Roles made by an earlier setup may not include everything the console now checks, such as reading the workspace's tables. Run **Connect with Microsoft** again (it updates the roles in place), or add the listed permissions to your own app's role, wait a few minutes for Azure to apply the change, and test again.
- **Trial connection messages**: "Azure has not finished applying the new role assignments yet. Wait a few minutes and run the test again.", "The console has not received the credentials from the setup script yet. Run the script, then try again.", "Too many connection attempts this hour. Try again later." or "Your signed-in account changed. Refresh and confirm your organization before continuing." (the trial only starts for the organization you are signed in to; refresh the page and check you are signed in to the right account)
- **Final checks**: "Azure access validation failed; review the connection checks and retry", "The agents cannot run yet: ... Contact Overwatch support." (the platform's AI service is not ready for your organization) or "The console does not show this organization as fully configured yet; retry setup." Select **Retry** to run the final checks again.
- **Planned:** **Deploy Sentinel for me** in **Workspace** (create a new workspace) is shown but cannot be selected yet. Use an existing workspace.

## Related

- [Getting started](../getting-started.md)
- [Data connectors](../features/data-connectors.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
- [Approvals](../features/approvals.md)
- [Audit Trail](../features/audit-trail.md)
