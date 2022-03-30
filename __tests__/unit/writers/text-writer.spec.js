const { textWriter } = require("../../../writers/text-writer")
const { parse, join } = require("path");
const { existsSync, accessSync, writeFileSync, constants: { W_OK } } = require("fs");
const { slugify } = require("../../../helpers");

jest.mock("path")
jest.mock("fs")
jest.mock("../../../helpers")

afterEach(() => jest.clearAllMocks())

it("Should throw an error when filename couldn't be parse", () => {
    parse.mockImplementation(() => { throw new TypeError("Some parse error"); })

    expect(() => { textWriter(null, "Hello world!") }).toThrowError("Invalid filename argument")

    expect(parse).toBeCalledWith(null)
    expect(slugify).not.toBeCalled()
    expect(join).not.toBeCalled()
    expect(existsSync).not.toBeCalled()
    expect(accessSync).not.toBeCalled()
    expect(writeFileSync).not.toBeCalled()
})

it("Should throw an error when given an invalid filename", () => {
    parse.mockReturnValueOnce({ name:"", ext:"", dir:"" })
    slugify.mockImplementation(() => { throw new TypeError("Some slugify error"); })

    expect(() => { textWriter("", "Hello world!") }).toThrowError("Invalid filename argument")

    expect(parse).toBeCalledWith("")
    expect(slugify).toBeCalledWith("")
    expect(join).not.toBeCalled()
    expect(existsSync).not.toBeCalled()
    expect(accessSync).not.toBeCalled()
    expect(writeFileSync).not.toBeCalled()
})

it("Should throw an errot when given an invalid path or doesn't exists", () => {
    parse.mockReturnValueOnce({ name:"new file", ext:".txt", dir:"/tmp" })
    slugify.mockReturnValueOnce("new-file")
    join.mockReturnValueOnce("/tmp/new-file.txt")
    existsSync.mockReturnValueOnce(false)

    expect(() => { textWriter("/tmp/new file.txt", "Hello world!") }).toThrowError("Invalid path argument")

    expect(parse).toBeCalledWith("/tmp/new file.txt")
    expect(slugify).toBeCalledWith("new file")
    expect(join).toBeCalledWith("/tmp","new-file.txt")
    expect(existsSync).toBeCalledWith("/tmp")
    expect(accessSync).not.toBeCalled()
    expect(writeFileSync).not.toBeCalled()
})

it("Should throw an error when it don't have write permissions on the given path", () => {

})

it("Should throw an error when it couldn't write the file", () => {

})

it("Should write a text file succeesfully", () => {

})