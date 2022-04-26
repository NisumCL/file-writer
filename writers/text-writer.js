const { parse, join } = require("path");
const { existsSync } = require("fs");
const { slugify } = require("../helpers");
const { hasWriteAccess, writeFile } = require("../helpers/file-helper");

//tarea, eliminar funciones (has and writeFile, ya lo hice) importarlas(ok),
//y luego hacer que corran los test unitarios, de acuerdo al proceso de importar.
//test deberían simplificarse. Cada una hacer que le corra.

const getParseFile = (value) => {
  try {
    const { name, ext, dir } = parse(value);
    return [[slugify(name), ext].join(""), dir];
  } catch (err) {
    throw new TypeError("Invalid filename argument");
  }
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
