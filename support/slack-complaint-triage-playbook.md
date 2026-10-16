# Slack Complaint Triage Playbook

**Channel:** Slack #customer-complaint  
**Notion DB:** `398c1db3-c3be-810e-ab15-d63297d613f5`  
**Printify Shop:** Ajeets (ID 27965389)

## Real complaints (2026-07-09)

| # | Product | Printify ID | Issue | Severity | SLA |
|---|---------|-------------|-------|----------|-----|
| 1 | Phone Case | — | Android availability / discoverability | P2 | 48h |
| 2 | Men's Sweatshirts | — | 0 men's SKUs in catalog (gap) | P2 | 1 week |
| 3 | Woven Straw Tote | `6a3ea4329ac967b7970f8bd2` | Design feedback | P3 | 72h |
| 4 | Leather Patch Hat | `6a38015588d5d893550c5d34` | Description too short | P2 | 24h |
| 5 | Wall Art | `6a36b8fbeb0b93244f0d9773` | Vague title | P3 | 48h |
| 6 | Calendar | `6a36b87966b72a2af10e4f95` | Vague title | P3 | 48h |

## Triage flow

1. **Intake** – Complaint lands in Slack #customer-complaint
2. **Map** – Identify Printify product ID
3. **Log** – Create Notion entry in Complaints DB
4. **Severity** – P1/P2/P3, assign SLA
5. **Fix** – Update in Printify / Wix
6. **Close loop** – Reply in Slack + close Notion entry

## Resolution templates

**Description too short:**
> "Thanks for flagging – we've expanded the product description with full materials, fit, and care details. [link]"

**Vague title:**
> "Good catch – retitled with descriptive keywords for better discovery. [link]"

**Catalog gap:**
> "Noted – adding to our product roadmap. We'll announce on the Wix blog when it's live."
