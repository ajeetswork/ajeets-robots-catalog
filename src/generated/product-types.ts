// AUTO-GENERATED from schemas/product.schema.json.
// Do not edit directly. Regenerate using the catalog codegen configuration.

export interface CatalogProduct {
  id: string;
  name: string;
  priceCents: number;
  availability: "in_stock" | "backorder" | "discontinued";
}
