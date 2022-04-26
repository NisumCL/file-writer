const { mkdtempSync, rmSync } = require("fs");
const os = require("os");
const path = require("path");

const createTestFolder = (prefix = "") =>
  mkdtempSync(path.join(os.tmpdir(), prefix));
const clearTestFolder = (folder) =>
  folder ? rmSync(folder, { recursive: true }) : null;

module.exports = { clearTestFolder, createTestFolder };
