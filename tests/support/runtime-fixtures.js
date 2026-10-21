const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

async function withTempDir(prefix, callback) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  try {
    return await callback(dir);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

async function withEnv(name, value, callback) {
  const hadOriginal = Object.prototype.hasOwnProperty.call(process.env, name);
  const original = process.env[name];

  if (value === undefined) delete process.env[name];
  else process.env[name] = value;

  try {
    return await callback();
  } finally {
    if (hadOriginal) process.env[name] = original;
    else delete process.env[name];
  }
}

async function withGlobalProperty(name, value, callback) {
  const hadOriginal = Object.prototype.hasOwnProperty.call(globalThis, name);
  const original = globalThis[name];
  globalThis[name] = value;

  try {
    return await callback();
  } finally {
    if (hadOriginal) globalThis[name] = original;
    else delete globalThis[name];
  }
}

module.exports = { withTempDir, withEnv, withGlobalProperty };
