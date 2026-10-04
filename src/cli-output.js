const chalk = require("chalk");
const { terminalMode } = require("./terminal-capabilities");

function printCatalogSummary({ count, outputPath }) {
  const mode = terminalMode();
  const label = mode === "plain" ? "Catalog feed" : chalk.cyan("Catalog feed");
  console.log(`${label}: ${count} products -> ${outputPath}`);
}

module.exports = {
  printCatalogSummary
};
