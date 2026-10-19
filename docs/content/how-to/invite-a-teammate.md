---
title: Invite a teammate
status: current
reviewed: 2026-10-19
---

# How to invite a teammate

Give a colleague their own Overwatch Console account with the right role, change a teammate's role later, and help someone who has forgotten their password.

## Before you start

- You need the **admin** role. Other roles see "Only organization administrators can manage the team." on the Team tab.
- Decide the person's role: **Viewer**, **Analyst** or **Administrator**. See [Roles and permissions](../concepts/roles-and-permissions.md).
- Invitations are sent by email. Account email must be set up for your Overwatch Console deployment. If it is not, the Team tab shows "Invitations need account email" with "Account email is not set up for this console yet, so invitations cannot be sent." instead of the invite form. Ask the Overwatch team to set up account email, or to create the account for you. Role changes and deactivation still work without email.

## Steps

### Invite a person

1. Go to **Settings** and select the **Team** tab.
2. Under **Invite a person**, enter the person's **Email**.
3. Optional: enter a **Name (optional)**. If you leave it empty, the part of the email before the @ is used.
4. Choose a **Role**. It starts on **Viewer**.
5. Select **Send invitation**.

You see "Invitation sent to <email>. The link works once and expires in 72 hours." The person appears under **People** with the status **Invited** and when they were invited.

### What the invited person does

1. They open the email "You have been invited to Overwatch Console" and follow the link.
2. On the **Join your team** page, they enter a **New password** and **Confirm password**. The password must have at least 15 characters and no more than 72 bytes.
3. They select **Activate account**.
4. They see "Your account is active." and select **Sign in** to sign in with their email and the new password.

Until they do this, the account cannot sign in. Nobody else ever sees or sets their password.

Your organization's first admin follows the same steps, but gets the link from the Overwatch team directly rather than by email. After signing in, the setup wizard opens: see [Connect Microsoft Sentinel](connect-microsoft-sentinel.md).

### Change a teammate's role

1. On the **Team** tab, find the person under **People**.
2. Choose the new role in the role list next to their name.

The change saves as soon as you choose it; there is no separate save button or confirmation. It applies on the person's next request: they do not need to sign out.

### Deactivate or reactivate someone

1. On the **Team** tab, find the person under **People**.
2. Select **Deactivate** (or **Reactivate** for a deactivated account).

A deactivated person cannot sign in, and a session they already have stops working on their next request. People with the status **Invited** have no Deactivate button.

### Help someone reset their password

Admins cannot reset another person's password. The person does it themselves:

1. On the sign-in page, they select **Forgot your password?**.
2. They enter their **Email address** and select **Send reset link**.
3. They follow the link in the email "Reset your Overwatch Console password", enter a **New password** and **Confirm password**, and select **Change password**.
4. They see "Your password is changed." and sign in with the new password.

## What happens next

- An invitation link works once and expires after 72 hours. A password reset link works once and expires after 1 hour.
- Activating an account or resetting a password also clears any sign-in lockout on that account.
- The [Audit Trail](../features/audit-trail.md) **Activity ledger** records each invitation, each accepted invitation, each password reset request and reset, and each role change with who made it and the old and new role.
- None of this goes through Approvals. Team changes are made directly by the admin.

## If something goes wrong

**When inviting:**

- **"A user with this email already exists"**: the address already has an account, in your organization or another one. To send a fresh link to someone still marked **Invited**, invite the same email again: this replaces the earlier link.
- **"Enter a valid email address"**: check the address.
- **"The invitation was saved but the email could not be sent (...). Resend it to try again."**: the person is listed as **Invited**, but no email went out. Invite the same email again.
- **"Account email is not set up yet, so invitations cannot be sent"** or the **Invitations need account email** card: see Before you start.
- **"Invitations unavailable"** or **"Users unavailable"**: the team list could not be read. Select **Refresh** at the top of Settings.
- **"Rate limit exceeded. Please slow down."**: you sent more than ten invitations in a minute. Wait a minute and try again.

**When changing roles or deactivating:**

- **"This is the organization's only active administrator. Make someone else an administrator first."**: the organization must always keep one active admin. Promote someone else first.
- **"You cannot change your own role. Ask another administrator to change it."** and **"You cannot deactivate your own account."**: ask another admin. Your own row has no role list or Deactivate button for this reason.
- **"Another change to the team happened at the same time. Try again."**: another admin changed the team at the same moment. Try again.

**For the invited person or the person resetting:**

- **"This link is invalid, expired or already used."**: invitation links last 72 hours and reset links 1 hour, and each works once. Only the newest link works. Ask the admin to invite you again, or request a new reset link.
- **"Open the invitation link from your email."**: the page was opened without the link from the email.
- **"The passwords do not match."** or the 15-character rule: re-enter the password.
- **"Password reset email is not available yet. Contact Overwatch support to reset your password."**: account email is not set up for your deployment, so no reset link can be sent. Contact Overwatch support.
- **No reset email arrives.** The page says "If that address belongs to an active account, a reset link is on its way." whether or not an email was sent, so it does not reveal which addresses have accounts. No email is sent when the address has no active account (including an invitation not yet accepted) or when a reset link was already sent to that account in the last minute. Wait a minute and try again, or ask an admin.

## Related

- [Settings](../features/settings.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
- [Getting started](../getting-started.md)
- [Audit Trail](../features/audit-trail.md)
