// AUTO-GENERATED from config/robot-statuses.yaml.
// Do not edit directly. Regenerate with scripts/generate-statuses.mjs.

export const ROBOT_STATUSES = [
  { id: "draft", label: "Draft" },
  { id: "active", label: "Active" },
  { id: "maintenance", label: "Maintenance" },
  { id: "retired", label: "Retired" }
] as const;

export type RobotStatusId = typeof ROBOT_STATUSES[number]["id"];
