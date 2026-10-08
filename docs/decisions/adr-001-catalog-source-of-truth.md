# ADR 001 — Catalog Source of Truth: Repository-Owned JSON

**Status:** Accepted
**Date:** 2026-10-08
**Repository:** `ajeetswork/ajeets-robots-catalog`

## Question
Should the storefront catalog load from a hosted API/CMS at runtime or stay repository-owned for now?

## Decision
Keep catalog records as versioned JSON in the repository and validate the schema in CI. Do not add a runtime catalog service or headless CMS in this phase. Revisit only if non-engineering catalog edits become frequent enough that code review/deploy is the bottleneck.

## Alternatives Considered
1. **Fetch catalog data from a small hosted API at runtime** — would make content updates independent of deploys.
2. **Adopt a headless CMS immediately** — deferred; noted as an option later if merchandising volume grows.
3. **Keep catalog records as versioned JSON in the repository and validate them during CI** — *chosen*.

## Rationale (verified evidence only)
- Runtime API gives previews and local demos another service/account to depend on, which clashes with the offline-demo requirement in the design notes. _(Slack #ajeets-products-qa `1791460936.653089`)_
- Catalog changes are infrequent enough that PR review is workable. _(Slack `1791460939.895019`)_
- CI schema validation gives a clean failure point. _(same message)_

## Why Rejected Alternatives Were Not Chosen
- **Hosted API at runtime** — rejected because it violates the offline-demo constraint: demo/preview environments must work without an external account or network dependency.
- **Headless CMS now** — not adopted in this phase; merchandising volume is not yet high enough to justify it. Deferred to a later phase when volume grows.

## Constraints
- Demo and preview environments must work without an external account or network dependency.
- Catalog changes are infrequent enough to move with normal code review.
- Team wants schema errors caught before deployment.

## Consequences
- Content edits go through pull requests and deployment rather than a CMS publish button.
- Fits the existing `data/` directory layout — no new service boundary.
- Future trigger to revisit: a sustained increase in non-engineering catalog editing that makes this approach less attractive.

## What Would Cause Us to Revisit This?
Revisit if non-engineering catalog edits become frequent enough that code review/deploy is the bottleneck. _(Slack closing `1791460950.168049` verbatim: "We should revisit if non-engineering catalog edits become frequent enough that code review/deploy is the bottleneck" + Drive Operational consequences)_

## Sources
- Slack thread #ajeets-products-qa `1791460868.446029` + closing `1791460950.168049` — https://ajeets.slack.com/archives/C0BGF6SMKUK/p1791460868446029?thread_ts=1791460868.446029&cid=C0BGF6SMKUK
- Design doc: *Ajeet's Robots Catalog Data Source Design* — https://docs.google.com/document/d/1oyN569KL8dVHbbMSSOzh7vHPyOx6XGzerbFRQYs9MgM/edit (1087 chars, modified 2026-10-08T11:59:25Z)
- Evidence review: https://docs.google.com/document/d/1rijfuBAZ2tpLhxLGhrX_BprzhJLDWVYzrqwS3yMbRJ4/edit §1
- Notion: Technical Decision Register — Catalog row — https://app.notion.com/p/Catalog-source-of-truth-repository-owned-JSON-vs-hosted-API-CMS-3f3c1db3c3be8146a6cfc1ffaa7b3eff
