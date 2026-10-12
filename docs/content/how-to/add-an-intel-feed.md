---
title: How to add an intel feed
status: current
reviewed: 2026-10-12
---

# How to add an intel feed

Add your own RSS or Atom advisory feed (for example from an ISAC, a vendor or a partner) so its reports appear in Live Feed beside the built-in sources and Orion and Renzo read them too.

## Before you start

- **Admin.** Only administrators can see, add or remove intel feeds. Analysts and viewers see a message saying only administrators can manage threat intelligence settings on the **Threat Intel** tab, and the **Add a source** button in Live Feed is not shown to them.
- You need the feed's address. It must start with `https://`, point to a public internet address, and serve RSS or Atom.
- Your organization can have up to 5 of its own feeds. They are separate from the built-in sources, which every customer gets and which you cannot change.

## Steps

1. Open **Govern > Settings** and click the **Threat Intel** tab. From Live Feed you can also click **Add a source** in the **Sources** card header (or **Connect a source** or **Add** on the empty state), which opens the same tab.
2. Scroll to **Your intel feeds**. The header shows how many feeds you have, for example "2 of 5".
3. In **Feed name**, type a name of up to 60 characters. This is the name shown on the source tile in Live Feed.
4. In **Feed URL (https)**, paste the feed address.
5. Click **Add feed**. When it is saved you see "<name> added." and the feed appears in the list.
6. Open **Intelligence > Live Feed** and click **Refresh**. The new source appears in **Sources** with a **Custom** marker, and its reports are marked "(custom)".

To remove a feed, click **Remove** on its row. It is removed at once, with no confirmation, and you see "<name> removed. Items already in the library stay there."

## What happens next

- **Live Feed.** Reports from your feeds sit beside the built-in sources and get the same auto-tags, filters and actions (**Force evaluate**, **Generate detection**, **Ingest as hunt**). Each feed shows up to 25 of its newest items.
- **Renzo.** Your feeds' reports are scored the same way as the built-in ones: when someone clicks **Evaluate new reports** or **Force evaluate**, and, if an admin has turned on **Automatic threat-intelligence ingestion** in Settings > Agent Policies, automatically by the agent worker. Drafts created from them still need QA and an admin's deployment.
- **Orion.** Proactive hunts read your feeds' recent reports alongside the built-in sources when choosing what to hunt for.
- **Refresh.** Your feeds are fetched again at most every 30 minutes. Adding or removing a feed takes effect on the next Live Feed read.
- **Audit.** Every change to the list is recorded in the Audit Trail as a configuration change ("Changed the custom intel feeds"), with the feed list before and after.
- Nothing here needs approval, and adding a feed deploys nothing.

## If something goes wrong

The server checks the list when you save. Its message appears in red above the list:

- **"At most 5 intel feeds"**: remove a feed first. The add form is hidden while you have 5.
- **"Each feed needs a name of 1–60 characters"** or **"Each feed needs a URL"**: fill in both fields.
- **"<name>: feed URLs must use https"**: use the `https://` address of the feed.
- **"<name>: this feed is already listed"**: the same address is already in your list.
- **"<name>: Internal host names are not allowed"**, **"Private addresses are not allowed"**, **"URLs with credentials are not allowed"** or **"Invalid URL"**: the address must be a plain public web address, with no user name or password in it.
- **"Save outcome unknown. Refresh before retrying."**: reload the page and check the list before trying again.
- **"Intel feeds unavailable"** with **Retry**: the list could not be read.
- **The source tile in Live Feed says "Fetch failed"**: the feed was saved but could not be read. The tile shows the reason, for example an HTTP error from the site or an address that resolves to a private network. Check the address in a browser. Feeds are only fetched from public addresses.

## Related

- [Live Feed](../features/live-feed.md)
- [Settings](../features/settings.md)
- [How to turn intel into a detection](turn-intel-into-a-detection.md)
- [How to run a threat hunt](run-a-threat-hunt.md)
- [Audit Trail](../features/audit-trail.md)
- [Roles and permissions](../concepts/roles-and-permissions.md)
