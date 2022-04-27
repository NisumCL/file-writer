const { chmodSync } = require("fs");
const { textWriter } = require("../../../writers");
const { clearTestFolder, createTestFolder } = require("../../tools");
const path = require("path");

let testFolder, filename;

beforeEach(() => {
  testFolder = createTestFolder("text-writer");
  filename = path.join(testFolder, "new file.txt");
});
afterEach(() => {
  clearTestFolder(testFolder);
});

it("Should throw an error when filename couldn't be parse", () => {
  expect(() => {
    textWriter("", "Hello world!");
  }).toThrowError("Invalid path argument");
});

it("Should throw an errot when given an invalid path or doesn't exists", () => {
  expect(() => {
    textWriter("/some/path/new file.txt", "Hello world!");
  }).toThrowError("Invalid path argument");
});

it.skip("Should throw an error when it don't have write permissions on the given path", () => {
  chmodSync(testFolder, parseInt("400", 8));
  expect(() => {
    textWriter(filename, "Hello world!");
  }).toThrowError("It doesn't have write permissions");
});

it("Should write a text file succeesfully", () => {
  expect(textWriter(filename, "Hello world!!")).toBe(
    path.join(testFolder, "new-file.txt")
  );
});
