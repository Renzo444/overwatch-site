---
title: Set up branding
status: current
reviewed: 2026-10-05
---

# How to set up branding

Record your organization's name and logo in Overwatch Console.

## Before you start

- You need the **admin** role. Analysts and viewers cannot use the Branding tab.
- If you want a logo, host the image at an HTTPS address that anyone signed in can load, without a username or password in the URL.
- Know what changes today: the organization name appears in the account menu and on the trial pages. The logo and accent choices are saved and shown in the preview only; the rest of the console does not use them yet (Planned).

## Steps

1. Go to **Settings** and select the **Branding** tab.
2. In **Organization name**, enter your organization's name.
3. In **Logo URL**, enter the HTTPS address of your logo, for example `https://example.com/logo.png`. Leave it empty for no logo.
4. Optional: choose an **Accent**, or open **Advanced colours** to enter exact **Primary colour (hex)** and **Accent colour (hex)** values in `#rrggbb` form.
5. Check the **Preview** card. It shows your logo (or the first letter of the name if there is no logo) next to the name.
6. Select **Save branding**.

## What happens next

- You see "Branding saved. The change is recorded with before/after values."
- The change is recorded in the [Audit Trail](../features/audit-trail.md) under **Configuration changes**. Use the **Audit Trail** link under the form to go there.
- The new organization name shows in the account menu the next time your session is refreshed (for example after reloading the page).
- Branding changes are made directly. They do not go through Approvals.

## If something goes wrong

The **Save branding** button stays disabled and a message explains why:

- "Organization name is required."
- "Logo URL must use HTTPS without embedded credentials."
- "Accent must be a #rrggbb colour." or "Primary colour must be a #rrggbb colour."

Other cases:

- **The preview shows a letter instead of your logo.** The image could not be loaded from that address. Check the URL opens in your browser and is served over HTTPS.
- **"Branding unavailable"** with **Retry**: the branding record could not be read. Retry. Analysts and viewers currently always see this message, because the tab loads only for admins.
- **"Branding was not confirmed. Reload before retrying."** The save outcome is unknown. Select **Refresh** at the top of Settings and check the values before saving again.

## Related

- [Settings](../features/settings.md)
- [Audit Trail](../features/audit-trail.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
