const { textWriter } = require("./writers");
const { tmpdir } = require("os");
const path = require("path");

const filename = path.join(tmpdir(), "My Text File.txt");
const content = "This is my first file created :)\n";
const result = textWriter(filename, content);

console.log("Looks like we created a text file...");
console.log("Plese check using this command");
console.log(`\ncat ${result}\n`);
