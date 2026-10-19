import config from "../../config/feature-flags.json";

export function useRegionalCurrencyPresentation(region: "US" | "CA" | "EU") {
  const flag = config.flags.regional_currency_display;
  return flag.regionOverrides[region] ?? flag.default;
}
