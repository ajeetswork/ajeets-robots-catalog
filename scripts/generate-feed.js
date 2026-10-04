const fs = require("fs");
const path = require("path");
const minimist = require("minimist");
const { normalizeCatalog } = require("../src/catalog-service");
const { getCatalogRuntimeConfig } = require("../src/runtime-config");
const { printCatalogSummary } = require("../src/cli-output");

const args = minimist(process.argv.slice(2));
const config = getCatalogRuntimeConfig();
const sourcePath = args.input || config.catalogPath;
const outputPath = args.output || config.outputPath;

const products = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const normalized = normalizeCatalog(products);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(normalized, null, 2) + "\n");
printCatalogSummary({ count: normalized.length, outputPath });
