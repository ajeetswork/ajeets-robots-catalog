import fs from "node:fs";
import yaml from "yaml";
import config from "../codegen/catalog.codegen.json" with { type: "json" };

const sourcePath = config.routeDocs.source;
const outputPath = config.routeDocs.output;
const allowed = new Set(config.routeDocs.options.includeVisibility);
const { routes } = yaml.parse(fs.readFileSync(sourcePath, "utf8"));
const visible = routes.filter(route => allowed.has(route.visibility));

const rows = visible.map(route => `| \`${route.path}\` | ${route.name} |`).join("\n");
const output = `<!-- AUTO-GENERATED from ${sourcePath}. Do not edit directly. -->\n<!-- Public route documentation is generated with includeVisibility=[\"public\"]. -->\n\n# Catalog Routes\n\n| Route | Name |\n| --- | --- |\n${rows}\n`;
fs.writeFileSync(outputPath, output);
