# Notion Complaints Database SOP

Standard operating procedure for logging and resolving customer complaints via the Notion Complaints database.

**Database ID:** `398c1db3-c3be-810e-ab15-d63297d613f5`

**Connected systems:** Slack #customer-complaint → Printify Shop "Ajeets" (ID 27965389) → Notion Complaints DB → fix → close loop

---

## Workflow

### 1. Complaint arrives in Slack

All customer complaints land in **Slack #customer-complaint**. Assign an owner within 2 hours.

### 2. Map to Printify product

Identify the product in Printify Shop "Ajeets" (ID 27965389). Record the **Printify Product ID** in the Notion entry – this is the primary key linking complaints to catalog items.

If the complaint is about a catalog gap (product doesn't exist yet), note that explicitly.

### 3. Create / update Notion entry

Log the complaint in the Notion Complaints database (`398c1db3-c3be-810e-ab15-d63297d613f5`).

Required fields:
- **Product name** + **Printify Product ID**
- **Complaint summary** (what the customer said, verbatim if possible)
- **Source** – Slack #customer-complaint, email, etc.
- **Date received**
- **Severity** – Low / Medium / High
- **Status** – Open / In Progress / Fixed / Closed
- **Owner**

### 4. Fix

Apply the fix in Printify (update description, add variants, correct title, etc.). For listing changes, use the product description templates in `templates/product-description-templates.md`.

### 5. Close the loop

- Update the Notion entry Status → Fixed
- Reply in Slack #customer-complaint thread with resolution
- If a customer is waiting, notify them directly
- Mark Status → Closed once confirmed

---

## Currently logged complaints (5)

All 5 complaints below came in via **Slack #customer-complaint on 2026-07-09**.

### 1. Phone Case – Android availability

- **Product:** Phone Case
- **Printify Product ID:** (model-specific, multiple SKUs)
- **Issue:** Customer couldn't find their Android model / availability confusion
- **Details:** Catalog currently has 94 Android variants / 66 iPhone variants. Customer still couldn't locate their device. Check if model coverage is actually complete or if the storefront filtering is unclear.
- **Severity:** Medium
- **Fix:** Audit Android model coverage. Improve storefront filtering / device finder. Add "don't see your model?" contact link.

### 2. Men's Sweatshirts – Catalog gap

- **Product:** Men's Sweatshirts
- **Printify Product ID:** N/A (product does not exist in catalog)
- **Issue:** Customer looking for men's sweatshirts – none available
- **Details:** Catalog has 3 women's hoodies, 1 unisex hoodie, 0 men's sweatshirts. This is a catalog gap, not a listing quality issue.
- **Severity:** Medium
- **Fix:** Add men's sweatshirt products to Printify Shop "Ajeets" (ID 27965389). Use product description templates in `templates/product-description-templates.md` for the new listings.

### 3. Woven Straw Tote

- **Product:** Woven Straw Tote
- **Printify Product ID:** `6a3ea4329ac967b7970f8bd2`
- **Issue:** (Complaint logged in Slack #customer-complaint, 2026-07-09 – see Notion entry for full details)
- **Severity:** TBD – check Notion entry
- **Fix:** Review product listing against template in `templates/product-description-templates.md`. Update materials, fit, and care sections as needed.

### 4. Leather Patch Hat

- **Product:** Leather Patch Hat
- **Printify Product ID:** `6a38015588d5d893550c5d34`
- **Issue:** Description too short – customer missing key product details
- **Severity:** Medium
- **Fix:** Rebuild description using the Hat / Dad Hat template in `templates/product-description-templates.md`. Ensure materials, fit/sizing, and care instructions are all present before republishing. This is the complaint that drove creation of the full template library.

### 5. Wall Art / Wall Calendar – Vague titles

- **Product A:** Wall Art – Printify Product ID `6a36b8fbeb0b93244f0d9773`
- **Product B:** Wall Calendar – Printify Product ID `6a36b87966b72a2af10e4f95`
- **Issue:** Vague / unclear product titles – customers unsure what they're buying
- **Severity:** Low / Medium
- **Fix:** Rewrite titles to be specific and descriptive. Use the Wall Art and Wall Calendar templates in `templates/product-description-templates.md` for the full descriptions. Verify titles distinguish clearly between wall art (framed print) and wall calendar (dated, 12-month).

---

## Reporting

- **Weekly:** Review open complaints in Notion. Any complaint open > 7 days escalates to High severity.
- **Monthly:** Summarize complaint trends – which product categories generate the most issues? Feed into the Wix blog FAQ content (see `marketing/wix-blog-content-calendar.md`).
- **Quarterly:** Audit the full Printify catalog (28 products, Printify Shop "Ajeets" ID 27965389) against the description templates to catch thin listings before customers do.

---

## Related docs

- Product description templates: `templates/product-description-templates.md`
- Slack complaint triage playbook: `support/slack-complaint-triage-playbook.md`
- Catalog inventory snapshot: `catalog/printify-inventory-snapshot.md`
- Wix blog content calendar: `marketing/wix-blog-content-calendar.md`
