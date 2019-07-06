const fs = require("fs");
const input = require("path");
const text = fs.readFileSync(input.join(__dirname, "readme.md"), "utf-8");
console.log(text);
