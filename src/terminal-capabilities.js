const supportsColor = require("supports-color");

function terminalMode(stream = process.stdout) {
  const capability = supportsColor && supportsColor.stdout;
  if (!capability) {
    return "plain";
  }

  return capability.has16m ? "truecolor" : "color";
}

module.exports = {
  terminalMode
};
