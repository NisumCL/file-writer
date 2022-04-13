const {
  accessSync,
  writeFileSync,
  constants: { W_OK },
} = require("fs");
const { hasWriteAccess, writeFile } = require("../../../helpers/file-helper");

jest.mock("fs");

afterEach(() => jest.clearAllMocks());

describe("Testing function hasWriteAccess", () => {
  it("Should return false when doesn´t have write permissions", () => {
    accessSync.mockImplementation(() => {
      throw new TypeError("Some accessSync error");
    });

    expect(hasWriteAccess("test/doc")).toBeFalsy();
    expect(accessSync).toBeCalledWith("test/doc", W_OK);
  });

  it("Should return true when has write access", () => {
    accessSync.mockReturnValueOnce(true);

    expect(hasWriteAccess("test/doc")).toBeTruthy();
    expect(accessSync).toBeCalledWith("test/doc", W_OK);
  });
});

describe("Testing function writeFile", () => {
  it("Should return false when doesn´t write file", () => {
    writeFileSync.mockImplementation(() => {
      throw new TypeError("Some writeFileSync error");
    });

    expect(writeFile("test/doc/file.txt", "YAHU")).toBeFalsy();
    expect(writeFileSync).toBeCalledWith("test/doc/file.txt", "YAHU");
  });

  it("Should return true when writed file", () => {
    writeFileSync.mockReturnValueOnce(true);

    expect(writeFile("test/doc/file.txt", "YAHU")).toBeTruthy();
    expect(writeFileSync).toBeCalledWith("test/doc/file.txt", "YAHU");
  });
});
