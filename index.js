const { HOW3Protocol } = require("./lib/index.js");
async function check() {
    console.log(await HOW3Protocol.isAvailable());
}
async function check2() {
    console.log(await HOW3Protocol.register());
}
check2();
