---
title: How your data is handled
status: current
reviewed: 2026-10-19
---

# How your data is handled

This page explains where Overwatch Console keeps your data, which companies process it, how long it is kept and how it is removed. It describes the product as it works today.

## What stays in your Sentinel workspace

Your security logs stay in your Microsoft Sentinel workspace. Overwatch does not copy the workspace. Agents run KQL queries on demand through the app registrations you created during setup, and you can revoke those registrations in Microsoft Entra ID at any time.

## What Overwatch stores

Overwatch stores the results of its own work, separately for each tenant:

| Data | What it contains |
| --- | --- |
| Investigation records | The query results an agent relied on, its reasoning, verdicts and notes |
| Incident memory | Short summaries of past incidents that Dax and Demitry recall as context |
| Entity history | Which incidents an account, host or IP address appeared in |
| Agent log and tool audit | What each agent did and every tool call it made |
| Audit Trail | Who changed what, with before and after values |
| Detections | Rules the agents drafted, tuned or deployed, with their versions |
| Connection secrets | The client secrets of your app registrations, encrypted |

Every read, write and model call is limited to your tenant. One tenant's data is never used for another tenant's work.

The console runs on Railway in the United States (US East). The database runs on Railway in the United States (US West). Traffic to the console, the database, the AI providers and Microsoft is encrypted in transit.

## AI processing

To investigate an incident, an agent sends the evidence it needs (incident details and the rows its queries returned) to a large language model. Requests go through OpenRouter to the model provider:

| Model provider | Used by |
| --- | --- |
| Anthropic (Claude), hosted on Google Vertex AI or Amazon Bedrock | Dax, Marien (tuning), Renzo (rule authoring), Caleb, Maxwell |
| Google (Gemini) | Demitry, Orion, Atlas, Marien (investigation), Renzo (research) |
| OpenAI, hosted on Microsoft Azure | Embeddings for incident memory |

Every request asks OpenRouter for zero data retention: it may only go to a host that does not keep prompts or responses and does not collect them. If a model has no such host, the request is refused rather than sent elsewhere.

Renzo's research step can search the public web through OpenRouter's web search while it reads public threat intelligence. Agents that work with your incident data do not search the web.

Models are not trained on your data by Overwatch, and the providers' API terms exclude training on API traffic.

## How long data is kept

Retention is set per tenant. These are the defaults; to change them, ask us. Every change is recorded in the Audit Trail.

**Planned:** a retention control in Settings.

| Data | Default | Minimum |
| --- | --- | --- |
| Agent log | 30 days | 30 days |
| Tool audit | 90 days | 30 days |
| Agent events | 60 days | 30 days |
| Hunt results | 180 days | 30 days |
| Lessons learned | 365 days | 30 days |
| Incident memory | 365 days | 30 days |

Investigation records follow the agent log window. Entity history is kept for at least 90 days. Short-lived caches are removed after 7 to 30 days. Cleanup runs once a day.

## Removing your data

When you stop using Overwatch, ask us to delete your tenant's data and we will confirm when it is done. Deleting data in Overwatch never touches your Sentinel workspace.

**Planned:** offboarding that deletes all of a tenant's data and produces a deletion record.

## Companies that process your data

| Company | Purpose | Location |
| --- | --- | --- |
| Railway | Hosting and database | United States |
| OpenRouter | Routing requests to AI models, and web search for Renzo's threat research | United States |
| Anthropic, through Google Vertex AI or Amazon Bedrock | AI models (Claude) | Global, as routed |
| Amazon Web Services | Hosting Claude on Bedrock | Global, as routed |
| Google | AI models (Gemini, and Claude on Vertex AI) | Global, as routed |
| OpenAI, through Microsoft Azure | Embeddings for incident memory | Global, as routed |
| Microsoft | Your Sentinel workspace and app registrations | Your Azure region |
