---
title: Connect Microsoft Sentinel
status: current
reviewed: 2026-10-19
---

# How to connect Microsoft Sentinel

Connect your organization's Microsoft Sentinel workspace to Overwatch Console with the setup wizard, so the agents can read incidents and logs and work on your detections.

## Before you start

- You need the **admin** role in Overwatch Console. The wizard opens on its own the first time an admin signs in to an organization that is not connected yet. You can also open it from **Setup** in the account menu (your initials, top right) or **Setup wizard** in Settings.
- You need an existing Microsoft Sentinel workspace and its **Subscription ID**, **Resource Group** and **Workspace Name**, plus your **Azure Tenant ID**.
- To run the setup script you need access to Azure Cloud Shell (Bash mode) and enough Azure rights to create app registrations and custom roles. The script itself lists what it expects: Global Administrator or Privileged Role Administrator, and Owner or User Access Administrator on the workspace.
- If your organization came from a connected trial, start from **Start guided setup** on the "Your trial workspace" page. See [Getting started](../getting-started.md#connected-trial).

## Steps

1. In **Tenant Settings**, check your tenant name, enter your **Azure Tenant ID** and select **Continue with current tenant**.
2. In **Azure Config**, choose **I already have Sentinel**, enter the **Subscription ID**, **Resource Group** and **Workspace Name**, and select **Continue →**. The console saves the workspace details and generates your setup script.
3. In **Service Principals**, read the three role cards: **Overwatch Analyst** (Dax), **Overwatch Engineer** (Orion) and **Overwatch Deployer** (Maxwell). Select a card to see what that role can and cannot do.
4. Select **📋 Copy to Clipboard** under **Cloud Shell Setup Script**.
5. Open Azure Cloud Shell in Bash mode, paste the script and run it. Leave the wizard open.
6. Wait. The wizard shows "Waiting for the script to report back." When the script finishes, it sends the three app registrations and their secret expiry date to the console, and the wizard moves to **Connection Test** and runs the test on its own.
7. When every check passes, select the **All Tests Passed** button to continue.
8. The wizard runs its final checks: **Validating Azure access**, **Checking AI readiness** and **Final health check**. When they pass, select **Finish Setup**.

### If you cannot run the script in Cloud Shell

If you prefer to create the app registrations yourself, select **Enter credentials by hand instead** in step 3. Enter a **Client ID** and **Client Secret** for each of the three principals, and the date in **Secrets expire on**. The date is required when you enter new secrets, so the console can warn you before access stops. Then select **Continue → Test Connections** and **🔌 Test All Connections**.

A trial organization does not have this option. Its wizard offers **Connect with one read-only app instead**, which goes back to the trial page.

## What happens next

- The script creates the three custom roles and app registrations, scoped to your workspace. It does not change your workspace or other resources. It is safe to run again: it reuses the roles and apps it made before and adds new secrets next to the existing ones.
- Each secret the script creates expires after one year. The console encrypts the secrets it receives and records the expiry date.
- The connection test checks each principal: that it can sign in and read Sentinel rules, that it has the permissions its role needs, and, for roles that query logs, that a test query succeeds.
- For a trial organization, the connection test also starts your 14-day trial. Azure can take a few minutes to apply new role assignments, so the test retries a few times before it gives up.
- No rules are deployed during setup. Rule deployments happen later, through [Approvals](../features/approvals.md).
- Sending credentials from the script and recording a secret expiry date by hand are recorded in the [Audit Trail](../features/audit-trail.md) Activity ledger.

### Keep the secrets from expiring

When the Azure client secrets are 30 days or less from expiry, admins see a warning at the top of the console, for example "The Azure client secrets expire on (date) (12 days). Run the setup script again from the setup wizard before then; it adds new secrets without breaking the current ones." After the date, the agents cannot reach Microsoft Sentinel until you run the script again.

Admins also see the expiry date on [Data connectors](../features/data-connectors.md), with **Open setup** when action is needed. If no expiry date is recorded, Data connectors says so: run the script again, or enter the date by hand in the wizard.

## If something goes wrong

- **"Setup script could not be generated: ..."**: the wizard could not make the script, for example because a workspace field is missing. Your inputs are kept; fix them and select **Continue →** again.
- **"The console could not check for the script report. It keeps trying; you can also enter the credentials by hand."**: the wizard keeps checking. If the script finished, wait a moment, or use **Enter credentials by hand instead**.
- **The script prints "The console did not accept the credentials"** and then the credentials: the setup key was rejected. Common reasons, shown after that line:
  - "This setup key is invalid, expired or already used. Generate a new script in the console." Each script works once and for 24 hours. Generating a new script retires the old one. Go back to **Azure Config** and select **Continue →** to get a fresh script.
  - "The script ran against a different workspace than the one entered in the console. Generate a new script." Check the workspace details in **Azure Config**.

  You can also type the printed credentials into the wizard by hand.
- **The script says jq is not installed**: it prints the credentials instead of sending them. Enter them by hand in the wizard.
- **Connection test failures**: each principal shows **PASS** or **FAIL** with the reason. "Some connections failed. Review the errors above and update credentials." or "All connections failed. Check your Azure Tenant ID and credentials." Fix the problem and select **🔌 Test All Connections** again.
- **Trial connection messages**: "Azure has not finished applying the new role assignments yet. Wait a few minutes and run the test again.", "The console has not received the credentials from the setup script yet. Run the script, then try again." or "Too many connection attempts this hour. Try again later."
- **Final checks**: "Azure access validation failed; review the connection checks and retry", "The agents cannot run yet: ... Contact Overwatch support." (the platform's AI service is not ready for your organization) or "The console does not show this organization as fully configured yet; retry setup." Select **Retry** to run the final checks again.
- **Planned:** **Deploy Sentinel for me** in **Azure Config** (create a new workspace) is shown but cannot be selected yet. Use an existing workspace.

## Related

- [Getting started](../getting-started.md)
- [Data connectors](../features/data-connectors.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
- [Approvals](../features/approvals.md)
- [Audit Trail](../features/audit-trail.md)
