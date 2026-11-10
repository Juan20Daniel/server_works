const { STOP_WORDS } = require("../constants");

const getInitials = (name) => {
    const words = name
        .split(/\s+/)
        .map((w) => w.replace(/[^\p{L}\p{N}]/gu, ""))
        .filter((w) => w && !STOP_WORDS.has(w.toLowerCase()));

    if (words.length === 0) return "??";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
}

module.exports = getInitials;