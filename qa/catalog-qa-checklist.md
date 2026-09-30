# Printify Catalog QA Checklist

Source: Printify Shop "Ajeets" (ID 27965389) + Slack customer complaints + Notion Complaints DB `398c1db3-c3be-810e-ab15-d63297d613f5`

## Pre-publish QA

- [ ] Product title is descriptive (not vague – see Wall Art `6a36b8fbeb0b93244f0d9773` / Calendar `6a36b87966b72a2af10e4f95` complaint)
- [ ] Description meets minimum length (Leather Patch Hat `6a38015588d5d893550c5d34` was flagged too short)
- [ ] All variant options listed (Phone Case: 94 Android / 66 iPhone – make sure filters show them)
- [ ] Product images include mockups for all major variants
- [ ] Pricing reviewed against Printify base cost + margin target

## Known catalog gaps (from Slack #customer-complaint)

- Men's sweatshirts: 0 men's-specific SKUs (3 women's, 1 unisex hoodie)

## Weekly sweep

1. Pull Printify product list
2. Check for thin descriptions
3. Check for vague titles
4. Cross-reference Notion Complaints DB
5. Update catalog-release-note-template.md
