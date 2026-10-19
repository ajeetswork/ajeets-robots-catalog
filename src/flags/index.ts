import config from "../../config/feature-flags.json";

type FlagValue = boolean | { percentage: number };

export function flagEnabled(name: keyof typeof config.flags): boolean {
  const flag = config.flags[name] as any;
  const value: FlagValue = flag.environments.production ?? flag.default;
  return typeof value === "boolean" ? value : value.percentage >= 100;
}

export function variantFor(name: keyof typeof config.flags): "control" | "treatment" {
  const flag = config.flags[name] as any;
  const value = flag.environments.production;
  if (typeof value === "object" && value && typeof value.percentage === "number") {
    return value.percentage > 0 ? "treatment" : "control";
  }
  return value ? "treatment" : "control";
}
