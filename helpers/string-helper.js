const asciiMap = {
    a: /[àäá]/g,
    e: /[éëè]/g,
    i: /[ìïí]/g,
    o: /[òöó]/g,
    u: /[úüù]/g,
    n: /[ñ]/g,
    "": /[\_\W]/g,
}

const isString = (value) => typeof value === 'string' || value instanceof String

const normalize = (value) => {
    Object.entries(asciiMap).forEach(([char, reg]) => {
        value = value.replace(reg, char);
    })

    return value
}

const slugify = (value) => {
    if(!isString(value)) {
        throw new TypeError("Invalid string argument")
    }

    return value.toLowerCase()
        .split(' ')
        .map(normalize)
        .filter((val) => val)
        .join('-')
}

module.exports = { slugify }