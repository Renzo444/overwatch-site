---
title: Set up response actions
status: current
reviewed: 2026-11-02
---

# How to set up response actions

Let approved containment run: disabling an account or revoking its sign-in sessions in Microsoft Entra ID, isolating a device in Microsoft Defender for Endpoint, and undoing a disable or an isolation. Agents only propose these; people approve them and an administrator runs them from Approvals.

## Before you start

- You need the **admin** role in Overwatch Console. Other roles see "Only organization administrators can set up response actions."
- Microsoft Sentinel must already be connected. Until it is, the tab shows "Connect Microsoft Sentinel first" and every provider shows **Not available**.
- In Microsoft you need to be a **Global Administrator** of the directory your Sentinel workspace is in. Granting these application permissions needs that role.
- Device isolation needs Defender for Endpoint in your tenant. Without it, setup creates account actions only.
- You can also set this up during the first setup: tick **Also let Overwatch run containment you approve** in the wizard's **Access** step. See [Connect Microsoft Sentinel](connect-microsoft-sentinel.md).

## Steps

### Connect with Microsoft (recommended)

1. Go to **Govern > Settings** and open the **Response actions** tab. (On the Actions page, **Set up response actions** on the "Containment can't run yet" banner opens it too.)
2. Select **Connect with Microsoft** and sign in as a Global Administrator of your Sentinel directory. Microsoft asks you once to approve **Overwatch Console Setup** if nobody has yet.
3. Back on the tab, select **Create the response app**. The console creates one app in your directory named "Overwatch-Responder-" plus your organization's name, gives it a one-year secret and grants it only:
   - Microsoft Graph: **User.EnableDisableAccount.All**, **User.Read.All** and **User.RevokeSessions.All**
   - Defender for Endpoint: **Machine.Isolate** and **Machine.Read.All** (skipped when Defender is not in your tenant)
4. The tab shows each step: **Creating the response app and its secret**, **Granting only the response permissions** and **Saving and checking response actions**. When it is done, each provider should show **Ready**. If one shows **Not checked** or **Missing permissions**, wait a few minutes (a new grant can take that long to reach Microsoft's tokens) and select **Check permissions**.

Running it again is safe: it reuses the app, skips permissions already granted and adds a new secret.

### Set up with a script instead

The Cloud Shell setup script is turned off until it passes a live test, so **Use a script instead** does not show on the tab. If your organization does not allow administrators to approve third-party apps, create the app yourself and use the next section.

### Use an app you already have

1. On the provider's row, select **Enter app details**.
2. Enter the **Application (client) ID** and a **New client secret**. The app needs the permissions listed in step 3 above as application permissions with admin consent: **User.EnableDisableAccount.All**, **User.Read.All** and **User.RevokeSessions.All** on Microsoft Graph, and **Machine.Isolate** and **Machine.Read.All** on Defender for Endpoint.
3. Select **Save and check**. Overwatch saves the secret encrypted and checks the permissions straight away.

### Replace or remove an app

- **Replace** saves a new client ID and secret for that provider. The old secret is no longer used.
- **Remove**, then **Remove credentials** to confirm. Responses through that provider are blocked until it is set up again. Actions already sent are not undone.

## What happens next

When Demitry confirms a threat and his queries returned the account or device, he files a containment request in [Approvals](../features/approvals.md). If an administrator set that action to Full auto in Settings → Agent Policies, it runs straight away when every check passes (see [Containment under Full auto](../concepts/autonomy-and-approvals.md#containment-under-full-auto)). Otherwise, after it is approved, an administrator opens **Run the approved response**, selects **Review execution** and then **Confirm response execution**. Overwatch reads the account or device back from Microsoft and records the outcome. **Request undo** files a re-enable or release that is approved and run the same way. Containment that ran under Full auto has a one-click **Undo: re-enable the account** or **Undo: release the device** instead.

## Troubleshooting

- **"Response actions for … are not ready, so this cannot run yet."** on an approved response: that provider is not set up or its permissions are not verified. Select **Set up response actions** on the card, or open this tab. Nothing was sent, and the approval stays valid until it expires.
- **"Your account cannot create app registrations or grant app permissions in this directory."** with Connect with Microsoft: sign in as a Global Administrator and select **Connect with Microsoft** again.
- **"You signed in to a different Microsoft directory (…) than the one this organization uses (…)."**: sign in with an account from the directory your Sentinel workspace is in.
- **Missing permissions after setup.** A new grant can take a few minutes to reach Microsoft's tokens. Wait, then select **Check permissions** again.
- **"Setting up with a script or by entering app details is turned off until it passes a live test"**: use **Connect with Microsoft**. If that button is missing too, Connect with Microsoft could not be reached; reload the page.

## Related

- [Settings](../features/settings.md)
- [Approve or deny an action](approve-or-deny-an-action.md)
- [Connect Microsoft Sentinel](connect-microsoft-sentinel.md)
