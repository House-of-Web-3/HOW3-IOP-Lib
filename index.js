const { HOW3Protocol } = require("how3-dip");
async function check() {
    console.log(await HOW3Protocol.isAvailable("vitalik.apt"));
}
async function check2() {
    console.log(await HOW3Protocol.register());
}
check();
