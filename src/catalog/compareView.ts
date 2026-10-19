import { flagEnabled } from "../flags";

export function compareViewMode() {
  return flagEnabled("catalog_compare_layout") ? "compact" : "standard";
}
