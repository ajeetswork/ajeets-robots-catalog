import { flagEnabled } from "../flags";

export function useRegionalCurrencyPresentation() {
  return flagEnabled("regional_currency_display");
}
