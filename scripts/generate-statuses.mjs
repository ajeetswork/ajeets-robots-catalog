import fs from "node:fs";
import yaml from "yaml";

const sourcePath = "config/robot-statuses.yaml";
const outputPath = "src/generated/robot-statuses.ts";
const { statuses } = yaml.parse(fs.readFileSync(sourcePath, "utf8"));

const rows = statuses.map(({ id, label }) => `  { id: "${id}", label: "${label}" }`).join(",\n");
const output = `// AUTO-GENERATED from ${sourcePath}.\n// Do not edit directly. Regenerate with scripts/generate-statuses.mjs.\n\nexport const ROBOT_STATUSES = [\n${rows}\n] as const;\n\nexport type RobotStatusId = typeof ROBOT_STATUSES[number]["id"];\n`;
fs.writeFileSync(outputPath, output);
