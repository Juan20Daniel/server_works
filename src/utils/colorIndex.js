const { PALETTE_SIZE } = require("../constants");

const getColorIndex = (name) => {
    let sum = 0;
    for (const char of name) sum += char.codePointAt(0);
    return sum % PALETTE_SIZE;
}

module.exports = getColorIndex;