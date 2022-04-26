const { parse, join } = require("path");
const {
  existsSync,
  accessSync,
  writeFileSync,
  constants: { W_OK },
} = require("fs");
const { slugify } = require("../helpers");

const getParseFile = (value) => {
  try {
    const { name, ext, dir } = parse(value);
    return [[slugify(name), ext].join(""), dir];
  } catch (err) {
    throw new TypeError("Invalid filename argument");
  }
};
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

const textWriter = (filename, data) => {
  const [file, path] = getParseFile(filename);
  const filePath = join(path, file);
  if (!existsSync(path)) {
    throw new TypeError("Invalid path argument");
  }
  if (!hasWriteAccess(path)) {
    throw Error("It doesn't have write permissions");
  }
  if (!writeFile(filePath, data)) {
    throw Error("Ups! something wrong happened while writing the file");
  }

  return filePath;
};

module.exports = { textWriter };
