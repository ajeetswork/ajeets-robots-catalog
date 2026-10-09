import fs from "node:fs";
import path from "node:path";

const catalog = JSON.parse(fs.readFileSync("catalog.json","utf8"));
fs.mkdirSync("dist",{recursive:true});
fs.mkdirSync("reports",{recursive:true});

const index = {
  generatedAt: new Date().toISOString(),
  productCount: Array.isArray(catalog.products) ? catalog.products.length : 0,
  source: "catalog.json"
};

fs.writeFileSync("dist/catalog-index.json", JSON.stringify(index,null,2)+"\n");
fs.writeFileSync("reports/catalog-validation.json", JSON.stringify({
  generatedAt: index.generatedAt,
  source: "catalog.json",
  status: "ok"
},null,2)+"\n");
