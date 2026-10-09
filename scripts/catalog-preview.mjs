import fs from "node:fs";

const stateDir = ".catalog-cache";
fs.mkdirSync(stateDir,{recursive:true});
fs.writeFileSync(
  stateDir + "/state.json",
  JSON.stringify({lastPreview:"local",source:"catalog.json"},null,2)+"\n"
);
console.log("Local catalog preview state refreshed.");
