const { slugify } = require("../../../helpers/string-helper");

it.each([
    [true],
    [false],
    [12345],
    [{}],
    [() => {}],
    [/abc/],
])("Should throw an error when given a non-string value [%s]", (value) => {
    expect(() => { slugify(value); }).toThrowError("Invalid string argument");
})

it.each([
    ["the slug function", "the-slug-function"],
    ["THE SLUG FUNCTION", "the-slug-function"],
    ["Á é í ó ú ä Ë Ï ö ü _ à è ì ò ù", "a-e-i-o-u-a-e-i-o-u-a-e-i-o-u"],
    ["*/-?=)(/& |°¬    !#$%&", ""],
    ["     hello##$%&/(_ ___ world       ", "hello-world"],
])("Should generate a slug of [%s]", (input, output) => {
    expect(slugify(input)).toBe(output)
})