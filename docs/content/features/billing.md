---
title: Billing and plans
status: current
reviewed: 2026-10-31
---

# Billing and plans

The **Billing** page shows what your workspace pays, the prices of every plan and pack, and how big your estate measures. Administrators subscribe, change the card or bank account, download invoices and cancel from here. There are no incident counts and no usage meters.

## Where to find it

- The account menu (your initials, top right): **Plan and billing**.
- Command palette: "Go to Plan and billing".
- The trial card on **Overview**: **See plans and prices** (or **Choose a plan to continue** once the trial has ended).
- Directly at `/billing`.

## Who can use it

| | Viewer | Analyst | Admin |
|---|---|---|---|
| See the plan, prices and measured size | Yes | Yes | Yes |
| Subscribe | No | No | Yes |
| Manage billing (card, invoices, cancellation) | No | No | Yes |

## What you pay

**Core SOC** is priced by the size of your estate, in monitored assets:

| Monitored assets | Core SOC a month |
|---|---|
| Up to 50 | $850 |
| Up to 100 | $1,250 |
| Up to 300 | $2,500 |
| Up to 600 | $4,000 |
| More than 600 | A quote at $6 an asset |

Core includes Dax's triage, Demitry's review, detection engineering by Renzo, Maxwell and Marien, Atlas, and Full auto with response actions. You choose how much the agents may do alone in [Autonomy and approvals](../concepts/autonomy-and-approvals.md).

**Packs** add to Core at any size, priced as a share of your Core price:

| Pack | Adds | Price |
|---|---|---|
| Email & Malware | Caleb: reported-phish triage, sandbox and deep malware analysis | Core +40% |
| Threat Hunting | Orion: proactive hunts from threat intelligence | Core +35% |
| Priority Support | P1 first reply in 1 hour, extended hours, a monthly review call | Core +15% |
| Complete | All three packs | Core +75% instead of the sum |

Tax is added where it applies. The free trial includes every pack.

## Terms

| Term | Price | Commitment |
|---|---|---|
| 12-month term, billed monthly (the default) | The prices above | 12 months |
| 12-month term, paid up front | 10% off, invoiced once a year | 12 months |
| Month to month | 20% more | None: cancel at the end of any month |

A 12-month term renews for another 12 months unless you cancel at least 30 days before it ends. If we miss the response times or the availability target in our [Support](../support.md) policy, you may end a 12-month term early with 60 days' notice. Design-partner discount codes apply to the 12-month term billed monthly.

## How your size is measured

We install nothing in your environment, so the size is read from Microsoft Sentinel over the last 30 days: the devices sending endpoint or server logs, and the member accounts with a successful sign-in. Your monitored assets are the higher of the two, so a workspace with only identity data is still sized and no one is counted twice. The first count runs within hours of connecting Sentinel and again every 30 days. Billing shows the latest count and suggests the size that fits it.

## When your size changes

- **One count over your size:** you get an email and a notice on Billing. Nothing changes.
- **Two monthly counts over your size:** your plan moves to the size that fits the smaller of the two counts, from your next invoice. Nothing is charged for the past month, and you get an email saying so. If you paid the year up front, the difference for the rest of your paid year is invoiced when the plan moves.
- **Above 600 assets:** your plan does not change; we contact you with a quote.

Your plan never moves down by itself. If your estate shrinks, email support and we move you down from the next invoice.

## Subscribe

1. Open **Billing** as an administrator.
2. Under **Choose your plan**, pick your size, any packs and your term. The total updates as you choose.
3. Click **Subscribe** and pay in Stripe's checkout, by card or US bank account.

You can subscribe during the trial or after it ends; an ended trial's agents switch back on as soon as the first payment goes through. A workspace that cannot use checkout can email support to be invoiced instead.

## Manage billing or cancel

Billing shows what you pay each month, your term and when its commitment ends, and when the plan renews. Click **Manage billing** to open Stripe's billing portal. There you change the card or bank account, see and download invoices, and cancel your subscription. A month-to-month plan can be cancelled there at any time. A 12-month term runs to its end date: to stop it renewing, email support at least 30 days before it ends (or give 60 days' notice after a missed target, as above). A cancellation takes effect at the end of the period you paid for: Billing shows the date, the agents keep running until then, and you can renew in the portal before it. To add or remove a pack, email support and we change it from the next invoice.

If your plan does not include a pack, the agents in it do not run, and Overwatch Console tells you which pack adds them.

## Related

- [Autonomy and approvals](../concepts/autonomy-and-approvals.md)
- [Connect Microsoft Sentinel](../how-to/connect-microsoft-sentinel.md)
- [Help](help.md)
