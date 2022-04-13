const {
  accessSync,
  writeFileSync,
  constants: { W_OK },
} = require("fs");

const hasWriteAccess = (path) => {
  let has = true;
  try {
    accessSync(path, W_OK);
  } catch (err) {
    has = false;
  }
  return has;
};

const writeFile = (filename, data) => {
  let result = true;
  try {
    writeFileSync(filename, data);
  } catch {
    result = false;
  }
  return result;
};

module.exports = { hasWriteAccess, writeFile };
